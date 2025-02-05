
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface RnEFormProps {
  onSubmit: () => void;
}

const RnEForm = ({ onSubmit }: RnEFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    uniqueId: '',
    businessName: '',
    businessWebsite: '',
    contactName: '',
    contactEmail: '',
    contactDesignation: '',
    note: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('rne_submissions')
        .insert([
          {
            unique_id: formData.uniqueId,
            business_name: formData.businessName,
            business_website: formData.businessWebsite,
            contact_name: formData.contactName,
            contact_email: formData.contactEmail,
            contact_designation: formData.contactDesignation,
            note: formData.note
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error("This Unique ID is already in use. Please use a different one.");
        }
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your RnE form has been submitted successfully.",
      });
      
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return (
    <motion.form
      {...formAnimation}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">RnE Form</h2>
        <p className="text-gray-600">Please fill in your business details</p>
      </div>

      <div className="form-field">
        <Label htmlFor="uniqueId">Unique ID</Label>
        <Input
          id="uniqueId"
          value={formData.uniqueId}
          onChange={(e) => setFormData({ ...formData, uniqueId: e.target.value })}
          className="input-base"
          required
          aria-describedby="uniqueId-description"
        />
        <p id="uniqueId-description" className="text-sm text-gray-500 mt-1">
          This ID must be unique and will be used to identify your submission
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-field">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="input-base"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="businessWebsite">Business Website</Label>
          <Input
            id="businessWebsite"
            type="url"
            value={formData.businessWebsite}
            onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })}
            className="input-base"
            required
            placeholder="https://"
          />
        </div>

        <div className="form-field">
          <Label htmlFor="contactName">Contact Person Name</Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            className="input-base"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="contactEmail">Contact Person Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            className="input-base"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <Label htmlFor="contactDesignation">Contact Person Designation</Label>
        <Input
          id="contactDesignation"
          value={formData.contactDesignation}
          onChange={(e) => setFormData({ ...formData, contactDesignation: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="note">Note for us</Label>
        <Textarea
          id="note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="input-base min-h-[100px]"
          placeholder="Describe the challenges the brand is facing"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Form"}
        </Button>
      </div>
    </motion.form>
  );
};

export default RnEForm;
