
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import InitialChoice from '@/components/InitialChoice';
import RneRegistrationForm from '@/components/RneRegistrationForm';
import LRForm from '@/components/LRForm';
import RnEForm from '@/components/RnEForm';

type FormType = 'initial' | 'rne-registration' | 'lr' | 'rne';

const Index = () => {
  const [currentForm, setCurrentForm] = useState<FormType>('initial');
  const [formType, setFormType] = useState<'L&R' | 'RnE' | null>(null);
  const { toast } = useToast();

  const handleInitialChoice = (choice: 'register' | 'submit') => {
    if (choice === 'register') {
      setCurrentForm('rne-registration');
    } else {
      setFormType(null);
      setCurrentForm('lr');
    }
  };

  const handleLRTypeChoice = (type: 'L&R' | 'RnE') => {
    setFormType(type);
    if (type === 'RnE') {
      setCurrentForm('rne');
    }
  };

  const handleFormSubmit = () => {
    toast({
      title: "Success!",
      description: "Your form has been submitted successfully.",
    });
    setCurrentForm('initial');
    setFormType(null);
  };

  const handleBack = () => {
    if (currentForm === 'rne') {
      setCurrentForm('lr');
      setFormType(null);
    } else if (currentForm === 'lr' || currentForm === 'rne-registration') {
      setCurrentForm('initial');
      setFormType(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            {currentForm !== 'initial' && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          
          <div className="form-container">
            {currentForm === 'initial' && (
              <InitialChoice onChoiceSelect={handleInitialChoice} />
            )}
            {currentForm === 'rne-registration' && (
              <RneRegistrationForm onSubmit={handleFormSubmit} />
            )}
            {currentForm === 'lr' && (
              <LRForm 
                onTypeSelect={handleLRTypeChoice} 
                selectedType={formType}
                onSubmit={handleFormSubmit}
              />
            )}
            {currentForm === 'rne' && (
              <RnEForm onSubmit={handleFormSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
