import { useWizardStore } from '../../store/useWizardStore';
import { WizardPage1 } from './WizardPage1';
import { WizardPage2 } from './WizardPage2';
import { WizardPage3 } from './WizardPage3';

export function WizardFlow() {
  const page = useWizardStore((s) => s.page);

  return (
    <>
      {page === 1 && <WizardPage1 />}
      {page === 2 && <WizardPage2 />}
      {page === 3 && <WizardPage3 />}
    </>
  );
}
