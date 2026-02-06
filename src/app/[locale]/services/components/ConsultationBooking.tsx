'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';



interface ConsultationBookingProps {
  availableDates: string[];
}

const ConsultationBooking = ({ availableDates }: ConsultationBookingProps) => {
  const t = useTranslations('Services.booking');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    date: '',
    time: '10:00',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        date: '',
        time: '10:00',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const projectTypes = [
    { value: 'single-family', label: t('form.projectTypes.singleFamily') },
    { value: 'reform', label: t('form.projectTypes.comprehensiveReform') },
    { value: 'interior', label: t('form.projectTypes.interiorDesign') },
    { value: 'commercial', label: t('form.projectTypes.commercialProject') },
    { value: 'urban', label: t('form.projectTypes.urbanPlanning') },
    { value: 'other', label: t('form.projectTypes.other') }
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'
  ];

  return (
    <div className="bg-card rounded-lg p-8 shadow-architectural border border-border/50 relative overflow-hidden">
      {isSuccess && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckIcon" size={32} className="text-accent-foreground" />
            </div>
            <h3 className="font-headline text-2xl font-headline-bold text-card-foreground mb-2">
              {t('success.title')}
            </h3>
            <p className="font-body text-muted-foreground">
              {t('success.message')}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-accent/10 rounded-lg">
          <Icon name="CalendarDaysIcon" size={24} className="text-accent" />
        </div>
        <h3 className="font-headline text-2xl font-headline-bold text-card-foreground">
          {t('title')}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-body font-body-semibold text-card-foreground mb-1">
            {t('form.name')}
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-card-foreground placeholder:text-muted-foreground/50"
            placeholder={t('form.namePlaceholder')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-body-semibold text-card-foreground mb-1">
              {t('form.email')}
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-card-foreground placeholder:text-muted-foreground/50"
              placeholder={t('form.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-body font-body-semibold text-card-foreground mb-1">
              {t('form.phone')}
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-card-foreground placeholder:text-muted-foreground/50"
              placeholder={t('form.phonePlaceholder')}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-card-foreground mb-1">
            {t('form.projectType')}
          </label>
          <div className="relative">
            <select
              required
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none text-card-foreground"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            >
              <option value="">{t('form.selectOption')}</option>
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <Icon name="ChevronDownIcon" size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-body-semibold text-card-foreground mb-1">
              {t('form.date')}
            </label>
            <div className="relative">
              <select
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none text-card-foreground"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              >
                <option value="">{t('form.selectOption')}</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              <Icon name="CalendarIcon" size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-body font-body-semibold text-card-foreground mb-1">
              {t('form.time')}
            </label>
            <div className="relative">
              <select
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none text-card-foreground"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <Icon name="ClockIcon" size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-card-foreground mb-1">
            {t('form.message')}
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all h-24 text-card-foreground placeholder:text-muted-foreground/50 resize-none"
            placeholder={t('form.messagePlaceholder')}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-cta font-cta-semibold hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>{t('form.processing')}</span>
            </>
          ) : (
            <span>{t('form.submit')}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ConsultationBooking;