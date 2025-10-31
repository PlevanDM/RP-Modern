import { motion } from 'framer-motion';

// Android Icon Component
export const AndroidIcon = ({ className = "w-8 h-8", isSelected = false }: { className?: string; isSelected?: boolean }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    animate={isSelected ? { 
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0]
    } : {}}
    transition={{ duration: 0.5 }}
  >
    <motion.path
      fill="#3DDC84"
      d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482nest3.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1349 1.0989L4.8429 5.4467a.4161.4161 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.186.8535 12.6324.8535 15.3065v3.9167c0 .2765.2238.5.5.5h20.293c.2765 0 .5-.2235.5-.5v-3.9167c0-2.6741-1.8354-4.1205-5.1695-4.9852"
      animate={isSelected ? {
        fill: ["#3DDC84", "#4ED99C", "#3DDC84"]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);

// iOS/Apple Icon Component
export const IOSIcon = ({ className = "w-8 h-8", isSelected = false }: { className?: string; isSelected?: boolean }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    animate={isSelected ? { 
      scale: [1, 1.1, 1],
      rotate: [0, -5, 5, 0]
    } : {}}
    transition={{ duration: 0.5 }}
  >
    <motion.path
      fill="#000000"
      d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
      animate={isSelected ? {
        fill: ["#000000", "#333333", "#000000"]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);

// Windows Icon Component
export const WindowsIcon = ({ className = "w-6 h-6", isSelected = false }: { className?: string; isSelected?: boolean }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    animate={isSelected ? { 
      scale: [1, 1.15, 1],
    } : {}}
    transition={{ duration: 0.5 }}
  >
    <motion.rect
      x="3"
      y="4"
      width="8"
      height="8"
      fill="#00ADEF"
      animate={isSelected ? {
        fill: ["#00ADEF", "#1C9CF6", "#00ADEF"]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.rect
      x="13"
      y="4"
      width="8"
      height="8"
      fill="#00ADEF"
      animate={isSelected ? {
        fill: ["#00ADEF", "#1C9CF6", "#00ADEF"],
      } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
    />
    <motion.rect
      x="3"
      y="13"
      width="8"
      height="8"
      fill="#00ADEF"
      animate={isSelected ? {
        fill: ["#00ADEF", "#1C9CF6", "#00ADEF"],
      } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
    />
    <motion.rect
      x="13"
      y="13"
      width="8"
      height="8"
      fill="#00ADEF"
      animate={isSelected ? {
        fill: ["#00ADEF", "#1C9CF6", "#00ADEF"],
      } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />
  </motion.svg>
);

// macOS Icon Component
export const MacIcon = ({ className = "w-6 h-6", isSelected = false }: { className?: string; isSelected?: boolean }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    animate={isSelected ? { 
      scale: [1, 1.15, 1],
      rotate: [0, -2, 2, 0]
    } : {}}
    transition={{ duration: 0.5 }}
  >
    <motion.path
      fill="#000000"
      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      animate={isSelected ? {
        fill: ["#000000", "#666666", "#000000"]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);

// Linux Icon Component
export const LinuxIcon = ({ className = "w-6 h-6", isSelected = false }: { className?: string; isSelected?: boolean }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    animate={isSelected ? { 
      scale: [1, 1.15, 1],
      rotate: [0, 360]
    } : {}}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  >
    <motion.circle
      cx="12"
      cy="9"
      r="3"
      fill="#FCC624"
      animate={isSelected ? {
        fill: ["#FCC624", "#FFD700", "#FCC624"]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      fill="#FCC624"
      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.568 19.362c-1.295 0-2.345-1.05-2.345-2.345 0-1.295 1.05-2.345 2.345-2.345 1.295 0 2.345 1.05 2.345 2.345 0 1.295-1.05 2.345-2.345 2.345zm5.136 0c-1.295 0-2.345-1.05-2.345-2.345 0-1.295 1.05-2.345 2.345-2.345 1.295 0 2.345 1.05 2.345 2.345 0 1.295-1.05 2.345-2.345 2.345z"
      animate={isSelected ? {
        fill: ["#FCC624", "#FFD700", "#FCC624"]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);

