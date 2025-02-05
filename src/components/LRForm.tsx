
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from './FileUpload';
import { supabase } from "@/integrations/supabase/client";

interface LRFormProps {
  onTypeSelect: (type: 'L&R' | 'RnE') => void;
  selectedType: 'L&R' | 'RnE' | null;
  onSubmit: () => void;
}

const LRForm = ({ onTypeSelect, selectedType, onSubmit }: LRFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brandName: '',
    brandWebsite: '',
    contactName: '',
    contactEmail: '',
    contactDesignation: '',
    note: '',
    country: '',
    currency: '',
    paymentMethod: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    paypalEmail: '',
    filePath: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('lr_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          brand_name: formData.brandName,
          brand_website: formData.brandWebsite,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_designation: formData.contactDesignation,
          note: formData.note,
          country: formData.country,
          currency: formData.currency,
          payment_method: formData.paymentMethod,
          bank_name: formData.bankName,
          bank_account_number: formData.bankAccountNumber,
          ifsc_code: formData.ifscCode,
          paypal_email: formData.paypalEmail,
          file_path: formData.filePath,
        }]);

      if (error) throw error;
      
      // Clear form and notify parent
      setFormData({
        name: '',
        email: '',
        phone: '',
        brandName: '',
        brandWebsite: '',
        contactName: '',
        contactEmail: '',
        contactDesignation: '',
        note: '',
        country: '',
        currency: '',
        paymentMethod: '',
        bankName: '',
        bankAccountNumber: '',
        ifscCode: '',
        paypalEmail: '',
        filePath: '',
      });
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUploaded = (filePath: string) => {
    setFormData(prev => ({ ...prev, filePath }));
  };

  if (!selectedType) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Select Form Type</h2>
          <p className="text-gray-600">Choose the type of form you want to submit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="option-card"
            onClick={() => onTypeSelect('L&R')}
          >
            <h3 className="text-xl font-medium mb-2">L&R Form</h3>
            <p className="text-gray-600 text-sm">Submit L&R documentation</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="option-card"
            onClick={() => onTypeSelect('RnE')}
          >
            <h3 className="text-xl font-medium mb-2">RnE Form</h3>
            <p className="text-gray-600 text-sm">Submit RnE documentation</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-8 relative"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">L&R Form</h2>
        <p className="text-gray-600">Please fill in the required information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="form-field">
          <Label htmlFor="name">Your Name</Label>
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
          <Label htmlFor="brandName">Brand Name</Label>
          <Input
            id="brandName"
            value={formData.brandName}
            onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
            className="input-base"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="currency">Currency</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, currency: value })}>
            <SelectTrigger className="input-base bg-white border border-gray-200 shadow-sm">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="form-field">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
            <SelectTrigger className="input-base bg-white border border-gray-200 shadow-sm">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white border border-gray-200 shadow-lg z-50">
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="PayPal">PayPal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="form-field">
        <Label htmlFor="file-upload">Excel or CSV File (Optional)</Label>
        <FileUpload onFileUploaded={handleFileUploaded} />
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

      {formData.paymentMethod === 'Bank Transfer' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-field">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              className="input-base"
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
            <Input
              id="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
              className="input-base"
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              value={formData.ifscCode}
              onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
              className="input-base"
              required
            />
          </div>
        </div>
      )}

      {formData.paymentMethod === 'PayPal' && (
        <div className="form-field">
          <Label htmlFor="paypalEmail">PayPal Email</Label>
          <Input
            id="paypalEmail"
            type="email"
            value={formData.paypalEmail}
            onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
            className="input-base"
            required
          />
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onTypeSelect('L&R')}
          className="px-6 py-2"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Form'}
        </Button>
      </div>
    </motion.form>
  );
};

export default LRForm;
