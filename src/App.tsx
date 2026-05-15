import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WizardPage1 } from './components/wizard/WizardPage1';
import { WizardPage2 } from './components/wizard/WizardPage2';
import { WizardPage3 } from './components/wizard/WizardPage3';
import { MarketingHomePage } from './components/marketing/MarketingHomePage';
import { DemoSignupPage } from './components/marketing/DemoSignupPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingHomePage />} />
        <Route path="/signup" element={<DemoSignupPage />} />
        <Route path="/wizard" element={<Navigate to="/wizard/step1" replace />} />
        <Route path="/wizard/step1" element={<WizardPage1 />} />
        <Route path="/wizard/step2" element={<WizardPage2 />} />
        <Route path="/wizard/step3" element={<WizardPage3 />} />
        <Route path="/wizard/step3/stage/:stageIndex/insight/:insightIndex" element={<WizardPage3 />} />
      </Routes>
    </BrowserRouter>
  );
}
