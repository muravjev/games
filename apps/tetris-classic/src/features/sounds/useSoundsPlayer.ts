import { CustomErrorWithParameter } from 'utils/errors';
import { useRef } from 'react';
import { isServer } from '@muravjev/utils-core';
import { ESounds } from 'config/sounds';

declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
    }
}

const createAudioContext = () => {
    if (isServer) return null;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) alert('AudioContext is empty');
    return new AudioContext();
};

const loadSound = async ([key, url]: [ESounds, string]) => {
    const response = await fetch(url);
    if (response.ok) {
        const buffer = await response.arrayBuffer();
        return [key, buffer] as [ESounds, ArrayBuffer];
    }
    throw new CustomErrorWithParameter(`Error loading ${url} ${response.statusText}`, response);
};

const loadSounds = async (entries: [ESounds, string][]) => {
    return await Promise.all(entries.map(async entry => await loadSound(entry)));
};

const decodeSound = async (context: AudioContext, [key, buffer]: [ESounds, ArrayBuffer]) => {
    return [key, await context.decodeAudioData(buffer)] as [ESounds, AudioBuffer];
};

const decodeSounds = async (context: AudioContext, entries: [ESounds, ArrayBuffer][]) => {
    return await Promise.all(entries.map(async entry => await decodeSound(context, entry)));
};

export const useSoundsPlayer = (data: Record<ESounds, string>) => {
    const buffersRef = useRef<[ESounds, ArrayBuffer][] | null>(null);
    const soundsRef = useRef<Record<ESounds, AudioBuffer> | null>(null);
    const contextRef = useRef<AudioContext | null>(null);
    const warmuppedRef = useRef(false);

    async function load() {
        const urlEntries = Object.entries<string>(data) as [ESounds, string][];
        const dataEntries = await loadSounds(urlEntries);
        buffersRef.current = dataEntries;
    }

    function playBuffer(context: AudioContext, audio: AudioBuffer) {
        const source = context.createBufferSource();
        source.buffer = audio;
        source.connect(context.destination);
        source.start(0);
    }

    async function warmup() {
        if (warmuppedRef.current) return;
        warmuppedRef.current = true;

        const context = createAudioContext();
        if (!context) return;

        const buffer = context.createBuffer(1, 1, 22050);
        playBuffer(context, buffer);

        const buffers = buffersRef.current;
        if (buffers === null) return;
        const soundsEntries = await decodeSounds(context, buffers);
        const sounds = Object.fromEntries(soundsEntries) as Record<ESounds, AudioBuffer>;

        soundsRef.current = sounds;
        buffersRef.current = null;
        contextRef.current = context;
    }

    function play(key: ESounds) {
        const context = contextRef.current;
        if (!context) return;

        const sounds = soundsRef.current;
        if (!sounds) return;

        const sound = sounds[key];
        if (!sound) return;

        playBuffer(context, sound);
    }

    return {
        load,
        warmup,
        play
    };
};

export type ISoundsPlayer = ReturnType<typeof useSoundsPlayer>;
