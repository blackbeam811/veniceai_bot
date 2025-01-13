"use server"

import db from "@/config/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, messageContent, aiResponse, conversationId } = await req.json();

    if (!messageContent || !aiResponse) {
      return NextResponse.json(
        { error: "Missing required fields or invalid format" },
        { status: 400 }
      );
    }

    // Ensure the user exists
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let conversation = null;

    if (conversationId) {
      // Attempt to fetch an existing conversation
      conversation = await db.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
    } else {
      // Create a new conversation if `conversationId` is not provided
      conversation = await db.conversation.create({
        data: {
          userId: userId,
        },
      });
    }

    // Add a message to the conversation
    const newMessage = await db.message.create({
      data: {
        content: messageContent,
        senderId: userId,
        conversationId: conversation.id,
        aiResponse: aiResponse,
      },
    });

    return NextResponse.json(
      {
        message: "Message saved successfully",
        conversation,
        newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const conversationId = searchParams.get("conversationId");
  
      if (!conversationId) {
        return NextResponse.json(
          { error: "Conversation ID is required" },
          { status: 400 }
        );
      }
  
      // Fetch the conversation and its messages
      const conversation = await db.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: "asc" }, // Order messages by creation time
          },
        },
      });
  
      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(conversation, { status: 200 });
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  
