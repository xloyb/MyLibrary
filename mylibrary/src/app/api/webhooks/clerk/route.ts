// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import prisma from '@/lib/client'

// export async function POST(req: Request) {
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

//   if (!WEBHOOK_SECRET) {
//     throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
//   }

//   // Get the headers
//   const headerPayload = headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error occured -- no svix headers', {
//       status: 400,
//     })
//   }

//   // Get the body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET)

//   let evt: WebhookEvent

//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error verifying webhook:', err)
//     return new Response('Error occured', {
//       status: 400,
//     })
//   }

//   // Do something with the payload
//   // For this guide, you simply log the payload to the console
//   const { id } = evt.data
//   const eventType = evt.type
//   console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
//   console.log('Webhook body:', body)


//   if (eventType === 'user.created' || eventType === 'user.updated') {
//     try {
//       const userData = {
//         clerkuserid: evt.data.id,
//         email: JSON.parse(body).data.email_addresses[0].email_address,
//         username: JSON.parse(body).data.username,
//         avatar: JSON.parse(body).data.profile_image_url || '/img/noAvatar.png',
//         password : JSON.parse(body).data.password || null,
//       };

//       if (eventType === 'user.created') {
//         await prisma.user.create({
//           data: userData,
//         });
//       } else if (eventType === 'user.updated') {
//         await prisma.user.update({
//           where: { clerkuserid: evt.data.id },
//           data: {
//             email: userData.email,
//             username: userData.username,
//             avatar: userData.avatar,
//             password: userData.password,
//           },
//         });
        
//       }
//     } catch (err) {
//       console.error('Error processing webhook event:', err);
//       return new Response('Failed to process webhook event', {
//         status: 400,
//       });
//     }
//   }


//   return new Response('', { status: 200 })
// }

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/client';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    try {
      const userData = {
        clerkuserid: evt.data.id,
        email: JSON.parse(body).data.email_addresses[0].email_address,
        username: JSON.parse(body).data.username,
        avatar: JSON.parse(body).data.profile_image_url || '/img/noAvatar.png',
        password: JSON.parse(body).data.password || null,
        updatedAt: new Date(), // Add the required updatedAt field
      };

      if (eventType === 'user.created') {
        await prisma.user.create({
          data: userData,
        });
      } else if (eventType === 'user.updated') {
        await prisma.user.update({
          where: { clerkuserid: evt.data.id },
          data: userData, // Reuse the same userData object for update
        });
      }
    } catch (err) {
      console.error('Error processing webhook event:', err);
      return new Response('Failed to process webhook event', { status: 400 });
    }
  }

  return new Response('', { status: 200 });
}