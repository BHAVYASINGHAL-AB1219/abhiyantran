import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Trash2, Send, Users, Mail, RefreshCw, ShieldCheck } from 'lucide-react';

interface TeamMember {
    name: string;
    email: string;
    phone: string;
}

interface EventRegistrationFormProps {
    eventId: number;
    eventTitle: string;
    minTeamSize: number;
    maxTeamSize: number;
}

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

const colleges = [
    'National Institute of Technology Sikkim',
    'National Institute of Technology Silchar',
    'National Institute of Technology Nagaland',
    'National Institute of Technology Meghalaya',
    'National Institute of Technology Mizoram',
    'National Institute of Technology Manipur',
    'National Institute of Technology Arunachal Pradesh',
    'National Institute of Technology Agartala',
    'Sikkim Institute of science and technology namchi',
    'Sikkim Manipal institute of technology',
    'Centre for computers and communication technology Sikkim',
    'Advanced technical training centre sikkim',
    'Sikkim University',
];

const restrictedEventsForNITSikkim = [
    'Robo War',
    'Drone Racing Championship',
    'Sand Rover',
    'Line Follower'
];

const API_BASE = import.meta.env.VITE_API_URL || '';

type FormStep = 'form' | 'otp' | 'success';

export const EventRegistrationForm = ({ eventId, eventTitle, minTeamSize, maxTeamSize }: EventRegistrationFormProps) => {
    // Number of additional members required beyond the leader
    const requiredExtraMembers = Math.max(0, minTeamSize - 1);
    const maxExtraMembers = maxTeamSize - 1;
    const { toast } = useToast();

    // Determine if the current event is restricted for NIT Sikkim
    const isRestrictedForNITSikkim = restrictedEventsForNITSikkim.includes(eventTitle);

    const [step, setStep] = useState<FormStep>('form');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpSending, setIsOtpSending] = useState(false);
    const [registrationId, setRegistrationId] = useState<string>('');

    const [formData, setFormData] = useState({
        teamName: '',
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        collegeName: '',
        customCollegeName: '',
        year: '',
    });

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
        () => Array.from({ length: requiredExtraMembers }, () => ({ name: '', email: '', phone: '' }))
    );
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

    const addTeamMember = () => {
        if (teamMembers.length < maxExtraMembers) {
            setTeamMembers([...teamMembers, { name: '', email: '', phone: '' }]);
        }
    };

    const removeTeamMember = (index: number) => {
        if (teamMembers.length > requiredExtraMembers) {
            setTeamMembers(teamMembers.filter((_, i) => i !== index));
        }
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
        if (!formData.collegeName.trim()) {
            newErrors.collegeName = 'College name is required';
        } else if (formData.collegeName === 'Other' && !formData.customCollegeName.trim()) {
            newErrors.customCollegeName = 'Please enter your college name';
        }
        if (!formData.year) newErrors.year = 'Year is required';

        // Validate total team size (leader + members)
        const totalMembers = 1 + teamMembers.length;
        if (totalMembers < minTeamSize) {
            newErrors.teamSize = `This event requires at least ${minTeamSize} members (including leader). Please add ${minTeamSize - totalMembers} more member(s).`;
        }
        if (totalMembers > maxTeamSize) {
            newErrors.teamSize = `This event allows at most ${maxTeamSize} members (including leader). Please remove ${totalMembers - maxTeamSize} member(s).`;
        }

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

    // ── Step 1: Send OTP ─────────────────────────────────────────────────────
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            toast({ title: 'Validation Error', description: 'Please fill all required fields correctly.', variant: 'destructive' });
            return;
        }
        setIsOtpSending(true);
        try {
            const url = API_BASE ? `${API_BASE.replace(/\/$/, '')}/send_otp.php` : '/api/send_otp.php';
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.leaderEmail,
                    eventId,
                    eventTitle,
                    teamName: formData.teamName,
                    leaderName: formData.leaderName,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                toast({ title: 'Failed to send OTP', description: data?.error || data?.detail || 'Please try again.', variant: 'destructive' });
                return;
            }
            toast({ title: '📧 OTP Sent!', description: `A 6-digit OTP has been sent to ${formData.leaderEmail}` });
            setOtpDigits(['', '', '', '', '', '']);
            setStep('otp');
        } catch {
            toast({ title: 'Network error', description: 'Could not reach the server. Please try again.', variant: 'destructive' });
        } finally {
            setIsOtpSending(false);
        }
    };

    // ── Step 2: Verify OTP & Register ────────────────────────────────────────
    const handleVerifyAndRegister = async () => {
        const otp = otpDigits.join('');
        if (otp.length !== 6) {
            toast({ title: 'Invalid OTP', description: 'Please enter all 6 digits.', variant: 'destructive' });
            return;
        }
        setIsSubmitting(true);
        const payload = {
            otp, eventId, eventTitle,
            teamName: formData.teamName,
            collegeName: formData.collegeName === 'Other' ? formData.customCollegeName : formData.collegeName,
            leaderName: formData.leaderName,
            leaderEmail: formData.leaderEmail,
            leaderPhone: formData.leaderPhone,
            year: formData.year,
            teamMembers: teamMembers.map(m => ({ name: m.name, email: m.email, phone: m.phone })),
        };
        try {
            const url = API_BASE ? `${API_BASE.replace(/\/$/, '')}/verify_otp.php` : '/api/verify_otp.php';
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                if (res.status === 401) {
                    toast({ title: 'Invalid or Expired OTP', description: 'Please request a new OTP and try again.', variant: 'destructive' });
                } else if (res.status === 409) {
                    toast({ title: 'Already Registered', description: 'This email is already registered for this event.', variant: 'destructive' });
                } else {
                    toast({ title: 'Registration failed', description: [data?.error, data?.detail].filter(Boolean).join(' – ') || 'Please try again.', variant: 'destructive' });
                }
                return;
            }
            toast({ title: 'Registration Successful! 🎉', description: `Team "${formData.teamName}" is registered for ${eventTitle}.` });
            setRegistrationId(data.id || 'N/A');
            setStep('success');
        } catch {
            toast({ title: 'Network error', description: 'Could not reach the server. Please try again.', variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── OTP digit input helpers ───────────────────────────────────────────────
    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(-1);
        const updated = [...otpDigits];
        updated[index] = digit;
        setOtpDigits(updated);
        if (digit && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) otpRefs.current[index - 1]?.focus();
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length) {
            const updated = [...otpDigits];
            pasted.split('').forEach((ch, i) => { updated[i] = ch; });
            setOtpDigits(updated);
            otpRefs.current[Math.min(pasted.length, 5)]?.focus();
        }
    };

    const resetAll = () => {
        setStep('form');
        setRegistrationId('');
        setFormData({ teamName: '', leaderName: '', leaderEmail: '', leaderPhone: '', collegeName: '', customCollegeName: '', year: '' });
        setTeamMembers(Array.from({ length: requiredExtraMembers }, () => ({ name: '', email: '', phone: '' })));
        setOtpDigits(['', '', '', '', '', '']);
        setErrors({});
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // SUCCESS SCREEN
    // ═══════════════════════════════════════════════════════════════════════════
    if (step === 'success') {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass neon-border rounded-3xl p-8 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 mx-auto flex items-center justify-center">
                    <Send className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white">Registration Successful!</h2>
                <div className="space-y-2 text-muted-foreground">
                    <p>You have successfully registered for <span className="text-primary font-semibold">{eventTitle}</span></p>
                    <p>Team: <span className="text-white">{formData.teamName}</span></p>
                    <p className="text-sm">Ref ID: <span className="font-mono bg-white/10 px-2 py-1 rounded">{registrationId}</span></p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button variant="outline" onClick={() => window.print()} className="gap-2">Print Receipt</Button>
                    <Button onClick={resetAll} className="gap-2 glow-cyan">Register Another Team</Button>
                </div>
            </motion.div>
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // OTP STEP
    // ═══════════════════════════════════════════════════════════════════════════
    if (step === 'otp') {
        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass neon-border rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-background" />
                    </div>
                    <div>
                        <h2 className="font-display text-xl font-bold">Verify Your Email</h2>
                        <p className="text-sm text-muted-foreground">OTP sent to <span className="text-primary">{formData.leaderEmail}</span></p>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm mb-8">
                    Enter the 6-digit OTP sent to your email to complete registration for <span className="text-white font-semibold">{eventTitle}</span>.
                </p>
                <div className="flex gap-3 justify-center mb-8">
                    {otpDigits.map((digit, i) => (
                        <motion.input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            onPaste={i === 0 ? handleOtpPaste : undefined}
                            whileFocus={{ scale: 1.08 }}
                            className={`w-12 h-14 text-center text-2xl font-display font-bold bg-card border-2 rounded-lg outline-none text-primary transition-all duration-200 ${digit ? 'border-primary shadow-[0_0_12px_hsl(180_100%_50%/0.4)]' : 'border-border'} focus:border-primary focus:shadow-[0_0_12px_hsl(180_100%_50%/0.4)]`}
                        />
                    ))}
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mb-4">
                    <Button onClick={handleVerifyAndRegister} disabled={isSubmitting || otpDigits.join('').length !== 6} className="w-full py-6 text-lg font-display font-semibold glow-cyan">
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                Verifying...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" />Verify &amp; Complete Registration</span>
                        )}
                    </Button>
                </motion.div>
                <div className="flex items-center justify-between text-sm">
                    <button type="button" onClick={() => setStep('form')} className="text-muted-foreground hover:text-white transition-colors">← Edit Details</button>
                    <button type="button" onClick={handleSendOtp as unknown as React.MouseEventHandler} disabled={isOtpSending} className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors disabled:opacity-50">
                        <RefreshCw className="w-3 h-3" />{isOtpSending ? 'Sending...' : 'Resend OTP'}
                    </button>
                </div>
            </motion.div>
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // MAIN FORM (Step 1)
    // ═══════════════════════════════════════════════════════════════════════════
    return (
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onSubmit={handleSendOtp} className="glass neon-border rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Users className="w-5 h-5 text-background" />
                </div>
                <h2 className="font-display text-2xl font-bold">Registration Form</h2>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="teamName">Team Name *</Label>
                        <Input id="teamName" value={formData.teamName} onChange={(e) => setFormData({ ...formData, teamName: e.target.value })} placeholder="Enter team name" className={errors.teamName ? 'border-red-500' : ''} />
                        {errors.teamName && <p className="text-red-500 text-xs">{errors.teamName}</p>}
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="collegeName">College Name *</Label>
                            <select
                                id="collegeName"
                                value={formData.collegeName}
                                onChange={(e) => {
                                    setFormData({ ...formData, collegeName: e.target.value, customCollegeName: '' });
                                }}
                                className={`w-full h-10 px-3 rounded-md border bg-background text-foreground ${errors.collegeName ? 'border-red-500' : 'border-input'}`}
                            >
                                <option value="">Select College</option>
                                {colleges.map((college) => {
                                    const isDisabled = isRestrictedForNITSikkim && college === 'National Institute of Technology Sikkim';
                                    return (
                                        <option key={college} value={college} disabled={isDisabled}>
                                            {college} {isDisabled ? '(Closed for this event)' : ''}
                                        </option>
                                    );
                                })}
                                <option value="Other">Other (Please specify)</option>
                            </select>
                            {errors.collegeName && <p className="text-red-500 text-xs">{errors.collegeName}</p>}
                        </div>

                        {formData.collegeName === 'Other' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                                <Label htmlFor="customCollegeName">Specify Your College *</Label>
                                <Input
                                    id="customCollegeName"
                                    value={formData.customCollegeName}
                                    onChange={(e) => setFormData({ ...formData, customCollegeName: e.target.value })}
                                    placeholder="Enter your college name"
                                    className={errors.customCollegeName ? 'border-red-500' : ''}
                                />
                                {errors.customCollegeName && <p className="text-red-500 text-xs">{errors.customCollegeName}</p>}
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-display text-lg font-semibold text-primary">Team Leader Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="leaderName">Name *</Label>
                            <Input id="leaderName" value={formData.leaderName} onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })} placeholder="Leader's name" className={errors.leaderName ? 'border-red-500' : ''} />
                            {errors.leaderName && <p className="text-red-500 text-xs">{errors.leaderName}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="year">Year *</Label>
                            <select id="year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className={`w-full h-10 px-3 rounded-md border bg-background text-foreground ${errors.year ? 'border-red-500' : 'border-input'}`}>
                                <option value="">Select Year</option>
                                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                            </select>
                            {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="leaderEmail">Email *</Label>
                            <Input id="leaderEmail" type="email" value={formData.leaderEmail} onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })} placeholder="email@example.com" className={errors.leaderEmail ? 'border-red-500' : ''} />
                            {errors.leaderEmail && <p className="text-red-500 text-xs">{errors.leaderEmail}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="leaderPhone">Phone Number *</Label>
                            <Input id="leaderPhone" type="tel" value={formData.leaderPhone} onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })} placeholder="10-digit mobile number" className={errors.leaderPhone ? 'border-red-500' : ''} />
                            {errors.leaderPhone && <p className="text-red-500 text-xs">{errors.leaderPhone}</p>}
                        </div>
                    </div>
                </div>

                {maxTeamSize > 1 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                                <h3 className="font-display text-lg font-semibold text-primary">Team Members ({teamMembers.length}/{maxExtraMembers})</h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Team size: {minTeamSize}–{maxTeamSize} members (including leader)
                                    {requiredExtraMembers > 0 && (
                                        <span className="text-yellow-400 ml-1">• Min {requiredExtraMembers} member{requiredExtraMembers > 1 ? 's' : ''} required</span>
                                    )}
                                </p>
                            </div>
                            {teamMembers.length < maxExtraMembers && (
                                <Button type="button" variant="outline" size="sm" onClick={addTeamMember} className="flex items-center gap-2">
                                    <UserPlus className="w-4 h-4" />Add Member
                                </Button>
                            )}
                        </div>
                        {errors.teamSize && (
                            <p className="text-red-500 text-sm bg-red-500/10 rounded-lg px-4 py-2">{errors.teamSize}</p>
                        )}
                        {teamMembers.map((member, index) => (
                            <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-xl p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-sm font-semibold text-muted-foreground">
                                        Member {index + 1}
                                        {index < requiredExtraMembers && <span className="text-yellow-400 ml-1">(required)</span>}
                                    </span>
                                    {teamMembers.length > requiredExtraMembers && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeTeamMember(index)} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Name *</Label>
                                        <Input value={member.name} onChange={(e) => updateTeamMember(index, 'name', e.target.value)} placeholder="Member name" className={errors[`member${index}Name`] ? 'border-red-500' : ''} />
                                        {errors[`member${index}Name`] && <p className="text-red-500 text-xs">{errors[`member${index}Name`]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email *</Label>
                                        <Input type="email" value={member.email} onChange={(e) => updateTeamMember(index, 'email', e.target.value)} placeholder="email@example.com" className={errors[`member${index}Email`] ? 'border-red-500' : ''} />
                                        {errors[`member${index}Email`] && <p className="text-red-500 text-xs">{errors[`member${index}Email`]}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone *</Label>
                                        <Input type="tel" value={member.phone} onChange={(e) => updateTeamMember(index, 'phone', e.target.value)} placeholder="10-digit number" className={errors[`member${index}Phone`] ? 'border-red-500' : ''} />
                                        {errors[`member${index}Phone`] && <p className="text-red-500 text-xs">{errors[`member${index}Phone`]}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {teamMembers.length === 0 && minTeamSize <= 1 && (
                            <p className="text-muted-foreground text-sm text-center py-4">Click "Add Member" to add team members (optional for this event)</p>
                        )}
                    </div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" disabled={isOtpSending} className="w-full py-6 text-lg font-display font-semibold glow-cyan">
                        {isOtpSending ? (
                            <span className="flex items-center gap-2">
                                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                Sending OTP...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2"><Mail className="w-5 h-5" />Send OTP to Email</span>
                        )}
                    </Button>
                </motion.div>
            </div>
        </motion.form>
    );
};
