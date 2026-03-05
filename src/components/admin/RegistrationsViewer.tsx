import { useQuery } from '@tanstack/react-query';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2, Download } from 'lucide-react';
import { useState, useMemo } from 'react';

const API_URL = '/api';

export const RegistrationsViewer = () => {
    const { token } = useAdminAuth();
    const [selectedEvent, setSelectedEvent] = useState<string>('All');

    const { data: registrations, isLoading } = useQuery({
        queryKey: ['adminRegistrations'],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/admin_registrations.php`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data.data;
        }
    });

    const uniqueEvents = useMemo(() => {
        if (!registrations) return [];
        const events = new Set(registrations.map((r: any) => r.eventTitle));
        return Array.from(events);
    }, [registrations]);

    const filteredRegistrations = useMemo(() => {
        if (!registrations) return [];
        if (selectedEvent === 'All') return registrations;
        return registrations.filter((r: any) => r.eventTitle === selectedEvent);
    }, [registrations, selectedEvent]);

    if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-semibold">Event Registrations</h2>
                <div className="flex items-center gap-4">
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="bg-background/50 border border-border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="All">All Events</option>
                        {uniqueEvents.map((event: any) => (
                            <option key={event} value={event}>{event}</option>
                        ))}
                    </select>
                    <div className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full font-medium">
                        Total: {filteredRegistrations?.length || 0} teams
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-background/50 backdrop-blur-sm">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                        <tr>
                            <th className="px-6 py-4 font-medium">Event</th>
                            <th className="px-6 py-4 font-medium">Team Info</th>
                            <th className="px-6 py-4 font-medium">Leader</th>
                            <th className="px-6 py-4 font-medium">Members</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredRegistrations?.map((reg: any) => (
                            <tr key={reg.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-primary">{reg.eventTitle}</div>
                                    <div className="text-xs text-muted-foreground mt-1">ID: {reg.eventId}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{reg.teamName}</div>
                                    <div className="text-xs text-muted-foreground">{reg.collegeName}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{reg.leader.name}</div>
                                    <div className="text-xs text-muted-foreground">{reg.leader.email}</div>
                                    <div className="text-xs text-muted-foreground">{reg.leader.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    {reg.teamMembers?.length > 0 ? (
                                        <ul className="text-xs space-y-1">
                                            {reg.teamMembers.map((m: any, i: number) => (
                                                <li key={i}>{m.name}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-muted-foreground text-xs italic">Solo</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-xs text-muted-foreground">
                                    {new Date(reg.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {filteredRegistrations?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    No registrations found for the selected criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
