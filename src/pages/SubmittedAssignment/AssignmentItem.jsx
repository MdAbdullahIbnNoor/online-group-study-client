// // AssignmentItem.js
// import React, { useState } from 'react';
// import MarkAssignmentModal from './MarkAssignmentModal';

// const AssignmentItem = ({ assignment, onMarkAssignment }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   return (
//     <div>
//       <h3>{assignment.title}</h3>
//       <p>Marks: {assignment.marks}</p>
//       <p>Examinee: {assignment.examinee}</p>
//       <button onClick={handleOpenModal}>Give Mark</button>
//       {isModalOpen && (
//         <MarkAssignmentModal
//           assignment={assignment}
//           onClose={() => setIsModalOpen(false)}
//           onMarkAssignment={onMarkAssignment}
//         />
//       )}
//     </div>
//   );
// };

// export default AssignmentItem;
