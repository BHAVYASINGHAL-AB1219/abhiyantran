import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'http://localhost:8000';

export const AnnouncementsManager = () => {
    const { token } = useAdminAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'info',
        pinned: false,
    });

    const { data: announcements, isLoading } = useQuery({
        queryKey: ['adminAnnouncements'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/announcements.php`);
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data;
        }
    });

    const saveMutation = useMutation({
        mutationFn: async (data: any) => {
            const method = editingId ? 'PUT' : 'POST';
            const payload = editingId ? { ...data, id: editingId } : data;

            const res = await fetch(`${API_URL}/announcements.php`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (!result.success) throw new Error(result.error);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAnnouncements'] });
            toast({ title: 'Success', description: `Announcement ${editingId ? 'updated' : 'created'} successfully` });
            setIsModalOpen(false);
            resetForm();
        },
        onError: (error: any) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${API_URL}/announcements.php?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            if (!result.success) throw new Error(result.error);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminAnnouncements'] });
            toast({ title: 'Success', description: 'Announcement deleted' });
        },
        onError: (error: any) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(formData);
    };

    const handleEdit = (announcement: any) => {
        setFormData({
            title: announcement.title,
            content: announcement.content,
            type: announcement.type || 'info',
            pinned: announcement.pinned || false,
        });
        setEditingId(announcement.id);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({ title: '', content: '', type: 'info', pinned: false });
        setEditingId(null);
    };

    if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-semibold">Announcements</h2>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add New
                </button>
            </div>

            <div className="grid gap-4">
                {announcements?.map((announcement: any) => (
                    <div key={announcement.id} className="glass rounded-xl p-5 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{announcement.title}</h3>
                                {announcement.pinned && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Pinned</span>}
                                <span className={`text-xs px-2 py-0.5 rounded-full ${announcement.type === 'important' ? 'bg-red-500/20 text-red-500' :
                                        announcement.type === 'success' ? 'bg-green-500/20 text-green-500' :
                                            'bg-blue-500/20 text-blue-500'
                                    }`}>
                                    {announcement.type}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{announcement.content}</p>
                            <div className="text-xs text-muted-foreground mt-2">{announcement.date}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(announcement)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-blue-400" />
                            </button>
                            <button
                                onClick={() => { if (confirm('Are you sure?')) deleteMutation.mutate(announcement.id); }}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                        </div>
                    </div>
                ))}
                {announcements?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-xl">
                        No announcements found.
                    </div>
                )}
            </div>

            {/* Modal - keeping it simple without requiring shadcn Dialog components */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-6">{editingId ? 'Edit' : 'Create'} Announcement</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Content</label>
                                        <textarea
                                            required
                                            value={formData.content}
                                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary min-h-[100px]"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium mb-1">Type</label>
                                            <select
                                                value={formData.type}
                                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                            >
                                                <option value="info">Info</option>
                                                <option value="success">Success</option>
                                                <option value="important">Important</option>
                                                <option value="warning">Warning</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2 mt-6">
                                            <input
                                                type="checkbox"
                                                id="pinned"
                                                checked={formData.pinned}
                                                onChange={e => setFormData({ ...formData, pinned: e.target.checked })}
                                                className="rounded border-border"
                                            />
                                            <label htmlFor="pinned" className="text-sm">Pinned</label>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={saveMutation.isPending}
                                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                        >
                                            {saveMutation.isPending ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
