'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface OfficeInfo {
  title: string;
  icon: string;
  details: string[];
}

interface OfficeLocationProps {
  className?: string;
}

const OfficeLocation = ({ className = '' }: OfficeLocationProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const officeInfo: OfficeInfo[] = [
  {
    title: 'Address',
    icon: 'MapPinIcon',
    details: [
    'Calle de Serrano 45, 3rd Floor',
    '28001 Madrid, Spain']

  },
  {
    title: 'Office Hours',
    icon: 'ClockIcon',
    details: [
    'Monday - Friday: 9:00 - 18:00',
    'Saturday: 10:00 - 14:00 (By Appointment)',
    'Sunday: Closed']

  },
  {
    title: 'Parking & Access',
    icon: 'TruckIcon',
    details: [
    'Street parking available',
    'Public parking: 2 min walk',
    'Metro: Serrano Station (Line 4)',
    'Wheelchair accessible entrance']

  },
  {
    title: 'What to Expect',
    icon: 'HomeModernIcon',
    details: [
    'Modern design studio environment',
    'Private consultation rooms',
    'Material & finish samples library',
    'Coffee & refreshments provided']

  }];


  const handleVirtualTourClick = () => {
    if (!isHydrated) return;
    setShowVirtualTour(!showVirtualTour);
  };

  return (
    <section className={`py-16 lg:py-24 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-headline-bold text-primary mb-4">
            Visit Our Studio
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Experience our design studio in the heart of Madrid. Schedule an in-person consultation to discuss your project in our inspiring creative space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div className="space-y-6">
            {officeInfo.map((info, index) =>
            <div key={index} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={info.icon as any} size={20} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline text-lg font-headline-semibold text-primary mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) =>
                    <p key={idx} className="font-body text-sm text-text-secondary">
                          {detail}
                        </p>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg overflow-hidden border border-border">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="LCDREAM.ARQ Studio Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=40.4268,-3.6874&z=15&output=embed"
                  className="border-0" />

              </div>
              <div className="p-4 bg-muted">
                <a
                  href="https://maps.google.com/?q=40.4268,-3.6874"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-body text-sm font-body-semibold text-accent hover:text-accent/80 transition-smooth">

                  <Icon name="MapIcon" size={16} className="mr-2" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden border border-border">
              <div className="relative aspect-video w-full overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_14bdd380d-1765352497190.png"
                  alt="Modern architectural studio interior with white walls, wooden floors, large windows, design materials on display tables, and contemporary furniture"
                  className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="font-headline text-xl font-headline-semibold text-primary-foreground mb-2">
                      Studio Virtual Tour
                    </h3>
                    <p className="font-body text-sm text-primary-foreground/90 mb-4">
                      Explore our design studio from anywhere
                    </p>
                    <button
                      onClick={handleVirtualTourClick}
                      disabled={!isHydrated}
                      className="inline-flex items-center px-4 py-2 font-cta text-sm font-cta-semibold text-primary bg-primary-foreground rounded-md transition-smooth hover:bg-primary-foreground/90 disabled:opacity-50">

                      <Icon name="PlayIcon" size={16} className="mr-2" />
                      {showVirtualTour ? 'Close Tour' : 'Start Virtual Tour'}
                    </button>
                  </div>
                </div>
              </div>
              
              {showVirtualTour &&
              <div className="p-6 bg-muted border-t border-border">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="CameraIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-body text-sm font-body-semibold text-primary mb-1">
                          Reception & Consultation Area
                        </h4>
                        <p className="font-body text-sm text-text-secondary">
                          Welcoming space with comfortable seating and our latest project displays
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="CameraIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-body text-sm font-body-semibold text-primary mb-1">
                          Materials Library
                        </h4>
                        <p className="font-body text-sm text-text-secondary">
                          Extensive collection of finishes, materials, and samples for your selection
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="CameraIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-body text-sm font-body-semibold text-primary mb-1">
                          Design Studio
                        </h4>
                        <p className="font-body text-sm text-text-secondary">
                          Creative workspace where our team brings architectural visions to life
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div className="bg-accent/5 rounded-lg p-8 border border-accent/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="CalendarDaysIcon" size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="font-headline text-xl font-headline-semibold text-primary mb-2">
                  Schedule an In-Person Consultation
                </h3>
                <p className="font-body text-base text-text-secondary">
                  Visit our studio to discuss your project in detail, review materials, and explore design possibilities with our team.
                </p>
              </div>
            </div>
            <a
              href="tel:+34912345678"
              className="inline-flex items-center px-6 py-3 font-cta text-sm font-cta-semibold text-accent-foreground bg-accent rounded-md transition-smooth hover:bg-accent/90 hover:shadow-architectural whitespace-nowrap">

              <Icon name="PhoneIcon" size={18} className="mr-2" />
              Call to Schedule
            </a>
          </div>
        </div>
      </div>
    </section>);

};

export default OfficeLocation;