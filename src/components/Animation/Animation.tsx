import { motion } from 'framer-motion';

const Animation = ({ children, status }: { children: React.ReactNode; status: boolean }) => {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={status ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    );
};

export default Animation;
