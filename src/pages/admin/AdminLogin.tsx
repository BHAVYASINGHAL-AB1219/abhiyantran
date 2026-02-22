import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAdminAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) {
            toast({ title: 'Error', description: 'Please enter a password', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/admin_login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();

            if (data.success) {
                login(data.token);
                toast({ title: 'Success', description: 'Logged in successfully' });
                navigate('/admin/dashboard');
            } else {
                toast({ title: 'Error', description: data.error || 'Login failed', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to connect to server', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-[70vh] flex items-center justify-center -mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass neon-border rounded-2xl p-8 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-display font-bold">Admin Portal</h1>
                        <p className="text-muted-foreground mt-2 text-sm">Log in to manage ABHIYANTRAN</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 opacity-80">Admin Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background/50 border border-primary/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary backdrop-blur-sm"
                                placeholder="Enter password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground font-display font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
};

export default AdminLogin;
