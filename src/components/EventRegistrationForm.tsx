import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trash2, Send, Users } from 'lucide-react';

interface TeamMember {
    name: string;
    email: string;
    phone: string;
}

interface EventRegistrationFormProps {
    eventTitle: string;
    maxTeamSize: number;
}

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

export const EventRegistrationForm = ({ eventTitle, maxTeamSize }: EventRegistrationFormProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        teamName: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        collegeName: '',
        year: '',
    });

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^\d{10}$/.test(phone);
    };

    const addTeamMember = () => {
        if (teamMembers.length < maxTeamSize - 1) {
            setTeamMembers([...teamMembers, { name: '', email: '', phone: '' }]);
        }
    };

    const removeTeamMember = (index: number) => {
        setTeamMembers(teamMembers.filter((_, i) => i !== index));
    };

    const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
        const updated = [...teamMembers];
        updated[index][field] = value;
        setTeamMembers(updated);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
        if (!formData.leaderName.trim()) newErrors.leaderName = 'Leader name is required';
        if (!formData.leaderEmail.trim()) {
            newErrors.leaderEmail = 'Email is required';
        } else if (!validateEmail(formData.leaderEmail)) {
            newErrors.leaderEmail = 'Invalid email format';
        }
        if (!formData.leaderPhone.trim()) {
            newErrors.leaderPhone = 'Phone is required';
        } else if (!validatePhone(formData.leaderPhone)) {
            newErrors.leaderPhone = 'Phone must be 10 digits';
        }
        if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
        if (!formData.year) newErrors.year = 'Year is required';

        teamMembers.forEach((member, index) => {
            if (!member.name.trim()) newErrors[`member${index}Name`] = 'Name is required';
            if (!member.email.trim()) {
                newErrors[`member${index}Email`] = 'Email is required';
            } else if (!validateEmail(member.email)) {
                newErrors[`member${index}Email`] = 'Invalid email format';
            }
            if (!member.phone.trim()) {
                newErrors[`member${index}Phone`] = 'Phone is required';
            } else if (!validatePhone(member.phone)) {
                newErrors[`member${index}Phone`] = 'Phone must be 10 digits';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please fill all required fields correctly.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Registration Successful! 🎉",
            description: `Your team "${formData.teamName}" has been registered for ${eventTitle}.`,
        });

        // Reset form
        setFormData({
            teamName: '',
            leaderName: '',
            leaderEmail: '',
            leaderPhone: '',
            collegeName: '',
            year: '',
        });
        setTeamMembers([]);
        setIsSubmitting(false);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass neon-border rounded-3xl p-6 md:p-8"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Users className="w-5 h-5 text-background" />
                </div>
                <h2 className="font-display text-2xl font-bold">Registration Form</h2>
            </div>

            <div className="space-y-6">
                {/* Team Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="teamName">Team Name *</Label>
                        <Input
                            id="teamName"
                            value={formData.teamName}
                            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                            placeholder="Enter team name"
                            className={errors.teamName ? 'border-red-500' : ''}
                        />
                        {errors.teamName && <p className="text-red-500 text-xs">{errors.teamName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="collegeName">College Name *</Label>
                        <Input
                            id="collegeName"
                            value={formData.collegeName}
                            onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                            placeholder="Enter college name"
                            className={errors.collegeName ? 'border-red-500' : ''}
                        />
                        {errors.collegeName && <p className="text-red-500 text-xs">{errors.collegeName}</p>}
                    </div>
                </div>

                {/* Team Leader Section */}
                <div className="space-y-4">
                    <h3 className="font-display text-lg font-semibold text-primary">Team Leader Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="leaderName">Name *</Label>
                            <Input
                                id="leaderName"
                                value={formData.leaderName}
                                onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                                placeholder="Leader's name"
                                className={errors.leaderName ? 'border-red-500' : ''}
                            />
                            {errors.leaderName && <p className="text-red-500 text-xs">{errors.leaderName}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year">Year *</Label>
                            <select
                                id="year"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className={`w-full h-10 px-3 rounded-md border bg-background text-foreground ${errors.year ? 'border-red-500' : 'border-input'}`}
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="leaderEmail">Email *</Label>
                            <Input
                                id="leaderEmail"
                                type="email"
                                value={formData.leaderEmail}
                                onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                                placeholder="email@example.com"
                                className={errors.leaderEmail ? 'border-red-500' : ''}
                            />
                            {errors.leaderEmail && <p className="text-red-500 text-xs">{errors.leaderEmail}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="leaderPhone">Phone Number *</Label>
                            <Input
                                id="leaderPhone"
                                type="tel"
                                value={formData.leaderPhone}
                                onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                                placeholder="10-digit mobile number"
                                className={errors.leaderPhone ? 'border-red-500' : ''}
                            />
                            {errors.leaderPhone && <p className="text-red-500 text-xs">{errors.leaderPhone}</p>}
                        </div>
                    </div>
                </div>

                {/* Team Members Section */}
                {maxTeamSize > 1 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-lg font-semibold text-primary">
                                Team Members ({teamMembers.length}/{maxTeamSize - 1})
                            </h3>
                            {teamMembers.length < maxTeamSize - 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addTeamMember}
                                    className="flex items-center gap-2"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Add Member
                                </Button>
                            )}
                        </div>

                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass rounded-xl p-4 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-sm font-semibold text-muted-foreground">
                                        Member {index + 1}
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeTeamMember(index)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Name *</Label>
                                        <Input
                                            value={member.name}
                                            onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                            placeholder="Member name"
                                            className={errors[`member${index}Name`] ? 'border-red-500' : ''}
                                        />
                                        {errors[`member${index}Name`] && (
                                            <p className="text-red-500 text-xs">{errors[`member${index}Name`]}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Email *</Label>
                                        <Input
                                            type="email"
                                            value={member.email}
                                            onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                                            placeholder="email@example.com"
                                            className={errors[`member${index}Email`] ? 'border-red-500' : ''}
                                        />
                                        {errors[`member${index}Email`] && (
                                            <p className="text-red-500 text-xs">{errors[`member${index}Email`]}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Phone *</Label>
                                        <Input
                                            type="tel"
                                            value={member.phone}
                                            onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                                            placeholder="10-digit number"
                                            className={errors[`member${index}Phone`] ? 'border-red-500' : ''}
                                        />
                                        {errors[`member${index}Phone`] && (
                                            <p className="text-red-500 text-xs">{errors[`member${index}Phone`]}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {teamMembers.length === 0 && (
                            <p className="text-muted-foreground text-sm text-center py-4">
                                Click "Add Member" to add team members (optional for team events)
                            </p>
                        )}
                    </div>
                )}

                {/* Submit Button */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 text-lg font-display font-semibold glow-cyan"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                                Submitting...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                Register for {eventTitle}
                            </span>
                        )}
                    </Button>
                </motion.div>
            </div>
        </motion.form>
    );
};
