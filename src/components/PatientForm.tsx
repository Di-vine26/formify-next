
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Check, ChevronDown, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Switch,
} from '@/components/ui/switch';

import FormField from './FormField';
import DatePickerField from './DatePickerField';
import AnimatedContainer from './AnimatedContainer';

// Schema for form validation
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  maritalStatus: z.string().min(1, { message: 'Marital status is required' }),
  contactNumber: z.string().min(7, { message: 'Valid contact number is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  streetAddress: z.string().min(5, { message: 'Street address is required' }),
  village: z.string().min(1, { message: 'Village is required' }),
  cell: z.string().optional(),
  sector: z.string().min(1, { message: 'Sector is required' }),
  district: z.string().min(1, { message: 'District is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  takingMedications: z.boolean().default(false),
  inCaseOfEmergency: z.object({
    name: z.string().min(2, { message: 'Emergency contact name is required' }),
    contact: z.string().min(7, { message: 'Valid emergency contact number is required' }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PatientForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      maritalStatus: '',
      contactNumber: '',
      email: '',
      streetAddress: '',
      village: '',
      cell: '',
      sector: '',
      district: '',
      province: '',
      country: '',
      takingMedications: false,
      inCaseOfEmergency: {
        name: '',
        contact: '',
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form data submitted:', data);
      
      toast.success('Patient information submitted successfully', {
        description: `${data.firstName} ${data.lastName} has been added to the system.`,
        duration: 5000,
      });
      
      form.reset();
    } catch (error) {
      toast.error('Failed to submit patient information', {
        description: 'Please try again later.',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate base animation delay
  const getAnimationDelay = (index: number) => index * 50;

  return (
    <div className="w-full max-w-4xl mx-auto bg-form-background rounded-lg shadow-subtle overflow-hidden">
      <AnimatedContainer className="px-6 py-6 sm:px-10 sm:py-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          New Infected Person
        </h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {/* Personal Information Section */}
              <FormField 
                label="First Name" 
                animationDelay={getAnimationDelay(1)}
              >
                <FormControl>
                  <Input
                    placeholder="Your first name"
                    className="form-input"
                    {...form.register('firstName')}
                  />
                </FormControl>
                {form.formState.errors.firstName && (
                  <FormMessage>{form.formState.errors.firstName.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Last Name" 
                animationDelay={getAnimationDelay(2)}
              >
                <FormControl>
                  <Input
                    placeholder="Your last name"
                    className="form-input"
                    {...form.register('lastName')}
                  />
                </FormControl>
                {form.formState.errors.lastName && (
                  <FormMessage>{form.formState.errors.lastName.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Date of Birth" 
                animationDelay={getAnimationDelay(3)}
              >
                <FormControl>
                  <DatePickerField
                    value={form.getValues('dateOfBirth')}
                    onChange={(date) => form.setValue('dateOfBirth', date as Date, { shouldValidate: true })}
                    placeholder="MM/DD/YYYY"
                  />
                </FormControl>
                {form.formState.errors.dateOfBirth && (
                  <FormMessage>{form.formState.errors.dateOfBirth.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Gender" 
                animationDelay={getAnimationDelay(4)}
              >
                <Select
                  onValueChange={(value) => form.setValue('gender', value, { shouldValidate: true })}
                  value={form.getValues('gender')}
                >
                  <SelectTrigger className="form-select">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-100 shadow-md">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender && (
                  <FormMessage>{form.formState.errors.gender.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Marital Status" 
                animationDelay={getAnimationDelay(5)}
              >
                <Select
                  onValueChange={(value) => form.setValue('maritalStatus', value, { shouldValidate: true })}
                  value={form.getValues('maritalStatus')}
                >
                  <SelectTrigger className="form-select">
                    <SelectValue placeholder="Select your status please" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-100 shadow-md">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.maritalStatus && (
                  <FormMessage>{form.formState.errors.maritalStatus.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Contact Number" 
                animationDelay={getAnimationDelay(6)}
              >
                <FormControl>
                  <Input
                    placeholder="0123-456-789"
                    className="form-input"
                    {...form.register('contactNumber')}
                  />
                </FormControl>
                {form.formState.errors.contactNumber && (
                  <FormMessage>{form.formState.errors.contactNumber.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="E-mail" 
                animationDelay={getAnimationDelay(7)}
              >
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input"
                    {...form.register('email')}
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage>{form.formState.errors.email.message}</FormMessage>
                )}
              </FormField>

              {/* Address Section */}
              <div className="md:col-span-2">
                <FormField 
                  label="Street Address" 
                  animationDelay={getAnimationDelay(8)}
                >
                  <FormControl>
                    <Input
                      placeholder="Enter your address"
                      className="form-input"
                      {...form.register('streetAddress')}
                    />
                  </FormControl>
                  {form.formState.errors.streetAddress && (
                    <FormMessage>{form.formState.errors.streetAddress.message}</FormMessage>
                  )}
                </FormField>
              </div>

              <FormField 
                label="Village" 
                animationDelay={getAnimationDelay(9)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the village"
                    className="form-input"
                    {...form.register('village')}
                  />
                </FormControl>
                {form.formState.errors.village && (
                  <FormMessage>{form.formState.errors.village.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Cell" 
                animationDelay={getAnimationDelay(10)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the cell (if any)"
                    className="form-input"
                    {...form.register('cell')}
                  />
                </FormControl>
                {form.formState.errors.cell && (
                  <FormMessage>{form.formState.errors.cell.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Sector" 
                animationDelay={getAnimationDelay(11)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the sector you live in"
                    className="form-input"
                    {...form.register('sector')}
                  />
                </FormControl>
                {form.formState.errors.sector && (
                  <FormMessage>{form.formState.errors.sector.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="District" 
                animationDelay={getAnimationDelay(12)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the district"
                    className="form-input"
                    {...form.register('district')}
                  />
                </FormControl>
                {form.formState.errors.district && (
                  <FormMessage>{form.formState.errors.district.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Province" 
                animationDelay={getAnimationDelay(13)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the Province"
                    className="form-input"
                    {...form.register('province')}
                  />
                </FormControl>
                {form.formState.errors.province && (
                  <FormMessage>{form.formState.errors.province.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Country" 
                animationDelay={getAnimationDelay(14)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the Country"
                    className="form-input"
                    {...form.register('country')}
                  />
                </FormControl>
                {form.formState.errors.country && (
                  <FormMessage>{form.formState.errors.country.message}</FormMessage>
                )}
              </FormField>

              {/* Medical Information */}
              <div className="md:col-span-2">
                <FormField 
                  label="Taking Medications currently?" 
                  animationDelay={getAnimationDelay(15)}
                  containerClassName="flex flex-row items-center justify-between"
                  labelClassName="flex-1"
                >
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        checked={form.getValues('takingMedications')}
                        onCheckedChange={(checked) => form.setValue('takingMedications', checked, { shouldValidate: true })}
                      />
                    </FormControl>
                    <span className="text-sm text-gray-500">
                      {form.getValues('takingMedications') ? 'Yes' : 'No'}
                    </span>
                  </div>
                </FormField>
              </div>

              {/* Emergency Contact */}
              <AnimatedContainer className="md:col-span-2 mt-4" delay={getAnimationDelay(16)}>
                <h3 className="text-lg font-medium text-gray-800 mb-4">In case of Emergency</h3>
              </AnimatedContainer>

              <FormField 
                label="Emergency Names" 
                animationDelay={getAnimationDelay(17)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the Name(s) you'd like to"
                    className="form-input"
                    {...form.register('inCaseOfEmergency.name')}
                  />
                </FormControl>
                {form.formState.errors.inCaseOfEmergency?.name && (
                  <FormMessage>{form.formState.errors.inCaseOfEmergency.name.message}</FormMessage>
                )}
              </FormField>

              <FormField 
                label="Contact" 
                animationDelay={getAnimationDelay(18)}
              >
                <FormControl>
                  <Input
                    placeholder="Enter the Contact"
                    className="form-input"
                    {...form.register('inCaseOfEmergency.contact')}
                  />
                </FormControl>
                {form.formState.errors.inCaseOfEmergency?.contact && (
                  <FormMessage>{form.formState.errors.inCaseOfEmergency.contact.message}</FormMessage>
                )}
              </FormField>
            </div>

            {/* Submit Button */}
            <AnimatedContainer 
              className="flex justify-center mt-8 pt-4" 
              delay={getAnimationDelay(19)}
            >
              <Button
                type="submit"
                className="bg-form-accent hover:bg-form-accent/90 text-white py-2 px-10 rounded-md transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    Processing...
                  </span>
                ) : 'Submit'}
              </Button>
            </AnimatedContainer>
          </form>
        </Form>
      </AnimatedContainer>
    </div>
  );
};

export default PatientForm;
