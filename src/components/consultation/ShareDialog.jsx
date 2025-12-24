import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Mail, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function ShareDialog({ consultation, isOpen, onClose, language = 'pt-BR' }) {
  const [emails, setEmails] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const content = {
    'pt-BR': {
      title: 'Compartilhar Consulta',
      subtitle: 'Envie por email ou gere um link compartilhável',
      emailLabel: 'Emails (separados por vírgula)',
      emailPlaceholder: 'usuario1@email.com, usuario2@email.com',
      sendEmail: 'Enviar por Email',
      orDivider: 'ou',
      generateLink: 'Gerar Link Compartilhável',
      copyLink: 'Copiar Link',
      copied: 'Copiado!',
      close: 'Fechar',
      emailSent: 'Emails enviados com sucesso!',
      linkGenerated: 'Link gerado com sucesso!'
    },
    'en-US': {
      title: 'Share Consultation',
      subtitle: 'Send via email or generate a shareable link',
      emailLabel: 'Emails (comma separated)',
      emailPlaceholder: 'user1@email.com, user2@email.com',
      sendEmail: 'Send via Email',
      orDivider: 'or',
      generateLink: 'Generate Shareable Link',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      close: 'Close',
      emailSent: 'Emails sent successfully!',
      linkGenerated: 'Link generated successfully!'
    }
  };

  const t = content[language];

  const shareMutation = useMutation({
    mutationFn: async ({ emails, generateLink }) => {
      const response = await base44.functions.invoke('shareConsultation', {
        consultationId: consultation.id,
        emails: emails ? emails.split(',').map(e => e.trim()).filter(e => e) : [],
        generateLink
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.shareLink) {
        setShareLink(data.shareLink);
        toast.success(t.linkGenerated);
      } else {
        toast.success(t.emailSent);
      }
    },
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {t.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Email Sharing */}
          <div className="space-y-3">
            <Label className="text-slate-300">{t.emailLabel}</Label>
            <Input
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="bg-slate-800/50 border-slate-700 text-white"
            />
            <Button
              onClick={() => shareMutation.mutate({ emails, generateLink: false })}
              disabled={!emails.trim() || shareMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500"
            >
              <Mail className="w-4 h-4 mr-2" />
              {t.sendEmail}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-sm text-slate-500">{t.orDivider}</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Link Generation */}
          <div className="space-y-3">
            {!shareLink ? (
              <Button
                onClick={() => shareMutation.mutate({ emails: '', generateLink: true })}
                disabled={shareMutation.isPending}
                variant="outline"
                className="w-full"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                {t.generateLink}
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={shareLink}
                    readOnly
                    className="bg-slate-800/50 border-slate-700 text-slate-300 flex-1"
                  />
                  <Button
                    onClick={handleCopyLink}
                    className="bg-slate-800 hover:bg-slate-700"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {t.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        {t.copyLink}
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  {language === 'pt-BR' 
                    ? 'Link expira em 30 dias' 
                    : 'Link expires in 30 days'}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}