"use client";

import { FormEvent, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    const [submitting, setSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleApply = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitMessage("");

        try {
            const db = getDb();
            await addDoc(collection(db, "messages"), {
                name,
                email,
                message,
                createdAt: serverTimestamp()
            });
            setSubmitMessage("Message sent successfully!");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err: any) {
            console.error("Error sending message:", err);
            setSubmitMessage("Error: " + (err.message || "Failed to send message"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
            <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
                <form onSubmit={handleApply} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Name</label>
                        <input 
                            type="text" 
                            required 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Your Email</label>
                        <input 
                            type="email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea 
                            required 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border rounded px-3 py-2 h-32"
                            placeholder="How can we help you?"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full bg-[#0f2d5c] text-white py-2 rounded hover:bg-[#0f2d5c]/90 disabled:opacity-50"
                    >
                        {submitting ? "Sending..." : "Send Message"}
                    </button>
                    {submitMessage && (
                        <p className={`text-center mt-2 ${submitMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                            {submitMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
