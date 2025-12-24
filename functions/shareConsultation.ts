import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { consultationId, emails, generateLink } = await req.json();

    // Fetch consultation
    const consultations = await base44.entities.Consultation.filter({ id: consultationId });
    const consultation = consultations[0];

    if (!consultation) {
      return Response.json({ error: 'Consultation not found' }, { status: 404 });
    }

    // Check ownership
    if (consultation.created_by !== user.email) {
      return Response.json({ error: 'Not authorized' }, { status: 403 });
    }

    let shareLink = null;

    if (generateLink) {
      // Generate unique share token
      const shareToken = crypto.randomUUID();
      
      // Create expiration date (30 days from now)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      // Create shared consultation record
      await base44.asServiceRole.entities.SharedConsultation.create({
        consultation_id: consultationId,
        share_token: shareToken,
        shared_with_emails: emails || [],
        expires_at: expiresAt.toISOString(),
        is_active: true,
        created_by: user.email
      });

      // Update consultation
      await base44.entities.Consultation.update(consultationId, {
        is_shared: true
      });

      // Generate share URL
      const baseUrl = req.headers.get('origin') || 'https://app.base44.com';
      shareLink = `${baseUrl}/shared/${shareToken}`;
    }

    // Send emails if provided
    if (emails && emails.length > 0) {
      const emailSubject = `Consulta Compartilhada: ${consultation.title}`;
      const emailBody = `
${user.full_name || user.email} compartilhou uma consulta estratégica com você.

Título: ${consultation.title}

${shareLink ? `Acesse aqui: ${shareLink}` : 'A consulta foi compartilhada diretamente com você.'}

---
Digital Twin - Marcos Prado Troyjo
      `;

      // Send email to each recipient
      await Promise.all(
        emails.map(email =>
          base44.integrations.Core.SendEmail({
            to: email,
            subject: emailSubject,
            body: emailBody
          })
        )
      );
    }

    return Response.json({
      success: true,
      shareLink
    });

  } catch (error) {
    console.error('Share consultation error:', error);
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
});