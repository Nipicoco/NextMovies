import { useEffect } from 'react';


const RickRollPage = () => {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.keyCode === 123) {
          setTimeout(() => {
            alert('Hey, what are you doing there? 👀');
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
          }, 1000);
        }
      };
  
      const handleContextMenu = (event) => {
        event.preventDefault();
      };
  
      document.addEventListener('keydown', handleKeyDown); // Add event listener to document
      document.addEventListener('contextmenu', handleContextMenu); // Add event listener for right-click
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown); // Remove event listener on cleanup
        document.removeEventListener('contextmenu', handleContextMenu); // Remove event listener for right-click on cleanup
      };
    }, []); // Only run this effect on mount and unmount
  };
  
  export default RickRollPage;