import { useState, useEffect } from "react";
import TicketSelectionStep from "../../components/TicketSelectionStep";
import UserDetailsStep from "../../components/UserDetailsStep";
import TicketConfirmationStep from "../../components/TicketConfirmationStep";
import Nav from "../../components/Nav";

const STORAGE_KEY = "ticketBookingData";

const TicketBookingFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ticketInfo: null,
    userDetails: null,
  });

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      // If user details are complete, move to confirmation
      if (parsedData.userDetails?.fullName && parsedData.ticketInfo) {
        setStep(3);
      } else if (parsedData.ticketInfo) {
        setStep(2);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const getTicketDetails = () => {
    if (!formData.ticketInfo || !formData.userDetails) return null;

    return {
      eventName: "Techember Fest '25",
      eventDate: "March 15, 2025",
      eventTime: "7:00 PM",
      attendee: formData.userDetails.fullName,
      email: formData.userDetails.email,
      ticketType: formData.ticketInfo.selectedTicket.type,
      ticketCount: formData.ticketInfo.ticketCount,
      profilePhoto: formData.userDetails.avatarUrl,
      specialRequest: formData.userDetails.specialRequest
    };
  };

  const handleDownload = () => {
    // Implementation for ticket download
    const ticketDetails = getTicketDetails();
    if (!ticketDetails) return;
    
    // Create downloadable content
    const content = `
      Techember Fest '25 Ticket
      Attendee: ${ticketDetails.attendee}
      Email: ${ticketDetails.email}
      Ticket Type: ${ticketDetails.ticketType}
      Date: ${ticketDetails.eventDate}
      Time: ${ticketDetails.eventTime}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'techember-fest-ticket.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmail = async () => {
    // Email functionality would be implemented on the backend
    console.log("Sending ticket via email...");
  };

  return (


 
     
    <div 
   
    id="con"
      className="min-h-screen bg-teal-950"
      role="main"
      aria-live="polite"
    >
        <Nav/>
      {step === 1 && (
        <TicketSelectionStep 
          onNext={(data) => handleNext({ ticketInfo: data })}
          initialData={formData.ticketInfo}
        />
      )}  
      
      {step === 2 && (
        <UserDetailsStep 
          onNext={(data) => handleNext({ userDetails: data })}
          onBack={handleBack}
          initialData={formData.userDetails}
        />
      )}
      
      {step === 3 && (
        <TicketConfirmationStep
          ticketDetails={getTicketDetails()}
          onDownload={handleDownload}
          onEmail={handleEmail}
        />
      )}
    </div>
  );
};

export default TicketBookingFlow;