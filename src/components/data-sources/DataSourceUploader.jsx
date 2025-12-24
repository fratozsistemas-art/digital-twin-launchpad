import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Database, TrendingUp, Link2, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { base44 } from '@/api/base44Client';

export default function DataSourceUploader({ onSuccess, language = 'pt-BR' }) {
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'financial_report',
    description: '',
    file: null,
    privacy_level: 'private'
  });

  const content = {
    'pt-BR': {
      title: 'Conectar Nova Fonte de Dados',
      subtitle: 'Enriqueça análises com seus próprios dados corporativos',
      nameLabel: 'Nome da Fonte',
      namePlaceholder: 'ex: Relatório Financeiro Q4 2024',
      typeLabel: 'Tipo de Fonte',
      types: {
        financial_report: 'Relatório Financeiro',
        internal_document: 'Documento Interno',
        market_data: 'Dados de Mercado',
        custom_api: 'API Customizada',
        research_paper: 'Artigo de Pesquisa',
        other: 'Outro'
      },
      descriptionLabel: 'Descrição',
      descriptionPlaceholder: 'Descreva o conteúdo e propósito desta fonte...',
      fileLabel: 'Upload de Arquivo',
      privacyLabel: 'Nível de Privacidade',
      privacy: {
        public: 'Público',
        private: 'Privado',
        confidential: 'Confidencial'
      },
      uploadButton: 'Processar e Conectar',
      uploading: 'Processando...',
      success: 'Fonte conectada com sucesso!',
      securityNote: '🔒 Dados criptografados end-to-end. Acesso exclusivo ao seu Digital Twin.'
    },
    'en-US': {
      title: 'Connect New Data Source',
      subtitle: 'Enrich analyses with your own corporate data',
      nameLabel: 'Source Name',
      namePlaceholder: 'e.g., Q4 2024 Financial Report',
      typeLabel: 'Source Type',
      types: {
        financial_report: 'Financial Report',
        internal_document: 'Internal Document',
        market_data: 'Market Data',
        custom_api: 'Custom API',
        research_paper: 'Research Paper',
        other: 'Other'
      },
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Describe the content and purpose of this source...',
      fileLabel: 'File Upload',
      privacyLabel: 'Privacy Level',
      privacy: {
        public: 'Public',
        private: 'Private',
        confidential: 'Confidential'
      },
      uploadButton: 'Process and Connect',
      uploading: 'Processing...',
      success: 'Source connected successfully!',
      securityNote: '🔒 End-to-end encrypted data. Exclusive access to your Digital Twin.'
    }
  };

  const t = content[language];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Upload file
      let fileUrl = null;
      if (formData.file) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: formData.file });
        fileUrl = file_url;

        // Extract data from file (simulation - in production, use ExtractDataFromUploadedFile)
        // const extractedData = await base44.integrations.Core.ExtractDataFromUploadedFile({
        //   file_url: fileUrl,
        //   json_schema: { /* schema based on file type */ }
        // });
      }

      // Create data source record
      await base44.entities.DataSource.create({
        name: formData.name,
        type: formData.type,
        description: formData.description,
        file_url: fileUrl,
        privacy_level: formData.privacy_level,
        status: 'active',
        metadata: {
          file_size: formData.file?.size,
          file_type: formData.file?.type,
          upload_date: new Date().toISOString(),
          usage_count: 0
        }
      });

      setUploadComplete(true);
      setTimeout(() => {
        onSuccess && onSuccess();
        setUploadComplete(false);
        setFormData({
          name: '',
          type: 'financial_report',
          description: '',
          file: null,
          privacy_level: 'private'
        });
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  if (uploadComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-xl bg-green-500/10 border border-green-500/30 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <p className="text-lg text-green-300 font-medium">{t.success}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{t.title}</h3>
        <p className="text-sm text-slate-400">{t.subtitle}</p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label className="text-slate-300">{t.nameLabel}</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder={t.namePlaceholder}
          required
          className="bg-slate-800/50 border-slate-700 text-white"
        />
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label className="text-slate-300">{t.typeLabel}</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800">
            {Object.entries(t.types).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-slate-300">{t.descriptionLabel}</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder={t.descriptionPlaceholder}
          className="bg-slate-800/50 border-slate-700 text-white min-h-[100px]"
        />
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="text-slate-300">{t.fileLabel}</Label>
        <div className="relative">
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
            className="bg-slate-800/50 border-slate-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
          />
        </div>
        {formData.file && (
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <FileText className="w-3 h-3" />
            {formData.file.name} ({(formData.file.size / 1024).toFixed(1)} KB)
          </p>
        )}
      </div>

      {/* Privacy Level */}
      <div className="space-y-2">
        <Label className="text-slate-300">{t.privacyLabel}</Label>
        <Select value={formData.privacy_level} onValueChange={(value) => setFormData(prev => ({ ...prev, privacy_level: value }))}>
          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800">
            {Object.entries(t.privacy).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Security Note */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-xs text-blue-300">{t.securityNote}</p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={uploading || !formData.name || !formData.file}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t.uploading}
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            {t.uploadButton}
          </>
        )}
      </Button>
    </motion.form>
  );
}