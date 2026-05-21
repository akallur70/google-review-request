import { notFound } from 'next/navigation';
import ReviewLandingClient from './ReviewLandingClient';

const CLINIC_NAMES: Record<string, string> = {
  SVHW:    'Saishree Vitalife Hospital Wakad',
  SVHA:    'Saishree Vitalife Aundh',
  BORSE:   'Saishree Vitalife Borse',
  BAVDHAN: 'Saishree Vitalife Bavdhan',
  WAKAD:   'Saishree Vitalife Wakad',
  PS:      'Saishree Vitalife Pimple Saudagar',
  BANER:   'Saishree Vitalife Baner',
  PASHAN:  'Saishree Vitalife Pashan',
};

type Params = { params: Promise<{ clinic: string }> };

export default async function ReviewLandingPage({ params }: Params) {
  const { clinic: clinicRaw } = await params;
  const clinic     = clinicRaw.toUpperCase();
  const clinicName = CLINIC_NAMES[clinic];
  const reviewUrl  = process.env[`CLINIC_${clinic}_REVIEW`];

  if (!clinicName || !reviewUrl) notFound();

  return (
    <ReviewLandingClient
      clinicName={clinicName}
      reviewUrl={reviewUrl}
    />
  );
}
