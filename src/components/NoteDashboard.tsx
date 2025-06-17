// import React, { useState } from "react";
// import CreateNote from "./CreateNote";
// import ViewAllNotes from "./ViewAllNotes";
// import ViewNote from "./ViewNote";
// import "../styles/NoteDashboard.css";

// const NoteDashboard: React.FC = () => {
//   const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

//   return (
//     <div className="note-dashboard">
//       <div className="left-panel">
//         <CreateNote onNoteCreated={() => setSelectedNoteId(null)} />
//         <ViewAllNotes onNoteSelect={setSelectedNoteId} />
//       </div>
//       <div className="right-panel">
//         {selectedNoteId && <ViewNote noteId={selectedNoteId} />}
//       </div>
//     </div>
//   );
// };

// export default NoteDashboard;
