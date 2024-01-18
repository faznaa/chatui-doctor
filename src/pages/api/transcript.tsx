// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // curl --request POST \
    // --url 'https://transcribe.whisperapi.com' \
    // --header 'Authorization: Bearer YOUR_API_KEY' \
    // -F "file=@YOUR_FILE_PATH" \
    // -F "url=YOUR_URL" \
    // -F "diarization=false" \
    // -F "numSpeakers=2" \
    // -F "fileType=YOUR_FILE_TYPE" \
    // -F "language=en" \
    // -F "task=transcribe"
  
  const { data } = await axios.post('https://transcribe.whisperapi.com', {
    headers: {
      Authorization: `Bearer ${process.env.WHISPER_API_KEY}`,
    },
    data: {
      file: 'https://whisper-api.s3.us-east-2.amazonaws.com/whisper-api-test.mp3',
      url: 'https://whisper-api.s3.us-east-2.amazonaws.com/whisper-api-test.mp3',
      diarization: false,
      numSpeakers: 1,
      fileType: 'mp3',
      language: 'en',
      task: 'transcribe',
    },
  })

  res.status(200).json({ message: 'John Doe' })
}
