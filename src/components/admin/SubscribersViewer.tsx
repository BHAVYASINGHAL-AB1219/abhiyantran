import { useQuery } from '@tanstack/react-query';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2, Mail } from 'lucide-react';

const API_URL = 'http://localhost:8000';

export const SubscribersViewer = () => {
    const { token } = useAdminAuth();

    const { data: subscribers, isLoading } = useQuery({
        queryKey: ['adminSubscribers'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/admin_subscribers.php`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data;
        }
    });

    const downloadCSV = () => {
        if (!subscribers || subscribers.length === 0) return;

        let csvContent = "data:text/csv;charset=utf-8,Email,SubscribedAt\n";
        subscribers.forEach((sub: any) => {
            csvContent += `${sub.email},${new Date(sub.createdAt).toISOString()}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `abhiyantran_subscribers_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-display font-semibold">Subscribers</h2>
                    <p className="text-muted-foreground text-sm">Emails for future mailing lists</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full font-medium">
                        Total: {subscribers?.length || 0}
                    </div>
                    {subscribers && subscribers.length > 0 && (
                        <button
                            onClick={downloadCSV}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Download CSV
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-background/50 backdrop-blur-sm">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                        <tr>
                            <th className="px-6 py-4 font-medium"><Mail className="w-4 h-4 inline-block mr-2" />Email</th>
                            <th className="px-6 py-4 font-medium">Date Subscribed</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {subscribers?.map((sub: any) => (
                            <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-medium">
                                    {sub.email}
                                </td>
                                <td className="px-6 py-4 text-xs text-muted-foreground">
                                    {new Date(sub.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {subscribers?.length === 0 && (
                            <tr>
                                <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                                    No subscribers found yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
