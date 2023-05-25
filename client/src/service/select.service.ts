import { BASE_URL } from "../utils/static";

export default async function selectService(emails: string[], subject: string) {
    
    const response = await fetch(`${BASE_URL}/setter`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ selected_email: emails, subject }),
        headers: {
            'Content-type': "application/json"
        }

    });
    const data = await response.json();
    return data;
}