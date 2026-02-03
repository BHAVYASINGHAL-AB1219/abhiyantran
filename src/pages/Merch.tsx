import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ShoppingBag, ExternalLink } from 'lucide-react';

const merchItems = [
    {
        id: 1,
        name: 'Abhiyantran Classic T-Shirt',
        description: 'Premium cotton t-shirt with the official Abhiyantran logo',
        price: '₹499',
        category: 'T-Shirt',
        color: 'from-cyan-400 to-blue-500',
        externalUrl: 'https://example.com/merch/tshirt-classic', // Update with actual URL
    },
    {
        id: 2,
        name: 'Tech Vibes T-Shirt',
        description: 'Trendy tech-themed design for the modern coder',
        price: '₹549',
        category: 'T-Shirt',
        color: 'from-purple-400 to-pink-500',
        externalUrl: 'https://example.com/merch/tshirt-tech', // Update with actual URL
    },
    {
        id: 3,
        name: 'Abhiyantran Premium Hoodie',
        description: 'Cozy hoodie with embroidered logo, perfect for coding sessions',
        price: '₹1,299',
        category: 'Hoodie',
        color: 'from-orange-400 to-red-500',
        externalUrl: 'https://example.com/merch/hoodie-premium', // Update with actual URL
    },
    {
        id: 4,
        name: 'Developer Hoodie',
        description: 'Sleek black hoodie with minimalist developer design',
        price: '₹1,199',
        category: 'Hoodie',
        color: 'from-green-400 to-teal-500',
        externalUrl: 'https://example.com/merch/hoodie-developer', // Update with actual URL
    },
    {
        id: 5,
        name: 'Limited Edition Event T-Shirt',
        description: 'Exclusive Abhiyantran 2026 commemorative t-shirt',
        price: '₹599',
        category: 'T-Shirt',
        color: 'from-yellow-400 to-orange-500',
        externalUrl: 'https://example.com/merch/tshirt-limited', // Update with actual URL
    },
    {
        id: 6,
        name: 'NIT Sikkim Zip Hoodie',
        description: 'Premium zip-up hoodie with NIT Sikkim branding',
        price: '₹1,499',
        category: 'Hoodie',
        color: 'from-indigo-400 to-purple-500',
        externalUrl: 'https://example.com/merch/hoodie-zip', // Update with actual URL
    },
];

const Merch = () => {
    const handleBuyClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Layout>
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary font-display text-sm uppercase tracking-wider">
                            Official Store
                        </span>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mt-2 mb-4">
                            Buy <span className="text-gradient">Merch</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Get your hands on exclusive Abhiyantran merchandise. Wear your tech pride!
                        </p>
                    </motion.div>

                    {/* Merch Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {merchItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <div className="glass-hover rounded-2xl overflow-hidden h-full flex flex-col">
                                    {/* Product Image Placeholder */}
                                    <div className={`aspect-square bg-gradient-to-br ${item.color} relative overflow-hidden`}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <ShoppingBag className="w-16 h-16 text-white/80 mx-auto mb-2" />
                                                <span className="text-white/90 font-display text-lg font-semibold">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleBuyClick(item.externalUrl)}
                                                className="px-6 py-3 rounded-lg bg-white text-black font-display font-semibold flex items-center gap-2"
                                            >
                                                Buy Now
                                                <ExternalLink className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-4 flex-grow">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-display text-2xl font-bold text-gradient">
                                                {item.price}
                                            </span>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleBuyClick(item.externalUrl)}
                                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display text-sm font-semibold flex items-center gap-2 glow-cyan"
                                            >
                                                Buy
                                                <ExternalLink className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16"
                    >
                        <div className="glass neon-border rounded-3xl p-8 md:p-12 text-center">
                            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                                How to <span className="text-gradient">Purchase</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                                Click on any item's "Buy" button to be redirected to our official merchandise partner's website.
                                Complete your purchase securely through their platform.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    <span>Premium Quality</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                    <span>Pan-India Delivery</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default Merch;
