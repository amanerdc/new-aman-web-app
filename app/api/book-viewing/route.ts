import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getAgentById } from '@/lib/agents'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message, preferredDate, propertyName, referredBy } = await request.json()

    // Get agent details if referredBy is provided
    const agent = referredBy ? await getAgentById(referredBy) : null

    // Validate required fields
    if (!name || !email || !phone || !message || !preferredDate || !propertyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Format the preferred date
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'frontdesk@enjoyrealty.com',
      subject: `New Viewing Booking Request for ${propertyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Viewing Booking Request</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Property:</strong> ${propertyName}</p>
            <p><strong>Preferred Date:</strong> ${formattedDate}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            ${agent ? `
              <p><strong>Referred By:</strong> ${agent.name}</p>
              <p><strong>Brokerage:</strong> ${agent.brokerage}</p>
              <p><strong>Classification:</strong> ${agent.classification}</p>
              <p><strong>Team:</strong> ${agent.team}</p>
            ` : referredBy ? `<p><strong>Referred By:</strong> ${referredBy}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px;">
            This booking request was submitted through the property viewing form on your website.
          </p>
        </div>
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Booking request sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending booking email:', error)
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    )
  }
}