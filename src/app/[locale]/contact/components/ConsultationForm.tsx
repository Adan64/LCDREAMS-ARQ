'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  preferredContact: string;
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
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContact: 'email'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const projectTypes = [
    { value: '', label: 'Select Project Type' },
    { value: 'residential-new', label: 'New Residential Construction' },
    { value: 'residential-renovation', label: 'Residential Renovation' },
    { value: 'commercial', label: 'Commercial Space' },
    { value: 'interior', label: 'Interior Design' },
    { value: 'urban-planning', label: 'Urban Planning' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  const budgetRanges = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-100k', label: 'Under €100,000' },
    { value: '100k-250k', label: '€100,000 - €250,000' },
    { value: '250k-500k', label: '€250,000 - €500,000' },
    { value: '500k-1m', label: '€500,000 - €1,000,000' },
    { value: 'over-1m', label: 'Over €1,000,000' },
    { value: 'flexible', label: 'Flexible / To Be Discussed' }
  ];

  const timelines = [
    { value: '', label: 'Select Timeline' },
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: 'over-year', label: 'Over 1 Year' },
    { value: 'planning', label: 'Still Planning' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide project details';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide at least 20 characters of detail';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isHydrated || isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        preferredContact: 'email'
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-12 leading-tight text-center">
            Schedule Your Consultation
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours to discuss your project and schedule a detailed consultation.
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-8 p-4 bg-success/10 border border-success rounded-lg flex items-start space-x-3">
            <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body text-base font-body-semibold text-success mb-1">
                Consultation Request Received!
              </h3>
              <p className="font-body text-sm text-success/90">
                Thank you for your interest. We'll review your information and contact you within 24 hours to schedule your consultation.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-lcdream-dark-bg rounded-lg p-8 lg:p-12 shadow-subtle border border-lcdream-gold/20 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block font-body text-sm font-body-semibold text-lcdream-white mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-lcdream-gold/30 rounded-md font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth"
                placeholder="Juan García"
              />
              {errors.fullName && (
                <p className="mt-1 font-body text-sm text-error">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block font-body text-sm font-body-semibold text-lcdream-white mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-lcdream-gold/30 rounded-md font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth"
                placeholder="juan@ejemplo.es"
              />
              {errors.email && (
                <p className="mt-1 font-body text-sm text-error">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block font-body text-sm font-body-semibold text-lcdream-white mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-lcdream-gold/30 rounded-md font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth"
                placeholder="+34 912 345 678"
              />
              {errors.phone && (
                <p className="mt-1 font-body text-sm text-error">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="projectType" className="block font-body text-sm font-body-semibold text-lcdream-white mb-2">
                Project Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-lcdream-gold/30 rounded-md font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth"
              >
                {projectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-1 font-body text-sm text-error">{errors.projectType}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budget" className="block font-body text-sm font-body-semibold text-lcdream-white mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-lcdream-gold/30 rounded-md font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth"
              >
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className="block font-body text-sm font-body-semibold text-lcdream-white mb-2">
                Project Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-lcdream-gold/30 rounded-md font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth"
              >
                {timelines.map(time => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block font-body text-sm font-body-semibold text-lcdream-white mb-2">
              Project Details *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 bg-black border border-lcdream-gold/30 rounded-md font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth resize-none"
              placeholder="Please describe your project, including location, size, specific requirements, and any other relevant details..."
            />
            {errors.message && (
              <p className="mt-1 font-body text-sm text-error">{errors.message}</p>
            )}
          </div>

          <div>
            <label className="block font-body text-sm font-body-semibold text-lcdream-white mb-3">
              Preferred Contact Method
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="font-body text-base text-text-primary">Email</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === 'phone'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="font-body text-base text-text-primary">Phone</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="either"
                  checked={formData.preferredContact === 'either'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="font-body text-base text-text-primary">Either</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Schedule Consultation</span>
                  <Icon name="PaperAirplaneIcon" size={20} />
                </>
              )}
            </button>
          </div>

          <p className="font-body text-sm text-text-secondary">
            * Required fields. By submitting this form, you agree to our privacy policy and consent to be contacted regarding your project inquiry.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ConsultationForm;