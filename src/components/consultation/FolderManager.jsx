import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, Plus, Edit, Trash2, Briefcase, Globe, TrendingUp, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function FolderManager({ currentFolderId, onFolderChange, language = 'pt-BR' }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const queryClient = useQueryClient();

  const content = {
    'pt-BR': {
      title: 'Pastas',
      newFolder: 'Nova Pasta',
      edit: 'Editar',
      delete: 'Excluir',
      name: 'Nome da Pasta',
      description: 'Descrição',
      color: 'Cor',
      icon: 'Ícone',
      save: 'Salvar',
      cancel: 'Cancelar',
      all: 'Todas'
    },
    'en-US': {
      title: 'Folders',
      newFolder: 'New Folder',
      edit: 'Edit',
      delete: 'Delete',
      name: 'Folder Name',
      description: 'Description',
      color: 'Color',
      icon: 'Icon',
      save: 'Save',
      cancel: 'Cancel',
      all: 'All'
    }
  };

  const t = content[language];

  const icons = {
    folder: Folder,
    briefcase: Briefcase,
    globe: Globe,
    'trending-up': TrendingUp,
    shield: Shield,
    star: Star
  };

  const colors = {
    blue: 'from-blue-600 to-cyan-500',
    green: 'from-green-600 to-emerald-500',
    purple: 'from-purple-600 to-pink-500',
    amber: 'from-amber-600 to-orange-500',
    red: 'from-red-600 to-rose-500',
    cyan: 'from-cyan-600 to-blue-500'
  };

  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: folders } = useQuery({
    queryKey: ['consultation-folders', user?.email],
    queryFn: async () => {
      return await base44.entities.ConsultationFolder.filter({ created_by: user.email }, 'name');
    },
    enabled: !!user?.email,
  });

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (data.id) {
        return await base44.entities.ConsultationFolder.update(data.id, data);
      } else {
        return await base44.entities.ConsultationFolder.create(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultation-folders'] });
      setDialogOpen(false);
      setEditingFolder(null);
      toast.success(language === 'pt-BR' ? 'Pasta salva!' : 'Folder saved!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.ConsultationFolder.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultation-folders'] });
      toast.success(language === 'pt-BR' ? 'Pasta removida' : 'Folder removed');
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'blue',
    icon: 'folder'
  });

  const handleEdit = (folder) => {
    setEditingFolder(folder);
    setFormData(folder);
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingFolder(null);
    setFormData({ name: '', description: '', color: 'blue', icon: 'folder' });
    setDialogOpen(true);
  };

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase">{t.title}</h3>
        <Button size="sm" variant="ghost" onClick={handleNew} className="h-8 w-8 p-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <button
        onClick={() => onFolderChange(null)}
        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
          !currentFolderId
            ? 'bg-slate-800 text-white'
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
        }`}
      >
        <Folder className="w-5 h-5" />
        <span className="font-medium">{t.all}</span>
      </button>

      {folders?.map((folder) => {
        const Icon = icons[folder.icon] || Folder;
        return (
          <div
            key={folder.id}
            className={`group flex items-center gap-3 p-3 rounded-lg transition-all ${
              currentFolderId === folder.id
                ? 'bg-slate-800'
                : 'hover:bg-slate-800/50'
            }`}
          >
            <button
              onClick={() => onFolderChange(folder.id)}
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors[folder.color]} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <span className="block text-white font-medium truncate">{folder.name}</span>
                <span className="text-xs text-slate-500">{folder.consultation_count || 0}</span>
              </div>
            </button>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" onClick={() => handleEdit(folder)} className="h-8 w-8 p-0">
                <Edit className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => deleteMutation.mutate(folder.id)} className="h-8 w-8 p-0 text-red-400">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        );
      })}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-white">{editingFolder ? t.edit : t.newFolder}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-slate-300">{t.name}</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-300">{t.description}</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">{t.color}</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(colors).map(color => (
                      <SelectItem key={color} value={color} className="capitalize">{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">{t.icon}</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(icons).map(icon => (
                      <SelectItem key={icon} value={icon} className="capitalize">{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                {t.cancel}
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500">
                {t.save}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}