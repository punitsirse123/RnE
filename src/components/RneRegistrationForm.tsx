
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface RneRegistrationFormProps {
  onSubmit: () => void;
}

const RneRegistrationForm = ({ onSubmit }: RneRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('rne_registrations')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          linkedin: formData.linkedin
        }]);

      if (error) throw error;
      
      // Clear form and notify parent
      setFormData({
        name: '',
        email: '',
        phone: '',
        linkedin: ''
      });
      onSubmit();
    } catch (error) {
      console.error('Error submitting registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Register for RnE</h2>
        <p className="text-gray-600">Please fill in your details</p>
      </div>

      <div className="form-field">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div className="form-field">
        <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
        <Input
          id="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          className="input-base"
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </Button>
      </div>
    </motion.form>
  );
};

export default RneRegistrationForm;
