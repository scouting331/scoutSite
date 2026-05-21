import Heading from "@theme/Heading";

export default function UpcomingEvents({}) {
  return (
    <div>
      <Heading as="h1" className="text--center">
        Upcoming Events
      </Heading>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FIndiana%2FIndianapolis&showPrint=0&showTabs=0&showTz=0&src=ZDR2NHFiaXE3anYxZDQxOWRhaGh2dWJhNGVxZDhya3BAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=cmdkYmNwYWcwazg0b3FtbWs3bWF0bTRmYzUwdW4zcmVAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23009688&color=%234285f4"
        style={{ border: 0 }} 
        width="80%" 
        height="600" 
        frameborder="0" 
        scrolling="no"
      ></iframe>
    </div>
  );
}
