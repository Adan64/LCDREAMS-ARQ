'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
  preferredContact: 'email' | 'phone' | 'either';
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}
interface ConsultationFormProps {
  className?: string;
}

const ConsultationForm = ({ className = '' }: ConsultationFormProps) => {
  const t = useTranslations('Contact.form');
  const [isHydrated, setIsHydrated] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    details: '',
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const projectTypes = [
    { value: 'residential-new', label: t('projectTypes.residential-new') },
    { value: 'residential-renovation', label: t('projectTypes.residential-renovation') },
    { value: 'commercial', label: t('projectTypes.commercial') },
    { value: 'interior', label: t('projectTypes.interior') },
    { value: 'urban-planning', label: t('projectTypes.urban-planning') },
    { value: 'consultation', label: t('projectTypes.consultation') }
  ];

  const budgetRanges = [
    { value: 'under-100k', label: t('budgetRanges.under-100k') },
    { value: '100k-250k', label: t('budgetRanges.100k-250k') },
    { value: '250k-500k', label: t('budgetRanges.250k-500k') },
    { value: '500k-1m', label: t('budgetRanges.500k-1m') },
    { value: 'over-1m', label: t('budgetRanges.over-1m') },
    { value: 'flexible', label: t('budgetRanges.flexible') }
  ];

  const timelines = [
    { value: 'immediate', label: t('timelines.immediate') },
    { value: '1-3-months', label: t('timelines.1-3-months') },
    { value: '3-6-months', label: t('timelines.3-6-months') },
    { value: '6-12-months', label: t('timelines.6-12-months') },
    { value: 'over-year', label: t('timelines.over-year') },
    { value: 'planning', label: t('timelines.planning') }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) newErrors.name = t('errors.name');
    if (!formState.email.trim()) {
      newErrors.email = t('errors.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    if (!formState.phone.trim()) {
      newErrors.phone = t('errors.phone');
    } else if (!/^[+\d\s-]{9,}$/.test(formState.phone)) {
      newErrors.phone = t('errors.phoneInvalid');
    }

    if (!formState.projectType) newErrors.projectType = t('errors.projectType');

    if (!formState.details.trim()) {
      newErrors.details = t('errors.details');
    } else if (formState.details.trim().length < 20) {
      newErrors.details = t('errors.detailsLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHydrated) return;

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          timeline: '',
          details: '',
          preferredContact: 'email'
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev: FormState) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isSuccess) {
    return (
      <section className={`py-20 lg:py-32 bg-white ${className}`}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircleIcon" size={40} className="text-green-600" />
          </div>
          <h2 className="font-headline text-3xl font-headline-bold text-primary mb-4">
            {t('successTitle')}
          </h2>
          <p className="font-body text-lg text-text-secondary mb-8">
            {t('successDesc')}
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="inline-flex items-center px-6 py-3 font-cta text-sm font-cta-semibold text-white bg-primary rounded-md transition-smooth hover:bg-primary/90"
          >
            {t('form.submit')}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 lg:py-32 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-primary mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="font-body text-xl text-text-secondary leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="bg-muted p-8 rounded-lg border border-border">
              <h3 className="font-headline text-lg font-headline-semibold text-primary mb-4">
                {t('location.addressTitle')}
              </h3>
              <p className="font-body text-base text-text-secondary mb-6">
                Calle de Serrano 45, 3rd Floor<br />
                28001 Madrid, Spain
              </p>

              <h3 className="font-headline text-lg font-headline-semibold text-primary mb-4">
                {t('location.hoursTitle')}
              </h3>
              <p className="font-body text-base text-text-secondary">
                Monday - Friday: 9:00 - 18:00<br />
                Saturday: By Appointment
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-body text-sm font-body-medium text-primary">
                    {t('fields.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-input focus:ring-accent/20'} bg-background focus:outline-none focus:ring-2 focus:border-accent transition-all`}
                    placeholder={t('fields.namePlaceholder')}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-body text-sm font-body-medium text-primary">
                    {t('fields.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-input focus:ring-accent/20'} bg-background focus:outline-none focus:ring-2 focus:border-accent transition-all`}
                    placeholder={t('fields.phonePlaceholder')}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-body text-sm font-body-medium text-primary">
                  {t('fields.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-input focus:ring-accent/20'} bg-background focus:outline-none focus:ring-2 focus:border-accent transition-all`}
                  placeholder={t('fields.emailPlaceholder')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="block font-body text-sm font-body-medium text-primary">
                    {t('fields.projectType')}
                  </label>
                  <div className="relative">
                    <select
                      id="projectType"
                      name="projectType"
                      value={formState.projectType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border ${errors.projectType ? 'border-red-500 focus:ring-red-200' : 'border-input focus:ring-accent/20'} bg-background focus:outline-none focus:ring-2 focus:border-accent transition-all appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>{t('fields.selectProject')}</option>
                      {projectTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    <Icon name="ChevronDownIcon" size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" />
                  </div>
                  {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="block font-body text-sm font-body-medium text-primary">
                    {t('fields.budget')}
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>{t('fields.selectBudget')}</option>
                      {budgetRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                    <Icon name="ChevronDownIcon" size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="timeline" className="block font-body text-sm font-body-medium text-primary">
                  {t('fields.timeline')}
                </label>
                <div className="relative">
                  <select
                    id="timeline"
                    name="timeline"
                    value={formState.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>{t('fields.selectTimeline')}</option>
                    {timelines.map(timeline => (
                      <option key={timeline.value} value={timeline.value}>{timeline.label}</option>
                    ))}
                  </select>
                  <Icon name="ChevronDownIcon" size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="block font-body text-sm font-body-medium text-primary">
                  {t('fields.details')}
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formState.details}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-md border ${errors.details ? 'border-red-500 focus:ring-red-200' : 'border-input focus:ring-accent/20'} bg-background focus:outline-none focus:ring-2 focus:border-accent transition-all resize-y`}
                  placeholder={t('fields.detailsPlaceholder')}
                />
                {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
              </div>

              <div className="space-y-2">
                <label className="block font-body text-sm font-body-medium text-primary mb-2">
                  {t('fields.preferredContact')}
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formState.preferredContact === 'email'}
                      onChange={handleChange}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent cursor-pointer"
                    />
                    <span className="ml-2 font-body text-sm text-text-secondary group-hover:text-primary transition-colors">
                      {t('fields.emailOption')}
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formState.preferredContact === 'phone'}
                      onChange={handleChange}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent cursor-pointer"
                    />
                    <span className="ml-2 font-body text-sm text-text-secondary group-hover:text-primary transition-colors">
                      {t('fields.phoneOption')}
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="either"
                      checked={formState.preferredContact === 'either'}
                      onChange={handleChange}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent cursor-pointer"
                    />
                    <span className="ml-2 font-body text-sm text-text-secondary group-hover:text-primary transition-colors">
                      {t('fields.eitherOption')}
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isHydrated}
                  className="w-full inline-flex items-center justify-center px-6 py-4 font-cta text-base font-cta-semibold text-accent-foreground bg-accent rounded-md transition-smooth hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-architectural"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      {t('submit')}
                      <Icon name="ArrowRightIcon" size={20} className="ml-2" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-center font-body text-xs text-text-secondary">
                  {t('disclaimer')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;