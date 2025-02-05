
import { motion } from 'framer-motion';

interface InitialChoiceProps {
  onChoiceSelect: (choice: 'register' | 'submit') => void;
}

const InitialChoice = ({ onChoiceSelect }: InitialChoiceProps) => {
  const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  };

  const hoverAnimation = {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2 }
  };

  return (
    <motion.div 
      className="space-y-8"
      {...containerAnimation}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Welcome</h1>
        <p className="text-gray-600 text-lg">Please select an option to continue</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          {...cardAnimation}
          whileHover={hoverAnimation}
          whileTap={{ scale: 0.98 }}
          className="option-card text-center cursor-pointer shadow-lg hover:shadow-xl"
          onClick={() => onChoiceSelect('register')}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Register for RnE</h2>
          <p className="text-gray-600">Register as a new user for RnE program</p>
        </motion.div>

        <motion.div
          {...cardAnimation}
          whileHover={hoverAnimation}
          whileTap={{ scale: 0.98 }}
          className="option-card text-center cursor-pointer shadow-lg hover:shadow-xl"
          onClick={() => onChoiceSelect('submit')}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit L/R</h2>
          <p className="text-gray-600">Submit your L&R or RnE documentation</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InitialChoice;
