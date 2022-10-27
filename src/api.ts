import express from 'express';
import { sendEventToDiscordSubscribers } from './client';
import pkg from '../package.json';

const router = express.Router();

router.get('/', async (req, res) => {
  return res.json({
    name: pkg.name,
    version: pkg.version
  });
});

router.post('/event-to-subscribers', async (req, res) => {
  const event: string = req.body.event || '';
  const proposalId: string = req.body.proposalId || '';

  try {
    await sendEventToDiscordSubscribers(event, proposalId);
    return res.json({ success: true });
  } catch (e) {
    return res.json({ error: e });
  }
});

export default router;
