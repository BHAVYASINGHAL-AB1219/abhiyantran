import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Layout } from '@/components/layout/Layout';
import { AnnouncementsManager } from '@/components/admin/AnnouncementsManager';
import { RegistrationsViewer } from '@/components/admin/RegistrationsViewer';
import { SubscribersViewer } from '@/components/admin/SubscribersViewer';
import { LogOut, Megaphone, Users, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { logout } = useAdminAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'announcements' | 'registrations' | 'subscribers'>('announcements');

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="glass rounded-xl p-4 sticky top-24">
                            <div className="mb-8 px-2">
                                <h1 className="text-xl font-display font-bold text-gradient">Admin Panel</h1>
                                <p className="text-xs text-muted-foreground mt-1">ABHIYANTRAN 2026</p>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('announcements')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'announcements'
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                        : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <Megaphone className="w-4 h-4" /> Announcements
                                </button>
                                <button
                                    onClick={() => setActiveTab('registrations')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'registrations'
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                        : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <Users className="w-4 h-4" /> Registrations
                                </button>
                                <button
                                    onClick={() => setActiveTab('subscribers')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'subscribers'
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                        : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <Mail className="w-4 h-4" /> Subscribers
                                </button>
                            </nav>

                            <div className="mt-8 pt-4 border-t border-border">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'announcements' && <AnnouncementsManager />}
                            {activeTab === 'registrations' && <RegistrationsViewer />}
                            {activeTab === 'subscribers' && <SubscribersViewer />}
                        </motion.div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
