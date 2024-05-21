//Home.js
import { Center } from '@mantine/core';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <Center>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d723.3979122537013!2d-123.27474204157446!3d44.63013128445182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c03e36b8aae651%3A0x3fe87502f2a06076!2s1730%20NW%20Sulphur%20Springs%20Rd%2C%20Corvallis%2C%20OR%2097330%2C%20USA!5e1!3m2!1sen!2sru!4v1710458435215!5m2!1sen!2sru"
          width="700"
          height="500"
          title="Google map"
          style={{ border: 0 }}
        />
      </Center>
    </div>
  );
}
