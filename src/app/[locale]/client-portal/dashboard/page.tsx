'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MOCK_PROJECTS, MOCK_CLIENT } from '@/data/mock-client-portal';
import Header from '@/components/common/Header';
import AppIcon from '@/components/ui/AppIcon';
import { motion } from 'framer-motion';

export default function ClientDashboardPage() {
    const t = useTranslations('ClientPortal.dashboard');
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectId = searchParams.get('p');

    // In a real app, we would fetch this from API/Supabase using the ID
    const project = MOCK_PROJECTS.find(p => p.id === projectId);
    const client = MOCK_CLIENT; // Simplified for demo

    // Security check mock
    useEffect(() => {
        if (!projectId || !project) {
            router.push('/client-portal');
        }
    }, [projectId, project, router]);

    if (!project) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <main className="min-h-screen bg-muted/30 pb-20">
            <Header />

            {/* Project Header */}
            <div className="bg-lcdream-charcoal text-white pt-24 pb-12 px-6 lg:px-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={project.coverImage} alt="Project Cover" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-lcdream-charcoal via-lcdream-charcoal/80 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-lcdream-gold/20 text-lcdream-gold px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                <span className="w-2 h-2 rounded-full bg-lcdream-gold animate-pulse" />
                                {t(`status.${project.status === 'Construcción' ? 'current' : 'completed'}`)}
                            </div>
                            <h1 className="font-headline text-3xl md:text-5xl font-headline-bold mb-2">
                                {project.title}
                            </h1>
                            <p className="text-lcdream-gray-light flex items-center gap-2">
                                <AppIcon name="MapPinIcon" className="w-4 h-4" />
                                {project.address}
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl min-w-[280px]">
                            <p className="text-lcdream-gray text-sm mb-2">{t('progress')}</p>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-headline-bold text-lcdream-gold">{project.progress}%</span>
                                <span className="text-sm text-lcdream-gray mb-1.5">completado</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${project.progress}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-lcdream-gold"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Left Column: Timeline & Photos */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Timeline */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="font-headline text-xl font-headline-bold mb-6 flex items-center gap-2 text-lcdream-charcoal">
                                <AppIcon name="ClockIcon" className="w-5 h-5 text-lcdream-gold" />
                                {t('phases')}
                            </h2>
                            <div className="space-y-6">
                                {project.phases.map((phase, index) => (
                                    <div key={phase.id} className="flex gap-4 relative">
                                        {/* Activity Line */}
                                        {index !== project.phases.length - 1 && (
                                            <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-gray-100" />
                                        )}

                                        {/* Status Dot */}
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${phase.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            phase.status === 'current' ? 'bg-lcdream-gold text-white ring-4 ring-lcdream-gold/20' :
                                                'bg-gray-100 text-gray-400'
                                            }`}>
                                            {phase.status === 'completed' ? (
                                                <AppIcon name="CheckIcon" className="w-4 h-4" />
                                            ) : (
                                                <span className="text-xs font-bold">{index + 1}</span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pt-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className={`font-semibold ${phase.status === 'current' ? 'text-lcdream-charcoal' : 'text-gray-600'
                                                    }`}>
                                                    {phase.name}
                                                </h3>
                                                {phase.date && (
                                                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                                        {phase.date}
                                                    </span>
                                                )}
                                            </div>
                                            {phase.description && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {phase.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Photo Gallery */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-headline text-xl font-headline-bold flex items-center gap-2 text-lcdream-charcoal">
                                    <AppIcon name="CameraIcon" className="w-5 h-5 text-lcdream-gold" />
                                    {t('gallery')}
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {project.gallery.map((photo) => (
                                    <div key={photo.id} className="group relative aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
                                        <img
                                            src={photo.url}
                                            alt={photo.caption}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <div>
                                                <p className="text-white text-sm font-semibold">{photo.caption}</p>
                                                <p className="text-white/70 text-xs">{photo.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Docs & Info */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Documents */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="font-headline text-xl font-headline-bold mb-6 flex items-center gap-2 text-lcdream-charcoal">
                                <AppIcon name="DocumentTextIcon" className="w-5 h-5 text-lcdream-gold" />
                                {t('documents')}
                            </h2>
                            <div className="space-y-4">
                                {project.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-lcdream-gold/30 hover:bg-orange-50/30 transition-all group cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                                            <span className="text-xs font-bold uppercase">{doc.type}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-700 truncate group-hover:text-lcdream-charcoal">{doc.title}</p>
                                            <p className="text-xs text-gray-400">{doc.date} • {doc.size}</p>
                                        </div>
                                        <AppIcon name="ArrowDownTrayIcon" className="w-4 h-4 text-gray-300 group-hover:text-lcdream-gold" />
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-3 px-4 text-sm font-cta-semibold text-white bg-lcdream-charcoal rounded-lg hover:bg-black transition-all shadow-md transform hover:scale-[1.02] active:scale-95">
                                {t('download')}
                            </button>
                        </motion.div>

                        {/* Client Card */}
                        <motion.div variants={itemVariants} className="bg-lcdream-charcoal p-8 rounded-xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-lcdream-gold flex items-center justify-center font-bold text-lcdream-charcoal text-xl">
                                    {client.avatar}
                                </div>
                                <div>
                                    <p className="text-sm text-lcdream-gray-light">Área Privada</p>
                                    <p className="font-semibold">{client.name}</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm text-lcdream-gray-light font-mono">
                                <div className="flex justify-between">
                                    <span>Proyecto:</span>
                                    <span className="text-white">{project.code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Inicio:</span>
                                    <span className="text-white">{project.startDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Entrega Est.:</span>
                                    <span className="text-white">{project.estimatedCompletion}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
