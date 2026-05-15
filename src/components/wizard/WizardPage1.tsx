import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../../store/useWizardStore';
import { ALL_BUSINESS_CASES } from '../../content/businessCases';
import { BUSINESS_CASE_TONE } from '../../utils/formatters';
import { getIconComponent } from '../../utils/iconHelper';
import { PageLayout, PageHeader, FooterActions, StandardButton } from '../layout';

export function WizardPage1() {
  const navigate = useNavigate();
  const {
    selectedObjectives,
    setSelectedObjectives,
    team11DemoOnly,
    setTeam11DemoOnly,
    team11EventIds,
  } = useWizardStore();

  const toggleObjective = (objectiveId: string) => {
    setSelectedObjectives(
      selectedObjectives.includes(objectiveId as any)
        ? selectedObjectives.filter(o => o !== objectiveId)
        : [...selectedObjectives, objectiveId as any]
    );
  };

  const handleSubmit = () => {
    if (!team11DemoOnly && selectedObjectives.length === 0) {
      alert('Please select at least one business objective');
      return;
    }
    navigate('/wizard/step2');
  };

  return (
    <PageLayout
      header={
        <PageHeader
          stepLabel="Step 1 of 3"
          title="What are your business objectives?"
          description="Select key objectives to see how customers' life moments align with your strategy."
        />
      }
      footer={
        <FooterActions>
          <StandardButton
            variant="primary"
            size="lg"
            fullWidth
            disabled={!team11DemoOnly && selectedObjectives.length === 0}
            onClick={handleSubmit}
          >
            Continue to lifecycle
          </StandardButton>
        </FooterActions>
      }
    >
        {/* Objectives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-4">
          {ALL_BUSINESS_CASES.map((bc) => {
            const isSelected = selectedObjectives.includes(bc.id);
            const tone = BUSINESS_CASE_TONE[bc.id];
            
            return (
              <button
                key={bc.id}
                onClick={() => toggleObjective(bc.id)}
                className={`p-3 rounded-lg transition-all duration-200 border-2 text-left ${
                  isSelected
                    ? `${tone.bg} ${tone.text} border-current shadow-lg ring-2 ring-current ring-offset-2`
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className={`text-lg flex-shrink-0 ${isSelected ? tone.text : 'text-slate-400'}`}>
                    {getIconComponent(bc.icon)}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">{bc.label}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${isSelected ? 'opacity-90' : 'text-slate-500'}`}>
                  {bc.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selection Summary */}
        <div className="mb-3 p-3 bg-white rounded border border-amber-200 min-h-12 transition-opacity duration-200" style={{ opacity: selectedObjectives.length > 0 ? 1 : 0.4 }}>
          <p className="text-sm text-slate-600 mb-2">
            <strong>Selected {selectedObjectives.length}:</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedObjectives.length > 0 ? (
              selectedObjectives.map((oid) => {
                const bc = ALL_BUSINESS_CASES.find(b => b.id === oid);
                const tone = BUSINESS_CASE_TONE[oid];
                return (
                  <div
                    key={oid}
                    className={`px-3 py-1 rounded text-sm font-medium ${tone.bg} ${tone.text}`}
                  >
                    {bc?.label}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400">Select objectives above to see them here</p>
            )}
          </div>
        </div>

        {/* Team 11 Demo Preset */}
        <div className={`mb-3 p-3 rounded border-2 transition-all ${team11DemoOnly ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Team 11 Demo Preset</h3>
              <p className="text-xs text-slate-600 mt-1">
                Select only 4 key moments and grey out all other life events in Step 2.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Event IDs: {team11EventIds.join(', ')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTeam11DemoOnly(!team11DemoOnly)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${team11DemoOnly ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              {team11DemoOnly ? 'Enabled' : 'Enable'}
            </button>
          </div>
        </div>
    </PageLayout>
  );
}
