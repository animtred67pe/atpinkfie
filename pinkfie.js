/*!
 * Pinkfie - The Flash Player emulator in Javascript Create on domingo, 7 de abril de 2024, 16:18:46
 * 
 * v1.3.6 (2025-02-11)
 * 
 * (c) 2025 Anim Tred Studio
 * 
 * Made in Peru
 */

var PinkFie = (function(moduleResults) {
	var moduleInstalls = {};
	var __webpack_require__ = function(moduleId) {
		if (moduleInstalls[moduleId]) {
			return moduleInstalls[moduleId].exportJS;
		}
		var wpjsmodules = {
			importJS: __webpack_require__,
			exportJS: {}
		}
		moduleInstalls[moduleId] = wpjsmodules;
		moduleResults[moduleId](moduleInstalls[moduleId]);
		return wpjsmodules.exportJS;
	};
	return __webpack_require__("src/index.js");
}({
	"src/audio/AudioBackend.js": function(wpjsm){
		const SoundDecoderCall = wpjsm.importJS("src/audio/SoundDecoder.js");
		
		class Sound {
			constructor() {
				this.buffer = null;
				this.duration = 0;
			}
			getBuffer() {
				return this.buffer;
			}
			setBuffer(buffer) {
				this.buffer = buffer;
				this.duration = buffer.duration;
			}
		}
		
		class SoundStream {
			constructor() {
				this.buffer = null;
				this.duration = 0;
			}
			getBuffer() {
				return this.buffer;
			}
			setBuffer(buffer) {
				this.buffer = buffer;
				this.duration = buffer.duration;
			}
		}
		
		class SoundData {
			constructor(movieplayer, data) {
				this.movieplayer = movieplayer;
				this.data = data;
				this.audio = null;
				this.characterId = data.id;
				this.id = data.id;
				this.numSamples = data.numSamples;
				this.format = data.format;
			}
			setAudio(audio) {
				this.audio = audio;
			}
		}
		
		const MAX_SOUND = 30;
		
		class AudioBackend {
			constructor(stage) {
				this.stage = stage;
				this.audioContext = stage.audioContext;
				if (this.audioContext) {
					this.node = this.audioContext.createGain();
					this.node.connect(this.audioContext.destination);	
				}
				this.playingAudios = [];
				this.compressSoundMap = {};
				this.tickTime = 0;
			}
			getCompressSound() {
				return Object.keys(this.compressSoundMap);
			}
			getPlayingCompressSound() {
				var result = {};
				for (let i = 0; i < this.playingAudios.length; i++) {
					const playingaudio = this.playingAudios[i];
					switch (playingaudio.type) {
						case "startsound":
							result[playingaudio.sound.format.compression] = true;
							break;
						case "soundstream":
							if (playingaudio.audioStreamInfo) result[playingaudio.audioStreamInfo.stream.compression] = true;
							break;
					}
				}
				return Object.keys(result);
			}
			_createPan(input) {
				var inputNode = this.audioContext.createGain();
				var leftGain = this.audioContext.createGain();
				var rightGain = this.audioContext.createGain();
				var channelMerger = this.audioContext.createChannelMerger(2);
				inputNode.connect(leftGain);
				inputNode.connect(rightGain);
				leftGain.connect(channelMerger, 0, 0);
				rightGain.connect(channelMerger, 0, 1);
				channelMerger.connect(input);
				return { inputNode, leftGain, rightGain };
			}
			cleanup() {
				this.stopAllSounds(true);
				this.stopAllSoundStream(true);
			}
			pause() {
				if (!this.audioContext) {
					return;
				}
				this.audioContext.suspend();
			}
			resume() {
				if (!this.audioContext) {
					return;
				}
				this.audioContext.resume();
			}
			getPlayingAudioCount() {
				var c = 0;
				for (let i = 0; i < this.playingAudios.length; i++) {
					const e = this.playingAudios[i];
					if (!e.ended) {
						c++;
					}
				}
				return c;
			}
			getVolume() {
				if (!this.audioContext) {
					return 0;
				}
				return this.node.gain.value * 100;
			}
			setVolume(value) {
				if (!this.audioContext) {
					return;
				}
				this.node.gain.value = value / 100;
			}
			tick() {
				this.tickTime = this.stage.tickTime;
				for (let i = 0; i < this.playingAudios.length; i++) {
					const playingaudio = this.playingAudios[i];
					switch (playingaudio.type) {
						case "startsound":
							this.tickPlayingAudio(playingaudio);
							break;
						case "soundstream":
							this.tickPlayingSoundStream(playingaudio);
							break;
					}
				}
				var newTags = [];
				for (let i = 0; i < this.playingAudios.length; i++) {
					const playingaudio = this.playingAudios[i];
					if (!playingaudio.ended) {
						newTags.push(playingaudio);
					}
				}
				this.playingAudios = newTags;
			}
			tickPlayingAudio(playingaudio) {
				if (!playingaudio.ended) {
					var SGFtime = (this.tickTime - playingaudio.startTime) / 1000;
					var SGFtime2 = (this.tickTime - playingaudio.startTimeOriginal) / 1000;
					if (playingaudio.stateEnvelopeSound) {
						var envelopes = playingaudio._envelopes;
						var nodeLR = playingaudio.nodeLR;
						if (playingaudio.envelopeId < envelopes.length) {
							var rs = envelopes[playingaudio.envelopeId];
							var rs2 = envelopes[playingaudio.envelopeId - 1];
							if (rs2) {
								const per = Math.max(Math.min(((SGFtime2 * playingaudio.__rate) - rs2.sample) / (rs.sample - rs2.sample), 1), 0);
								const startPer = 1 - per;
								const leftVal = ((rs2.leftVolume * startPer) + (rs.leftVolume * per)) / 32768;
								const rightVal = ((rs2.rightVolume * startPer) + (rs.rightVolume * per)) / 32768;
								nodeLR.rightGain.gain.value = Math.max(Math.min(rightVal, 1), 0);
								nodeLR.leftGain.gain.value = Math.max(Math.min(leftVal, 1), 0);
							}
							if (SGFtime2 >= rs.sample / playingaudio.__rate) {
								const leftVal = rs.leftVolume / 32768;
								const rightVal = rs.rightVolume / 32768;
								nodeLR.rightGain.gain.value = Math.max(Math.min(rightVal, 1), 0);
								nodeLR.leftGain.gain.value = Math.max(Math.min(leftVal, 1), 0);
								playingaudio.envelopeId++;
							}
						}
					}
					if (playingaudio.source) {
						playingaudio.source.playbackRate.value = this.stage.speed;
					}
					if ((SGFtime + playingaudio.__startSound) >= playingaudio.__endSound) {
						playingaudio.numLoops--;
						if (playingaudio.numLoops > 0) {
							this.playSource(playingaudio);
							playingaudio.startTime = this.tickTime;
						} else {
							playingaudio.stateEnvelopeSound = false;
							this.stopSound(playingaudio);
						}
					}
				}
			}
			tickPlayingSoundStream(playingaudio) {
				if (!playingaudio.ended) {
					if (this.streamSoundIsEnded(playingaudio)) {
						this.stopStreamSound(playingaudio);
					}
					if (playingaudio.source) {
						playingaudio.source.playbackRate.value = this.stage.speed;
					}
				} else {
				}
			}
			infoFrameBlock(mc, frame, block) {
				var result = null;
				var f = 0;
				var tags = mc.tags;
				var blockFound = false;
				var hasBlock = false;
				var bCount = 0;
				var startF = 1;
				var bStart = false;
				for (let j = 0; j < tags.length; j++) {
					const tag = tags[j];
					switch (tag.tagType) {
						case "SoundStreamBlock":
							hasBlock = true;
							if (!bStart) {
								startF = (f + 1);
								bStart = true;
							}
							if (block === tag) {
								blockFound = true;
							}
							break;
						case "ShowFrame":
							f++;
							if (hasBlock) {
								bCount++;
								hasBlock = false;
							} else {
								if (bCount) {
									bStart = false;
									bCount = 0;
								}
							}
							break;
					}
					if (blockFound) {
						break;
					}
				}
				var rate = +((1000 / this.stage.frameRate).toFixed(1));
				if (blockFound) {
					var soundFound = false;
					var soundStreamBlockRecords = mc.soundStreamBlockRecords;
					for (let i = 0; i < soundStreamBlockRecords.length; i++) {
						const b = soundStreamBlockRecords[i];
						var bm = b.soundInfo.blocks;
						for (let g = 0; g < bm.length; g++) {
							const blo = bm[g];
							if (block === blo) {
								result = {
									audioStream: b.audioStream,
									time: (frame - startF) * (rate / 1000),
									startFrame: startF,
									isEnd: (g >= (bm.length - 1)),
									blocks: bm
								};
								soundFound = true;
								break;
							}
						}
						if (soundFound) {
							break;
						}
					}
				}
				return result;
			}
			checkStreamSound(mc, block, audio) {
				if (mc.audioStream) {
					if (!mc.audioStream.isEnd) {
						return mc.audioStream;
					}
				}
				return null;
			}
			streamSoundIsEnded(a) {
				return (a.__start + ((this.tickTime - a.startTime) / 1000)) >= a.duration;
			}
			startStreamSound(mc, frame, block) {
				if (!this.audioContext) {
					return;
				}
				var result = this.infoFrameBlock(mc, frame, block);
		
				if (this.playingAudios.length >= MAX_SOUND) {
					return;
				}
		
				if (!result) return;
		
				var audioStream = result.audioStream;
				if (!audioStream) return;
		
				let seekTime = result.time;
		
				var g = this.checkStreamSound(mc, block, audioStream);
				if (g) {

					var isS = (Math.abs(((this.audioContext.currentTime - g.startTime2) * this.stage.speed) - (seekTime - g._time)) > 0.15);

					if ((g._uframe != result.startFrame) || isS) {
						g.isStart = false;
						g._uframe = result.startFrame;
						g.audioStream = audioStream;
						g._time = seekTime;
						g._frame = frame;
						g.startTime2 = this.audioContext.currentTime;
					}
		
					this.playStreamSound(g);
		
					if (result.isEnd) {
						g.isEnd = true;
					}
		
					return g;
				}
		
				var rs = {};
				rs.audioStream = audioStream;
		
				rs.type = "soundstream";
				rs.__start = seekTime;
		
				rs._time = seekTime;
		
				rs.isStart = false;
				rs.isEnd = result.isEnd;
		
				rs._frame = frame;
				rs._uframe = result.startFrame;

				rs.audioStreamInfo = mc.staticData.audioStreamInfo;
		
				rs.playtime = this.audioContext.currentTime;
				rs.playtime2 = this.tickTime;
		
				rs.mc = mc;
				rs.startTime = this.tickTime;
				rs.startTime2 = this.audioContext.currentTime;
				rs.duration = audioStream.duration;
		
				this.playStreamSound(rs);
				this.playingAudios.push(rs);
				return rs;
			}
			playStreamSound(playingaudio) {
				if (!playingaudio.ended) {
					var gs = playingaudio._time;
					if (!playingaudio.isStart) {
						if (playingaudio.source) {
							playingaudio.source.disconnect();
							playingaudio.source = null;
						}
						var source = this.audioContext.createBufferSource();
						source.buffer = playingaudio.audioStream.getBuffer();
						source.playbackRate.value = this.stage.speed;
						source.connect(this.node);
						source.start(this.audioContext.currentTime, gs);
						playingaudio.playtime = this.audioContext.currentTime;
						playingaudio.playtime2 = this.tickTime;
						playingaudio.source = source;
						playingaudio.isStart = true;
					}
				}
			}
			stopSound(playingaudio) {
				if (playingaudio.type == "startsound") {
					if (playingaudio.source) {
						playingaudio.source.disconnect();
						playingaudio.source = null;
					}
					playingaudio.ended = true;
				}
			}
			stopStreamSound(playingaudio) {
				if (playingaudio.type == "soundstream") {
					if (playingaudio.source) {
						playingaudio.source.disconnect();
						playingaudio.source = null;
					}
					playingaudio.ended = true;
				}
			}
			stopAllSounds() {
				for (let i = 0; i < this.playingAudios.length; i++) {
					const playingaudio = this.playingAudios[i];
					this.stopSound(playingaudio);
				}
			}
			stopAllSoundStream() {
				for (let i = 0; i < this.playingAudios.length; i++) {
					const playingaudio = this.playingAudios[i];
					this.stopStreamSound(playingaudio);
				}
			}
			isSoundPlaying(sound) {
				return !sound.ended;
			}
			startSound(soundinfo, mc) {
				if (!this.audioContext) {
					return;
				}
				if (this.playingAudios.length >= MAX_SOUND) {
					return;
				}
				if ("className" in soundinfo) {
					return;
				}
				var sound = this.getSound(soundinfo.id);
				if (!sound) {
					return;
				}
				if (sound.audio) {
					if (soundinfo.info.event == "stop") {
						for (let i = 0; i < this.playingAudios.length; i++) {
							const playingaudio = this.playingAudios[i];
							if (playingaudio.type == "startsound") {
								if (!playingaudio.ended) {
									if (playingaudio.sound === sound) {
										if (playingaudio.mc === mc) {
											this.stopSound(playingaudio);
										}
									}
								}
							}
						}
					} else if (soundinfo.info.event == "start") {
						var isS = false;
						for (let i = 0; i < this.playingAudios.length; i++) {
							const playingaudio = this.playingAudios[i];
							if (playingaudio.type == "startsound") {
								if (!playingaudio.ended) {
									if (playingaudio.sound === sound) {
										if (playingaudio.mc === mc) {
											isS = true;
										}
									}
								}
							}
						}
						if (!isS) {
							this.playingAudios.push(this.playSound(sound, soundinfo, mc));
						}
					} else if (soundinfo.info.event == "event") {
						this.playingAudios.push(this.playSound(sound, soundinfo, mc));
					}
				}
			}
			playSound(sud, soundinfo, mc) {
				var sound = {};
				sound.type = "startsound";
				var audio = sud.audio;
		
				var __info = soundinfo.info;
				var sampleRate = sud.format.sampleRate;
		
				sound.buffer = audio.getBuffer();
				sound.mc = mc;
				sound.sound = sud;
				sound.id = sud.id;
		
				let duration = (sud.numSamples / sampleRate);
		
				var nodeLR = this._createPan(this.node);
				sound.nodeLR = nodeLR;
		
				sound.duration = duration;
				sound.__start = 0;
				sound.__rate = 44100;
		
				if ("numLoops" in __info) {
					sound.numLoops = __info.numLoops;
				} else {
					sound.numLoops = 1;
				}
				if ("inSample" in __info) {
					sound.__startSound = (__info.inSample / sound.__rate);
				} else {
					sound.__startSound = 0;
				}
				if ("outSample" in __info) {
					sound.__endSound = (__info.outSample / sound.__rate);
				} else {
					sound.__endSound = duration;
				}
				if ("envelope" in __info) {
					sound.stateEnvelopeSound = true;
					sound.envelopeId = 0;
					var envelopes = __info.envelope;
					var rs = envelopes[0];
					if (rs) {
						const leftVal = rs.leftVolume / 32768;
						const rightVal = rs.rightVolume / 32768;
						nodeLR.rightGain.gain.value = Math.max(Math.min(rightVal, 1), 0);
						nodeLR.leftGain.gain.value = Math.max(Math.min(leftVal, 1), 0);
					}
					sound._envelopes = envelopes;
				} else {
					sound.stateEnvelopeSound = false;
				}
				sound.startTime = this.tickTime;
				sound.startTimeOriginal = this.tickTime;
				this.playSource(sound);
				return sound;
			}
			playSource(sound) {
				if (sound.source) {
					sound.source.disconnect();
					sound.source = null;
				}
				sound.source = this.audioContext.createBufferSource();
				sound.source.buffer = sound.buffer;
				sound.source.playbackRate.value = this.stage.speed;
				if (sound.nodeLR) {
					sound.source.connect(sound.nodeLR.inputNode);
				} else {
					sound.source.connect(this.node);
				}
				sound.source.start(this.audioContext.currentTime, (sound.__start + (sound.__startSound || 0)));
			}
			decodeSound(sound, callback) {
				// info.format.is16Bit
				// info.format.isStereo
				// info.format.sampleRate
				this.compressSoundMap[sound.format.compression] = true;
				if (this.audioContext) {
					SoundDecoderCall.loadSound(this.audioContext, sound, function (buf) {
						var s = new Sound();
						s.setBuffer(buf.buffer);
						callback(s);
					});
				} else {
					var s = new Sound();
					callback(s);
				}
			}
			decodeSoundStream(streamInfo, blocks, callback) {
				if (streamInfo.stream.compression != 'uncompressedUnknownEndian') {
					this.compressSoundMap[streamInfo.stream.compression] = true;
				}
				if (this.audioContext) {
					SoundDecoderCall.loadSoundStream(this.audioContext, streamInfo, blocks, function (buf) {
						var s = new SoundStream();
						s.setBuffer(buf.buffer);
						callback(s);
					});	
				} else {
					var s = new SoundStream();
					callback(s);
				}
			}
			getSound(id) {
				return this.stage.library.characterById(id);
			}
			registerSound(sound) {
				return new SoundData(this.stage, sound);
			}
		}
		
		wpjsm.exportJS = AudioBackend;
	},
	"src/audio/SoundDecoder.js": function(wpjsm){
		const JSNellymoserDecoder = wpjsm.importJS("src/utils/nellymoser.js");
		const AT_MP3_Decoder = wpjsm.importJS("src/utils/at-mp3-decoder.js");
		const ByteStream = wpjsm.importJS("src/utils/ByteStream.js");

		function getMP3Header(stream, header) {
			var mp3FrameHeader = header;
			while (stream.getBytesAvailable() > 4) {
				var frameStart = stream.position;
				var header = stream.readInt32();
				if (AT_MP3_Decoder.Header.isValidHeader(header)) {
					mp3FrameHeader.parseHeader(header);
					return mp3FrameHeader;
				}
				stream.position = frameStart + 1;
			}
			return null;
		}
		function decodeMP3(audioContext, data, numSamples, useSeekSample) {
			var decoder = new AT_MP3_Decoder.Decoder();
			var bitstream = new AT_MP3_Decoder.BitStream();
			var byteStream = new ByteStream(data);
			byteStream.littleEndian = true;
			var seekSample = useSeekSample == undefined ? byteStream.readInt16() : useSeekSample;
			byteStream.littleEndian = false;
			var header = new AT_MP3_Decoder.Header();
			var startPos = byteStream.position;
			getMP3Header(byteStream, header);
			byteStream.position = startPos;
			var channels = header.mode() == AT_MP3_Decoder.Header.SINGLE_CHANNEL ? 1 : 2;
			var buffer = audioContext.createBuffer(channels, numSamples, header.frequency());
			var channelData0 = buffer.getChannelData(0);
			var channelData1 = (channels == 2) ? buffer.getChannelData(1): null;
			var idx1 = 0;
			var idx2 = 0;
			var sampleId = 0;
			while(byteStream.getBytesAvailable() > 4) {
				getMP3Header(byteStream, header);
				var eeee = header.framesize;
				if (!((byteStream.getBytesAvailable() - eeee) > 4)) 
					break;
				var frameStream = byteStream.readBytes(eeee);
				bitstream.setData(new Uint8Array(frameStream));
				var buf = decoder.decodeFrame(header, bitstream);
				var pcm = buf.getBuffer();
				var sc = ((header.version() == AT_MP3_Decoder.Header.MPEG1) ? 1152 : 576) * channels;
				for (var i = 0; i < sc; i += channels) {
					if ((sampleId >= seekSample) && sampleId < (numSamples + seekSample)) {
						if (channels == 2) {
							channelData0[idx1++] = (pcm[i] / 32768);
							channelData1[idx2++] = (pcm[i + 1] / 32768);
						} else {
							channelData0[idx1++] = (pcm[i] / 32768);
						}	
					}
					sampleId++;
				}
			}
			return buffer;
		}
		function getMP3Sample(blocks) {
			var s = 0;
			for (let i = 0; i < blocks.length; i++) {
				const block = blocks[i];
				var _in = new ByteStream(block);
				s += _in.readUint16();
			}
			return s;
		}
		
		const SoundDecoder = function(audioContext) {
			this.audioContext = audioContext;
			this.info = null;
			this.formatInfo = null;
			this.numSamples = null;
			this.data = null;
			this.byteStream = null;
			this.onload = null;
		}
		SoundDecoder.INDEX_TABLE = [];
		SoundDecoder.INDEX_TABLE[0] = [-1, 2];
		SoundDecoder.INDEX_TABLE[1] = [-1, -1, 2, 4];
		SoundDecoder.INDEX_TABLE[2] = [-1, -1, -1, -1, 2, 4, 6, 8];
		SoundDecoder.INDEX_TABLE[3] = [-1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16];
		SoundDecoder.STEP_TABLE = [
			7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66,
			73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449,
			494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272,
			2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 6484, 7132, 7845, 8630, 9493,
			10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767,
		];
		SoundDecoder.SAMPLE_DELTA_CALCULATOR = [];
		
		// 2 bits
		SoundDecoder.SAMPLE_DELTA_CALCULATOR[0] = function(step, magnitude) {
			let delta = step >> 1;
			if (magnitude & 1) {
				delta += step;
			}
			return delta;
		};
		// 3 bits
		SoundDecoder.SAMPLE_DELTA_CALCULATOR[1] = function(step, magnitude) {
			let delta = step >> 2;
			if (magnitude & 1) {
				delta += step >> 1;
			}
			if (magnitude & 2) {
				delta += step;
			}
			return delta;
		}
		// 4 bits
		SoundDecoder.SAMPLE_DELTA_CALCULATOR[2] = function(step, magnitude) {
			let delta = step >> 3;
			if (magnitude & 1) {
				delta += step >> 2;
			}
			if (magnitude & 2) {
				delta += step >> 1;
			}
			if (magnitude & 4) {
				delta += step;
			}
			return delta;
		}
		// 5 bits
		SoundDecoder.SAMPLE_DELTA_CALCULATOR[3] = function(step, magnitude) {
			let delta = step >> 4;
			if (magnitude & 1) {
				delta += step >> 3;
			}
			if (magnitude & 2) {
				delta += step >> 2;
			}
			if (magnitude & 4) {
				delta += step >> 1;
			}
			if (magnitude & 8) {
				delta += step;
			}
			return delta;
		}
		SoundDecoder.prototype.convertToMp3A = function(buffer, sampleCount, sampleRate, seekSample, channels) {
			var audioContext = this.audioContext;
		
			var b = audioContext.createBuffer(channels, sampleCount, sampleRate);
			
			var _left = buffer.getChannelData(0);
			var _right = null;
			if (channels == 2) {
				_right = buffer.getChannelData(1);
			}
		
			var o_left = b.getChannelData(0);
			var o_right = null;
			if (channels == 2) {
				o_right = b.getChannelData(1);
			}
		
			for (let i = 0; i < sampleCount; i++) {
				var r = Math.floor((((i + seekSample) / sampleRate) * buffer.sampleRate));
				o_left[i] = _left[r] || 0;
				if (channels == 2) {
					o_right[i] = _right[r] || 0;
				}
		
			}
			return b;
		}
		SoundDecoder.prototype.load = function() {
			var _this = this;
			var audioContext = this.audioContext;
			var format = this.info.format;
			this.formatInfo = format;
			this.numSamples = this.info.numSamples;
			if (format.compression == "MP3") {
				try {
					var resultMP3Buffer = decodeMP3(audioContext, this.data, this.numSamples);
					if (_this.onload) {
						_this.onload({
							buffer: resultMP3Buffer
						});
					}
				} catch(e) {
					console.log("ERROR: MP3 failed");
					if (_this.onload) {
						_this.onload({
							buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate)
						});
					}
				}
				return;
			}
			var channels = (format.isStereo ? 2 : 1);
			this.byteStream = new ByteStream(this.data);

			var buffer;
			try {
				buffer = audioContext.createBuffer(channels, this.numSamples, format.sampleRate);
			} catch(e) {
				console.log(e);
				if (this.onload) {
					this.onload({
						buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate)
					});
				}
				return;
			}
			this.decodeFormat(format.compression, buffer, channels, 0, this.numSamples);
			if (this.onload) {
				this.onload({
					buffer
				});
			}
		}
		SoundDecoder.prototype.decodeFormat = function(compression, buffer, channels, pos_buffer, sample_length) {
			switch(compression) {
				case "uncompressed":
				case "uncompressedUnknownEndian":
					return this.decodePCM(buffer, channels, pos_buffer, sample_length);
				case "ADPCM":
					return this.decodeADPCM(buffer, channels, pos_buffer, sample_length);
				case "nellymoser":
					return this.decodeNellymoser(buffer, channels, pos_buffer);
				default:
					console.log("TODO", compression);
					return 0;
			}
		}
		// info.format.is16Bit
		// info.format.isStereo
		// info.format.sampleRate
		SoundDecoder.prototype.decodePCM = function(buffer, channels, pos_buffer, sample_length) {
			var _pos_buffer = pos_buffer || 0;
		
			var format = this.formatInfo;
			/// Decoder for PCM audio data in a Flash file.
			/// Flash exports this when you use the "Raw" compression setting.
			/// 8-bit unsigned or 16-bit signed PCM.
			var i = _pos_buffer;
			var _left = buffer.getChannelData(0);
			var _right = null;
			if (channels == 2) {
				_right = buffer.getChannelData(1);
			}
			var isEnd = false;
			let left = 0;
			let right = 0;
			while((i - _pos_buffer) < sample_length) {
				try {
					if (!isEnd) {
						var h = format.is16Bit ? (this.byteStream.readInt16() / 32768) : ((this.byteStream.readUint8() - 128) / 128);
						var j = 0;
						if (channels == 2) j = format.is16Bit ? (this.byteStream.readInt16() / 32768) : ((this.byteStream.readUint8() - 128) / 128);
						left = h;
						if (channels == 2) right = j;
					}
				} catch(e) {
					isEnd = true;
				}
				_left[i] = left;
				if (channels == 2) {
					_right[i] = right;
				}
				i++;
			}
			return i;
		}
		SoundDecoder.prototype.decodeADPCM = function(buffer, channels, pos_buffer, sample_length) {
			var byteStream = this.byteStream;
			let adpcmCodeSize = byteStream.getUIBits(2);
			let bits_per_sample = (adpcmCodeSize + 2);
			var _pos_buffer = pos_buffer || 0;
			var h = _pos_buffer;
			var _left = buffer.getChannelData(0);
			var _right = null;
			if (channels == 2) {
				_right = buffer.getChannelData(1);
			}
			var decoder = SoundDecoder.SAMPLE_DELTA_CALCULATOR[bits_per_sample - 2];
			var idxTable = SoundDecoder.INDEX_TABLE[bits_per_sample - 2];
			let num_channels = channels;
			var _channels = [{ sample: 0, stepIndex: 0 }, { sample: 0, stepIndex: 0 }];
			let sign_mask = (1 << (bits_per_sample - 1));
			var isEnd = false;
			let left = 0;
			let right = 0;
			var sample_num = 0;
			while((h - _pos_buffer) < sample_length) {
				try {
					if (!isEnd) {
						if (sample_num == 0) 
							for (let i = 0; i < num_channels; i++) {
								const ch = _channels[i];
								ch.sample = byteStream.getSIBits(16);
								ch.stepIndex = byteStream.getUIBits(6);
							}
						sample_num = (sample_num + 1) % 4095;
						for (let i2 = 0; i2 < num_channels; i2++) {
							const ch = _channels[i2];
							let step = SoundDecoder.STEP_TABLE[ch.stepIndex];
							let data = byteStream.getUIBits(bits_per_sample);
							let magnitude = (data & (sign_mask - 1));
							let delta = decoder(step, magnitude);
							if (data & sign_mask) ch.sample -= delta;
							else ch.sample += delta;
							if (ch.sample < -32768) ch.sample = -32768;
							if (ch.sample > 32767) ch.sample = 32767;
							ch.stepIndex += idxTable[magnitude];
							if (ch.stepIndex > 88) ch.stepIndex = 88;
							if (ch.stepIndex < 0) ch.stepIndex = 0;
						}
						left = _channels[0].sample;
						if (num_channels == 2) right = _channels[1].sample;
						
					}
				} catch(e) {
					// ignored
					isEnd = true;
				}
				_left[h] = left / 0x8000;
				if (num_channels == 2) _right[h] = right / 0x8000;
				h += 1;
			}
			return h;
		}
		SoundDecoder.prototype.decodeMP3 = function() {
		}
		SoundDecoder.prototype.decodeNellymoser = function(buffer) {
			JSNellymoserDecoder(buffer.getChannelData(0), this.data);
		}
		const SoundStreamDecoder = function(audioContext, streamInfo, blocks) {
			SoundDecoder.call(this, audioContext);
			this.streamInfo = streamInfo;
		
			var b = [];
			for (let i = 0; i < blocks.length; i++) {
				b.push(blocks[i].compressed);
			}
		
			this.blocks = b;
		}
		SoundStreamDecoder.prototype = Object.create(SoundDecoder.prototype);
		SoundStreamDecoder.prototype.constructor = SoundStreamDecoder;
		SoundStreamDecoder.prototype.load = function() {
			var _this = this;
		
			var audioContext = this.audioContext;
		
			var streamInfo = this.streamInfo;
		
			var blocks = this.blocks;
		
			var streamStream = streamInfo.stream;
			var streamPlayback = streamInfo.playback;
		
			var isMP3 = (streamStream.compression == "MP3");
			var idlimit = isMP3 ? 4 : 0;
		
			var gg1 = 0;
			for (var i = 0; i < blocks.length; i++) {
				var b1 = blocks[i];
				gg1 += (b1.byteLength - idlimit);
			}
			var gg = new Uint8Array(gg1);
			var idd = 0;
			for (var i = 0; i < blocks.length; i++) {
				var bb = blocks[i];
				var ui8view = new Uint8Array(bb);
				for (var i2 = idlimit; i2 < bb.byteLength; i2++) {
					gg[idd++] = ui8view[i2];
				}
			}
		
			var compressed = gg.buffer;
			if (compressed.byteLength > 0) {
				this.data = compressed;
				this.formatInfo = streamStream;
				this.numSamples = isMP3 ? getMP3Sample(blocks) : blocks.length * streamInfo.samplePerBlock;
				// _this.numSamples, _this.formatInfo.sampleRate, seekSample, channels
				if (isMP3) {
					var seekSample = streamInfo.latencySeek || 0;
					try {
						var resultMP3Buffer = decodeMP3(audioContext, this.data, this.numSamples, seekSample);
						if (_this.onload) {
							_this.onload({
								buffer: resultMP3Buffer
							});
						}
					} catch(e) {
						console.log("ERROR: MP3 failed");
						if (_this.onload) {
							_this.onload({
								buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate)
							});
						}
					}
					return;
				}
				var channels = (this.formatInfo.isStereo ? 2 : 1);
				this.byteStream = new ByteStream(this.data);
				var buffer;
				try {
					buffer = audioContext.createBuffer(channels, this.numSamples, streamStream.sampleRate);
				} catch(e) {
					console.log(e);
					if (this.onload) {
						this.onload({
							buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate)
						});
					}
					return;
				}
				this.decodeStreamFormat(streamStream.compression, buffer, channels, blocks, streamInfo.samplePerBlock);
				if (this.onload) {
					this.onload({
						buffer,
					});
				}
			} else {
				if (_this.onload) {
					_this.onload({
						buffer: audioContext.createBuffer(1, 1, audioContext.sampleRate)
					});
				}
			}
		}
		SoundStreamDecoder.prototype.decodeStreamFormat = function (compression, buffer, channels, blocks, sample_length) {
			if (compression == "nellymoser") {
				this.decodeNellymoser(buffer, channels, 0);
			} else {
				var oPos = 0;
				for (let i = 0; i < blocks.length; i++) {
					const block = blocks[i];
					this.data = block;
					this.byteStream = new ByteStream(this.data);
					var posBuffer = this.decodeFormat(compression, buffer, channels, oPos, sample_length);
					oPos = posBuffer;
				}
			}
		}
		
		function loadSound(audioContext, sound, callback) {
			var sd = new SoundDecoder(audioContext);
			sd.info = sound;
			sd.data = sound.data;
			sd.onload = function(buf) {
				callback(buf);
			}
			sd.load();
		}
		function loadSoundStream(audioContext, streamInfo, blocks, callback) {
			var sd = new SoundStreamDecoder(audioContext, streamInfo, blocks);
			sd.onload = function(buf) {
				callback(buf);
			}
			sd.load();
		}
		wpjsm.exportJS = {
			loadSound,
			loadSoundStream
		}
	},
	"src/avm1/objects/ScriptObject.js": function(wpjsm){
		const Avm1Property = wpjsm.importJS("src/avm1/Property.js");
		const Avm1ValueTypes = wpjsm.importJS("src/avm1/ValueTypes.js");
		
		class Avm1ScriptObject {
			constructor() {
				this.properties = new Avm1Property();
			}
			defineValue(name, value, a) {
		
			}
			callMethod(_name, _activation, _this, _args) {
				return Avm1ValueTypes.originalUndefined;
			}
		}
		wpjsm.exportJS = Avm1ScriptObject;
	},
	"src/avm1/Activation.js": function(wpjsm){
		const Avm1ValueTypes = wpjsm.importJS("src/avm1/ValueTypes.js");
		
		const Avm1ReturnType = {
			implicit: 0,
			explicit: 1
		};
		const Avm1FrameControl = {
			continue: 0,
			return: 1
		};
		const Avm1Activation = function(avm1, caches, clip) {
			this.avm1 = avm1;
			this.clip = clip;
			this.spoce = null;
			this.caches = caches;
			this.pos = 0;
			this.stack = [];
		
			this.variables = Object.create(null);
		
			this.registers = [
				Avm1ValueTypes.originalUndefined,
				Avm1ValueTypes.originalUndefined,
				Avm1ValueTypes.originalUndefined,
				Avm1ValueTypes.originalUndefined,
			];
		
			this.parent = null;
		
			this.constantPool = [];
		}
		Avm1Activation.actionLibrary = Object.create(null);
		
		Avm1Activation.prototype.push = function(value) {
			return this.stack.push(value);
		}
		Avm1Activation.prototype.pop = function() {
			return this.stack.pop();
		}
		Avm1Activation.prototype.setConstantPool = function(constantPool) {
			this.constantPool = constantPool;
		}
		
		Avm1Activation.prototype.getCurrentRegister = function(id) {
			return this.localRegister(id);
		}
		Avm1Activation.prototype.setCurrentRegister = function(id, value) {
			this.setLocalRegister(id, value);
		}
		Avm1Activation.prototype.hasLocalRegister = function(id) {
			return id in this.register;
		}
		Avm1Activation.prototype.localRegister = function(id) {
			return this.register[id];
		}
		Avm1Activation.prototype.setLocalRegister = function(id, value) {
			this.register[id] = value;
		}
		Avm1Activation.prototype.getVariable = function(name) {
			var obj = this.clip.getObject();
			if (obj.hasProp(name)) {
				return obj.getProp(name);
			} else {
				console.log("TODO", name, obj);
				return Avm1ValueTypes.originalUndefined;
			}
		}
		Avm1Activation.prototype.setVariable = function(name, value) {
			var obj = this.clip.getObject();
			obj.setProp(name, value);
		}
		
		Avm1Activation.prototype.setLocalRegister = function(id, value) {
			this.register[id] = value;
		}
		
		Avm1Activation.prototype.stackPush = function(value) {
			// Note that there currently exists a subtle issue with this logic:
			// If the cached `Object` in a `MovieClipReference` becomes invalidated, causing it to switch back to path-based object resolution,
			// it should *never* switch back to cache-based resolution
			// However, currently if a `MovieClipReference` in this invalidated-cache state is converted back to an `Object`, such as when passed as an argument to a function,
			// if it pushed back onto the stack then it will be converted into a new `MovieClipReference`, causing it to switch back to cache-based resolution
			// Fixing this will require a thorough refactor of AVM1 to store `Either<MovieClipReference, Object>
			// can refer to a MovieClip
			// There is a ignored test for this issue of "reference laundering" at "avm1/string_paths_reference_launder"
			var _value;
			_value = value;
			this.push(_value);
		}
		
		Avm1Activation.prototype.runActions = function() {
			var caches = this.caches;
			var cLength = caches.length;
			//console.log(caches);
			this.pos = 0;
			while(this.pos < cLength) { 
				var aScript = caches[this.pos];
				var result = this.doAction(aScript);
				if (result) {
					if (result[0] === 1) {
						if (result[1] === 1) {
							return result[2];
						} else {
							return Avm1ValueTypes.originalUndefined;
						}
					}
				} else {
					//console.log(aScript);
					//console.log(Avm1Activation.actionLibrary[aScript.opcode]);
					return Avm1ValueTypes.originalUndefined;
				}
				this.pos = aScript.end;
			}
		}
		Avm1Activation.prototype.doAction = function(aScript) {
			var actionCode = aScript.opcode;
			var actionFunc = Avm1Activation.actionLibrary[actionCode];
			if (actionFunc) {
				return actionFunc(this, aScript);
			}
		}
		const actionLibrary = Avm1Activation.actionLibrary;
		actionLibrary[0x00] = function(activation, aScript) { // ActionEnd
			return [Avm1FrameControl.return, Avm1ReturnType.implicit];
		}
		// SWFv3
		actionLibrary[0x81] = function(activation, aScript) { // ActionGotoFrame
			activation.clip.gotoFrame(aScript.frame + 1, true);
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x83] = function(activation, aScript) { // ActionGetURL
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x04] = function(activation, aScript) { // ActionNextFrame
			activation.clip.nextFrame();
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x05] = function(activation, aScript) { // ActionPreviousFrame
			activation.clip.prevFrame();
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x06] = function(activation, aScript) { // ActionPlay
			activation.clip.play();
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x07] = function(activation, aScript) { // ActionStop
			activation.clip.stop();
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x08] = function(activation, aScript) { // ActionToggleQuality
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x09] = function(activation, aScript) { // ActionStopSounds
			activation.avm1.movieplayer.stopAllSounds();
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x8A] = function(activation, aScript) { // ActionWaitForFrame
			console.log("WaitForFrame");
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x8B] = function(activation, aScript) { // ActionSetTarget
			return [Avm1FrameControl.continue];
		}
		
		// SWFv4
		actionLibrary[0x96] = function(activation, aScript) { // ActionPush
			var values = aScript.values;
			var length = values.length;
			for (var i = 0; i < length; i++) {
				var value = values[i];
				var type = value.type;
				var result = value.value;
				switch (type) {
					case 1:
					case 6:
					case 7:
						activation.push([Avm1ValueTypes.Number, result]); // result
						break;
					case 2:
						activation.push(Avm1ValueTypes.originalUndefined);
						break;
					case 3:
						activation.push(Avm1ValueTypes.originalNull);
						break;
					case 0:
						activation.push([Avm1ValueTypes.String, result]);
						break;
					case 5:
						activation.push([Avm1ValueTypes.Bool, result]);
						break;
					case 8:
					case 9:
						if (result in activation.constantPool) {
							activation.push([Avm1ValueTypes.String, activation.constantPool[result]]);
						} else {
							activation.push(Avm1ValueTypes.originalUndefined);
							console.log("ActionPush: constantPool missing: " + result);
						}
						break;
					case 4:
						activation.push(activation.getCurrentRegister(result));
						break;
				}
			}
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x17] = function(activation, aScript) { // ActionPop
			activation.pop();
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x0A] = function(activation, aScript) { // ActionAdd
			/*let a = activation.pop();
			let b = activation.pop();
			let result = activation.avm1.valueToF64(b) + activation.avm1.valueToF64(a);
			activation.push(new Avm1ValueNumber(result, activation.avm1));
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x0B] = function(activation, aScript) { // ActionSubtract
		
		}
		actionLibrary[0x0C] = function(activation, aScript) { // ActionMultiply
		
		}
		actionLibrary[0x0D] = function(activation, aScript) { // ActionDivide
		
		}
		actionLibrary[0x0E] = function(activation, aScript) { // ActionEquals
		
		}
		actionLibrary[0x0F] = function(activation, aScript) { // ActionLess
		
		}
		actionLibrary[0x10] = function(activation, aScript) { // ActionAnd
		
		}
		actionLibrary[0x11] = function(activation, aScript) { // ActionOr
		
		}
		actionLibrary[0x12] = function(activation, aScript) { // ActionNot
		
		}
		actionLibrary[0x13] = function(activation, aScript) { // ActionStringEquals
		
		}
		actionLibrary[0x14] = function(activation, aScript) { // ActionStringLength
		
		}
		actionLibrary[0x21] = function(activation, aScript) { // ActionStringAdd
		
		}
		actionLibrary[0x15] = function(activation, aScript) { // ActionStringExtract
		
		}
		actionLibrary[0x29] = function(activation, aScript) { // ActionStringLess
		
		}
		actionLibrary[0x31] = function(activation, aScript) { // ActionMBStringLength
		
		}
		actionLibrary[0x35] = function(activation, aScript) { // ActionMBStringExtract
		
		}
		actionLibrary[0x18] = function(activation, aScript) { // ActionToInteger
			let value = activation.pop();
			let result = activation.avm1.valueToI32(value);
			activation.push([Avm1ValueTypes.Number, result]);
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x32] = function(activation, aScript) { // ActionCharToAscii
		
		}
		actionLibrary[0x33] = function(activation, aScript) { // ActionAsciiToChar
		
		}
		actionLibrary[0x36] = function(activation, aScript) { // ActionCharToAscii
		
		}
		actionLibrary[0x37] = function(activation, aScript) { // ActionAsciiToChar
		
		}
		actionLibrary[0x99] = function(activation, aScript) { // ActionJump
		
		}
		actionLibrary[0x9D] = function(activation, aScript) { // ActionIf
		
		}
		actionLibrary[0x9E] = function(activation, aScript) { // ActionCall
		
		}
		actionLibrary[0x1C] = function(activation, aScript) { // ActionGetVariable
			/*let name = activation.avm1.valueToString(activation.pop());
			let value = activation.getVariable(name);
			activation.push(value);
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x1D] = function(activation, aScript) { // ActionSetVariable
			/*
			// Flash 4-style variable
			let value = activation.pop();
			let var_path_val = activation.pop();
			let var_path = activation.avm1.valueToString(var_path_val);
			activation.setVariable(var_path, value);
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x9A] = function(activation, aScript) { // ActionGetURL2
		
		}
		actionLibrary[0x9F] = function(activation, aScript) { // ActionGoToFrame2
		
		}
		actionLibrary[0x20] = function(activation, aScript) { // ActionSetTarget2
		
		}
		actionLibrary[0x22] = function(activation, aScript) { // ActionGetProperty
		
		}
		actionLibrary[0x23] = function(activation, aScript) { // ActionSetProperty
		
		}
		actionLibrary[0x24] = function(activation, aScript) { // ActionCloneSprite
		
		}
		actionLibrary[0x25] = function(activation, aScript) { // ActionRemoveSprite
		
		}
		actionLibrary[0x27] = function(activation, aScript) { // ActionStartDrag
		
		}
		actionLibrary[0x28] = function(activation, aScript) { // ActionEndDrag
		
		}
		actionLibrary[0x8D] = function(activation, aScript) { // ActionWaitForFrame2
		
		}
		actionLibrary[0x26] = function(activation, aScript) { // ActionTrace
			var value = activation.pop();
			console.log("[trace]", value);
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x34] = function(activation, aScript) { // ActionGetTime
		
		}
		actionLibrary[0x30] = function(activation, aScript) { // ActionRandomNumber
			let max = activation.avm1.valueToF64(activation.pop());
			let result = (max > 0) ? (Math.random() * max) : 0;
			activation.push([Avm1ValueTypes.Number, result]);
			return [Avm1FrameControl.continue];
		}
		
		// SWFv5
		actionLibrary[0x3d] = function(activation, aScript) { // ActionCallFunction
			console.log(activation);
		}
		actionLibrary[0x52] = function(activation, aScript) { // ActionCallMethod
			/*var methodName = activation.pop();
			var objectVal = activation.pop();
			var count = activation.avm1.valueToF64(activation.pop());
			var params = [];
			if (count > 0) {
				while (count) {
					count--;
					var param = activation.pop();
					params[params.length] = param;
				}
			}
			console.log(methodName, objectVal, count, params);
		
			// Can not call method on undefined/null.
			if ((objectVal === Avm1ValueUndefined) || (objectVal === Avm1ValueNull)) {
				activation.stackPush(Avm1ValueUndefined)
				return [Avm1FrameControl.continue];
			}
		
			var _methodName;
			_methodName = activation.avm1.valueToString(methodName);
		
			var result = Avm1ValueUndefined;
			if (_methodName == "play") {
				if (objectVal instanceof Avm1MovieClip) {
					objectVal.clip.play();
				}
			}
			activation.push(result);
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x88] = function(activation, aScript) { // ActionConstantPool
			activation.setConstantPool(aScript.strings);
			return [Avm1FrameControl.continue];
		}
		actionLibrary[0x8e] = function(activation, aScript) { // ActionDefineFunction
			/*var func = activation.avm1.fromSwfFunction(activation, aScript.actions);
			var funcObj = activation.avm1.createFunction();
			funcObj.func = func;
			if (aScript.name.length) {
				console.log("!", aScript);
				//this.targetClip().setVariable(aScript.name, funcObj);
			} else {
				activation.push(funcObj);
			}
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x3c] = function(activation, aScript) { // ActionDefineLocal
		
		}
		actionLibrary[0x41] = function(activation, aScript) { // ActionDefineLocal2
		
		}
		actionLibrary[0x3a] = function(activation, aScript) { // ActionDelete
		
		}
		actionLibrary[0x3b] = function(activation, aScript) { // ActionDelete2
		
		}
		actionLibrary[0x46] = function(activation, aScript) { // ActionEnumerate
		
		}
		actionLibrary[0x49] = function(activation, aScript) { // ActionEquals2
		
		}
		actionLibrary[0x4e] = function(activation, aScript) { // ActionGetMember
			/*var nameVal = activation.pop();
			var name = activation.avm1.valueToString(nameVal);
			var objectVal = activation.pop();
			var result = activation.avm1.objectGetPropertyOnSlashPath(objectVal, name);
			activation.stackPush(result);
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x42] = function(activation, aScript) { // ActionInitArray
		
		}
		actionLibrary[0x43] = function(activation, aScript) { // ActionInitObject
			/*var number = activation.avm1.valueToF64(activation.pop());
			var object = activation.avm1.createNewObject();
			if (number > 0) {
				while (number--) {
					var value = activation.pop();
					var property = activation.avm1.valueToString(activation.pop());
					object.setProp(property, value);
				}
			}
			activation.push(object);
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x53] = function(activation, aScript) { // ActionNewMethod
		
		}
		actionLibrary[0x40] = function(activation, aScript) { // ActionNewObject
		
		}
		actionLibrary[0x4f] = function(activation, aScript) { // ActionSetMember
			/*var value = activation.pop();
			var nameVal = activation.pop();
			var name = activation.avm1.valueToString(nameVal);
			var object = activation.pop();
			activation.avm1.objectSetProperty(object, name, value);
			return [Avm1FrameControl.continue];*/
		}
		actionLibrary[0x45] = function(activation, aScript) { // ActionTargetPath
		
		}
		actionLibrary[0x94] = function(activation, aScript) { // ActionWith
		
		}
		actionLibrary[0x4a] = function(activation, aScript) { // ActionToNumber
		
		}
		actionLibrary[0x4b] = function(activation, aScript) { // ActionToString
		
		}
		actionLibrary[0x44] = function(activation, aScript) { // ActionTypeOf
		
		}
		actionLibrary[0x47] = function(activation, aScript) { // ActionAdd2
		
		}
		actionLibrary[0x48] = function(activation, aScript) { // ActionLess2
		
		}
		actionLibrary[0x3f] = function(activation, aScript) { // ActionModulo
		
		}
		actionLibrary[0x60] = function(activation, aScript) { // ActionBitAnd
		
		}
		actionLibrary[0x63] = function(activation, aScript) { // ActionBitLShift
		
		}
		actionLibrary[0x61] = function(activation, aScript) { // ActionBitOr
		
		}
		actionLibrary[0x64] = function(activation, aScript) { // ActionBitRShift
		
		}
		actionLibrary[0x65] = function(activation, aScript) { // ActionBitURShift
		
		}
		actionLibrary[0x62] = function(activation, aScript) { // ActionBitXor
		
		}
		actionLibrary[0x51] = function(activation, aScript) { // ActionDecrement
		
		}
		actionLibrary[0x50] = function(activation, aScript) { // ActionIncrement
		
		}
		actionLibrary[0x4c] = function(activation, aScript) { // ActionPushDuplicate
		
		}
		actionLibrary[0x3e] = function(activation, aScript) { // ActionReturn
			/*let returnValue = activation.pop();
			return [Avm1FrameControl.return, Avm1ReturnType.explicit, returnValue];*/
		}
		actionLibrary[0x4d] = function(activation, aScript) { // ActionStackSwap
		
		}
		actionLibrary[0x87] = function(activation, aScript) { // ActionStoreRegister
		
		}
		
		// SWFv6
		actionLibrary[0x54] = function(activation, aScript) { // ActionInstanceOf
		
		}
		actionLibrary[0x55] = function(activation, aScript) { // ActionEnumerate2
		
		}
		actionLibrary[0x66] = function(activation, aScript) { // ActionStrictEquals
		
		}
		actionLibrary[0x67] = function(activation, aScript) { // ActionGreater
		
		}
		actionLibrary[0x68] = function(activation, aScript) { // ActionStringGreater
		
		}
		
		// SWFv7
		actionLibrary[0x9b] = actionLibrary[0x8e]; // ActionDefineFunction2
		actionLibrary[0x69] = function(activation, aScript) { // ActionExtends
		
		}
		actionLibrary[0x2b] = function(activation, aScript) { // ActionCastOp
		
		}
		actionLibrary[0x2c] = function(activation, aScript) { // ActionImplementsOp
		
		}
		actionLibrary[0x8f] = function(activation, aScript) { // ActionTry
		
		}
		actionLibrary[0x2a] = function(activation, aScript) { // ActionThrow
		
		}
		wpjsm.exportJS = Avm1Activation;
	},
	"src/avm1/Object.js": function(wpjsm){
		class Avm1Object {
			constructor(scriptObject) {
				this.scriptObject = scriptObject;
			}
			hasProp(name) {
				
			}
			getProp(name) {
				
			}
			setProp(name, value) {
		
			}
		}
		wpjsm.exportJS = Avm1Object;
	},
	"src/avm1/Property.js": function(wpjsm){

		class Avm1Property {
			constructor() {
				this.props = Object.create(null);
			}
			hasProp(name) {
				return name in this.props;
			}
			getProp(name) {
				return this.props[name];
			}
			setProp(name, info) {
				this.props[name] = info;
			}
			deleteProp(name) {
				delete this.props[name];
			}
		}
		
		wpjsm.exportJS = Avm1Property;
	},
	"src/avm1/ValueTypes.js": function(wpjsm){
		const originalUndefined = [0];
		const originalNull = [1];
		
		const Types = {
			Undefined: 0,
			Null: 1,
			Bool: 2, // bool
			Number: 3, // f64
			String: 4, // AvmString
			Object: 5, // Object
			MovieClip: 6, // MovieClipReference
		}
		
		Types.originalUndefined = originalUndefined;
		Types.originalNull = originalNull;
		
		
		wpjsm.exportJS = Types;
	},
	"src/display_objects/InteractiveObject.js": function(wpjsm){
		const DisplayObject = wpjsm.importJS("src/DisplayObject.js");
		
		class InteractiveObject extends DisplayObject {
			constructor() {
				super();
				this.displayType = "InteractiveObject";
				this._mouseEnabled = true;
			}
			isInteractive() {
				return true;
			}
		}
		
		wpjsm.exportJS = InteractiveObject;
	},
	"src/display_objects/DisplayObjectContainer.js": function(wpjsm){
		const InteractiveObject = wpjsm.importJS("src/display_objects/InteractiveObject.js");
		
		class DisplayObjectContainer extends InteractiveObject {
			constructor() {
				super();
				this.displayType = "Container";
				this.renderList = [];
				this.depthList = [];
			}
			// renderList
			numChildren() {
				return this.renderList.length;
			}
			replaceId(id, child) {
				this.renderList[id] = child;
			}
			insertId(id, child) {
				if (this.renderList.length) {
					if (id >= this.renderList.length) {
						this.renderList.push(child);
					} else {
						this.renderList.splice(id, 0, child);
					}
				} else {
					this.renderList.push(child);
				}
			}
			pushId(child) {
				this.renderList.push(child);
			}
			removeId(id) {
				if (this.renderList.length) {
					if (id >= this.renderList.length) {
						this.renderList.pop();
					} else {
						this.renderList.splice(id, 1);
					}
				}
			}
			isContainer() {
				return true;
			}
			replaceAtDepth(depth, child) {
				var prevChild = this.insertChildIntoDepthList(depth, child);
				if (prevChild) {
					console.log(prevChild);
				}
				var aboveChild = null;
				for (let i = 0; i < this.depthList.length; i++) {
					const c = this.depthList[i];
					if (c && (i !== depth)) {
						if (i > depth) {
							aboveChild = c;
							break;
						}
					}
				}
				if (aboveChild) {
					var rs = this.renderList.indexOf(aboveChild);
					if (rs >= 0) {
						this.insertId(rs, child);
					} else {
						this.pushId(child);
					}
				} else {
					this.pushId(child);
				}
			}
			childByDepth(depth) {
				return this.depthListGetDepth(depth);
			}
			removeChild(child) {
				this.removeChildDirectly(child);
			}
			removeChildDirectly(child) {
				// Remove the child from the depth list, before moving it to a negative depth
				this.removeChildFromDepthList(child);
				this.removeChildFromRenderList(child);
		
				child.avm1Unload();
			}
			removeChildFromDepthList(child) {
				let depth = child.getDepth();
				delete this.depthList[depth];
			}
			removeChildFromRenderList(child) {
				var rs = this.renderList.indexOf(child);
				if (rs >= 0) {
					this.removeId(rs);
				} else {
					console.log(child);
				}
			}
			insertChildIntoDepthList(depth, child) {
				var r = this.depthList[depth];
				this.depthList[depth] = child;
				return r;
			}
			depthListGetDepth(depth) {
				return this.depthList[depth];
			}
			iterRenderList() {
				return this.renderList.slice(0);
			}
			updatePendingRemovals() {
				var chs = this.iterRenderList();
				for (let i = 0; i < chs.length; i++) {
					const c = chs[i];
					if (c.isAvm1PendingRemoval()) {
					}
				}
			}
			selfBounds() {
				var children = this.iterRenderList();
				var no = Number.MAX_VALUE;
				var xMax = -no;
				var yMax = -no;
				var xMin = no;
				var yMin = no;
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					var matrix2 = child.getMatrix();
					var b = this.boundsMatrix(child.selfBounds(), matrix2);
					xMin = Math.min(xMin, b.xMin);
					xMax = Math.max(xMax, b.xMax);
					yMin = Math.min(yMin, b.yMin);
					yMax = Math.max(yMax, b.yMax);
				}
				if (!children.length) {
					xMin = 20;
					yMin = 20;
					xMax = -20;
					yMax = -20;
				}
				return { xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
			}
			/// Renders the children of this container in render list order.
			renderChildren() {
				let clipDepth = 0;
				let clipDepthStack = [];

				var children = this.iterRenderList();

				var renderer = this.movieplayer.renderer;

				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					let depth = child.getDepth();
					while ((clipDepth > 0) && (depth > clipDepth)) {
						let [prevClipDepth, clipChild] = clipDepthStack.pop();
						clipDepth = prevClipDepth;
						renderer.deactivateMask();
						clipChild.render();
						renderer.popMask();
					}
					if (child.clipDepth > 0) {
						clipDepthStack.push([clipDepth, child]);
						clipDepth = child.clipDepth;
						renderer.pushMask();
						child.render();
						renderer.activateMask();
					} else if (child.getVisible() || renderer.drawingMask()) {
						child.render();
					}
				}
				for (let j = clipDepthStack.length - 1; j >= 0; j--) {
					renderer.deactivateMask();
					clipDepthStack[j][1].render();
					renderer.popMask();
				}
			}
			debugRender(ctx) {
				this.movieplayer.debugTransformStack.stackPush(this.getRenderMatrix(), this.getRenderColorTransform());
				var children = this.iterRenderList();
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					if (child.getVisible()) {
						child.debugRender(ctx);
					}
				}
				if (!this.isRoot()) {
					var b = this.selfBounds();
					if (this.movieplayer.useLastBound) {
						this.debugSetLastBound(false, b);
						b = this._debug_boundsLast;
					}
					var bm = this.boundsMatrix(b, this.movieplayer.debugTransformStack.getMatrix());
					var coll = this._debug_colorDisplayType;
					this.movieplayer.transformStack.stackPush([1, 0, 0, 1, 0, 0], this.movieplayer.debugTransformStack.getColorTransform());
					this.movieplayer.transformStack.stackPush([1, 0, 0, 1, 0, 0], [coll[0] / 255, coll[1] / 255, coll[2] / 255, coll[3], 0, 0, 0, 0]);
					this.movieplayer.drawTextW(bm.xMin, bm.yMin - (28 * this.movieplayer.getScaleBoundsText()), (0.25 * this.movieplayer.getScaleBoundsText()), this.getDisplayName());
					this.movieplayer.transformStack.stackPop();
					this.movieplayer.transformStack.stackPush([(bm.xMax - bm.xMin) / 100, 0, 0, (bm.yMax - bm.yMin) / 100, bm.xMin, bm.yMin], [0, 0, 0, 1, 0, 0, 0, 0]);
					ctx.setColorTransform(...this.movieplayer.transformStack.getColorTransform());
					ctx.setTransform(...this.movieplayer.transformStack.getMatrix());
					ctx.renderShape(this.movieplayer.debugRectLineShapeRender);
					this.movieplayer.transformStack.stackPop();
					this.movieplayer.transformStack.stackPop();
				}
				this.movieplayer.debugTransformStack.stackPop();
			}
			takeHitButton(x, y) {
				this.movieplayer.buttomTransformStack.stackPush(this.getMatrix(), [1, 1, 1, 1, 0, 0, 0, 0]);
				var children = this.iterRenderList();
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					child.takeHitButton(x, y);
				}
				this.movieplayer.buttomTransformStack.stackPop();
			}
		}
		
		wpjsm.exportJS = DisplayObjectContainer;
	},
	"src/display_objects/Shape.js": function(wpjsm){
		const DisplayObject = wpjsm.importJS("src/DisplayObject.js");
		const shapeUtils = wpjsm.importJS("src/utils/shapeUtils.js");
		
		class Shape extends DisplayObject {
			constructor() {
				super();
				this.shapeData = null;
				this.displayType = "Shape";
				this._debug_colorDisplayType = [0, 0, 255, 1];
			}
			static createNew(movieplayer) {
				var shape = new Shape();
				shape.movieplayer = movieplayer;
				return shape;
			}
			static fromSwfTag(movieplayer, tag) {
				return new ShapeData(movieplayer, tag);
			}
			init(shapeData) {
				if (!shapeData) return;
				this.setId(shapeData.characterId);
				this.shapeData = shapeData;
			}
			replaceWith(characterId) {
				this.init(this.movieplayer.library.characterById(characterId));
			}
			postInstantiation(initObject, instantiatedBy, runFrame) {
				this.movieplayer.avm1.addExecuteList(this);
			}
			runFrameAvm1() {
				// Noop
			}
			selfBounds() {
				var r = this.shapeData.bounds;
				return r;
			}
			renderSelf() {
				this.shapeData.render();
			}
		}
		
		
		class ShapeData {
			constructor(movieplayer, data) {
				this.displayType = "shape";
				this.movieplayer = movieplayer;
				this.data = data;
				this.characterId = data.id;
				this.bounds = data.bounds;
				this.shapeRender = null;
			}
			getShape() {
				if (!this.shapeRender) {
					var resultShape = shapeUtils.convert(this.data.shapes, "shape");
					this.shapeRender = this.movieplayer.registerShape(resultShape);
				}
				return this.shapeRender;
			}
			getCache() {
			}
			instantiate() {
				var shape = Shape.createNew(this.movieplayer);
				shape.init(this);
				return shape;
			}
			render() {
				var m2 = this.movieplayer.transformStack.getMatrix();
				var rColorTransform = this.movieplayer.transformStack.getColorTransform();
				this.movieplayer.renderShape(this.getShape(), m2, rColorTransform);
			}
		}
		
		wpjsm.exportJS = Shape;
	},
	"src/display_objects/MorphShape.js": function(wpjsm){
		const DisplayObject = wpjsm.importJS("src/DisplayObject.js");
		const shapeUtils = wpjsm.importJS("src/utils/shapeUtils.js");
		
		function cloneObject(src) {
			return JSON.parse(JSON.stringify(src));
		}
		
		class MorphShape extends DisplayObject {
			constructor() {
				super();
				this.morphShapeData = null;
				this.ratio = 0;
				this.displayType = "MorphShape";
				this._debug_colorDisplayType = [0, 255, 255, 1];
			}
			static createNew(movieplayer) {
				var shape = new MorphShape();
				shape.movieplayer = movieplayer;
				return shape;
			}
			static fromSwfTag(movieplayer, tag) {
				return new MorphShapeStatic(movieplayer, tag);
			}
			init(morphShapeData) {
				if (!morphShapeData) return;
				this.setId(morphShapeData.characterId);
				this.morphShapeData = morphShapeData;
			}
			replaceWith(characterId) {
				this.init(this.movieplayer.library.characterById(characterId));
			}
			runFrameAvm1() {
				// Noop
			}
			setRatio(ratio) {
				this.ratio = ratio;
			}
			selfBounds() {
				var frame = this.morphShapeData.getFrame(this.ratio);
				return frame.bounds;
			}
			renderSelf() {
				this.morphShapeData.render(this.ratio);
			}
		}
		
		class MorphShapeStatic {
			constructor(movieplayer, data) {
				this.displayType = "morphshape";
				this.movieplayer = movieplayer;
				this.data = data;
				this.characterId = data.id;
				this.morphCaches = [];
			}
			getShape(ratio) {
				var frame = this.getFrame(ratio);
				if (!frame.shapeRender) {
					var resultCache = shapeUtils.convert(frame.shape, "morphshape");
					frame.shapeRender = this.movieplayer.registerShape(resultCache);
				}
				return frame.shapeRender;
			}
			instantiate() {
				var shape = MorphShape.createNew(this.movieplayer);
				shape.init(this);
				return shape;
			}
			render(ratio) {
				var m2 = this.movieplayer.transformStack.getMatrix();
				var rColorTransform = this.movieplayer.transformStack.getColorTransform();
				var renderShape = this.getShape(ratio);
				this.movieplayer.renderShape(renderShape, m2, rColorTransform);
			}
			getFrame(ratio) {
				if (!this.morphCaches[ratio]) {
					this.morphCaches[ratio] = this.buildMorphFrame(ratio / 65535);
				}
				return this.morphCaches[ratio];
			}
			lerpTwips(start, end, per) {
				var startPer = 1 - per;
				return (start * startPer) + (end * per);
			}
			lerpColor(startColor, endColor, per) {
				// f32 -> u8 cast is defined to saturate for out of bounds values,
				// so we don't have to worry about clamping.
				var startPer = 1 - per;
				var result = [
					Math.floor(startColor[0] * startPer + endColor[0] * per),
					Math.floor(startColor[1] * startPer + endColor[1] * per),
					Math.floor(startColor[2] * startPer + endColor[2] * per),
					startColor[3] * startPer + endColor[3] * per
				];
				return result;
			}
			lerpMatrix(startMatrix, endMatrix, per) {
				var startPer = 1 - per;
				var result = [
					startMatrix[0] * startPer + endMatrix[0] * per,
					startMatrix[1] * startPer + endMatrix[1] * per,
					startMatrix[2] * startPer + endMatrix[2] * per,
					startMatrix[3] * startPer + endMatrix[3] * per,
					startMatrix[4] * startPer + endMatrix[4] * per,
					startMatrix[5] * startPer + endMatrix[5] * per
				];
				return result;
			}
			lerpFill(fillStyle, per) {
				var fillStyleType = fillStyle.type;
				if (fillStyleType === 0x00) {
					return {
						color: this.lerpColor(fillStyle.startColor, fillStyle.endColor, per),
						type: fillStyleType
					};
				} else {
					if (fillStyleType == 0x40 || fillStyleType == 0x41 || fillStyleType == 0x42 || fillStyleType == 0x43) {
						return {
							bitmapId: fillStyle.bitmapId,
							bitmapMatrix: this.lerpMatrix(fillStyle.bitmapStartMatrix, fillStyle.bitmapEndMatrix, per),
							isSmoothed: fillStyle.isSmoothed,
							isRepeating: fillStyle.isRepeating,
							type: fillStyleType
						};
					} else {
						var gradient = fillStyle.gradient;
						if (!gradient) {
							gradient = fillStyle.linearGradient;
						}
						if (!gradient) {
							gradient = fillStyle.radialGradient;
						}
						var focalPoint = 0;
						if (fillStyleType == 19) {
							focalPoint = this.lerpTwips(fillStyle.startFocalPoint, fillStyle.endFocalPoint, per);
						}
						var gRecords = [];
						var GradientRecords = gradient.gradientRecords;
						for (var gIdx = 0; gIdx < GradientRecords.length; gIdx++) {
							var gRecord = GradientRecords[gIdx];
							gRecords[gIdx] = {
								color: this.lerpColor(gRecord.startColor, gRecord.endColor, per),
								ratio: this.lerpTwips(gRecord.startRatio, gRecord.endRatio, per)
							};
						}
						return {
							gradient: {
								matrix: this.lerpMatrix(gradient.startMatrix, gradient.endMatrix, per),
								gradientRecords: gRecords,
								spreadMode: gradient.spreadMode,
								interpolationMode: gradient.interpolationMode
							},
							focalPoint,
							type: fillStyleType
						};
					}
				}
			}
			lerpLine(lineStyle, per) {
				var width = this.lerpTwips(lineStyle.startWidth, lineStyle.endWidth, per);
				if (lineStyle.fillType) {
					return {
						width: width,
						fillType: this.lerpFill(lineStyle.fillType, per)
					};
				} else {
					return {
						width: width,
						color: this.lerpColor(lineStyle.startColor, lineStyle.endColor, per)
					};
				}
			}
			buildEdges(per) {
				var startPer = 1 - per;
		
				var startPosition = { x: 0, y: 0 };
				var endPosition = { x: 0, y: 0 };
		
				// TODO: Feels like this could be cleaned up a bit.
				// We step through both the start records and end records, interpolating edges pairwise.
				// Fill style/line style changes should only appear in the start records.
				// However, StyleChangeRecord move_to can appear it both start and end records,
				// and not necessarily in matching pairs; therefore, we have to keep track of the pen position
				// in case one side is missing a move_to; it will implicitly use the last pen position.
				var StartRecords = cloneObject(this.data.startEdges);
				var EndRecords = cloneObject(this.data.endEdges);
		
				var StartRecordLength = StartRecords.length;
				var EndRecordLength = EndRecords.length;
				var length = Math.max(StartRecordLength, EndRecordLength);
				for (var i = 0; i < length; i++) {
					var addRecode = {};
					var StartRecord = StartRecords[i];
					var EndRecord = EndRecords[i];
					if (!StartRecord || !EndRecord) {
						continue;
					}
					if (!StartRecord.isChange && !EndRecord.isChange) {
						if (StartRecord.isCurved) {
							startPosition.x += StartRecord.controlDeltaX + StartRecord.anchorDeltaX;
							startPosition.y += StartRecord.controlDeltaY + StartRecord.anchorDeltaY;
						} else {
							startPosition.x += StartRecord.deltaX;
							startPosition.y += StartRecord.deltaY;
						}
						if (EndRecord.isCurved) {
							endPosition.x += EndRecord.controlDeltaX + EndRecord.anchorDeltaX;
							endPosition.y += EndRecord.controlDeltaY + EndRecord.anchorDeltaY;
						} else {
							endPosition.x += EndRecord.deltaX;
							endPosition.y += EndRecord.deltaY;
						}
						continue;
					}
					if (StartRecord.isChange && !EndRecord.isChange) {
						addRecode = {
							fillStyle0: StartRecord.fillStyle0,
							fillStyle1: StartRecord.fillStyle1,
							lineStyle: StartRecord.lineStyle,
							stateFillStyle0: StartRecord.stateFillStyle0,
							stateFillStyle1: StartRecord.stateFillStyle1,
							stateLineStyle: StartRecord.stateLineStyle,
							stateMoveTo: StartRecord.stateMoveTo,
							stateNewStyles: StartRecord.stateNewStyles,
							isChange: true
						};
						if (StartRecord.stateMoveTo) {
							addRecode.moveX = endPosition.x;
							addRecode.moveY = endPosition.y;
							startPosition.x = StartRecord.moveX;
							startPosition.y = StartRecord.moveY;
						}
						EndRecords.splice(i, 0, addRecode);
					} else if (!StartRecord.isChange && EndRecord.isChange) {
						addRecode = {
							fillStyle0: EndRecord.fillStyle0,
							fillStyle1: EndRecord.fillStyle1,
							lineStyle: EndRecord.lineStyle,
							stateFillStyle0: EndRecord.stateFillStyle0,
							stateFillStyle1: EndRecord.stateFillStyle1,
							stateLineStyle: EndRecord.stateLineStyle,
							stateMoveTo: EndRecord.stateMoveTo,
							stateNewStyles: EndRecord.stateNewStyles,
							isChange: true
						};
						if (EndRecord.stateMoveTo) {
							addRecode.moveX = startPosition.x;
							addRecode.moveY = startPosition.y;
							endPosition.x = EndRecord.moveX;
							endPosition.y = EndRecord.moveY;
						}
						StartRecords.splice(i, 0, addRecode);
					} else {
						if (StartRecord.stateMoveTo) {
							startPosition.x = StartRecord.moveX;
							startPosition.y = StartRecord.moveY;
						}
						if (EndRecord.stateMoveTo) {
							endPosition.x = EndRecord.moveX;
							endPosition.y = EndRecord.moveY;
						}
					}
				}
				var FillType = 0;
				var FillStyle = 0;
				length = StartRecords.length;
				for (var i = 0; i < length; i++) {
					var record = StartRecords[i];
					if (!record.isChange) {
						continue;
					}
					if (record.stateFillStyle0) {
						FillStyle = record.fillStyle0;
					}
					if (FillStyle) {
						record.stateFillStyle0 = 1;
						record.stateFillStyle1 = 1;
						if (FillType) {
							record.fillStyle0 = 0;
							record.fillStyle1 = FillStyle;
						} else {
							record.fillStyle0 = FillStyle;
							record.fillStyle1 = 0;
						}
					} else {
						record.stateFillStyle1 = 1;
						record.fillStyle1 = 0;
					}
					FillType = (FillType) ? 0 : 1;
				}
		
				var newShapeRecords = [];
				var len = StartRecords.length;
				for (var i = 0; i < len; i++) {
					var StartRecord = StartRecords[i];
					if (!StartRecord) {
						continue;
					}
					var EndRecord = EndRecords[i];
					if (!EndRecord) {
						continue;
					}
					var newRecord = {};
					if (StartRecord.isChange) {
						var MoveX = 0;
						var MoveY = 0;
						if (StartRecord.stateMoveTo === 1) {
							MoveX = StartRecord.moveX * startPer + EndRecord.moveX * per;
							MoveY = StartRecord.moveY * startPer + EndRecord.moveY * per;
						}
						newRecord = {
							fillStyle0: StartRecord.fillStyle0,
							fillStyle1: StartRecord.fillStyle1,
							lineStyle: StartRecord.lineStyle,
							moveX: MoveX,
							moveY: MoveY,
							stateFillStyle0: StartRecord.stateFillStyle0,
							stateFillStyle1: StartRecord.stateFillStyle1,
							stateLineStyle: StartRecord.stateLineStyle,
							stateMoveTo: StartRecord.stateMoveTo,
							stateNewStyles: StartRecord.stateNewStyles,
							isChange: true
						};
					} else {
						newRecord = this.lerpEdges(StartRecord, EndRecord, per);
					}
					newShapeRecords[i] = newRecord;
				}
				return newShapeRecords;
			}
			lerpEdges(start, end, per) {
				var startIsCurved = start.isCurved;
				var endIsCurved = end.isCurved;
				if (!startIsCurved && !endIsCurved) {
					return {
						deltaX: this.lerpTwips(start.deltaX, end.deltaX, per),
						deltaY: this.lerpTwips(start.deltaY, end.deltaY, per),
						isCurved: false,
						isChange: false
					};
				} else if (startIsCurved && endIsCurved) {
					return {
						controlDeltaX: this.lerpTwips(start.controlDeltaX, end.controlDeltaX, per),
						controlDeltaY: this.lerpTwips(start.controlDeltaY, end.controlDeltaY, per),
						anchorDeltaX: this.lerpTwips(start.anchorDeltaX, end.anchorDeltaX, per),
						anchorDeltaY: this.lerpTwips(start.anchorDeltaY, end.anchorDeltaY, per),
						isCurved: true,
						isChange: false
					};
				} else if (!startIsCurved && endIsCurved) {
					var startControlX = start.deltaX / 2;
					var startControlY = start.deltaY / 2;
					var startAnchorX = startControlX;
					var startAnchorY = startControlY;
					return {
						controlDeltaX: this.lerpTwips(startControlX, end.controlDeltaX, per),
						controlDeltaY: this.lerpTwips(startControlY, end.controlDeltaY, per),
						anchorDeltaX: this.lerpTwips(startAnchorX, end.anchorDeltaX, per),
						anchorDeltaY: this.lerpTwips(startAnchorY, end.anchorDeltaY, per),
						isCurved: true,
						isChange: false
					};
				} else if (startIsCurved && !endIsCurved) {
					var endControlX = end.deltaX / 2;
					var endControlY = end.deltaY / 2;
					var endAnchorX = endControlX;
					var endAnchorY = endControlY;
					return {
						controlDeltaX: this.lerpTwips(start.controlDeltaX, endControlX, per),
						controlDeltaY: this.lerpTwips(start.controlDeltaY, endControlY, per),
						anchorDeltaX: this.lerpTwips(start.anchorDeltaX, endAnchorX, per),
						anchorDeltaY: this.lerpTwips(start.anchorDeltaY, endAnchorY, per),
						isCurved: true,
						isChange: false
					};
				}
			}
			buildMorphFrame(per) {
				// Interpolate MorphShapes into a Shape.
				var shape = {
					lineStyles: [],
					fillStyles: [],
					shapeRecords: []
				};
		
				var lineStyles = cloneObject(this.data.morphLineStyles);
				var fillStyles = cloneObject(this.data.morphFillStyles);
				for (var i = 0; i < lineStyles.length; i++) {
					shape.lineStyles[i] = this.lerpLine(lineStyles[i], per);
				}
				for (var i = 0; i < fillStyles.length; i++) {
					shape.fillStyles[i] = this.lerpFill(fillStyles[i], per);
				}
		
				shape.shapeRecords = this.buildEdges(per);
		
				var bounds = shapeUtils.calculateShapeBounds(shape.shapeRecords);
		
				return {
					bounds,
					shape,
					shapeRender: null
				};
			}
		}
		
		wpjsm.exportJS = MorphShape;
	},
	"src/display_objects/StaticText.js": function(wpjsm){
		const DisplayObject = wpjsm.importJS("src/DisplayObject.js");
		
		class StaticText extends DisplayObject {
			constructor() {
				super();
				this.staticData = null;
				this.displayType = "StaticText";
				this._debug_colorDisplayType = [255, 0, 255, 1];
			}
			static createNew(movieplayer) {
				var d = new StaticText();
				d.movieplayer = movieplayer;
				return d;
			}
			static fromSwfTag(movieplayer, tag) {
				return new TextStatic(movieplayer, tag);
			}
			init(textData) {
				if (!textData) return;
				this.staticData = textData;
				this.setId(textData.characterId);
			}
			replaceWith(characterId) {
				this.init(this.movieplayer.library.characterById(characterId));
			}
			runFrameAvm1() {
				// Noop
			}
			selfBounds() {
				var r = this.staticData.bounds;
				return r;
			}
			renderSelf() {
				var renderer = this.movieplayer.renderer;
		
				var offsetX = 0;
				var offsetY = 0;
				var color = [0, 0, 0, 0];
				var textHeight = 0;
				var isZoneTable = false;
				this.movieplayer.transformStack.stackPush(this.staticData.matrix, [1, 1, 1, 1, 0, 0, 0, 0]);
				for (var i = 0; i < this.staticData.textBlocks.length; i++) {
					var record = this.staticData.textBlocks[i];
					if ("fontId" in record) {
						var fontId = record.fontId;
						var fontData = this.movieplayer.library.characterById(fontId);
						isZoneTable = false;
						if ("alignZones" in fontData) {
							isZoneTable = true;
						}
					}
					if ("XOffset" in record) {
						offsetX = record.XOffset;
					}
					if ("YOffset" in record) {
						offsetY = record.YOffset;
					}
					if ("textColor" in record) {
						color = record.textColor;
					}
					if ("textHeight" in record) {
						textHeight = record.textHeight;
						if (isZoneTable) {
							textHeight /= 20;
						}
					}
					var entries = record.glyphEntries;
					var _scale = textHeight / 1024;
					for (var idx = 0; idx < entries.length; idx++) {
						var entry = entries[idx];
						var glyph = fontData.getGlyph(entry.index);
						if (glyph) {
							var shapeRender = glyph.shapeHandle;
							if (shapeRender) {
								var _matrix = [_scale, 0, 0, _scale, offsetX, offsetY];
								this.movieplayer.transformStack.stackPush(_matrix, [color[0] / 255, color[1] / 255, color[2] / 255, color[3], 0, 0, 0, 0]);
								var m2 = this.movieplayer.transformStack.getMatrix();
								var colorTransform = this.movieplayer.transformStack.getColorTransform();
								renderer.setColorTransform(...colorTransform);
								renderer.setTransform(...m2);
								renderer.renderShape(shapeRender);
								this.movieplayer.transformStack.stackPop();
								offsetX += entry.advance;
							}
						}
					}
				}
				this.movieplayer.transformStack.stackPop();
			}
		}
		
		class TextStatic {
			constructor(movieplayer, data) {
				this.displayType = "text";
		
				this.movieplayer = movieplayer;
				this.data = data;
				this.characterId = data.id;
				this.settings = null;
		
				this.bounds = null;
				this.matrix = [1, 0, 0, 1, 0, 0];
				this.textBlocks = [];
		
				this.init();
			}
			init() {
				this.bounds = this.data.bounds;
				this.matrix = this.data.matrix;
				this.textBlocks = this.data.records;
			}
			setRenderSettings(settings) {
				this.settings = settings;
			}
			instantiate() {
				var d = StaticText.createNew(this.movieplayer);
				d.init(this);
				return d;
			}
		}
		
		wpjsm.exportJS = StaticText;
	},
	"src/display_objects/TextField.js": function(wpjsm){
		const InteractiveObject = wpjsm.importJS("src/display_objects/InteractiveObject.js");
		
		class TextField extends InteractiveObject {
			constructor() {
				super();
				this.displayType = "TextField";
				this._debug_colorDisplayType = [255, 255, 0, 1];
				this.text_bounds = { xMin: 0, yMin: 0, yMax: 0, xMax: 0 };
				this.is_html = false;
				this.text_html = "";
				this.textColor = [0, 0, 0, 1];
				this.fontHeight = 0;
				this.fontId = -1;
				this.__backgroundColor = [255, 255, 255, 1];
				this.__border_color = [0, 0, 0, 1];
				this.HAS_BACKGROUND = false;
			}
			static createNew(movieplayer) {
				var t = new TextField();
				t.movieplayer = movieplayer;
				return t;
			}
			static fromSwfTag(movieplayer, tag) {
				return new EditTextStatic(movieplayer, tag);
			}
			init(textInfo) {
				this.setId(textInfo.id);
				this.text_bounds = textInfo.bounds;
				this.fontHeight = textInfo.fontHeight || 0;
				this.is_html = !!textInfo.HTML;
				if (this.is_html) {
				}
				if ("initialText" in textInfo) {
					if (!this.is_html) {
						this.text_html = ("" + textInfo.initialText);
					} else {
						this.text_html = "TextField";
					}
				}
				if ("textColor" in textInfo) {
					this.textColor = textInfo.textColor;
				}
				if ("fontId" in textInfo) {
					this.fontId = textInfo.fontId;
				}
				if (textInfo.border) {
					this.HAS_BACKGROUND = true;
				}
			}
			selfBounds() {
				return this.text_bounds;
			}
			postInstantiation(initObject, instantiatedBy, runFrame) {
				this.setDefaultInstanceName();
				this.movieplayer.avm1.addExecuteList(this);
			}
			runFrameAvm1() {
				// Noop
			}
			renderSelf() {
				var renderer = this.movieplayer.renderer;
				var b = this.selfBounds();
				var color = this.textColor;
				if (this.HAS_BACKGROUND) {
					var bgcolor = this.__backgroundColor;
					this.movieplayer.transformStack.stackPush([(b.xMax - b.xMin), 0, 0, (b.yMax - b.yMin), b.xMin, b.yMin], [bgcolor[0] / 255, bgcolor[1] / 255, bgcolor[2] / 255, bgcolor[3], 0, 0, 0, 0]);
					renderer.setTransform(...this.movieplayer.transformStack.getMatrix());
					renderer.setColorTransform(...this.movieplayer.transformStack.getColorTransform());
					renderer.renderShape(this.movieplayer.backgroundShapeRender);
					this.movieplayer.transformStack.stackPop();
				}
				var resText = this.text_html;
				var textArray = [];
				textArray.push('');
				for (let i = 0; i < resText.length; i++) {
					const t = resText[i];
					if ((t == "\r") || (t == "\n")) {
						textArray.push('');
					} else {
						var lt = textArray[textArray.length - 1];
						textArray[textArray.length - 1] = (lt + t);
					}
				}
				var scale = this.fontHeight / 1024;
				for (let f = 0; f < textArray.length; f++) {
					const gd = textArray[f];
					this.movieplayer.transformStack.stackPush([1, 0, 0, 1, 0, 0], [color[0] / 255, color[1] / 255, color[2] / 255, color[3], 0, 0, 0, 0]);
					this.movieplayer.drawTextW(scale * b.xMin, scale * (f * (800 + (20 * 20))), scale * 20, gd);
					this.movieplayer.transformStack.stackPop();
				}
			}
		}
		
		class EditTextStatic {
			constructor(movieplayer, data) {
				this.displayType = "edittext";
				this.movieplayer = movieplayer;
				this.data = data;
				this.characterId = data.id;
				this.settings = null;
			}
			instantiate() {
				var t = TextField.createNew(this.movieplayer);
				t.init(this.data);
				return t;
			}
			setRenderSettings(settings) {
				this.settings = settings;
			}
		}
		
		wpjsm.exportJS = TextField;
	},
	"src/display_objects/VideoDisplay.js": function(wpjsm){
		const DisplayObject = wpjsm.importJS("src/DisplayObject.js");
		const ZLib = wpjsm.importJS("src/utils/ZLib.js");
		const AT_H263_Decoder = wpjsm.importJS("src/utils/at-h263-decoder.js");
		const AT_NIHAV_VP6_Decoder = wpjsm.importJS("src/utils/at-nihav-vp6-decoder.js");

		const Bitmap = function(width, height, format, data) {
			this.width = width;
			this.height = height;
			this.format = format;
			this.data = data;
		}
		Bitmap.prototype.toRGBA = function() {
			var width = this.width;
			var height = this.height;
			switch (this.format) {
				case "yuv420p":
				case "yuva420p":
					var isAlpha = this.format == "yuva420p";
					var chroma_width = (((width + 1) / 2) | 0);
					var chroma_height = (((height + 1) / 2) | 0);
					var yuv = this.data;
					var data = new Uint8Array((width * height) * 4);
					var yOffset = 0;
					var uOffset = width * height;
					var vOffset = uOffset + (chroma_width * chroma_height);
					var aOffset = uOffset + (chroma_width * chroma_height) + (chroma_width * chroma_height);
					for (var h = 0; h < height; h++) {
						for (var w = 0; w < width; w++) {
							var ypos = w + h * width + yOffset;
							var upos = (w >> 1) + (h >> 1) * chroma_width + (uOffset);
							var vpos = (w >> 1) + (h >> 1) * chroma_width + (vOffset);
							var Y = yuv[ypos] - 16;
							var U = yuv[upos] - 128;
							var V = yuv[vpos] - 128;
							var R = (1.164 * Y + 1.596 * V);
							var G = (1.164 * Y - 0.813 * V - 0.391 * U);
							var B = (1.164 * Y + 2.018 * U);
							var outputData_pos = w * 4 + width * h * 4;
							data[0 + outputData_pos] = Math.max(Math.min(R, 255), 0);
							data[1 + outputData_pos] = Math.max(Math.min(G, 255), 0);
							data[2 + outputData_pos] = Math.max(Math.min(B, 255), 0);
							data[3 + outputData_pos] = isAlpha ? yuv[w + h * width + aOffset] : 255;
						}
					}
					this.data = data;
					yuv = null;
					break;
			}
		}

		const H263Decoder = function (deblocking) {
			this.state = new AT_H263_Decoder.H263State({
				sorensonSpark: true,
				useScalabilityMode: false,
			});
			this.deblocking = deblocking;
		};
		H263Decoder.prototype.preloadFrame = function (encodedFrame) {
			var reader = new AT_H263_Decoder.H263Reader(new Uint8Array(encodedFrame.data));
			let picture = this.state.parsePicture(reader, null);
			switch(picture.picture_type.getType()) {
				case "IFrame":
					return false;
				case "PFrame":
				case "DisposablePFrame":
					return true;
				default:
					throw new Error("Invalid picture type code: " + picture.picture_type.type);
			}
		};
		H263Decoder.prototype.decodeFrame = function (encodedFrame) {
			var reader = new AT_H263_Decoder.H263Reader(new Uint8Array(encodedFrame.data));
			this.state.decodeNextPicture(reader);
			var picture = this.state.getLastPicture();
			let [y, b, r] = picture.as_yuv();
			let [width, height] = picture.format.intoWidthAndHeight();
			var yuv = new Uint8Array(y.length + b.length + r.length);
			yuv.set(y, 0);
			yuv.set(b, y.length);
			yuv.set(r, y.length + b.length);
			return new Bitmap(width, height, "yuv420p", yuv);
		};

		const ByteReader = function(data) {
			this.data = new Uint8Array(data);
			this.offest = 0;
		}
		ByteReader.prototype.readByte = function() {
			if (this.offest >= this.data.length) 
				throw new Error("Unexpected end of file");
			return this.data[this.offest++];
		}
		ByteReader.prototype.readUint16be = function() {
			var byte1 = this.readByte();
			var byte2 = this.readByte();
			return (byte1 << 8) | byte2;
		}
		ByteReader.prototype.readBuf = function(length) {
			if ((this.offest + length) > this.data.length) 
				throw new Error("Unexpected end of file");
			var result = this.data.slice(this.offest, this.offest + length);
			this.offest += length;
			return result;
		}
		
		const ScreenVideoDecoder = function (size, version) {
			this.version = version;
			this.w = 0;
			this.h = 0;
			this.blockW = 0;
			this.blockH = 0;
			this.width = size[0];
			this.height = size[1];
			this.lastFrame = null;
		};
		ScreenVideoDecoder.prototype.preloadFrame = function (encodedFrame) {
			var byte_input = new ByteReader(encodedFrame.data);
			var type = byte_input.readByte() >> 4;
			switch (type) {
				case 1:
					return 0;
				case 2:
					return 1;
				default:
					throw new Error("Invalid frame type: " + type);
			}
		}
		ScreenVideoDecoder.prototype.fillBlock = function (a, b, x, y, cur_w, cur_h) {
			for (let _y = 0; _y < cur_h; _y++) {
				for (let _x = 0; _x < cur_w; _x++) {
					var rgbIdx = (_x + (cur_w * ((cur_h - _y) - 1))) * 3;
					var idx = ((_x + x) + (this.w * (_y + y))) * 4;
					a[idx] = b[rgbIdx + 2];
					a[idx + 1] = b[rgbIdx + 1];
					a[idx + 2] = b[rgbIdx];
					a[idx + 3] = 255;
				}
			}
		}
		ScreenVideoDecoder.prototype.decodeFrame = function (encodedFrame) {
			var byte_input = new ByteReader(encodedFrame.data);
			var isKeyframe = byte_input.readByte() >> 4 == 1;
			if (!isKeyframe && !this.lastFrame) 
				throw new Error("Missing reference frame");
			var hdr0 = byte_input.readUint16be();
			var blk_w = ((hdr0 >> 12) * 16) + 16;
			var w = hdr0 & 0xFFF;
			var hdr1 = byte_input.readUint16be();
			var blk_h = ((hdr1 >> 12) * 16) + 16;
			var h = hdr1 & 0xFFF;
			if (this.w != w || this.h != h || this.blockW != blk_w || this.blockH != blk_h) {
				this.w = w;
				this.h = h;
				this.blockW = blk_w;
				this.blockH = blk_h;
				this.lastFrame = new Uint8Array(w * h * 4);
			}
			var rgba = this.lastFrame;
			var is_intra = true;
			for (let yc = 0; yc < this.h; yc += this.blockH) {
				let cur_h = Math.min((this.h - yc), this.blockH);
				for (let xc = 0; xc < this.w; xc += this.blockW) {
					let cur_w = Math.min((this.w - xc), this.blockW);
					var dataSize = byte_input.readUint16be();
					if (dataSize > 0) this.fillBlock(rgba, new Uint8Array(ZLib.decompress(byte_input.readBuf(dataSize).buffer, (cur_w * cur_h) * 3)), xc, (this.h - yc) - cur_h, cur_w, cur_h);
					else is_intra = false;
				}
			}
			if (is_intra != isKeyframe) 
				throw new Error("Not all blocks were updated by a supposed keyframe");
			return new Bitmap(w, h, "rgba", rgba);
		};

		function crop(data, width, to_width, to_height) {
			let height = (data.length / width) | 0;
			if (width > to_width) {
				let new_width = to_width;
				let new_height = Math.min(height, to_height);
				let _data = new Uint8Array(new_width * new_height);
				for (let row = 0; row < new_height; row++) {
					_data.set(data.subarray(row * width, (row * width + new_width)), row * new_width);
				}
				return _data;
			} else {
				return data.subarray(0, width * Math.min(height, to_height));
			}
		}

		const VP6Decoder = function (size, withAlpha) {
			this.width = size[0];
			this.height = size[1];
			this.withAlpha = withAlpha;
			this.decoder = new AT_NIHAV_VP6_Decoder.VP56Decoder(6, withAlpha, true);
			this.support = new AT_NIHAV_VP6_Decoder.NADecoderSupport();
			this.bitreader = new AT_NIHAV_VP6_Decoder.VP6BR();
			this.initCalled = false;
			this.lastFrame = null; // NABufferRef NAVideoBuffer
		};
		VP6Decoder.prototype.preloadFrame = function (encodedFrame) {
			let flag_index = this.withAlpha ? 3 : 0;
			return new Uint8Array(encodedFrame.data)[flag_index] & 128;
		};
		VP6Decoder.prototype.decodeFrame = function (encodedFrame) {
			var videoData = new Uint8Array(encodedFrame.data);
			if (!this.initCalled) {
				var bool_coder = new AT_NIHAV_VP6_Decoder.BoolCoder(videoData.subarray(this.withAlpha ? 3 : 0));
				let header = this.bitreader.parseHeader(bool_coder);
				let video_info = new AT_NIHAV_VP6_Decoder.NAVideoInfo(header.disp_w * 16, header.disp_h * 16, true, this.withAlpha ? AT_NIHAV_VP6_Decoder.VP_YUVA420_FORMAT : AT_NIHAV_VP6_Decoder.YUV420_FORMAT);
				this.decoder.init(this.support, video_info);
				this.initCalled = true;
			}
			let decoded;
			var frame = null;
			decoded = this.decoder.decode_frame(this.support, videoData, this.bitreader);
			frame = decoded[0].value;
			let yuv = frame.get_data();
			let [width, height] = frame.get_dimensions(0);
			let [chroma_width, chroma_height] = frame.get_dimensions(1);
			let offsets = [
				frame.get_offset(0),
				frame.get_offset(1),
				frame.get_offset(2)
			];
			if ((width < this.width) || (height < this.height)) {
				console.log("A VP6 video frame is smaller than the bounds of the stream it belongs in. This is not supported.");
			}
			let y = yuv.subarray(offsets[0], offsets[0] + width * height);
			let u = yuv.subarray(offsets[1], offsets[1] + chroma_width * chroma_height);
			let v = yuv.subarray(offsets[2], offsets[2] + chroma_width * chroma_height);
			let _y = crop(y, width, this.width, this.height);
			let _u = crop(u, chroma_width, ((this.width + 1) / 2) | 0, ((this.height + 1) / 2) | 0);
			let _v = crop(v, chroma_width, ((this.width + 1) / 2) | 0, ((this.height + 1) / 2) | 0);
			width = this.width;
			height = this.height;
			if (this.withAlpha) {
				let [alpha_width, alpha_height] = frame.get_dimensions(3);
				let alpha_offset = frame.get_offset(3);
				let alpha = yuv.subarray(alpha_offset, alpha_offset + alpha_width * alpha_height);
				let a = crop(alpha, alpha_width, this.width, this.height);
				let yuvData = new Uint8Array(_y.length + _u.length + _v.length + a.length);
				yuvData.set(_y, 0);
				yuvData.set(_u, _y.length);
				yuvData.set(_v, _y.length + _u.length);
				yuvData.set(a, _y.length + _u.length + _v.length);
				return new Bitmap(width, height, "yuva420p", yuvData);
			} else {
				let yuvData = new Uint8Array(_y.length + _u.length + _v.length);
				yuvData.set(_y, 0);
				yuvData.set(_u, _y.length);
				yuvData.set(_v, _y.length + _u.length);
				return new Bitmap(width, height, "yuv420p", yuvData);
			}
		};

		const VideoStream = function(decoder) {
			this.bitmap = null;
			this.decoder = decoder;
		}

		function registerVideoStream(_num_frames, size, codec, filter) {
			var decoder;
			switch (codec) {
				case "none":
					decoder = null;
					break;
				case "H263":
					decoder = new H263Decoder(filter);
					break;
				case "ScreenVideo":
					decoder = new ScreenVideoDecoder(size, false);
					break;
				case "Vp6":
					decoder = new VP6Decoder(size, false);
					break;
				case "Vp6WithAlpha":
					decoder = new VP6Decoder(size, true);
					break;
				default:
					console.log("Unsupported video codec type " + codec);
			}
			return new VideoStream(decoder);
		}
		function preloadVideoStreamFrame(stream, encodedFrame) {
			return stream.decoder.preloadFrame(encodedFrame);
		}
		function decodeVideoStreamFrame(stream, encodedFrame, renderer) {
			var _stream = stream;
			var decoder = _stream.decoder;
			var result = decoder.decodeFrame(encodedFrame);
			var imageData = null;
			if (result) {
				result.toRGBA();
				if (result.width && result.height) {
					imageData = new ImageData(result.width, result.height);
					imageData.data.set(result.data, 0);
				} else {
					result = null;
				}
			}
			let handle;
			if (result || !stream.bitmap) {
				if (stream.bitmap) {
					handle = stream.bitmap;
					handle.setImage(imageData);
				} else {
					handle = renderer.imageToTexture(imageData);
				}    
			} else {
				handle = stream.bitmap;
			}
			stream.bitmap = handle;
			return handle;
		}
		
		class VideoDisplay extends DisplayObject {
			constructor() {
				super();
				this.__size = [0, 0];

				this._ratio = 0;

				this.isInstantiated = false;
				this._result = 0;

				this.isSmoothed = false;
				this.keyframes = [];

				this.decoded_frame = null;

				this._debug_decoder_time = 0;
		
				this._debug_colorDisplayType = [255, 100, 100, 1];
				this.displayType = "Video";
			}
			static createNew(movieplayer) {
				var v = new VideoDisplay();
				v.movieplayer = movieplayer;
				return v;
			}
			static fromSwfTag(movieplayer, tag) {
				return new DefineVideoData(movieplayer, tag);
			}
			postInstantiation(initObject, instantiatedBy, runFrame) {
				this.movieplayer.avm1.addExecuteList(this);
				var streamdef = this.staticData.data;
				this.isSmoothed = !!streamdef.isSmoothed;
				var stream = registerVideoStream(streamdef.numFrames, [streamdef.width, streamdef.height], streamdef.codec, streamdef.codec);
				var keyframes = [];
				if (!stream.decoder) return;
				for (let i = 0; i < this.staticData.frames.length; i++) {
					var frame = this.staticData.frames[i];
					if (!frame) continue;
					let dep = preloadVideoStreamFrame(stream, {
						codec: streamdef.codec,
						data: frame,
						frameId: i,
					});
					keyframes[i] = !!dep;
				}
				this.keyframes = keyframes;
				var starting_seek = (this.isInstantiated ? 0 : this._result);
				this.isInstantiated = true;
				this._result = stream;
				this.seek(starting_seek);
			}
			selfBounds() {
				return {
					xMin: 0,
					yMin: 0,
					xMax: this.__size[0] * 20,
					yMax: this.__size[1] * 20,
				};
			}
			setRatio(ratio) {
				this._ratio = ratio;
				this.seek(ratio);
			}
			seek(frame_id) {
				if (!this.isInstantiated) {
					this._result = frame_id;
					return;
				}
				let last_frame = this.decoded_frame ? this.decoded_frame[0] : -1;
				if (last_frame == frame_id) return;
				let is_ordered_seek = (frame_id == 0) || frame_id == (last_frame + 1);
				let sweep_from = frame_id;
				if (!is_ordered_seek) {
					var keyframes = this.keyframes;
					let prev_keyframe_id = 0;
					for (let i = frame_id; i >= 0; i--) {
						if (i in keyframes) {
							const isKeyframe = keyframes[i];
							if (!isKeyframe) {
								prev_keyframe_id = i;
								break;
							}
						}
					}
					if (last_frame !== null) {
						if (frame_id > last_frame) {
							sweep_from = Math.max(prev_keyframe_id, last_frame + 1);
						} else {
							sweep_from = prev_keyframe_id;
						}
					} else {
						sweep_from = prev_keyframe_id;
					}
				}
				var fr = sweep_from;
				while (fr <= frame_id) {
					this.seek_internal(fr);
					fr++;
				}
			}
			seek_internal(frameId) {
				if (!this.isInstantiated) return;
				let stream = this._result;
				var res;
				var frame = this.staticData.frames[frameId];
				if (frame) {
					var encframe = {
						codec: this.staticData.data.codec,
						data: frame,
						frameId,
					};
					try {
						var _ = Date.now();
						res = decodeVideoStreamFrame(stream, encframe, this.movieplayer.renderer);
						this._debug_decoder_time = Date.now() - _;
					} catch(e) {
						console.log("Got error when seeking to video frame " + frameId + ":", e);
						return;
					}
				} else {
					if (!this.decoded_frame) return;
					res = this.decoded_frame[1];
				}
				this.decoded_frame = [frameId, res];
			}
			getDebugVideoText() {
				if (this.isInstantiated) {
					return this.staticData.data.codec + ":" + this.getId() + " " + this._debug_decoder_time + "ms";
				} else {
					return "";
				}
			}
			renderSelf() {
				var renderer = this.movieplayer.renderer;
				this.movieplayer.transformStack.stackPush([20, 0, 0, 20, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0]);
				if (this.decoded_frame && this.decoded_frame[1]) {
					var m2 = this.movieplayer.transformStack.getMatrix();
					var rColorTransform = this.movieplayer.transformStack.getColorTransform();
					renderer.setTransform(...m2);
					renderer.setColorTransform(...rColorTransform);
					renderer.renderTexture(this.decoded_frame[1], this.isSmoothed);	
				}
				this.movieplayer.transformStack.stackPop();
			}
		}
		class DefineVideoData {
			constructor(movieplayer, data) {
				this.displayType = "video";
				this.movieplayer = movieplayer;
				this.characterId = data.id;
				this.width = data.width;
				this.height = data.height;
				this.data = data;
				this.frames = [];
			}
			instantiate() {
				var v = VideoDisplay.createNew(this.movieplayer);
				v.__size[0] = this.width;
				v.__size[1] = this.height;
				v.staticData = this;
				v.setId(this.data.id);
				return v;
			}
			preloadSwfFrame(tag, stage) {
				this.frames[tag.frameNum] = tag.videoData;
			}
		}
		wpjsm.exportJS = VideoDisplay;
	},
	"src/display_objects/BitmapGraphic.js": function(wpjsm){
		const DisplayObject = wpjsm.importJS("src/DisplayObject.js");
		
		class BitmapGraphic extends DisplayObject {
			constructor() {
				super();
		
				this._debug_colorDisplayType = [255, 155, 0, 1];
				this.displayType = "Bitmap";
		
				this.staticBitmap = null;
			}
			static createStatic(movieplayer, id) {
				return new BitmapGraphicData(movieplayer, id);
			}
			static createNew(movieplayer) {
				var d = new BitmapGraphic();
				d.movieplayer = movieplayer;
				return d;
			}
			postInstantiation(initObject, instantiatedBy, runFrame) {
				this.movieplayer.avm1.addExecuteList(this);
			}
			selfBounds() {
				if (this.staticBitmap) {
					return this.staticBitmap.getBounds();
				} else {
					return DisplayObject.prototype.selfBounds.call(this);
				}
			}
			renderSelf() {
				if (this.staticBitmap) {
					this.staticBitmap.render();
				}
			}
		}
		
		class BitmapGraphicData {
			constructor(movieplayer, id) {
				this.displayType = "bitmap";
				this.movieplayer = movieplayer;
				this.characterId = id;
				this.image = null;
				this.texture = null;
			}
			setBitmap(image) {
				this.image = image;
			}
			instantiate() {
				var d = BitmapGraphic.createNew(this.movieplayer);
				d.staticBitmap = this;
				return d;
			}
			getTexture() {
				if (!this.texture) {
					var tex = this.movieplayer.renderer.imageToTexture(this.image);
					this.texture = tex;
				}
				return this.texture;
			}
			getBounds() {
				return {
					xMin: 0,
					yMin: 0,
					xMax: this.image.width * 20,
					yMax: this.image.height * 20,
				};
			}
			render() {
				var tex = this.getTexture();
				if (tex) {
					var renderer = this.movieplayer.renderer;
					this.movieplayer.transformStack.stackPush([20, 0, 0, 20, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0]);
					renderer.setTransform(...this.movieplayer.transformStack.getMatrix());
					renderer.setColorTransform(...this.movieplayer.transformStack.getColorTransform());
					renderer.renderTexture(tex, false);
					this.movieplayer.transformStack.stackPop();
				}
			}
		}
		
		wpjsm.exportJS = BitmapGraphic;
	},
	"src/display_objects/Avm1Buttom.js": function(wpjsm){
		const DisplayObjectContainer = wpjsm.importJS("src/display_objects/DisplayObjectContainer.js");
		const MovieClip = wpjsm.importJS("src/display_objects/MovieClip.js");
		
		const typeButton = {
			"up": "buttonStateUp",
			"over": "buttonStateOver",
			"down": "buttonStateDown",
		}
		const typeButtonCxform = {
			"up": 0,
			"over": 1,
			"down": 2,
		}
		
		class Avm1Buttom extends DisplayObjectContainer {
			constructor() {
				super();
				this.__initialized = false;
				this._records = null;
				this._recordSounds = null;
				this._actions = [];
				this._recordColorTransforms = null;
				this._state = "";
				this.__clickflag = false;
				this.displayType = "Buttom";
				this._debug_colorDisplayType = [0, 255, 0, 1];
		
				this.___appendclick = false;
		
				this.___object = null;
		
				this.___hitArea = [];
			}
			static createNew(movieplayer) {
				var b = new Avm1Buttom();
				b.movieplayer = movieplayer;
				return b;
			}
			static fromSwfTag(movieplayer, tag) {
				return new ButtonData(movieplayer, tag);
			}
			init(i) {
				this._records = i.data.records;
				this._soundInfo = i.soundInfo;
				this._actions = i.actions;
				this._recordColorTransforms = i.colorTransforms;
				this.setId(i.characterId);
			}
			postInstantiation(initObject, instantiatedBy, runFrame) {
				this.setDefaultInstanceName();
				this.movieplayer.avm1.addExecuteList(this);
				if (!this.___object) {
					this.___object = this.movieplayer.avm1.fromDisplayObject(this);
				}
			}
			setState(state) {
				this._state = state;
				var removedDepths = [];
		
				var cs = this.iterRenderList();
				for (let f = 0; f < cs.length; f++) {
					const jdf = cs[f];
					const de = jdf.getDepth();
					removedDepths[de] = jdf;
				}
		
				var children = [];
				for (var i = 0; i < this._records.length; i++) {
					var record = this._records[i];
					if (record[typeButton[state]]) {
		
						removedDepths[record.depth] = null;
		
						var child = null;
		
						var child1 = this.childByDepth(record.depth);
						if (child1) {
							if (child1.getId() == record.characterId) {
								child = child1;
							}
						}
						if (!child) {
							child = this.movieplayer.library.instantiateById(record.characterId);
							child.setParent(this);
							child.setDepth(record.depth);
							children.push([record.depth, child]);
						}
		
						// Set transform of child (and modify previous child if it already existed)
						child.applyMatrix(record.matrix);
						if ("colorTransform" in record) {
							child.applyColorTransform(record.colorTransform);
						}
						if ("blendMode" in record) {
							child.setBlendMode(record.blendMode);
						}
		
					}
				}
				for (let k = 0; k < removedDepths.length; k++) {
					const d = removedDepths[k];
					if (d) {
						var child = this.childByDepth(k);
						if (child) {
							this.removeChild(child);
						}
					}
				}
				for (let o = 0; o < children.length; o++) {
					const c = children[o];
					var depth = c[0];
		
					var lastC = this.childByDepth(depth);
					if (lastC) {
						this.removeChild(lastC);
					}
		
					var child = c[1];
		
					// Initialize new child.
					child.postInstantiation(null, null, false);
					child.runFrameAvm1();

					if (this.movieplayer.useLastBound) {
						child.debugSetLastMC(true, child.getMatrix(), child.getColorTransform());
						child.debugSetLastBound(true, child.selfBounds());
					}
					
					this.replaceAtDepth(depth, child);
				}
		
				if (this._soundInfo && !this.__clickflag) {
					var g = this._soundInfo[state];
					if (g) {
						this.movieplayer.audio.startSound(g, this);
					}
				}
				if (this._recordColorTransforms) {
					var g = this._recordColorTransforms[typeButtonCxform[state]];
					if (g) {
						this.applyColorTransform(g);
					}
				}
			}
			runFrameAvm1() {
				if (!this.__initialized) {
					this.__initialized = true;
					this.setState("up");
				}
			}
			avm1Unload() {
				this.AVM1_REMOVED = true;
			}
			renderSelf() {
				this.renderChildren();
			}
			clickAction(typ) {
				var rootClip = this.getParent();
				if (rootClip && (rootClip instanceof MovieClip)) {
					for (var i = 0; i < this._actions.length; i++) {
						var g = this._actions[i];
						if (g[typ]) {
							this.movieplayer.queueAction(rootClip, {
								type: "normal",
								caches: g.actionScript
							});
						}
					}
				}
			}
			takeHitButton(x, y) {
				this.movieplayer.buttomTransformStack.stackPush(this.getMatrix(), [1, 1, 1, 1, 0, 0, 0, 0]);
		
				var pos = [x, y];
		
				if (!this.movieplayer.mousePressed) {
					this.___appendclick = false;
				}
		
				var bounds = this.boundsMatrix(this.selfBounds(), this.movieplayer.buttomTransformStack.getMatrix());
				if ((pos[0] > bounds.xMin) && (pos[0] < bounds.xMax)) {
					if ((pos[1] > bounds.yMin) && (pos[1] < bounds.yMax)) {
						if (!this.movieplayer.mousePressed) {
							this.___appendclick = true;
						}
					}
				}
		
				if (this.___appendclick) {
					this.movieplayer.openCursor();
					if (this.movieplayer.mousePressed) {
						if (this._state !== 'down') {
							this.clickAction("condOverDownToOverUp");
							this.setState("down");
						}
						this.__clickflag = true;
					} else {
						if (this._state !== 'over') {
							this.setState("over");
						}
						this.__clickflag = false;
					}
				} else {
					if (this._state !== 'up') {
						this.setState("up");
					}
					if (this.__clickflag) {
						this.__clickflag = false;
					}
				}
				this.movieplayer.buttomTransformStack.stackPop();
			}
		}
		class ButtonData {
			constructor(movieplayer, data) {
				this.displayType = "buttom";
				this.movieplayer = movieplayer;
				this.data = data;
				this.characterId = data.id;

				this.actions = data.actions || [];

				this.soundInfo = {};
				this.colorTransforms = [];
			}
			instantiate() {
				var b = Avm1Buttom.createNew(this.movieplayer);
				b.init(this);
				return b;
			}
			setSounds(tag) {
				/*
					buttonStateUpSoundInfo
					buttonStateUpSoundId
					
					buttonStateOverSoundInfo
					buttonStateOverSoundId
					
					buttonStateDownSoundInfo
					buttonStateDownSoundId
					
					buttonStateHitTestSoundInfo
					buttonStateHitTestSoundId
				*/
				if (tag.buttonStateUpSoundInfo) {
					this.soundInfo.up = {
						id: tag.buttonStateUpSoundId,
						info: tag.buttonStateUpSoundInfo
					};
				}
				if (tag.buttonStateOverSoundInfo) {
					this.soundInfo.over = {
						id: tag.buttonStateOverSoundId,
						info: tag.buttonStateOverSoundInfo
					};
				}
				if (tag.buttonStateDownSoundInfo) {
					this.soundInfo.down = {
						id: tag.buttonStateDownSoundId,
						info: tag.buttonStateDownSoundInfo
					};
				}
				if (tag.buttonStateHitTestSoundInfo) {
					this.soundInfo.hit = {
						id: tag.buttonStateHitTestSoundId,
						info: tag.buttonStateHitTestSoundInfo
					};
				}
			}
			setColorTransforms(tag) {
				var colorTransforms = tag.colorTransforms;
				if (colorTransforms) {
					this.colorTransforms = colorTransforms;
				}
			}
		}
		wpjsm.exportJS = Avm1Buttom;
	},
	"src/display_objects/MovieClip.js": function(wpjsm){
		const DisplayObjectContainer = wpjsm.importJS("src/display_objects/DisplayObjectContainer.js");
		
		function objectCopy(src) {
			var obj = {};
			for (var name in src) {
				obj[name] = src[name];
			}
			return obj;
		}
		
		function removeIdArray(array, i) {
			if (array.length) {
				if (i >= array.length) {
					array.pop();
				} else {
					array.splice(i, 1);
				}
			}
		}
		const tagUtils_decodeTags = function(reader, callback) {
			while (reader.pos < reader.tags.length) {
				var c = callback(reader.tags[reader.pos]);
				reader.pos++;
				if (c == "exit") {
					break;
				}
			}
		}
		class SwfTagStream {
			constructor(pos, tags) {
				this.pos = pos;
				this.tags = tags;
			}
		}
		class GotoPlaceObject {
			constructor(frame, place, isRewind, index) {
				this.frame = frame;
				this.place = place;
				this.isRewind = isRewind;
				this.index = index;
		
				this.placeData = objectCopy(place);
				if (isRewind) {
					if (("characterId" in place) && !place.isMove) {
						if (!("matrix" in place)) {
							this.placeData.matrix = [1, 0, 0, 1, 0, 0];
						}
						if (!("colorTransform" in place)) {
							this.placeData.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
						}
						if (!("blendMode" in place)) {
							this.placeData.blendMode = "normal";
						}
						/*if ("visible" in place) {
							this.placeData.visible = place.visible;
						}*/
						if (!("ratio" in place)) {
							this.placeData.ratio = 0;
						}
						if (!("backgroundColor" in place)) {
							//this.placeData.backgroundColor = [0, 0, 0, 0];
						}   
					}
				}
			}
			getDepth() {
				return this.placeData.depth;
			}
			merge(next) {
				let cur_place = this.placeData;
				let next_place = next.placeData;
				var nextActionMode = 0;
		
				if (("characterId" in next_place)) {
					cur_place.characterId = next_place.characterId;
					cur_place.isMove = next_place.isMove;
					this.frame = next.frame;
					if (next_place.isMove) {
						nextActionMode = 2;
					} else {
						nextActionMode = 1;
					}
				} else {
					nextActionMode = 0;
				}
		
				if ("matrix" in next_place) {
					cur_place.matrix = next_place.matrix;
				}
				if ("colorTransform" in next_place) {
					cur_place.colorTransform = next_place.colorTransform;
				}
				if ("visible" in next_place) {
					cur_place.visible = next_place.visible;
				}
				if ("blendMode" in next_place) {
					cur_place.blendMode = next_place.blendMode;
				}
				if ("ratio" in next_place) {
					cur_place.ratio = next_place.ratio;
				}
				if ("backgroundColor" in next_place) {
					cur_place.backgroundColor = next_place.backgroundColor;
				}
				// Purposely omitted properties:
				// name, clip_depth, clip_actions, amf_data
				// These properties are only set on initial placement in `MovieClip::instantiate_child`
				// and can not be modified by subsequent PlaceObject tags.
			}
		}
		class MovieClip extends DisplayObjectContainer {
			constructor() {
				super();
		
				this.staticData = null;
		
				this.currentFrame = 0;
				this.totalframes = 0;
				this.framesloaded = 0;
				this.tags = [];
				this.soundStreamBlockRecords = [];
				this.audioStreamInfo = null;
				this.audioStream = null;
				this.tagStreamPos = 0;
		
				this.___object = null;
		
				// flags
				this.isPlaying = true;
				this.isLoop = true;

				this.debugSample = false;
		
				/// Whether this `MovieClip` has run its initial frame.
				this.INITIALIZED = false;
				this.PROGRAMMATICALLY_PLAYED = false;
				this.EXECUTING_AVM2_FRAME_SCRIPT = false;
				this.LOOP_QUEUED = false;
				this.displayType = "MovieClip";
				this._debug_colorDisplayType = [255, 0, 0, 1];
			}
			static createNew(movieplayer) {
				var mc = new MovieClip();
				mc.movieplayer = movieplayer;
				return mc;
			}
			static createStatic(movieplayer) {
				return new MovieClipStatic(movieplayer);
			}
			setTotalFrames(frame) {
				this.totalframes = frame;
				this.framesloaded = frame;
			}
			postInstantiation(initObject, instantiatedBy, runFrame) {
				this.setDefaultInstanceName();
				this.movieplayer.avm1.addExecuteList(this);
				this.constructAvm1ValueObject(initObject, instantiatedBy, runFrame);
			}
			constructAvm1ValueObject(initObject, instantiatedBy, runFrame) {
				if (!this.___object) {
					this.___object = this.movieplayer.avm1.fromDisplayObject(this);
		
				}
			}
			play() {
				// Can only play clips with multiple frames.
				if (this.totalframes > 1) {
					this.isPlaying = true;
				}
			}
			stop() {
				this.isPlaying = false;
				this.stopAudioStream();
			}
			determineNextFrame() {
				if (this.currentFrame < this.totalframes) {
					return "next";
				} else if (this.totalframes > 1) {
					return "first";
				} else {
					return "same";
				}
			}
			runIntervalFrame(runDisplayAction, runSounds) {
				let nextFrame = this.determineNextFrame();
				switch (nextFrame) {
					case "next":
						this.currentFrame++;
						if (this.debugSample) {
							this.stop();
							this.debugSample = false;
						} else {
							if ((!this.isLoop) && (this.currentFrame == this.totalframes)) {
								this.stop();
							}	
						}
						break;
					case "first":
						this.runGoto(1, true);
						return;
					case "same":
						this.stop();
						break;
				}
				var reader = new SwfTagStream(this.tagStreamPos, this.tags);
				let tagCallback = function (tag) {
					switch (tag.tagType) {
						case "PlaceObject":
						case "PlaceObject2":
						case "PlaceObject3":
						case "PlaceObject4":
							if (runDisplayAction) {
								this.placeObject(tag);
							}
							break;
						case "RemoveObject":
						case "RemoveObject2":
							if (runDisplayAction) {
								this.removeObject(tag);
							}
							break;
						case "StartSound":
						case "StartSound2":
							if (runSounds) {
								this.startSound(tag);
							}
							break;
						case "SoundStreamBlock":
							if (runSounds) {
								this.soundStreamBlock(tag);
							}
							break;
						case "DoAction":
							this.doAction(tag);
							break;
						case "ShowFrame":
							return "exit";
					}
					return "continue";
				};
				tagUtils_decodeTags(reader, tagCallback.bind(this));
		
				this.tagStreamPos = reader.pos;
		
				// Check if our audio track has finished playing.
				if (this.audioStream) {
					if (!this.movieplayer.isSoundPlaying(this.audioStream)) {
						this.audioStream = null;
					}
				}
		
			}
			runGoto(frame, isImplicit) {
				let frameBeforeRewind = this.currentFrame;
				this.setSkipNextEnterFrame(false);
		
				var gotoCommands = [];
		
				this.stopAudioStream();
		
				let isRewind = (frame <= this.currentFrame);
				if (isRewind) {
					// Because we can only step forward, we have to start at frame 1
					// when rewinding. We don't actually remove children yet because
					// otherwise AS3 can observe byproducts of the rewinding process.
		
					this.tagStreamPos = 0;
					this.currentFrame = 0;
				}
		
				let fromFrame = this.currentFrame;
		
				if (isImplicit) {
					this.setLoopQueued();
				}
		
				var index = 0;
		
				// Sanity; let's make sure we don't seek way too far.
				let clamped_frame = frame;
		
				var reader = new SwfTagStream(this.tagStreamPos, this.tags);
				
				var frame_pos = reader.pos;
		
				while (this.currentFrame < clamped_frame) {
					this.currentFrame++;
		
					frame_pos = reader.pos;
		
					let tagCallback = function (tag) {
						switch (tag.tagType) {
							case "PlaceObject":
							case "PlaceObject2":
							case "PlaceObject3":
							case "PlaceObject4":
								index++;
								this.gotoPlaceObject(tag, gotoCommands, isRewind, index);
								break;
							case "RemoveObject":
							case "RemoveObject2":
								this.gotoRemoveObject(tag, gotoCommands, isRewind, fromFrame);
								break;
							case "ShowFrame":
								return "exit";
						}
						return "continue";
					};
					tagUtils_decodeTags(reader, tagCallback.bind(this));
				}
		
				let hitTargetFrame = this.currentFrame == frame;
		
				if (isRewind) {
					// Remove all display objects that were created after the
					// destination frame.
					//
					// We do this after reading the clip timeline so that AS3 can't
					// observe side effects of the rewinding process.
					//
					// TODO: We want to do something like self.children.retain here,
					// but BTreeMap::retain does not exist.
					// TODO: Should AS3 children ignore GOTOs?
		
					let children = this.iterRenderList().filter(function (clip) {
						return clip.getPlaceFrame() > frame;
					});
		
					//collect
					for (var i = 0; i < children.length; i++) {
						var child = children[i];
						this.removeChild(child);
					}
				}
		
				let run_goto_command = (params) => {
					var child_entry = this.childByDepth(params.getDepth());
					var place = params.placeData;
					if (child_entry) {
						if ("characterId" in place) {
							child_entry.replaceWith(place.characterId);
							child_entry.applyPlaceObject(place);
							child_entry.setPlaceFrame(params.frame);
						} else {
							if (place.isMove) {
								child_entry.applyPlaceObject(place);
							}
						}
					} else {
						if ("characterId" in place) { // Place Replace
							var clip = this.instantiateChild(place.characterId, params.getDepth(), place);
							if (clip) {
								clip.setPlaceFrame(params.frame);
							}
						} else {
							console.log("Unexpected PlaceObject during goto", params);
							if (place.isMove) {
							}
						}
					}
				}   
		
				gotoCommands.filter(function (params) {
					return params.frame < frame;
				}).forEach((goto) => {
					run_goto_command(goto)
				});
				
				// Next, run the final frame for the parent clip.
				// Re-run the final frame without display tags (DoAction, etc.)
				// Note that this only happens if the frame exists and is loaded;
				// e.g. gotoAndStop(9999) displays the final frame, but actions don't run!
				if (hitTargetFrame) {
					this.currentFrame--;
					this.tagStreamPos = frame_pos;
					this.runIntervalFrame(false, frame != frameBeforeRewind);
				} else {
					this.currentFrame = clamped_frame;
				}
		
				gotoCommands.filter(function (params) {
					return params.frame >= frame;
				}).forEach((goto) => {
					run_goto_command(goto)
				});
			}
			gotoPlaceObject(place, gotoCommands, isRewind, index) {
				var depth = place.depth;
				var gotoPlace = new GotoPlaceObject(this.currentFrame, place, isRewind, index);
				var j = false;
				for (let i = 0; i < gotoCommands.length; i++) {
					const gc = gotoCommands[i];
					if (gc.getDepth() == depth) {
						gc.merge(gotoPlace);
						j = true;
						break;
					}
				}
				if (!j) {
					gotoCommands.push(gotoPlace);
				}
			}
			gotoRemoveObject(place, gotoCommands, isRewind, fromFrame) {
				var depth = place.depth;
				for (let i = 0; i < gotoCommands.length; i++) {
					const gc = gotoCommands[i];
					if (gc.getDepth() == depth) {
						removeIdArray(gotoCommands, i);
						break;
					}
				}
				if (!isRewind) {
					let to_frame = this.currentFrame;
					this.currentFrame = fromFrame;
					var child = this.childByDepth(depth);
					if (child) {
						this.removeChild(child);
					}
					this.currentFrame = to_frame;
				}
			}
			nextFrame() {
				if (this.currentFrame < this.totalframes) {
					this.gotoFrame(this.currentFrame + 1, true);
				}
			}
			prevFrame() {
				if (this.currentFrame > 1) {
					this.gotoFrame(this.currentFrame - 1, true);
				}
			}
			gotoFrame(frame, stop) {
				if (stop) {
					this.stop();
				} else {
					this.play();
				}
		
				var _frame = Math.max(frame, 1);
		
				if (_frame != this.currentFrame) {
					this.runGoto(_frame, false);
				}
			}
			setLoopQueued() {
				this.LOOP_QUEUED = true;
			}
			unsetLoopQueued() {
				this.LOOP_QUEUED = false;
			}
			renderSelf() {
				this.renderChildren();
			}
			runFrameAvm1() {
				var isLoadFrame = !this.INITIALIZED;
				if (isLoadFrame) {
					this.INITIALIZED = true;
				}
				// Run my SWF tags.
				// In AVM2, SWF tags are processed at enterFrame time.
				if (this.isPlaying) {
					this.runIntervalFrame(true, true);
				}
			}
			instantiateChild(id, depth, place) {
				let child = this.movieplayer.library.instantiateById(id);
				if (child) {
					let prevChild = this.replaceAtDepth(depth, child);
		
					// Set initial properties for child.
					child.INSTANTIATED_BY_TIMELINE = true;
					child.setDepth(depth);
					child.setParent(this);
					child.setPlaceFrame(this.currentFrame);
		
					// Apply PlaceObject parameters.
					child.applyPlaceObject(place);
					if ("name" in place) {
						/*
						let name = AvmString::new(context.gc_context, name.decode(encoding));
						child.set_name(context.gc_context, name);
						child.set_has_explicit_name(context.gc_context, true);
						*/
						child.setName(place.name);
						child.HAS_EXPLICIT_NAME = true;
					}
					if ("clipDepth" in place) {
						child.clipDepth = place.clipDepth;
					}
					// Clip events only apply to movie clips.
					if ("clipActions" in place) {
						//child.setClipEventHandlers(place.clipActions);
					}
					// TODO: Missing PlaceObject property: amf_data
					// Run first frame.
					child.postInstantiation(null, null, false);
					child.enterFrame();
		
					// In AVM1, children are added in `run_frame` so this is necessary.
					// In AVM2 we add them in `construct_frame` so calling this causes
					// duplicate frames
					child.runFrameAvm1();

					if (this.movieplayer.useLastBound) {
						child.debugSetLastMC(true, child.getMatrix(), child.getColorTransform());
						child.debugSetLastBound(true, child.selfBounds());    
					}
				} else {
					console.log("Unable to instantiate display node id, reason being");
				}
				return child;
			}
			enterFrame() {
				let skipFrame = this.shouldSkipNextEnterFrame();
				//Child removals from looping gotos appear to resolve in reverse order.
				var children = this.iterRenderList();
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					if (skipFrame) {
						// If we're skipping our current frame, then we want to skip it for our children
						// as well. This counts as the skipped frame for any children that already
						// has this set to true (e.g. a third-level grandchild doesn't skip three frames).
						// We'll still call 'enter_frame' on the child - it will recurse, propagating along
						// the flag, and then set its own flag back to 'false'.
						//
						// We do *not* propagate `skip_frame=false` down to children, since a normally
						// executing parent can add a child that should have its first frame skipped.
						// FIXME - does this propagate through non-movie-clip children (Loader/Button)?
						child.setSkipNextEnterFrame(true);
					}
					child.enterFrame();
				}
				if (skipFrame) {
					this.setSkipNextEnterFrame(false);
				}
			}
			stopAudioStream() {
				if (this.audioStream) {
					this.movieplayer.audio.stopStreamSound(this.audioStream);
				}
			}
			getObject() {
				return this.___object;
			}
			avm1Unload() {
				var children = this.iterRenderList();
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					child.avm1Unload();
				}
				this.stopAudioStream();
				this.AVM1_REMOVED = true;
			}
			// Control tags
			doAction(tag) {
				this.movieplayer.queueAction(this, {
					type: "normal",
					caches: tag.action
				}, false);
			}
			placeObject(place) {
				if ("characterId" in place) {
					if (place.isMove) {
						var child = this.childByDepth(place.depth);
						if (child) {
							child.replaceWith(place.characterId);
							child.applyPlaceObject(place);
							child.setPlaceFrame(this.currentFrame);
						}
					} else {
						this.instantiateChild(place.characterId, place.depth, place);
					}
				} else {
					if (place.isMove) {
						var child = this.childByDepth(place.depth);
						if (child) child.applyPlaceObject(place);
					}
				}
			}
			removeObject(re) {
				var child = this.childByDepth(re.depth);
				if (child) {
					this.removeChild(child);
				}
			}
			soundStreamBlock(tag) {
				if (this.isPlaying) {
					var audioStream = this.movieplayer.audio.startStreamSound(this, this.currentFrame, tag);
					this.audioStream = audioStream;
				}
			}
			startSound(tag) {
				this.movieplayer.audio.startSound(tag, this);
			}
		}
		
		
		class MovieClipStatic {
			constructor(movieplayer) {
				this.displayType = "movieclip";
				this.movieplayer = movieplayer;
				this.tags = [];
				this.frameCount = 0;
				this.characterId = 0;
				this.audioStreamInfo = null;
				this.soundStreamBlockRecords = [];
				this.isRoot = false;
				this.exportedName = null;
			}
			init(tags) {
				this.tags = tags;
			}
			instantiate() {
				var clip = MovieClip.createNew(this.movieplayer);
				clip.setId(this.characterId);
				clip.setTotalFrames(this.frameCount);
				clip.tags = this.tags;
				clip.soundStreamBlockRecords = this.soundStreamBlockRecords;
				clip.audioStreamInfo = this.audioStreamInfo;
				clip.staticData = this;
				return clip;
			}
		}
		wpjsm.exportJS = MovieClip;
	},
	"src/renderer/Canvas2d.js": function(wpjsm){
		function cloneObject(src) {
			return JSON.parse(JSON.stringify(src));
		}
		function checkImageColorTransform(colorTransform) {
			return (colorTransform[0] !== 1) || (colorTransform[1] !== 1) || (colorTransform[2] !== 1) || colorTransform[4] || colorTransform[5] || colorTransform[6];
		}
		const MaskState = {
			DrawContent: 0,
			DrawMask: 1,
			ClearMask: 2
		}
		function generateColorTransform(color, data) {
			return [
				Math.max(0, Math.min((color[0] * data[0]) + data[4], 255)) | 0, // Red
				Math.max(0, Math.min((color[1] * data[1]) + data[5], 255)) | 0, // Green
				Math.max(0, Math.min((color[2] * data[2]) + data[6], 255)) | 0, // Blue
				Math.max(0, Math.min((color[3] * 255 * data[3]) + data[7], 255)) / 255 // Alpha
			];		
		}
		function linearGradientXY(m) {
			var x0 = -16384 * m[0] - 16384 * m[2] + m[4];
			var x1 =  16384 * m[0] - 16384 * m[2] + m[4];
			var x2 = -16384 * m[0] + 16384 * m[2] + m[4];
			var y0 = -16384 * m[1] - 16384 * m[3] + m[5];
			var y1 =  16384 * m[1] - 16384 * m[3] + m[5];
			var y2 = -16384 * m[1] + 16384 * m[3] + m[5];
			var vx2 = x2 - x0;
			var vy2 = y2 - y0;
			var r1 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
			vx2 /= r1;
			vy2 /= r1;
			var r2 = (x1 - x0) * vx2 + (y1 - y0) * vy2;
			return [x0 + r2 * vx2, y0 + r2 * vy2, x1, y1];
		}
		class RenderCanvas2dTexture {
			constructor(renderer) {
				this.renderer = renderer;
				this.width = 0;
				this.height = 0;
				this.texture = null;
				this.ctx = null;
				this.isColorTransformCache = false;
				this.c = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
			}
			_initColorTransformCache() {
				this.tmpCanvas = document.createElement("canvas");
				this.tmpCtx = this.tmpCanvas.getContext("2d");
				this.isColorTransformCache = true;
			}
			getTexture(color) {
				if (color && checkImageColorTransform(color)) {
					if (!this.isColorTransformCache) this._initColorTransformCache();
					if (this.c[0] != color[0] || this.c[1] != color[1] || this.c[2] != color[2] || this.c[3] != color[3] || this.c[4] != color[4] || this.c[5] != color[5] || this.c[6] != color[6] || this.c[7] != color[7]) {
						var width = this.texture.width;
						var height = this.texture.height;
						this.tmpCanvas.width = width;
						this.tmpCanvas.height = height;
						this.tmpCtx.drawImage(this.texture, 0, 0);
						var imgData = this.tmpCtx.getImageData(0, 0, width, height);
						var pxData = imgData.data;
						var idx = 0;
						var RedMultiTerm = color[0];
						var GreenMultiTerm = color[1];
						var BlueMultiTerm = color[2];
						var AlphaMultiTerm = color[3];
						var RedAddTerm = color[4];
						var GreenAddTerm = color[5];
						var BlueAddTerm = color[6];
						var AlphaAddTerm = color[7];
						var length = width * height;
						if (length > 0) {
							while (length--) {
								var R = pxData[idx++];
								var G = pxData[idx++];
								var B = pxData[idx++];
								var A = pxData[idx++];
								pxData[idx - 4] = Math.max(0, Math.min((R * RedMultiTerm) + RedAddTerm, 255)) | 0;
								pxData[idx - 3] = Math.max(0, Math.min((G * GreenMultiTerm) + GreenAddTerm, 255)) | 0;
								pxData[idx - 2] = Math.max(0, Math.min((B * BlueMultiTerm) + BlueAddTerm, 255)) | 0;
								pxData[idx - 1] = Math.max(0, Math.min((A * AlphaMultiTerm) + AlphaAddTerm, 255));
							}
						}
						this.tmpCtx.putImageData(imgData, 0, 0);
						this.c[0] = color[0];
						this.c[1] = color[1];
						this.c[2] = color[2];
						this.c[3] = color[3];
						this.c[4] = color[4];
						this.c[5] = color[5];
						this.c[6] = color[6];
						this.c[7] = color[7];
					}
					return this.tmpCanvas;
				} else {
					return this.texture;
				}
			}
			setImage(image) {
				this.width = image.width;
				this.height = image.height;
				this.c = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
				this.isColorTransformCache = false;
				if (!this.texture) {
					this.texture = document.createElement("canvas");
					this.ctx = this.texture.getContext("2d");
				}
				this.texture.width = image.width;
				this.texture.height = image.height;
				if (image instanceof ImageData) {
					this.ctx.putImageData(image, 0, 0);
				} else {
					this.ctx.drawImage(image, 0, 0);
				}
			}
		}
		function sameBlendMode(first, second) {
			return first == second;
		}
		class RenderCanvas2d {
			constructor() {
				this.canvas = document.createElement("canvas");
				this.ctx = this.canvas.getContext("2d");
		
				this.quality = "high";
		
				this.width = 640;
				this.height = 480;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
		
				this.matrixTransform = [1, 0, 0, 1, 0, 0];
				this.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
		
				this.maskState = MaskState.DrawContent;
				this.maskersInProgress = 0;
				this.blendModes = ["normal"];
		
				this.tmpCanvas = document.createElement("canvas");
				this.tmpCtx = this.tmpCanvas.getContext("2d");
			}
			clear() {
				this.setTransform(1, 0, 0, 1, 0, 0);
				this.setColorTransform(1, 1, 1, 1, 0, 0, 0, 0);
				this.ctx.setTransform(1, 0, 0, 1, 0, 0);
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}
			setQuality(quality) {
				this.quality = quality;
			}
			destroy() {
			}
			resize(w, h) {
				this.width = w;
				this.height = h;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
			}
			imageToTexture(image) {
				var tex = new RenderCanvas2dTexture(this);
				tex.setImage(image);
				return tex;
			}
			isAllowImageColorTransform() {
				return (this.quality == "high");
			}
			setColorTransform(a, b, c, d, e, f, x, y) {
				this.colorTransform = [a, b, c, d, e, f, x, y];
			}
			setTransform(a, b, c, d, e, f) {
				this.matrixTransform = [a, b, c, d, e, f];
			}
			buildCmd2dPath(cmd) {
				var str = "";
				for (let i = 0; i < cmd.length; i++) {
					const a = cmd[i];
					switch (a[0]) {
						case 0:
							str += "ctx.moveTo(" + a[1] + "," + a[2] + ");\n";
							break;
						case 1:
							str += "ctx.quadraticCurveTo(" + a[1] + "," + a[2] + "," + a[3] + "," + a[4] + ");\n";
							break;
						case 2:
							str += "ctx.lineTo(" + a[1] + "," + a[2] + ");\n";
							break;
					}
				}
				return new Function("ctx", str);
			}
			shapeToInterval(shapeCache) {
				// 0 fill
				// 1 stroke
				// 0 color
				// 1 gradient
				// 2 bitmap
				var result = [];
				for (let i = 0; i < shapeCache.length; i++) {
					const si = shapeCache[i];
					result.push(this.shapeToCanvas(si));
				}
				return result;
			}
			shapeToCanvas(shape) {
				var isStroke = (shape.type == 1);
				var width = shape.width || 0;
				var fillInfo = shape.fill;
				if (!fillInfo) return;
				var cmdResult = this.buildCmd2dPath(shape.path2d);
				if (fillInfo.type == 0) {
					return {
						type: 0,
						cmd: cmdResult,
						color: fillInfo.color.slice(0),
						isStroke,
						width
					};
				} else if (fillInfo.type == 1) {
					return {
						type: 1,
						cmd: cmdResult,
						isRadial: fillInfo.isRadial,
						focal: fillInfo.focal,
						matrix: fillInfo.matrix.slice(0),
						records: cloneObject(fillInfo.records),
						isStroke,
						width
					};
				} else if (fillInfo.type == 2) {
					return {
						type: 2,
						cmd: cmdResult,
						matrix: fillInfo.matrix.slice(0),
						texture: fillInfo.texture,
						isSmoothed: fillInfo.isSmoothed,
						isRepeating: fillInfo.isRepeating,
						isStroke,
						width
					};
				}
			}
			render() {}
			drawingMask() {
				return this.maskersInProgress > 0;
			}
			pushMask() {
				if (this.maskersInProgress == 0) this._pushMask();
				this.maskersInProgress += 1;
			}
			activateMask() {
				this.maskersInProgress -= 1;
				if (this.maskersInProgress == 0) this._activateMask();
			}
			deactivateMask() {
				if (this.maskersInProgress == 0) this._deactivateMask();
				this.maskersInProgress += 1;
			}
			popMask() {
				this.maskersInProgress -= 1;
				if (this.maskersInProgress == 0) this._popMask();
			}
			_pushMask() {
				// Save the current mask layer so that it can be restored when the mask is popped.
				if (this.maskState == MaskState.DrawContent) {
					this.ctx.beginPath();
					this.ctx.save();
					this.maskState = MaskState.DrawMask;
				}
			}
			_activateMask() {
				this.ctx.clip();
				this.maskState = MaskState.DrawContent;
			}
			_deactivateMask() {
				if (this.maskState == MaskState.DrawContent) {
					this.maskState = MaskState.ClearMask;
				}
			}
			_popMask() {
				if (this.maskState == MaskState.ClearMask) {
					// Pop the previous clipping state.
					this.ctx.restore();
					this.maskState = MaskState.DrawContent;
				}
			}
			pushBlendMode(blendMode) {
				if (!sameBlendMode(this.blendModes[this.blendModes.length - 1], blendMode)) this.applyBlendMode(blendMode);
				this.blendModes.push(blendMode);
			}
			popBlendMode() {
				let old = this.blendModes.pop();
				let current = this.blendModes[this.blendModes.length - 1] || "normal";
				if (!sameBlendMode(old, current)) this.applyBlendMode(current);
			}
			applyBlendMode(blendMode) {
				var mode = 'source-over';
				switch(blendMode) {
					case "multiply":
						mode = 'multiply';
						break;
					case "screen":
						mode = 'screen';
						break;
					case "lighten":
						mode = 'lighten';
						break;
					case "darken":
						mode = 'darken';
						break;
					case "difference":
					case "subtract":
						mode = 'difference';
						break;
					case "add":
						mode = 'lighter';
						break;
					case "overlay":
						mode = 'overlay';
						break;
					case "hardlight":
						mode = 'hard-light';
						break;
				}
				this.ctx.globalCompositeOperation = mode;
			}
			renderTexture(texture, isSmoothed) {
				if (this.maskersInProgress <= 1) {
					var isA = this.isAllowImageColorTransform();
					this.ctx.imageSmoothingEnabled = (isSmoothed || false);
					if (texture) {
						this.ctx.setTransform(...this.matrixTransform);
						if ((!isA) || (!checkImageColorTransform(this.colorTransform))) this.ctx.globalAlpha = Math.max(0, Math.min((255 * this.colorTransform[3]) + this.colorTransform[7], 255)) / 255;
						this.ctx.drawImage(texture.getTexture(isA ? this.colorTransform : null), 0, 0);
					}    
				}
			}
			renderShape(shapeInterval) {
				if (this.maskersInProgress <= 1) {
					var isA = this.isAllowImageColorTransform();
					for (let i = 0; i < shapeInterval.length; i++) {
						const si = shapeInterval[i];
						if (!si) return;
						var isStroke = si.isStroke;
						var cmd = si.cmd;
						var width = si.width || 0;
						if (this.maskState == MaskState.DrawMask) {
							this.ctx.setTransform(...this.matrixTransform);
							cmd(this.ctx);
						} else if (this.maskState == MaskState.ClearMask) {
							// Canvas backend doesn't have to do anything to clear masks.
						} else {
							if (si.type == 0) {
								var color = si.color;
								this.ctx.setTransform(...this.matrixTransform);
								this.ctx.beginPath();
								cmd(this.ctx);
								var css = 'rgba(' + generateColorTransform(color, this.colorTransform).join(',') + ')';
								if (isStroke) {
									this.ctx.lineWidth = width;
									this.ctx.lineCap = "round";
									this.ctx.lineJoin = "round";
									this.ctx.strokeStyle = css;
									this.ctx.stroke();
								} else {
									this.ctx.fillStyle = css;
									this.ctx.fill();
								}
							} else if (si.type == 1) {
								var isRadial = si.isRadial;
								this.ctx.setTransform(...this.matrixTransform);
								this.ctx.beginPath();
								cmd(this.ctx);
								var css;
								if (isRadial) {
									css = this.ctx.createRadialGradient((16384 * Math.min(Math.max(si.focal, -0.98), 0.98)), 0, 0, 0, 0, 16384);
								} else {
									var xy = linearGradientXY(si.matrix);
									css = this.ctx.createLinearGradient(xy[0] || 0, xy[1] || 0, xy[2] || 0, xy[3] || 0);
								}
								for (let j = 0; j < si.records.length; j++) {
									const rc = si.records[j];
									css.addColorStop(rc[1], 'rgba(' + generateColorTransform(rc[0], this.colorTransform).join(',') + ')');
								}
								if (isRadial) {
									this.ctx.save();
									this.ctx.transform(...si.matrix);
								}
								if (isStroke) {
									this.ctx.lineWidth = width;
									this.ctx.lineCap = "round";
									this.ctx.lineJoin = "round";
									this.ctx.strokeStyle = css;
									this.ctx.stroke();
								} else {
									this.ctx.fillStyle = css;
									this.ctx.fill();
								}
								if (isRadial) {
									this.ctx.restore();
								}
							} else if (si.type == 2) {
								var bMatrix = si.matrix;
								var repeat = si.isRepeating ? "repeat" : "no-repeat";
								var texture = si.texture;
								if (texture) {
									this.ctx.setTransform(...this.matrixTransform);
									this.ctx.beginPath();
									cmd(this.ctx);
									this.ctx.save();
									this.ctx.transform(...bMatrix);
									this.ctx.imageSmoothingEnabled = (si.isSmoothed || false);
									var image = texture.getTexture(isA ? this.colorTransform : null);
									if ((!isA) || (!checkImageColorTransform(this.colorTransform))) this.ctx.globalAlpha = Math.max(0, Math.min((255 * this.colorTransform[3]) + this.colorTransform[7], 255)) / 255;
									var p = this.ctx.createPattern(image, repeat);
									this.ctx.fillStyle = p;
									this.ctx.fill();
									this.ctx.globalAlpha = 1;
									this.ctx.restore();
								}
							}
						}
					}    
				}
			}
		}
		wpjsm.exportJS = RenderCanvas2d;
	},
	"src/renderer/WebGL.js": function(wpjsm){
		const AT_Tess = wpjsm.importJS("src/utils/at-tess.js");

		const multiplicationMatrix = function (a, b) {
			return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
		};
		function QuadraticBezierP0( t, p ) {
			const k = 1 - t;
			return k * k * p;
		}
		function QuadraticBezierP1( t, p ) {
			return 2 * (1 - t) * t * p;
		}
		function QuadraticBezierP2( t, p ) {
			return t * t * p;
		}
		function QuadraticBezier(t, p0, p1, p2) {
			return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
		}
		function swf_to_gl_matrix(m) {
			let tx = m[4];
			let ty = m[5];
			let det = m[0] * m[3] - m[2] * m[1];
			let a = m[3] / det;
			let b = -m[2] / det;
			let c = -(tx * m[3] - m[2] * ty) / det;
			let d = -m[1] / det;
			let e = m[0] / det;
			let f = (tx * m[1] - m[0] * ty) / det;
			a *= 1 / 32768.0;
			b *= 1 / 32768.0;
			d *= 1 / 32768.0;
			e *= 1 / 32768.0;
			c /= 32768.0;
			f /= 32768.0;
			c += 0.5;
			f += 0.5;
			return [a, d, 0.0, b, e, 0.0, c, f, 1.0];
		}
		function swf_bitmap_to_gl_matrix(m, bitmap_width, bitmap_height) {
			let tx = m[4];
			let ty = m[5];
			let det = m[0] * m[3] - m[2] * m[1];
			let a = m[3] / det;
			let b = -m[2] / det;
			let c = -(tx * m[3] - m[2] * ty) / det;
			let d = -m[1] / det;
			let e = m[0] / det;
			let f = (tx * m[1] - m[0] * ty) / det;
			a *= 1 / bitmap_width;
			b *= 1 / bitmap_width;
			d *= 1 / bitmap_height;
			e *= 1 / bitmap_height;
			c /= bitmap_width;
			f /= bitmap_height;
			return [a, d, 0.0, b, e, 0.0, c, f, 1.0];
		}
		class Shader {
			constructor(gl, program) {
				this.gl = gl;
				this.program = program;
				this.uniformLocations = {};
				this.attributeLocations = {};
				const activeUniforms = gl.getProgramParameter(program, this.gl.ACTIVE_UNIFORMS);
				for (let index = 0; index < activeUniforms; index++) {
					const info = gl.getActiveUniform(program, index);
					if (!info) {
						throw new Error('uniform at index ' + index + ' does not exist');
					}
					const name = info.name;
					const location = gl.getUniformLocation(program, name);
					if (!location) {
						throw new Error('uniform named ' + name + ' does not exist');
					}
					this.uniformLocations[name] = location;
				}
				const activeAttributes = gl.getProgramParameter(program, this.gl.ACTIVE_ATTRIBUTES);
				for (let index = 0; index < activeAttributes; index++) {
					const info = gl.getActiveAttrib(program, index);
					if (!info) {
						throw new Error('attribute at index ' + index + ' does not exist');
					}
					this.attributeLocations[info.name] = gl.getAttribLocation(program, info.name);
				}
			}
			uniform1f(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform1f(location, value);
			}
			uniform1i(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform1i(location, value);
			}
			uniform1fv(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform1fv(location, value);
			}
			uniform4fv(name, value) {
				const location = this.getUniform(name);
				this.gl.uniform4fv(location, value);
			}
			uniform2f(name, a, b) {
				const location = this.getUniform(name);
				this.gl.uniform2f(location, a, b);
			}
			uniform3f(name, a, b, c) {
				const location = this.getUniform(name);
				this.gl.uniform3f(location, a, b, c);
			}
			uniform4f(name, a, b, c, d) {
				const location = this.getUniform(name);
				this.gl.uniform4f(location, a, b, c, d);
			}
			uniformMatrix3(name, value) {
				const location = this.getUniform(name);
				this.gl.uniformMatrix3fv(location, false, value);
			}
			uniformMatrix4(name, value) {
				const location = this.getUniform(name);
				this.gl.uniformMatrix4fv(location, false, value);
			}
			hasUniform(name) {
				return this.uniformLocations.hasOwnProperty(name);
			}
			getUniform(name) {
				if (!this.hasUniform(name)) {
					throw new Error('uniform of name ' + name + ' does not exist');
				}
				return this.uniformLocations[name];
			}
			attributeBuffer(name, value, count) {
				if (!this.hasAttribute(name)) {
					throw new Error('attribute of name ' + name + ' does not exist');
				}
				const location = this.attributeLocations[name];
				this.gl.enableVertexAttribArray(location);
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, value);
				this.gl.vertexAttribPointer(location, count, this.gl.FLOAT, false, 0, 0);
			}
			hasAttribute(name) {
				return this.attributeLocations.hasOwnProperty(name);
			}
			getAttribute(name) {
				if (!this.hasAttribute(name)) {
					throw new Error('attribute of name ' + name + ' does not exist');
				}
				return this.attributeLocations[name];
			}
		}
		class RenderWebGLShapeInterval {
			constructor(renderer, interval) {
				this.renderer = renderer;
				this.shapeIntervalData = interval;
			}
		}
		class RenderWebGLImageInterval {
			constructor(renderer) {
				this.renderer = renderer;
				const gl = this.renderer.gl;
				this.isRender = false;
				this.width = 0;
				this.height = 0;
				this.texture = gl.createTexture();
			}
			setImage(image) {
				this.isRender = true;
				this.width = image.width;
				this.height = image.height;
				const gl = this.renderer.gl;
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				if (image instanceof ImageData) {
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, image.data);
				} else {
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
				}
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			}
		}
		class RenderWebGL {
			constructor() {
				this.matrixTransform = [1, 0, 0, 1, 0, 0];
				this.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
				const canvas = document.createElement('canvas');
				canvas.width = 480;
				canvas.height = 360;
				const gl = canvas.getContext('webgl2', {
					stencil: true,
					alpha: true,
					depth: false,
					failIfMajorPerformanceCaveat: true,
					premultipliedAlpha: true
				});
				if (!gl) throw new Error('cannot get webgl rendering context');
				this.canvas = canvas;
				this.gl = gl;
				this.shaderTexture = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_bitmap);
				this.shaderColor = this.createShader(RenderWebGL.vs_color, RenderWebGL.fs_color);
				this.shaderGradient = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_gradient);
				this.initShaderBlend();
				this.maskState = 0;
				this.numMasks = 0;
				this.blendState = 0;
				this.blendType = null;
				this.view_matrix = null;
				this.maskersInProgress = 0;
				gl.enable(this.gl.BLEND);
				gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
				gl.blendFuncSeparate(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
				this.quatBuffer = this.gl.createBuffer();
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.quatBuffer);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]), this.gl.STATIC_DRAW);
				this.resize(480, 360);
			}
			initShaderBlend() {
				this.shaderBlendNormal = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_normal);
				this.shaderBlendAdd = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_add);
				this.shaderBlendSubtract = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_subtract);
				this.shaderBlendMultiply = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_multiply);
				this.shaderBlendLighten = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_lighten);
				this.shaderBlendDarken = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_darken);
				this.shaderBlendScreen = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_screen);
				this.shaderBlendOverlay = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_overlay);
				this.shaderBlendHardlight = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_hardlight);
				this.shaderBlendDifference = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_difference);
				this.shaderBlendInvert = this.createShader(RenderWebGL.shader_texture, RenderWebGL.shader_blend_invert);
			}
			build_msaa_buffers() {
				const gl = this.gl;
				if (this.msaa_buffers) {
					gl.deleteRenderbuffer(this.msaa_buffers.color_renderbuffer);
					gl.deleteRenderbuffer(this.msaa_buffers.stencil_renderbuffer);
					gl.deleteFramebuffer(this.msaa_buffers.render_framebuffer);
					gl.deleteFramebuffer(this.msaa_buffers.color_framebuffer);
					gl.deleteTexture(this.msaa_buffers.framebuffer_texture);
					gl.deleteFramebuffer(this.msaa_buffers.render_blend_front_framebuffer);
					gl.deleteFramebuffer(this.msaa_buffers.render_blend_back_framebuffer);
					gl.deleteTexture(this.msaa_buffers.blend_texture_front);
					gl.deleteTexture(this.msaa_buffers.blend_texture_back);
				}
				let render_framebuffer = gl.createFramebuffer();
				let color_framebuffer = gl.createFramebuffer();
				let color_renderbuffer = gl.createRenderbuffer();
				gl.bindRenderbuffer(gl.RENDERBUFFER, color_renderbuffer);
				gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.RGBA8, this.renderbuffer_width, this.renderbuffer_height);
				let stencil_renderbuffer = gl.createRenderbuffer();
				gl.bindRenderbuffer(gl.RENDERBUFFER, stencil_renderbuffer);
				gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.STENCIL_INDEX8, this.renderbuffer_width, this.renderbuffer_height);
				gl.bindFramebuffer(gl.FRAMEBUFFER, render_framebuffer);
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,  gl.RENDERBUFFER, color_renderbuffer);
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT,  gl.RENDERBUFFER, stencil_renderbuffer);
				let framebuffer_texture = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, framebuffer_texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.renderbuffer_width, this.renderbuffer_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
				gl.bindTexture(gl.TEXTURE_2D, null);
				gl.bindFramebuffer(gl.FRAMEBUFFER, color_framebuffer);
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, framebuffer_texture, 0);
				let render_blend_front_framebuffer = gl.createFramebuffer();
				gl.bindFramebuffer(gl.FRAMEBUFFER, render_blend_front_framebuffer);
				let blend_texture_front = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, blend_texture_front);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.renderbuffer_width, this.renderbuffer_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, blend_texture_front, 0);
				let render_blend_back_framebuffer = gl.createFramebuffer();
				gl.bindFramebuffer(gl.FRAMEBUFFER, render_blend_back_framebuffer);
				let blend_texture_back = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, blend_texture_back);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.renderbuffer_width, this.renderbuffer_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, blend_texture_back, 0);
				gl.bindTexture(gl.TEXTURE_2D, null);
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				this.msaa_buffers = {
					color_renderbuffer,
					stencil_renderbuffer,
					render_framebuffer,
					color_framebuffer,
					framebuffer_texture,
					render_blend_front_framebuffer,
					blend_texture_front,
					render_blend_back_framebuffer,
					blend_texture_back
				};
			}
			drawingMask() {
				return this.maskersInProgress > 0;
			}
			setColorTransform(a, b, c, d, e, f, x, y) {
				this.colorTransform = [a, b, c, d, e, f, x, y];
			}
			setTransform(a, b, c, d, e, f) {
				this.matrixTransform = [a, b, c, d, e, f];
			}
			createShader(vs, fs, definitions) {
				const program = this.compileProgram(vs, fs, definitions);
				return new Shader(this.gl, program);
			}
			compileProgram(vs, fs, definitions) {
				const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vs, definitions);
				const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fs, definitions);
				const program = this.gl.createProgram();
				if (!program) {
					throw new Error('Cannot create program');
				}
				this.gl.attachShader(program, vertexShader);
				this.gl.attachShader(program, fragmentShader);
				this.gl.linkProgram(program);
				if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
					const error = this.gl.getProgramInfoLog(program);
					this.gl.deleteProgram(program);
					throw new Error('Program compilation error: ' + error);
				}
				return program;
			}
			compileShader(type, source, definitions) {
				if (definitions) {
					for (const def of definitions) {
						source = '#define ' + def + '\n' + source;
					}
				}
				const shader = this.gl.createShader(type);
				if (!shader) {
					throw new Error('Cannot create shader');
				}
				this.gl.shaderSource(shader, source);
				this.gl.compileShader(shader);
				if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
					const error = this.gl.getShaderInfoLog(shader);
					this.gl.deleteShader(shader);
					throw new Error('Shader compilation error: ' + error);
				}
				return shader;
			}
			useShader(shader) {
				if (this.currentShader !== shader) {
					this.gl.useProgram(shader.program);
					this.currentShader = shader;
				}
			}
			shapeToInterval(shapeCache) {
				var result = [];
				for (let i = 0; i < shapeCache.length; i++) {
					result.push(this.shapeToCanvas(shapeCache[i]));
				}
				return new RenderWebGLShapeInterval(this, result);
			}
			destroy() {
				var ext = this.gl.getExtension("WEBGL_lose_context");
				if (ext) {
					ext.loseContext();
				}
			}
			resize(w, h) {
				this.width = w;
				this.height = h;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.view_matrix = [
					1.0 / (w / 2.0), 0.0, 0.0, 0.0,
					0.0, -1.0 / (h / 2.0), 0.0, 0.0,
					0.0, 0.0, 1.0, 0.0,
					-1.0, 1.0, 0.0, 1.0
				];
				this.renderbuffer_width = this.canvas.width;
				this.renderbuffer_height = this.canvas.height;
				this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
				this.build_msaa_buffers();
			}
			imageToTexture(image) {
				var s = new RenderWebGLImageInterval(this);
				s.setImage(image);
				return s;
			}
			shapeToCanvas(shape) {
				var fill = shape.fill;
				var r = (shape.type == 1) ? this.createStroke(shape.path2d, shape.width) : this.createFill(shape.path2d);
				var bufferPos = this.gl.createBuffer();
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferPos);
				this.gl.bufferData(this.gl.ARRAY_BUFFER, r, this.gl.STATIC_DRAW);
				if (fill.type == 0) {
					var color = fill.color;
					return {
						type: 0,
						bufferPos: bufferPos,
						color: [color[0] / 255, color[1] / 255, color[2] / 255, color[3]],
						num: (r.length / 2),
					};
				} else if (fill.type == 1) {
					var ratios = [];
					var colors = [];
					var re = fill.records;
					for (let i = 0; i < 16; i++) {
						const g = re[Math.min(i, re.length - 1)];
						colors.push(g[0][0] / 255);
						colors.push(g[0][1] / 255);
						colors.push(g[0][2] / 255);
						colors.push(g[0][3]);
						ratios.push(g[1]);
					}
					return {
						type: 1,
						bufferPos: bufferPos,
						num: (r.length / 2),
						ratios,
						colors,
						focal: fill.focal || 0,
						isRadial: fill.isRadial,
						repeat: fill.repeat,
						matrix: swf_to_gl_matrix(fill.matrix)
					};
				} else if (fill.type == 2) {
					var texture = fill.texture;
					return {
						type: 2,
						bufferPos: bufferPos,
						num: (r.length / 2),
						texture: texture.texture,
						isRepeating: fill.isRepeating,
						isSmoothed: fill.isSmoothed,
						matrix: swf_bitmap_to_gl_matrix(fill.matrix, texture.width, texture.height)
					};
				}
			}
			pushBlendMode(blendMode) {
				const gl = this.gl;
				if ((this.maskState == 0) && (this.blendState == 0)) {
					switch (blendMode) {
						case "add":
							this.blendType = this.shaderBlendAdd;
							break;
						case "subtract":
							this.blendType = this.shaderBlendSubtract;
							break;
						case "multiply":
							this.blendType = this.shaderBlendMultiply;
							break;
						case "lighten":
							this.blendType = this.shaderBlendLighten;
							break;
						case "darken":
							this.blendType = this.shaderBlendDarken;
							break;
						case "screen":
							this.blendType = this.shaderBlendScreen;
							break;
						case "overlay":
							this.blendType = this.shaderBlendOverlay;
							break;
						case "hardlight":
							this.blendType = this.shaderBlendHardlight;
							break;
						case "difference":
							this.blendType = this.shaderBlendDifference;
							break;
						case "invert":
							this.blendType = this.shaderBlendInvert;
							break;
						default:
							this.blendType = this.shaderBlendNormal;
					}
					gl.disable(gl.STENCIL_TEST);
					gl.colorMask(true, true, true, true);
					gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.msaa_buffers.color_framebuffer);
					gl.blitFramebuffer(0, 0, this.renderbuffer_width, this.renderbuffer_height, 0, 0, this.renderbuffer_width, this.renderbuffer_height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_blend_front_framebuffer);
					this.useShader(this.shaderTexture);
					this.currentShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
					this.currentShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
					this.currentShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
					this.currentShader.uniform4f('mult_color', 1, 1, 1, 1);
					this.currentShader.uniform4f('add_color', 0, 0, 0, 0);
					this.currentShader.attributeBuffer("position", this.quatBuffer, 2);
					gl.bindTexture(gl.TEXTURE_2D, this.msaa_buffers.framebuffer_texture);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.drawArrays(gl.TRIANGLES, 0, 12);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					gl.clearColor(0, 0, 0, 0);
					gl.stencilMask(0xff);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
				}
				this.blendState++;
			}
			popBlendMode() {
				const gl = this.gl;
				this.blendState--;
				if (this.blendType && (this.blendState == 0)) {
					gl.disable(gl.STENCIL_TEST);
					gl.colorMask(true, true, true, true);
					gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.msaa_buffers.color_framebuffer);
					gl.blitFramebuffer(0, 0, this.renderbuffer_width, this.renderbuffer_height, 0, 0, this.renderbuffer_width, this.renderbuffer_height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_blend_back_framebuffer);
					this.useShader(this.shaderTexture);
					this.currentShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
					this.currentShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
					this.currentShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
					this.currentShader.uniform4f('mult_color', 1, 1, 1, 1);
					this.currentShader.uniform4f('add_color', 0, 0, 0, 0);
					this.currentShader.attributeBuffer("position", this.quatBuffer, 2);
					gl.bindTexture(gl.TEXTURE_2D, this.msaa_buffers.framebuffer_texture);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.drawArrays(gl.TRIANGLES, 0, 12);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					gl.clearColor(0, 0, 0, 0);
					gl.stencilMask(0xff);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
					this.useShader(this.blendType);
					this.currentShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
					this.currentShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
					this.currentShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
					this.currentShader.uniform1i('parent_texture', 0);
					this.currentShader.uniform1i('current_texture', 1);
					this.currentShader.attributeBuffer("position", this.quatBuffer, 2);
					gl.bindTexture(gl.TEXTURE_2D, this.msaa_buffers.blend_texture_front);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.activeTexture(gl.TEXTURE1);
					gl.bindTexture(gl.TEXTURE_2D, this.msaa_buffers.blend_texture_back);
					gl.activeTexture(gl.TEXTURE1);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.activeTexture(gl.TEXTURE0);
					gl.drawArrays(gl.TRIANGLES, 0, 12);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_blend_front_framebuffer);
					gl.clear(gl.COLOR_BUFFER_BIT);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_blend_back_framebuffer);
					gl.clear(gl.COLOR_BUFFER_BIT);
					gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
					this.blendType = null;
				}
			}
			renderTexture(imageInterval, isSmoothed) {
				if (this.maskersInProgress <= 1) {
					var matrix = this.matrixTransform;
					var colorTransform = this.colorTransform;
					if (!imageInterval) return;
					if (!imageInterval.isRender) return;
					matrix = multiplicationMatrix(matrix, [imageInterval.width, 0, 0, imageInterval.height, 0, 0])
					let world_matrix = [
						matrix[0], matrix[1], 0.0, 0.0,
						matrix[2], matrix[3], 0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						matrix[4], matrix[5], 0.0, 1.0,
					];
					this.useShader(this.shaderTexture);
					this.currentShader.uniformMatrix4("view_matrix", this.view_matrix);
					this.currentShader.uniformMatrix4("world_matrix", world_matrix);
					this.currentShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
					this.currentShader.uniform4f('mult_color', colorTransform[0], colorTransform[1], colorTransform[2], colorTransform[3]);
					this.currentShader.uniform4f('add_color', colorTransform[4] / 255, colorTransform[5] / 255, colorTransform[6] / 255, colorTransform[7] / 255);
					this.currentShader.attributeBuffer("position", this.quatBuffer, 2);
					let filter = isSmoothed ? this.gl.LINEAR : this.gl.NEAREST;
					this.gl.bindTexture(this.gl.TEXTURE_2D, imageInterval.texture);
					this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, filter);
					this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, filter);
					let wrap = this.gl.CLAMP_TO_EDGE;
					this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap);
					this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap);
					this.gl.drawArrays(this.gl.TRIANGLES, 0, 12);
				}
			}
			renderShape(shapeInterval) {
				if (this.maskersInProgress <= 1) {
					if (!shapeInterval) return;
					var matrix = this.matrixTransform;
					var colorTransform = this.colorTransform;
					var array = shapeInterval.shapeIntervalData;
					this.setStencilState();
					let world_matrix = [
						matrix[0], matrix[1], 0.0, 0.0,
						matrix[2], matrix[3], 0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						matrix[4], matrix[5], 0.0, 1.0,
					];
					for (let i = 0; i < array.length; i++) {
						const si = array[i];
						var shader;
						if (si.type == 0) {
							shader = this.shaderColor;
						} else if (si.type == 1) {
							shader = this.shaderGradient;
						} else if (si.type == 2) {
							shader = this.shaderTexture;
						}
						this.useShader(shader);
						this.gl.bindBuffer(this.gl.ARRAY_BUFFER, si.bufferPos);
						this.currentShader.attributeBuffer("position", si.bufferPos, 2);
						if (si.type == 0) {
							this.currentShader.uniform4f('u_color', si.color[0], si.color[1], si.color[2], si.color[3]);
						} else if (si.type == 1) {
							this.currentShader.uniformMatrix3("u_matrix", si.matrix);
							this.currentShader.uniform1fv("u_ratios[0]", si.ratios);
							this.currentShader.uniform4fv("u_colors[0]", si.colors);
							this.currentShader.uniform1i("u_gradient_type", si.isRadial ? 2 : 0);
							this.currentShader.uniform1i("u_repeat_mode", si.repeat);
							this.currentShader.uniform1f("u_focal_point", si.focal);
							this.currentShader.uniform1i("u_interpolation", 0);
						} else if (si.type == 2) {
							let filter = si.isSmoothed ? this.gl.LINEAR : this.gl.NEAREST;
							this.gl.bindTexture(this.gl.TEXTURE_2D, si.texture);
							this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, filter);
							this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, filter);
							let wrap = si.isRepeating ? this.gl.REPEAT : this.gl.CLAMP_TO_EDGE;
							this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap);
							this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap);
							this.currentShader.uniformMatrix3("u_matrix", si.matrix);
						}
						this.currentShader.uniformMatrix4("view_matrix", this.view_matrix);
						this.currentShader.uniformMatrix4("world_matrix", world_matrix);
						this.currentShader.uniform4f('mult_color', colorTransform[0], colorTransform[1], colorTransform[2], colorTransform[3]);
						this.currentShader.uniform4f('add_color', colorTransform[4] / 255, colorTransform[5] / 255, colorTransform[6] / 255, colorTransform[7] / 255);
						this.gl.drawArrays(this.gl.TRIANGLES, 0, si.num);
					}
				}
			}
			registerShape(shapes) {
				return this.shapeToInterval(shapes);
			}
			path2dToVex(path2d) {
				var arrs = [];
				var arr = [];
				var posX = 0;
				var posY = 0;
				for (let i = 0; i < path2d.length; i++) {
					const a = path2d[i];
					switch (a[0]) {
						case 0:
							arr = [a[1] || 0, a[2] || 0];
							arrs.push(arr);
							posX = a[1] || 0;
							posY = a[2] || 0;
							break;
						case 1:
							for (let _ = 1; _ <= 5; _++) {
								var x = QuadraticBezier(_ / 5, posX, a[1] || 0, a[3] || 0) | 0;
								var y = QuadraticBezier(_ / 5, posY, a[2] || 0, a[4] || 0) | 0;
								arr.push(x, y);
							}
							posX = a[3];
							posY = a[4];
							break;
						case 2:
							if (!(((a[1] || 0) == posX) && ((a[2] || 0) == posY))) {
								arr.push(a[1] || 0, a[2] || 0);
								posX = a[1] || 0;
								posY = a[2] || 0;	
							}
							break;
					}
				}
				return arrs;
			}
			createFill(path2d) {
				return new Float32Array(AT_Tess.fill(this.path2dToVex(path2d)));
			}
			createStroke(path2d, width) {
				var arrs = this.path2dToVex(path2d);
				return new Float32Array(AT_Tess.stroke(arrs, width));
			}
			setStencilState() {
				switch(this.maskState) {
					case 0:
						this.gl.disable(this.gl.STENCIL_TEST);
						this.gl.colorMask(true, true, true, true);
						break;
					case 1:
						this.gl.enable(this.gl.STENCIL_TEST);
						this.gl.stencilFunc(this.gl.EQUAL, this.numMasks - 1, 0xff);
						this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.INCR);
						this.gl.colorMask(false, false, false, false);
						break;
					case 2:
						this.gl.enable(this.gl.STENCIL_TEST);
						this.gl.stencilFunc(this.gl.EQUAL, this.numMasks, 0xff);
						this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.KEEP);
						this.gl.colorMask(true, true, true, true);
						break;
					case 3:
						this.gl.enable(this.gl.STENCIL_TEST);
						this.gl.stencilFunc(this.gl.EQUAL, this.numMasks, 0xff);
						this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.DECR);
						this.gl.colorMask(false, false, false, false);
						break;
				}
			}
			_pushMask() {
				this.numMasks += 1;
				this.maskState = 1;
			}
			_activateMask() {
				this.maskState = 2;
			}
			_deactivateMask() {
				this.maskState = 3;
			}
			_popMask() {
				this.numMasks -= 1;
				if (this.numMasks == 0) {
					this.maskState = 0;
				} else {
					this.maskState = 2;
				}
			}
			pushMask() {
				if (this.maskersInProgress == 0) this._pushMask();
				this.maskersInProgress += 1;
			}
			activateMask() {
				this.maskersInProgress -= 1;
				if (this.maskersInProgress == 0) this._activateMask();
			}
			deactivateMask() {
				if (this.maskersInProgress == 0) this._deactivateMask();
				this.maskersInProgress += 1;
			}
			popMask() {
				this.maskersInProgress -= 1;
				if (this.maskersInProgress == 0) this._popMask();
			}
			setQuality(quality) {
				this.quality = quality;
			}
			clear() {
				this.blendState = 0;
				this.blendType = null;
				this.maskState = 0;
				this.numMasks = 0;
				this.maskStateDirty = true;
				const gl = this.gl;
				gl.bindFramebuffer(gl.FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
				gl.viewport(0, 0, this.canvas.width, this.canvas.height);
				this.setStencilState();
				gl.clearColor(1, 1, 1, 1);
				gl.stencilMask(0xff);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
			}
			render() {
				const gl = this.gl;
				gl.disable(gl.STENCIL_TEST);
				gl.colorMask(true, true, true, true);
				gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.msaa_buffers.render_framebuffer);
				gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.msaa_buffers.color_framebuffer);
				gl.blitFramebuffer(0, 0, this.renderbuffer_width, this.renderbuffer_height, 0, 0, this.renderbuffer_width, this.renderbuffer_height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				gl.clear(gl.COLOR_BUFFER_BIT);
				gl.viewport(0, 0, this.canvas.width, this.canvas.height);
				this.useShader(this.shaderTexture);
				this.currentShader.uniformMatrix4("view_matrix", [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
				this.currentShader.uniformMatrix4("world_matrix", [2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0]);
				this.currentShader.uniformMatrix3("u_matrix", [1, 0, 0, 0, 1, 0, 0, 0, 1]);
				this.currentShader.uniform4f('mult_color', 1, 1, 1, 1);
				this.currentShader.uniform4f('add_color', 0, 0, 0, 0);
				this.currentShader.attributeBuffer("position", this.quatBuffer, 2);
				gl.bindTexture(gl.TEXTURE_2D, this.msaa_buffers.framebuffer_texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.drawArrays(gl.TRIANGLES, 0, 12);
			}
		}
		RenderWebGL.shader_texture = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;

	attribute vec2 position;

	varying vec2 frag_uv;

	void main() {
		frag_uv = vec2(u_matrix * vec3(position, 1.0));
		gl_Position = view_matrix * world_matrix * vec4(position, 0.0, 1.0);
	}`;
		RenderWebGL.shader_bitmap = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;

	uniform sampler2D u_texture;

	varying vec2 frag_uv;

	void main() {
		vec4 color = texture2D(u_texture, frag_uv);

		// Unmultiply alpha before apply color transform.
		if( color.a > 0.0 ) {
			color.rgb /= color.a;
			color = clamp(mult_color * color + add_color, 0.0, 1.0);
			float alpha = clamp(color.a, 0.0, 1.0);
			color = vec4(color.rgb * alpha, alpha);
		}

		gl_FragColor = color;
	}`;
		RenderWebGL.vs_color = `
	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform vec4 u_color;

	attribute vec2 position;

	varying vec4 frag_color;

	void main() {
	  frag_color = clamp(u_color * mult_color + add_color, 0.0, 1.0);
	  float alpha = clamp(frag_color.a, 0.0, 1.0);
	  frag_color = vec4(frag_color.rgb * alpha, alpha);

	  gl_Position =  view_matrix * world_matrix * vec4(position, 0.0, 1.0);
	}`;
		RenderWebGL.fs_color = `
	precision mediump float;

	varying vec4 frag_color;

	void main() {
	  gl_FragColor = frag_color;
	}`;
		RenderWebGL.shader_gradient = `
	#version 100

	#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
	#else
		precision mediump float;
	#endif

	uniform mat4 view_matrix;
	uniform mat4 world_matrix;
	uniform vec4 mult_color;
	uniform vec4 add_color;
	uniform mat3 u_matrix;

	uniform int u_gradient_type;
	uniform float u_ratios[16];
	uniform vec4 u_colors[16];
	uniform int u_repeat_mode;
	uniform float u_focal_point;
	uniform int u_interpolation;

	varying vec2 frag_uv;

	vec4 interpolate(float t, float ratio1, float ratio2, vec4 color1, vec4 color2) {
		color1 = clamp(mult_color * color1 + add_color, 0.0, 1.0);
		color2 = clamp(mult_color * color2 + add_color, 0.0, 1.0);
		float a = (t - ratio1) / (ratio2 - ratio1);
		return mix(color1, color2, a);
	}

	vec3 linear_to_srgb(vec3 linear) {
		vec3 a = 12.92 * linear;
		vec3 b = 1.055 * pow(linear, vec3(1.0 / 2.4)) - 0.055;
		vec3 c = step(vec3(0.0031308), linear);
		return mix(a, b, c);
	}

	void main() {
		float t;
		if( u_gradient_type == 0 )
		{
			t = frag_uv.x;
		}
		else if( u_gradient_type == 1 )
		{
			t = length(frag_uv * 2.0 - 1.0);
		}
		else if( u_gradient_type == 2 )
		{
			vec2 uv = frag_uv * 2.0 - 1.0;
			vec2 d = vec2(u_focal_point, 0.0) - uv;
			float l = length(d);
			d /= l;
			t = l / (sqrt(1.0 -  u_focal_point*u_focal_point*d.y*d.y) + u_focal_point*d.x);
		}
		if( u_repeat_mode == 0 )
		{
			// Clamp
			t = clamp(t, 0.0, 1.0);
		}
		else if( u_repeat_mode == 1 )
		{
			// Repeat
			t = fract(t);
		}
		else
		{
			// Mirror
			if( t < 0.0 )
			{
				t = -t;
			}

			if( int(mod(t, 2.0)) == 0 ) {
				t = fract(t);
			} else {
				t = 1.0 - fract(t);
			}
		}

		// TODO: No non-constant array access in WebGL 1, so the following is kind of painful.
		// We'd probably be better off passing in the gradient as a texture and sampling from there.
		vec4 color;
		if( t <= u_ratios[0] ) {
			color = clamp(mult_color * u_colors[0] + add_color, 0.0, 1.0);
		} else if( t <= u_ratios[1] ) {
			color = interpolate(t, u_ratios[0], u_ratios[1], u_colors[0], u_colors[1]);
		} else if( t <= u_ratios[2] ) {
			color = interpolate(t, u_ratios[1], u_ratios[2], u_colors[1], u_colors[2]);
		} else if( t <= u_ratios[3] ) {
			color = interpolate(t, u_ratios[2], u_ratios[3], u_colors[2], u_colors[3]);
		} else if( t <= u_ratios[4] ) {
			color = interpolate(t, u_ratios[3], u_ratios[4], u_colors[3], u_colors[4]);
		} else if( t <= u_ratios[5] ) {
			color = interpolate(t, u_ratios[4], u_ratios[5], u_colors[4], u_colors[5]);
		} else if( t <= u_ratios[6] ) {
			color = interpolate(t, u_ratios[5], u_ratios[6], u_colors[5], u_colors[6]);
		} else if( t <= u_ratios[7] ) {
			color = interpolate(t, u_ratios[6], u_ratios[7], u_colors[6], u_colors[7]);
		} else if( t <= u_ratios[8] ) {
			color = interpolate(t, u_ratios[7], u_ratios[8], u_colors[7], u_colors[8]);
		} else if( t <= u_ratios[9] ) {
			color = interpolate(t, u_ratios[8], u_ratios[9], u_colors[8], u_colors[9]);
		} else if( t <= u_ratios[10] ) {
			color = interpolate(t, u_ratios[9], u_ratios[10], u_colors[9], u_colors[10]);
		} else if( t <= u_ratios[11] ) {
			color = interpolate(t, u_ratios[10], u_ratios[11], u_colors[10], u_colors[11]);
		} else if( t <= u_ratios[12] ) {
			color = interpolate(t, u_ratios[11], u_ratios[12], u_colors[11], u_colors[12]);
		} else if( t <= u_ratios[13] ) {
			color = interpolate(t, u_ratios[12], u_ratios[13], u_colors[12], u_colors[13]);
		} else if( t <= u_ratios[14] ) {
			color = interpolate(t, u_ratios[13], u_ratios[14], u_colors[13], u_colors[14]);
		} else {
			color = clamp(mult_color * u_colors[14] + add_color, 0.0, 1.0);
		}

		if( u_interpolation != 0 ) {
			color = vec4(linear_to_srgb(vec3(color)), color.a);
		}

		float alpha = clamp(color.a, 0.0, 1.0);
		gl_FragColor = vec4(color.rgb * alpha, alpha);
	}`;
		RenderWebGL.shader_blend_normal = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			return src + dst - dst * src.a;
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		RenderWebGL.shader_blend_add = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			vec4 c = vec4(dst.rgb + src.rgb, dst.a + src.a);
			return mix(c, src, step(1.0, 0.0));
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		RenderWebGL.shader_blend_subtract = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			vec4 c = vec4(dst.rgb - src.rgb, dst.a + src.a);
			return mix(c, src, step(dst.a, 0.0));
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
			RenderWebGL.shader_blend_multiply = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			vec4 a = src - src * dst.a;
			vec4 b = dst - dst * src.a;
			vec4 c = src * dst;
			return a + b + c;
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
			RenderWebGL.shader_blend_lighten = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				src.rgb /= src.a;
				vec4 c = vec4(mix(dst.rgb, src.rgb, step(dst.rgb, src.rgb)), 1.0) * src.a;
				return c + dst * (1.0 - src.a);
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
			RenderWebGL.shader_blend_darken = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (dst.a == 0.0) {
				return src;
			} else if (src.a > 0.0) {
				src.rgb /= src.a;
				vec4 c = vec4(mix(dst.rgb, src.rgb, step(src.rgb, dst.rgb)), 1.0) * src.a;
				return c + dst * (1.0 - src.a);
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
			RenderWebGL.shader_blend_screen = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				vec4 _src = src;
				vec4 _dst = dst;
				_src.rgb /= src.a;
				_dst.rgb /= dst.a;
				vec4 _out = _src;
				_out.r = (1.0 - ((1.0 - _src.r) * (1.0 - _dst.r)));
				_out.g = (1.0 - ((1.0 - _src.g) * (1.0 - _dst.g)));
				_out.b = (1.0 - ((1.0 - _src.b) * (1.0 - _dst.b)));
				return vec4(src.rgb * (1.0 - dst.a) + dst.rgb * (1.0 - src.a) + src.a * dst.a * _out.rgb, src.a + dst.a * (1.0 - src.a));
			} else {
				return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
			RenderWebGL.shader_blend_overlay = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D parent_texture;
		uniform sampler2D current_texture;

		varying vec2 frag_uv;

		void main() {
			vec4 dst = texture2D(parent_texture, frag_uv);
			vec4 src = texture2D(current_texture, frag_uv);
			if (src.a > 0.0) {
				vec4 _src = src;
				vec4 _dst = dst;
				_src.rgb /= src.a;
				_dst.rgb /= dst.a;
				vec4 _out = _src;
				if (_dst.r <= 0.5) { _out.r = (2.0 * _src.r * _dst.r); } else { _out.r = (1.0 - 2.0 * (1.0 - _dst.r) * (1.0 - _src.r)); }
				if (_dst.g <= 0.5) { _out.g = (2.0 * _src.g * _dst.g); } else { _out.g = (1.0 - 2.0 * (1.0 - _dst.g) * (1.0 - _src.g)); }
				if (_dst.b <= 0.5) { _out.b = (2.0 * _src.b * _dst.b); } else { _out.b = (1.0 - 2.0 * (1.0 - _dst.b) * (1.0 - _src.b)); }
				gl_FragColor = vec4(src.rgb * (1.0 - dst.a) + dst.rgb * (1.0 - src.a) + src.a * dst.a * _out.rgb, src.a + dst.a * (1.0 - src.a));
			} else {
				gl_FragColor = dst;
			}
		}`;
			RenderWebGL.shader_blend_hardlight = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				vec4 _src = src;
				vec4 _dst = dst;
				_src.rgb /= src.a;
				_dst.rgb /= dst.a;
				vec4 _out = _src;
				if (_src.r <= 0.5) { _out.r = (2.0 * _src.r * _dst.r); } else { _out.r = (1.0 - 2.0 * (1.0 - _dst.r) * (1.0 - _src.r)); }
				if (_src.g <= 0.5) { _out.g = (2.0 * _src.g * _dst.g); } else { _out.g = (1.0 - 2.0 * (1.0 - _dst.g) * (1.0 - _src.g)); }
				if (_src.b <= 0.5) { _out.b = (2.0 * _src.b * _dst.b); } else { _out.b = (1.0 - 2.0 * (1.0 - _dst.b) * (1.0 - _src.b)); }
				_out.a = 1.0;
				return vec4(src.rgb * (1.0 - dst.a) + dst.rgb * (1.0 - src.a) + src.a * dst.a * _out.rgb, src.a + dst.a * (1.0 - src.a));
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
			RenderWebGL.shader_blend_difference = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D current_texture;
		uniform sampler2D parent_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				src.rgb /= src.a;
				vec4 c = vec4(abs(src.rgb - dst.rgb), 1.0) * src.a;
				return c + dst * (1.0 - src.a);
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 src = texture2D(current_texture, frag_uv);
			vec4 dst = texture2D(parent_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
			RenderWebGL.shader_blend_invert = `
		#version 100

		#ifdef GL_FRAGMENT_PRECISION_HIGH
		precision highp float;
		#else
		precision mediump float;
		#endif

		uniform mat4 view_matrix;
		uniform mat4 world_matrix;
		uniform vec4 mult_color;
		uniform vec4 add_color;
		uniform mat3 u_matrix;

		uniform sampler2D parent_texture;
		uniform sampler2D current_texture;

		varying vec2 frag_uv;

		vec4 blend (in vec4 src, in vec4 dst) {
			if (src.a > 0.0) {
				vec4 c = vec4(1.0 - dst.rgb, 1.0) * src.a;
				return c + dst * (1.0 - src.a);
			} else {
			 	return dst;
			}
		}

		void main() {
			vec4 dst = texture2D(parent_texture, frag_uv);
			vec4 src = texture2D(current_texture, frag_uv);
			gl_FragColor = blend(src, dst);
		}`;
		wpjsm.exportJS = RenderWebGL;
	},
	"src/utils/at-h263-decoder.js": function(wpjsm){
		const saturatingSub = function(a, b) {
			return a - b;
		}
		const asU8 = function(num) {
			return (num << 24) >>> 24;
		}
		const asI8 = function(num) {
			return (num << 24) >> 24;
		}
		const asU16 = function(num) {
			return (num << 16) >>> 16;
		}
		const asI16 = function(num) {
			return (num << 16) >> 16;
		}
		const num_signum = function(num) {
			if (num > 0) {
				return 1;
			} else if (num == 0) {
				return 0;
			} else {
				return -1;
			}
		}
		function num_clamp(value, a, b) {
			return Math.max(Math.min(value, b), a);
		}
		function asfgdgdfg(value, min, max) {
			return (value >= min) && (value <= max);
		}
		function op_cmp(a, b) {
			if (a > b) {
				return "greater";
			} else if (a < b) {
				return "less";
			} else {
				return "equal";
			}
		}
		const is_eof_error = function(type) {
			return (type == "EndOfFile") || (type == "_");
		}
		class Picture {
			constructor() {
				this.version = 0;
				this.temporal_reference = 0;
				this.format = null;
				this.options = null;
				this.has_plusptype = false;
				this.has_opptype = false;
				this.picture_type = null;
				this.motion_vector_range = null;
				this.slice_submode = null;
				this.scalability_layer = null;
				this.reference_picture_selection_mode = null;
				this.prediction_reference = 0;
				this.backchannel_message = null;
				this.reference_picture_resampling = null;
				this.quantizer = 0;
				this.multiplex_bitstream = 0;
				this.pb_reference = 0;
				this.pb_quantizer = null;
				this.extra = [];
			}
		}
		class PixelAspectRatio {
			constructor(type, value) {
				this.type = type;
				this.value = (value || null);
			}
		}
		PixelAspectRatio.Square = 1;
		PixelAspectRatio.Par12_11 = 2;
		PixelAspectRatio.Par10_11 = 3;
		PixelAspectRatio.Par16_11 = 4;
		PixelAspectRatio.Par40_33 = 5;
		PixelAspectRatio.Reserved = 6;
		PixelAspectRatio.Extended = 7;
		class CustomPictureFormat {
			constructor(pixelAspectRatio, pictureWidthIndication, pictureHeightIndication) {
				this.pixelAspectRatio = pixelAspectRatio;
				this.pictureWidthIndication = pictureWidthIndication;
				this.pictureHeightIndication = pictureHeightIndication;
			}
		}
		class MotionVectorRange {
			constructor(type) {
				this.type = type;
			}
		}
		MotionVectorRange.Extended = 0;
		MotionVectorRange.Unlimited = 1;
		class SourceFormat {
			constructor(type, value) {
				this.type = type;
				this.value = (value || null);
			}
			intoWidthAndHeight() {
				switch (this.type) {
					case SourceFormat.SubQcif:
						return [128, 96];
					case SourceFormat.QuarterCif:
						return [176, 144];
					case SourceFormat.FullCif:
						return [352, 288];
					case SourceFormat.FourCif:
						return [704, 576];
					case SourceFormat.SixteenCif:
						return [1408, 1152];
					case SourceFormat.Reserved:
						return null;
					case SourceFormat.Extended:
						return [this.value.pictureWidthIndication, this.value.pictureHeightIndication];
				}
			}
		}
		SourceFormat.SubQcif = 1;
		SourceFormat.QuarterCif = 2;
		SourceFormat.FullCif = 3;
		SourceFormat.FourCif = 4;
		SourceFormat.SixteenCif = 5;
		SourceFormat.Reserved = 6;
		SourceFormat.Extended = 7;
		class PictureTypeCode {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
			is_any_pbframe() {
				return (this.type == PictureTypeCode.PbFrame) || (this.type == PictureTypeCode.ImprovedPbFrame);
			}
			is_disposable() {
				return this.type == PictureTypeCode.DisposablePFrame;
			}
			getType() {
				switch (this.type) {
					case PictureTypeCode.IFrame:
						return "IFrame";
					case PictureTypeCode.PFrame:
						return "PFrame";
					case PictureTypeCode.PbFrame:
						return "PbFrame";
					case PictureTypeCode.EiFrame:
						return "EiFrame";
					case PictureTypeCode.EpFrame:
						return "EpFrame";
					case PictureTypeCode.Reserved:
						return "Reserved";
					case PictureTypeCode.DisposablePFrame:
						return "DisposablePFrame";
				}
			}
		}
		PictureTypeCode.IFrame = 1;
		PictureTypeCode.PFrame = 2;
		PictureTypeCode.PbFrame = 3;
		PictureTypeCode.ImprovedPbFrame = 4;
		PictureTypeCode.BFrame = 5;
		PictureTypeCode.EiFrame = 6;
		PictureTypeCode.EpFrame = 7;
		PictureTypeCode.Reserved = 8;
		PictureTypeCode.DisposablePFrame = 9;
		class DecodedDctBlock {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
		}
		DecodedDctBlock.Zero = 1;
		DecodedDctBlock.Dc = 2;
		DecodedDctBlock.Horiz = 3;
		DecodedDctBlock.Vert = 4;
		DecodedDctBlock.Full = 5;
		class PictureOption {
			constructor() {
				this.USE_SPLIT_SCREEN = false;
				this.USE_DOCUMENT_CAMERA = false;
				this.RELEASE_FULL_PICTURE_FREEZE = false;
				this.UNRESTRICTED_MOTION_VECTORS = false;
				this.SYNTAX_BASED_ARITHMETIC_CODING = false;
				this.ADVANCED_PREDICTION = false;
				this.ADVANCED_INTRA_CODING = false;
				this.DEBLOCKING_FILTER = false;
				this.SLICE_STRUCTURED = false;
				this.REFERENCE_PICTURE_SELECTION = false;
				this.INDEPENDENT_SEGMENT_DECODING = false;
				this.ALTERNATIVE_INTER_VLC = false;
				this.MODIFIED_QUANTIZATION = false;
				this.REFERENCE_PICTURE_RESAMPLING = false;
				this.REDUCED_RESOLUTION_UPDATE = false;
				this.ROUNDING_TYPE_ONE = false;
				this.USE_DEBLOCKER = false;
			}
			static empty() {
				return new PictureOption();
			}
		}
		function decodeSorensonPType(reader) {
			var source_format, bit_count;
			var dgf = reader.readBits(3);
			switch(dgf) {
				case 0:
					source_format = null;
					bit_count = 8;
					break;
				case 1:
					source_format = null;
					bit_count = 16;
					break;
				case 2:
					source_format = new SourceFormat(SourceFormat.FullCif);
					bit_count = 0;
					break;
				case 3:
					source_format = new SourceFormat(SourceFormat.QuarterCif);
					bit_count = 0;
					break;
				case 4:
					source_format = new SourceFormat(SourceFormat.SubQcif);
					bit_count = 0;
					break;
				case 5:
					source_format = new SourceFormat(SourceFormat.Extended, new CustomPictureFormat(new PixelAspectRatio(PixelAspectRatio.Square), 320, 240));
					bit_count = 0;
					break;
				case 6:
					source_format = new SourceFormat(SourceFormat.Extended, new CustomPictureFormat(new PixelAspectRatio(PixelAspectRatio.Square), 160, 120));
					bit_count = 0;
					break;
				default:
					source_format = new SourceFormat(SourceFormat.Reserved);
					bit_count = 0;
			}
			if (source_format === null) {
				let customWidth = reader.readBits(bit_count);
				let customHeight = reader.readBits(bit_count);
				source_format = new SourceFormat(SourceFormat.Extended, new CustomPictureFormat(new PixelAspectRatio(PixelAspectRatio.Square), customWidth, customHeight));
			}
			var fdgd = reader.readBits(2);
			var pictureType;
			switch(fdgd) {
				case 0:
					pictureType = new PictureTypeCode(PictureTypeCode.IFrame);
					break;
				case 1:
					pictureType = new PictureTypeCode(PictureTypeCode.PFrame);
					break;
				case 2:
					pictureType = new PictureTypeCode(PictureTypeCode.DisposablePFrame);
					break;
				default:
					pictureType = new PictureTypeCode(PictureTypeCode.Reserved, fdgd);
					break;
			}
			let options = PictureOption.empty();
			if (asU8(reader.readBits(1)) == 1) {
				options.USE_DEBLOCKER = true;
			}
			return [source_format, pictureType, options];
		}
		class DecodedPicture {
			constructor(picture_header, format) {
				let [w, h] = format.intoWidthAndHeight();
				let luma_samples = w * h;
				let luma = new Uint8Array(luma_samples);
				let chroma_w = Math.ceil(w / 2.0);
				let chroma_h = Math.ceil(h / 2.0);
				let chroma_samples = chroma_w * chroma_h;
				let chroma_b = new Uint8Array(chroma_samples);
				let chroma_r = new Uint8Array(chroma_samples);
				this.picture_header = picture_header;
				this.format = format;
				this.luma = luma;
				this.chroma_b = chroma_b;
				this.chroma_r = chroma_r;
				this.chroma_samples_per_row = chroma_w;
			}
			as_yuv() {
				return [this.luma, this.chroma_b, this.chroma_r];
			}
			as_header() {
				return this.picture_header;
			}
			as_luma_mut() {
				return this.luma;
			}
			as_chroma_b_mut() {
				return this.chroma_b;
			}
			as_chroma_r_mut() {
				return this.chroma_r;
			}
			as_luma() {
				return this.luma;
			}
			as_chroma_b() {
				return this.chroma_b;
			}
			as_chroma_r() {
				return this.chroma_r;
			}
			luma_samples_per_row() {
				return this.format.intoWidthAndHeight()[0];
			}
		}
		function decodePei(reader) {
			var data = [];
			while(true) {
				var hasPei = reader.readBits(1);
				if (hasPei == 1) {
					data.push(reader.readUint8());
				} else {
					break;
				}
			}
			return data;
		}
		function decodePicture(reader, decoderOptions, previous_picture) {
			var skippedBits = reader.recognizeStartCode(false);
			reader.skipBits(17 + skippedBits);
			var gob_id = reader.readBits(5);
			if (decoderOptions.sorensonSpark) {
				var temporalReference = reader.readUint8();
				var [source_format, pictureType, options] = decodeSorensonPType(reader);
				var quantizer = reader.readBits(5);
				var extra = decodePei(reader);
				var result = new Picture();
				result.version = gob_id;
				result.temporal_reference = temporalReference;
				result.format = source_format;
				result.options = options;
				result.has_plusptype = false;
				result.has_opptype = false;
				result.picture_type = pictureType;
				result.quantizer = quantizer;
				result.extra = extra;
				result.motion_vector_range = new MotionVectorRange(MotionVectorRange.Unlimited);
				result.slice_submode = null;
				result.scalability_layer = null;
				result.reference_picture_selection_mode = null;
				result.prediction_reference = null;
				result.backchannel_message = null;
				result.reference_picture_resampling = null;
				result.multiplex_bitstream = null;
				result.pb_reference = null;
				result.pb_quantizer = null;
				return result;
			}
		}
		class CodedBlockPattern {
			constructor(codes_luma, codes_chroma_b, codes_chroma_r) {
				this.codes_luma = codes_luma;
				this.codes_chroma_b = codes_chroma_b;
				this.codes_chroma_r = codes_chroma_r;
			}
		}
		class HalfPel {
			constructor(n) {
				this.n = n;
			}
			static zero() {
				return new HalfPel(0);
			}
			static from(float) {
				return new HalfPel(asI16(Math.floor(float * 2)));
			}
			static from_unit(unit) {
				return new HalfPel(asI16(unit));
			}
			is_mv_within_range(range) {
				return -range.n <= this.n && this.n < range.n;
			}
			invert() {
				switch (op_cmp(this.n, 0)) {
					case "greater":
						return new HalfPel(this.n - 64);
					case "less":
						return new HalfPel(this.n + 64);
					case "equal":
						return this;
				}
			}
			average_sum_of_mvs() {
				let whole = (this.n >> 4) << 1;
				let frac = this.n & 0x0F;
				if (asfgdgdfg(frac, 0, 2)) {
					return new HalfPel(whole);
				} else if (asfgdgdfg(frac, 14, 15)) {
					return new HalfPel(whole + 2);
				} else {
					return new HalfPel(whole + 1);
				}
			}
			median_of(mhs, rhs) {
				var num_self = this.n;
				var num_mhs = mhs.n;
				var num_rhs = rhs.n;
				if (num_self > num_mhs) {
					if (num_rhs > num_mhs) {
						if (num_rhs > num_self) {
							return this;
						} else {
							return rhs;
						}
					} else {
						return mhs;
					}
				} else if (num_mhs > num_rhs) {
					if (num_rhs > num_self) {
						return rhs;
					} else {
						return this;
					}
				} else {
					return mhs;
				}
			}
			into_lerp_parameters() {
				if (this.n % 2 == 0) {
					return [asI16(this.n / 2), false];
				} else if (this.n < 0) {
					return [asI16(this.n / 2 - 1), true];
				} else {
					return [asI16(this.n / 2), true];
				}
			}
		}
		HalfPel.STANDARD_RANGE = new HalfPel(32);
		HalfPel.EXTENDED_RANGE = new HalfPel(64);
		HalfPel.EXTENDED_RANGE_QUADCIF = new HalfPel(128);
		HalfPel.EXTENDED_RANGE_SIXTEENCIF = new HalfPel(256);
		HalfPel.EXTENDED_RANGE_BEYONDCIF = new HalfPel(512);
		class MotionVector {
			constructor(n1, n2) {
				this.n1 = n1;
				this.n2 = n2;
			}
			static zero() {
				return new MotionVector(HalfPel.zero(), HalfPel.zero());
			}
			median_of(mhs, rhs) {
				return new MotionVector(this.n1.median_of(mhs.n1, rhs.n1), this.n2.median_of(mhs.n2, rhs.n2));
			}
			into_lerp_parameters() {
				return [this.n1.into_lerp_parameters(), this.n2.into_lerp_parameters()];
			}
			add(rhs) {
				var g1 = asI16(this.n1.n + rhs.n1.n);
				var g2 = asI16(this.n2.n + rhs.n2.n);
				return new MotionVector(new HalfPel(g1), new HalfPel(g2));
			}
			average_sum_of_mvs() {
				return new MotionVector(this.n1.average_sum_of_mvs(), this.n2.average_sum_of_mvs());
			}
		}
		class IntraDc {
			constructor(n) {
				this.n = n;
			}
			static from_u8(value) {
				if (value == 0 || value == 128) {
					return null;
				} else {
					return new IntraDc(value);
				}
			}
			into_level() {
				if (this.n == 0xFF) {
					return 1024;
				} else {
					return asI16(asI16(asU16(this.n)) << 3);
				}
			}
		}
		class TCoefficient {
			constructor(is_short, run, level) {
				this.is_short = is_short;
				this.run = run;
				this.level = level;
			}
		}
		class Block {
			constructor(intradc, tcoef) {
				this.intradc = intradc;
				this.tcoef = tcoef;
			}
		}
		class VlcEntry {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
		}
		VlcEntry.End = 1;
		VlcEntry.Fork = 2;
		class MacroblockType {
			constructor(type) {
				this.type = type;
			}
			is_inter() {
				return this.type == MacroblockType.Inter || this.type == MacroblockType.InterQ || this.type == MacroblockType.Inter4V || this.type == MacroblockType.Inter4Vq;
			}
			is_intra() {
				return (this.type == MacroblockType.Intra) || (this.type == MacroblockType.IntraQ);
			}
			has_fourvec() {
				return this.type == MacroblockType.Inter4V || this.type == MacroblockType.Inter4Vq;
			}
			has_quantizer() {
				return this.type == MacroblockType.InterQ || this.type == MacroblockType.IntraQ || this.type == MacroblockType.Inter4Vq;
			}
		}
		MacroblockType.Inter = 1;
		MacroblockType.InterQ = 2;
		MacroblockType.Inter4V = 3;
		MacroblockType.Intra = 4;
		MacroblockType.IntraQ = 5;
		MacroblockType.Inter4Vq = 6;
		class Macroblock {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
		}
		Macroblock.Uncoded = 1;
		Macroblock.Stuffing = 2;
		Macroblock.Coded = 3;
		class BlockPatternEntry {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
		}
		BlockPatternEntry.Stuffing = 1;
		BlockPatternEntry.Invalid = 2;
		BlockPatternEntry.Valid = 3;
		const MCBPC_I_TABLE = [new VlcEntry(VlcEntry.Fork, [2, 1]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), false, false])), new VlcEntry(VlcEntry.Fork, [6, 3]), new VlcEntry(VlcEntry.Fork, [4, 5]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), true, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), true, true])), new VlcEntry(VlcEntry.Fork, [8, 7]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), false, true])), new VlcEntry(VlcEntry.Fork, [10, 9]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), false, false])), new VlcEntry(VlcEntry.Fork, [14, 11]), new VlcEntry(VlcEntry.Fork, [12, 13]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), true, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), true, true])), new VlcEntry(VlcEntry.Fork, [16, 20]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Invalid)), new VlcEntry(VlcEntry.Fork, [17, 15]), new VlcEntry(VlcEntry.Fork, [18, 15]), new VlcEntry(VlcEntry.Fork, [15, 19]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Stuffing)), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), false, true]))];
		const MCBPC_P_TABLE = [new VlcEntry(VlcEntry.Fork, [2, 1]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter), false, false])), new VlcEntry(VlcEntry.Fork, [6, 3]), new VlcEntry(VlcEntry.Fork, [4, 5]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4V), false, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.InterQ), false, false])), new VlcEntry(VlcEntry.Fork, [10, 7]), new VlcEntry(VlcEntry.Fork, [8, 9]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter), true, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter), false, true])), new VlcEntry(VlcEntry.Fork, [16, 11]), new VlcEntry(VlcEntry.Fork, [13, 12]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), false, false])), new VlcEntry(VlcEntry.Fork, [14, 15]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), false, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter), true, true])), new VlcEntry(VlcEntry.Fork, [24, 17]), new VlcEntry(VlcEntry.Fork, [18, 21]), new VlcEntry(VlcEntry.Fork, [19, 20]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4V), true, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4V), false, true])), new VlcEntry(VlcEntry.Fork, [22, 23]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.InterQ), true, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.InterQ), false, true])), new VlcEntry(VlcEntry.Fork, [30, 25]), new VlcEntry(VlcEntry.Fork, [27, 26]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), true, true])), new VlcEntry(VlcEntry.Fork, [28, 29]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), false, true])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4V), true, true])), new VlcEntry(VlcEntry.Fork, [36, 31]), new VlcEntry(VlcEntry.Fork, [33, 32]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Intra), true, false])), new VlcEntry(VlcEntry.Fork, [34, 35]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), false, true])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.InterQ), true, true])), new VlcEntry(VlcEntry.Fork, [40, 37]), new VlcEntry(VlcEntry.Fork, [38, 39]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), true, true])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.IntraQ), true, false])), new VlcEntry(VlcEntry.Fork, [42, 41]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Stuffing)), new VlcEntry(VlcEntry.Fork, [43, 44]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Invalid)), new VlcEntry(VlcEntry.Fork, [45, 46]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4Vq), false, false])), new VlcEntry(VlcEntry.Fork, [47, 50]), new VlcEntry(VlcEntry.Fork, [48, 49]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4Vq), false, true])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Invalid)), new VlcEntry(VlcEntry.Fork, [51, 52]), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4Vq), true, false])), new VlcEntry(VlcEntry.End, new BlockPatternEntry(BlockPatternEntry.Valid, [new MacroblockType(MacroblockType.Inter4Vq), true, true]))];
		const MODB_TABLE = [new VlcEntry(VlcEntry.Fork, [1, 2]), new VlcEntry(VlcEntry.End, [false, false]), new VlcEntry(VlcEntry.Fork, [3, 4]), new VlcEntry(VlcEntry.End, [false, true]), new VlcEntry(VlcEntry.End, [true, true])];
		function decode_cbpb(reader) {
			let cbp0 = reader.readBits(1) == 1;
			let cbp1 = reader.readBits(1) == 1;
			let cbp2 = reader.readBits(1) == 1;
			let cbp3 = reader.readBits(1) == 1;
			let cbp4 = reader.readBits(1) == 1;
			let cbp5 = reader.readBits(1) == 1;
			return new CodedBlockPattern([cbp0, cbp1, cbp2, cbp3], cbp4, cbp5);
		}
		const CBPY_TABLE_INTRA = [new VlcEntry(VlcEntry.Fork, [1, 24]), new VlcEntry(VlcEntry.Fork, [2, 17]), new VlcEntry(VlcEntry.Fork, [3, 12]), new VlcEntry(VlcEntry.Fork, [4, 9]), new VlcEntry(VlcEntry.Fork, [5, 6]), new VlcEntry(VlcEntry.End, null), new VlcEntry(VlcEntry.Fork, [7, 8]), new VlcEntry(VlcEntry.End, [false, true, true, false]), new VlcEntry(VlcEntry.End, [true, false, false, true]), new VlcEntry(VlcEntry.Fork, [10, 11]), new VlcEntry(VlcEntry.End, [true, false, false, false]), new VlcEntry(VlcEntry.End, [false, true, false, false]), new VlcEntry(VlcEntry.Fork, [13, 16]), new VlcEntry(VlcEntry.Fork, [14, 15]), new VlcEntry(VlcEntry.End, [false, false, true, false]), new VlcEntry(VlcEntry.End, [false, false, false, true]), new VlcEntry(VlcEntry.End, [false, false, false, false]), new VlcEntry(VlcEntry.Fork, [18, 21]), new VlcEntry(VlcEntry.Fork, [19, 20]), new VlcEntry(VlcEntry.End, [true, true, false, false]), new VlcEntry(VlcEntry.End, [true, false, true, false]), new VlcEntry(VlcEntry.Fork, [22, 23]), new VlcEntry(VlcEntry.End, [true, true, true, false]), new VlcEntry(VlcEntry.End, [false, true, false, true]), new VlcEntry(VlcEntry.Fork, [25, 32]), new VlcEntry(VlcEntry.Fork, [26, 29]), new VlcEntry(VlcEntry.Fork, [27, 28]), new VlcEntry(VlcEntry.End, [true, true, false, true]), new VlcEntry(VlcEntry.End, [false, false, true, true]), new VlcEntry(VlcEntry.Fork, [30, 31]), new VlcEntry(VlcEntry.End, [true, false, true, true]), new VlcEntry(VlcEntry.End, [false, true, true, true]), new VlcEntry(VlcEntry.End, [true, true, true, true])];
		function decode_dquant(reader) {
			switch(reader.readBits(2)) {
				case 0:
					return -1;
				case 1:
					return -2;
				case 2:
					return 1;
				case 3:
					return 2;
				default:
					throw new Error("InternalDecoderError");
			}
		}
		const MVD_TABLE = [new VlcEntry(VlcEntry.Fork, [2, 1]), new VlcEntry(VlcEntry.End, 0.0), new VlcEntry(VlcEntry.Fork, [6, 3]), new VlcEntry(VlcEntry.Fork, [4, 5]), new VlcEntry(VlcEntry.End, 0.5), new VlcEntry(VlcEntry.End, -0.5), new VlcEntry(VlcEntry.Fork, [10, 7]), new VlcEntry(VlcEntry.Fork, [8, 9]), new VlcEntry(VlcEntry.End, 1.0), new VlcEntry(VlcEntry.End, -1.0), new VlcEntry(VlcEntry.Fork, [14, 11]), new VlcEntry(VlcEntry.Fork, [12, 13]), new VlcEntry(VlcEntry.End, 1.5), new VlcEntry(VlcEntry.End, -1.5), new VlcEntry(VlcEntry.Fork, [26, 15]), new VlcEntry(VlcEntry.Fork, [19, 16]), new VlcEntry(VlcEntry.Fork, [17, 18]), new VlcEntry(VlcEntry.End, 2.0), new VlcEntry(VlcEntry.End, -2.0), new VlcEntry(VlcEntry.Fork, [23, 20]), new VlcEntry(VlcEntry.Fork, [21, 22]), new VlcEntry(VlcEntry.End, 2.5), new VlcEntry(VlcEntry.End, -2.5), new VlcEntry(VlcEntry.Fork, [24, 25]), new VlcEntry(VlcEntry.End, 3.0), new VlcEntry(VlcEntry.End, -3.0), new VlcEntry(VlcEntry.Fork, [50, 27]), new VlcEntry(VlcEntry.Fork, [31, 28]), new VlcEntry(VlcEntry.Fork, [29, 30]), new VlcEntry(VlcEntry.End, 3.5), new VlcEntry(VlcEntry.End, -3.5), new VlcEntry(VlcEntry.Fork, [39, 32]), new VlcEntry(VlcEntry.Fork, [36, 33]), new VlcEntry(VlcEntry.Fork, [34, 35]), new VlcEntry(VlcEntry.End, 4.0), new VlcEntry(VlcEntry.End, -4.0), new VlcEntry(VlcEntry.Fork, [37, 38]), new VlcEntry(VlcEntry.End, 4.5), new VlcEntry(VlcEntry.End, -4.5), new VlcEntry(VlcEntry.Fork, [43, 40]), new VlcEntry(VlcEntry.Fork, [41, 42]), new VlcEntry(VlcEntry.End, 5.0), new VlcEntry(VlcEntry.End, -5.0), new VlcEntry(VlcEntry.Fork, [47, 44]), new VlcEntry(VlcEntry.Fork, [45, 46]), new VlcEntry(VlcEntry.End, 5.5), new VlcEntry(VlcEntry.End, -5.5), new VlcEntry(VlcEntry.Fork, [48, 49]), new VlcEntry(VlcEntry.End, 6.0), new VlcEntry(VlcEntry.End, -6.0), new VlcEntry(VlcEntry.Fork, [82, 51]), new VlcEntry(VlcEntry.Fork, [67, 52]), new VlcEntry(VlcEntry.Fork, [60, 53]), new VlcEntry(VlcEntry.Fork, [57, 54]), new VlcEntry(VlcEntry.Fork, [55, 56]), new VlcEntry(VlcEntry.End, 6.5), new VlcEntry(VlcEntry.End, -6.5), new VlcEntry(VlcEntry.Fork, [58, 59]), new VlcEntry(VlcEntry.End, 7.0), new VlcEntry(VlcEntry.End, -7.0), new VlcEntry(VlcEntry.Fork, [64, 61]), new VlcEntry(VlcEntry.Fork, [62, 63]), new VlcEntry(VlcEntry.End, 7.5), new VlcEntry(VlcEntry.End, -7.5), new VlcEntry(VlcEntry.Fork, [65, 66]), new VlcEntry(VlcEntry.End, 8.0), new VlcEntry(VlcEntry.End, -8.0), new VlcEntry(VlcEntry.Fork, [75, 68]), new VlcEntry(VlcEntry.Fork, [72, 69]), new VlcEntry(VlcEntry.Fork, [70, 71]), new VlcEntry(VlcEntry.End, 8.5), new VlcEntry(VlcEntry.End, -8.5), new VlcEntry(VlcEntry.Fork, [73, 74]), new VlcEntry(VlcEntry.End, 9.0), new VlcEntry(VlcEntry.End, -9.0), new VlcEntry(VlcEntry.Fork, [79, 76]), new VlcEntry(VlcEntry.Fork, [77, 78]), new VlcEntry(VlcEntry.End, 9.5), new VlcEntry(VlcEntry.End, -9.5), new VlcEntry(VlcEntry.Fork, [80, 81]), new VlcEntry(VlcEntry.End, 10.0), new VlcEntry(VlcEntry.End, -10.0), new VlcEntry(VlcEntry.Fork, [98, 83]), new VlcEntry(VlcEntry.Fork, [91, 84]), new VlcEntry(VlcEntry.Fork, [88, 85]), new VlcEntry(VlcEntry.Fork, [86, 87]), new VlcEntry(VlcEntry.End, 10.5), new VlcEntry(VlcEntry.End, -10.5), new VlcEntry(VlcEntry.Fork, [89, 90]), new VlcEntry(VlcEntry.End, 11.0), new VlcEntry(VlcEntry.End, -11.0), new VlcEntry(VlcEntry.Fork, [95, 92]), new VlcEntry(VlcEntry.Fork, [93, 94]), new VlcEntry(VlcEntry.End, 11.5), new VlcEntry(VlcEntry.End, -11.5), new VlcEntry(VlcEntry.Fork, [96, 97]), new VlcEntry(VlcEntry.End, 12.0), new VlcEntry(VlcEntry.End, -12.0), new VlcEntry(VlcEntry.Fork, [114, 99]), new VlcEntry(VlcEntry.Fork, [107, 100]), new VlcEntry(VlcEntry.Fork, [104, 101]), new VlcEntry(VlcEntry.Fork, [102, 103]), new VlcEntry(VlcEntry.End, 12.5), new VlcEntry(VlcEntry.End, -12.5), new VlcEntry(VlcEntry.Fork, [105, 106]), new VlcEntry(VlcEntry.End, 13.0), new VlcEntry(VlcEntry.End, -13.0), new VlcEntry(VlcEntry.Fork, [111, 108]), new VlcEntry(VlcEntry.Fork, [109, 110]), new VlcEntry(VlcEntry.End, 13.5), new VlcEntry(VlcEntry.End, -13.5), new VlcEntry(VlcEntry.Fork, [112, 113]), new VlcEntry(VlcEntry.End, 14.0), new VlcEntry(VlcEntry.End, -14.0), new VlcEntry(VlcEntry.Fork, [122, 115]), new VlcEntry(VlcEntry.Fork, [119, 116]), new VlcEntry(VlcEntry.Fork, [117, 118]), new VlcEntry(VlcEntry.End, 14.5), new VlcEntry(VlcEntry.End, -14.5), new VlcEntry(VlcEntry.Fork, [120, 121]), new VlcEntry(VlcEntry.End, 15.0), new VlcEntry(VlcEntry.End, -15.0), new VlcEntry(VlcEntry.Fork, [129, 123]), new VlcEntry(VlcEntry.Fork, [127, 124]), new VlcEntry(VlcEntry.Fork, [125, 126]), new VlcEntry(VlcEntry.End, 15.5), new VlcEntry(VlcEntry.End, -15.5), new VlcEntry(VlcEntry.Fork, [129, 128]), new VlcEntry(VlcEntry.End, -16.0), new VlcEntry(VlcEntry.End, null)];
		function decode_motion_vector(reader, picture, running_options) {
			if (running_options.UNRESTRICTED_MOTION_VECTORS && picture.has_plusptype) {
				let x = reader.read_umv();
				let y = reader.read_umv();
				return new MotionVector(x, y);
			} else {
				var res_x = reader.readVLC(MVD_TABLE);
				var res_Y = reader.readVLC(MVD_TABLE);
				if (res_x === null || res_Y === null) {
					throw new Error("InvalidMvd");
				}
				let x = HalfPel.from(res_x);
				let y = HalfPel.from(res_Y);
				return new MotionVector(x, y);
			}
		}
		function decode_macroblock(reader, picture, running_options) {
			return reader.withTransaction(function(reader) {
				let is_coded = 0;
				if (picture.picture_type.type == PictureTypeCode.IFrame) {
					is_coded = 0;
				} else {
					is_coded = reader.readBits(1);
				}
				if (is_coded == 0) {
					var mcbpc = null;
					var picture_type = picture.picture_type;
					switch(picture_type.type) {
						case PictureTypeCode.IFrame:
							mcbpc = reader.readVLC(MCBPC_I_TABLE);
							break;
						case PictureTypeCode.PFrame:
							mcbpc = reader.readVLC(MCBPC_P_TABLE);
							break;
						default:
							throw new Error("UnimplementedDecoding");
					}
					var mb_type = null;
					var codes_chroma_b = null;
					var codes_chroma_r = null;
					switch(mcbpc.type) {
						case BlockPatternEntry.Stuffing:
							return new Macroblock(Macroblock.Stuffing);
						case BlockPatternEntry.Invalid:
							throw new Error("InvalidMacroblockHeader");
						case BlockPatternEntry.Valid:
							mb_type = mcbpc.value[0];
							codes_chroma_b = mcbpc.value[1];
							codes_chroma_r = mcbpc.value[2];
							break;
					}
					var has_cbpb = null;
					var has_mvdb = null;
					if (picture_type.type == PictureTypeCode.PbFrame) {
						var ergf = reader.readVLC(MODB_TABLE);
						has_cbpb = ergf[0];
						has_mvdb = ergf[1];
					} else {
						has_cbpb = false;
						has_mvdb = false;
					}
					let codes_luma = null;
					if (mb_type.is_intra()) {
						var dfgs = reader.readVLC(CBPY_TABLE_INTRA);
						if (dfgs === null) throw new Error("InvalidMacroblockCodedBits");
						codes_luma = dfgs;
					} else {
						var dfgs = reader.readVLC(CBPY_TABLE_INTRA);;
						if (dfgs === null) throw new Error("InvalidMacroblockCodedBits");
						codes_luma = [!dfgs[0], !dfgs[1], !dfgs[2], !dfgs[3]];
					}
					let coded_block_pattern_b = null;
					if (has_cbpb) {
						coded_block_pattern_b = decode_cbpb(reader);
					}
					let d_quantizer = null;
					if (running_options.MODIFIED_QUANTIZATION) {
						throw new Error("UnimplementedDecoding");
					} else if (mb_type.has_quantizer()) {
						d_quantizer = decode_dquant(reader);
					}
					let motion_vector = null;
					if (mb_type.is_inter() || picture_type.is_any_pbframe()) {
						motion_vector = decode_motion_vector(reader, picture, running_options);
					}
					let addl_motion_vectors = null;
					if (mb_type.has_fourvec()) {
						let mv2 = decode_motion_vector(reader, picture, running_options);
						let mv3 = decode_motion_vector(reader, picture, running_options);
						let mv4 = decode_motion_vector(reader, picture, running_options);
						addl_motion_vectors = [mv2, mv3, mv4];
					}
					let motion_vectors_b = null;
					if (has_mvdb) {
						let mv1 = decode_motion_vector(reader, picture, running_options);
						let mv2 = decode_motion_vector(reader, picture, running_options);
						let mv3 = decode_motion_vector(reader, picture, running_options);
						let mv4 = decode_motion_vector(reader, picture, running_options);
						motion_vectors_b = [mv1, mv2, mv3, mv4];
					}
					return new Macroblock(Macroblock.Coded, {
						mb_type,
						coded_block_pattern: {
							codes_luma,
							codes_chroma_b,
							codes_chroma_r
						},
						coded_block_pattern_b,
						d_quantizer,
						motion_vector,
						addl_motion_vectors,
						motion_vectors_b,
					});
				} else {
					return new Macroblock(Macroblock.Uncoded);
				}
			});
		}
		class ShortTCoefficient {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
		}
		ShortTCoefficient.EscapeToLong = 1;
		ShortTCoefficient.Run = 2;
		const TCOEF_TABLE = [new VlcEntry(VlcEntry.Fork, [8, 1]),new VlcEntry(VlcEntry.Fork, [2, 3]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 1})),new VlcEntry(VlcEntry.Fork, [4, 5]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 1,level: 1})),new VlcEntry(VlcEntry.Fork, [6, 7]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 2,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 2})),new VlcEntry(VlcEntry.Fork, [28, 9]),new VlcEntry(VlcEntry.Fork, [15, 10]),new VlcEntry(VlcEntry.Fork, [12, 11]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 0,level: 1})),new VlcEntry(VlcEntry.Fork, [13, 14]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 4,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 3,level: 1})),new VlcEntry(VlcEntry.Fork, [16, 23]),new VlcEntry(VlcEntry.Fork, [17, 20]),new VlcEntry(VlcEntry.Fork, [18, 19]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 9,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 8,level: 1})),new VlcEntry(VlcEntry.Fork, [21, 22]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 7,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 6,level: 1})),new VlcEntry(VlcEntry.Fork, [25, 24]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 5,level: 1})),new VlcEntry(VlcEntry.Fork, [26, 27]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 1,level: 2})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 3})),new VlcEntry(VlcEntry.Fork, [52, 29]),new VlcEntry(VlcEntry.Fork, [37, 30]),new VlcEntry(VlcEntry.Fork, [31, 34]),new VlcEntry(VlcEntry.Fork, [32, 33]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 4,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 3,level: 1})),new VlcEntry(VlcEntry.Fork, [35, 36]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 2,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 1,level: 1})),new VlcEntry(VlcEntry.Fork, [38, 45]),new VlcEntry(VlcEntry.Fork, [39, 42]),new VlcEntry(VlcEntry.Fork, [40, 41]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 8,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 7,level: 1})),new VlcEntry(VlcEntry.Fork, [43, 44]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 6,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 5,level: 1})),new VlcEntry(VlcEntry.Fork, [46, 49]),new VlcEntry(VlcEntry.Fork, [47, 48]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 12,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 11,level: 1})),new VlcEntry(VlcEntry.Fork, [50, 51]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 10,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 4})),new VlcEntry(VlcEntry.Fork, [90, 53]),new VlcEntry(VlcEntry.Fork, [69, 54]),new VlcEntry(VlcEntry.Fork, [55, 62]),new VlcEntry(VlcEntry.Fork, [56, 59]),new VlcEntry(VlcEntry.Fork, [57, 58]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 11,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 10,level: 1})),new VlcEntry(VlcEntry.Fork, [60, 61]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 9,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 14,level: 1})),new VlcEntry(VlcEntry.Fork, [63, 66]),new VlcEntry(VlcEntry.Fork, [64, 65]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 13,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 2,level: 2})),new VlcEntry(VlcEntry.Fork, [67, 68]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 1,level: 3})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 5})),new VlcEntry(VlcEntry.Fork, [77, 70]),new VlcEntry(VlcEntry.Fork, [71, 74]),new VlcEntry(VlcEntry.Fork, [72, 73]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 15,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 14,level: 1})),new VlcEntry(VlcEntry.Fork, [75, 76]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 13,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 12,level: 1})),new VlcEntry(VlcEntry.Fork, [78, 85]),new VlcEntry(VlcEntry.Fork, [79, 82]),new VlcEntry(VlcEntry.Fork, [80, 81]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 16,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 15,level: 1})),new VlcEntry(VlcEntry.Fork, [83, 84]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 4,level: 2})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 3,level: 2})),new VlcEntry(VlcEntry.Fork, [86, 89]),new VlcEntry(VlcEntry.Fork, [87, 88]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 7})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 6})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 16,level: 1})),new VlcEntry(VlcEntry.Fork, [124, 91]),new VlcEntry(VlcEntry.Fork, [92, 109]),new VlcEntry(VlcEntry.Fork, [93, 102]),new VlcEntry(VlcEntry.Fork, [94, 99]),new VlcEntry(VlcEntry.Fork, [95, 98]),new VlcEntry(VlcEntry.Fork, [96, 97]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 9})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 8})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 24,level: 1})),new VlcEntry(VlcEntry.Fork, [100, 101]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 23,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 22,level: 1})),new VlcEntry(VlcEntry.Fork, [103, 106]),new VlcEntry(VlcEntry.Fork, [104, 105]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 21,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 20,level: 1})),new VlcEntry(VlcEntry.Fork, [107, 108]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 19,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 18,level: 1})),new VlcEntry(VlcEntry.Fork, [110, 117]),new VlcEntry(VlcEntry.Fork, [111, 114]),new VlcEntry(VlcEntry.Fork, [112, 113]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 17,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 0,level: 2})),new VlcEntry(VlcEntry.Fork, [115, 116]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 22,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 21,level: 1})),new VlcEntry(VlcEntry.Fork, [118, 121]),new VlcEntry(VlcEntry.Fork, [119, 120]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 20,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 19,level: 1})),new VlcEntry(VlcEntry.Fork, [122, 123]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 18,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 17,level: 1})),new VlcEntry(VlcEntry.Fork, [174, 125]),new VlcEntry(VlcEntry.Fork, [127, 126]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.EscapeToLong)),new VlcEntry(VlcEntry.Fork, [128, 143]),new VlcEntry(VlcEntry.Fork, [129, 136]),new VlcEntry(VlcEntry.Fork, [130, 133]),new VlcEntry(VlcEntry.Fork, [131, 132]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 12})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 1,level: 5})),new VlcEntry(VlcEntry.Fork, [134, 135]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 23,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 24,level: 1})),new VlcEntry(VlcEntry.Fork, [137, 140]),new VlcEntry(VlcEntry.Fork, [138, 139]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 29,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 30,level: 1})),new VlcEntry(VlcEntry.Fork, [141, 142]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 31,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 32,level: 1})),new VlcEntry(VlcEntry.Fork, [144, 159]),new VlcEntry(VlcEntry.Fork, [145, 152]),new VlcEntry(VlcEntry.Fork, [146, 149]),new VlcEntry(VlcEntry.Fork, [147, 148]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 1,level: 6})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 2,level: 4})),new VlcEntry(VlcEntry.Fork, [150, 151]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 4,level: 3})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 5,level: 3})),new VlcEntry(VlcEntry.Fork, [153, 156]),new VlcEntry(VlcEntry.Fork, [154, 155]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 6,level: 3})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 10,level: 2})),new VlcEntry(VlcEntry.Fork, [157, 158]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 25,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 26,level: 1})),new VlcEntry(VlcEntry.Fork, [160, 167]),new VlcEntry(VlcEntry.Fork, [161, 164]),new VlcEntry(VlcEntry.Fork, [162, 163]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 33,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 34,level: 1})),new VlcEntry(VlcEntry.Fork, [165, 166]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 35,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 36,level: 1})),new VlcEntry(VlcEntry.Fork, [168, 171]),new VlcEntry(VlcEntry.Fork, [169, 170]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 37,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 38,level: 1})),new VlcEntry(VlcEntry.Fork, [172, 173]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 39,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 40,level: 1})),new VlcEntry(VlcEntry.Fork, [190, 175]),new VlcEntry(VlcEntry.Fork, [176, 183]),new VlcEntry(VlcEntry.Fork, [177, 180]),new VlcEntry(VlcEntry.Fork, [178, 179]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 9,level: 2})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 8,level: 2})),new VlcEntry(VlcEntry.Fork, [181, 182]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 7,level: 2})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 6,level: 2})),new VlcEntry(VlcEntry.Fork, [184, 187]),new VlcEntry(VlcEntry.Fork, [185, 186]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 5,level: 2})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 3,level: 3})),new VlcEntry(VlcEntry.Fork, [188, 189]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 2,level: 3})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 1,level: 4})),new VlcEntry(VlcEntry.Fork, [198, 191]),new VlcEntry(VlcEntry.Fork, [192, 195]),new VlcEntry(VlcEntry.Fork, [193, 194]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 28,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 27,level: 1})),new VlcEntry(VlcEntry.Fork, [196, 197]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 26,level: 1})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 25,level: 1})),new VlcEntry(VlcEntry.Fork, [206, 199]),new VlcEntry(VlcEntry.Fork, [200, 203]),new VlcEntry(VlcEntry.Fork, [201, 202]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 1,level: 2})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: true,run: 0,level: 3})),new VlcEntry(VlcEntry.Fork, [204, 205]),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 11})),new VlcEntry(VlcEntry.End, new ShortTCoefficient(ShortTCoefficient.Run, {last: false,run: 0,level: 10})),new VlcEntry(VlcEntry.End, null)];
		function decode_block(reader, decoder_options, picture, running_options, macroblock_type, tcoef_present) {
			return reader.withTransaction(function(reader) {
				let intradc = null;
				if (macroblock_type.is_intra()) {
					intradc = IntraDc.from_u8(reader.readUint8());
					if (intradc === null) 
						throw new Error("InvalidIntraDc");
				}
				var tcoef = [];
				while(tcoef_present) {
					let short_tcoef = reader.readVLC(TCOEF_TABLE);
					if (short_tcoef === null) 
						throw new Error("InvalidShortCoefficient");
					switch(short_tcoef.type) {
						case ShortTCoefficient.EscapeToLong:
							let level_width = null;
							if (decoder_options.sorensonSpark && (picture.version == 1)) {
								if (reader.readBits(1) == 1) {
									level_width = 11;
								} else {
									level_width = 7;
								}
							} else {
								level_width = 8;
							}
							let last = reader.readBits(1) == 1;
							let run = reader.readBits(6);
							let level = reader.readSignedBits(level_width);
							if (level == 0) {
								throw new Error("InvalidLongCoefficient");
							}
							tcoef.push(new TCoefficient(false, run, level));
							tcoef_present = !last;
							break;
						case ShortTCoefficient.Run:
							var res = short_tcoef.value;
							let sign = reader.readBits(1);
							if (sign == 0) {
								tcoef.push(new TCoefficient(true, res.run, res.level));
							} else {
								tcoef.push(new TCoefficient(true, res.run, -res.level));
							}
							tcoef_present = !res.last;
							break;
					}  
				}
				return new Block(intradc, tcoef);
			});
		}
		const DEZIGZAG_MAPPING = [[0, 0], [1, 0], [0, 1], [0, 2], [1, 1], [2, 0], [3, 0], [2, 1], [1, 2], [0, 3], [0, 4], [1, 3], [2, 2], [3, 1], [4, 0], [5, 0], [4, 1], [3, 2], [2, 3], [1, 4], [0, 5], [0, 6], [1, 5], [2, 4], [3, 3], [4, 2], [5, 1], [6, 0], [7, 0], [6, 1], [5, 2], [4, 3], [3, 4], [2, 5], [1, 6], [0, 7], [1, 7], [2, 6], [3, 5], [4, 4], [5, 3], [6, 2], [7, 1], [7, 2], [6, 3], [5, 4], [4, 5], [3, 6], [2, 7], [3, 7], [4, 6], [5, 5], [6, 4], [7, 3], [7, 4], [6, 5], [5, 6], [4, 7], [5, 7], [6, 6], [7, 5], [7, 6], [6, 7], [7, 7]]
		function inverse_rle(encoded_block, levels, pos, blk_per_line, quant) {
			let block_id = ((pos[0] / 8) | 0) + (((pos[1] / 8) | 0) * blk_per_line);
			if (encoded_block.tcoef.length == 0) {
				if (encoded_block.intradc) {
					let dc_level = encoded_block.intradc.into_level();
					if (dc_level == 0) {
						levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Zero);
					} else {
						levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Dc, dc_level);
					}
				} else {
					levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Zero);
				}
			} else {
				var block_data = [new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8)];
				let is_horiz = true;
				let is_vert = true;
				let zigzag_index = 0;
				if (encoded_block.intradc) {
					block_data[0][0] = encoded_block.intradc.into_level();
					zigzag_index += 1;
				}
				for (var i = 0; i < encoded_block.tcoef.length; i++) {
					var tcoef = encoded_block.tcoef[i];
					zigzag_index += tcoef.run;
					if (zigzag_index >= DEZIGZAG_MAPPING.length) return;
					let [zig_x, zig_y] = DEZIGZAG_MAPPING[zigzag_index];
					let dequantized_level = asI16(quant) * ((2 * Math.abs(tcoef.level)) + 1);
					let parity = null;
					if (quant % 2 == 1) {
						parity = 0;
					} else {
						parity = -1;
					}
					let val = Math.max(Math.min(num_signum(tcoef.level) * (dequantized_level + parity), 2047), -2048);
					block_data[zig_y][zig_x] = val;
					zigzag_index += 1;
					if (val != 0.0) {
						if (zig_y > 0) {
							is_horiz = false;
						}
						if (zig_x > 0) {
							is_vert = false;
						}
					}
				}
				if ((is_horiz == true) && (is_vert == true)) {
					if (block_data[0][0] == 0) {
						levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Zero);
					} else {
						levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Dc, block_data[0][0]);
					}
				} else if ((is_horiz == true) && (is_vert == false)) {
					levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Horiz, block_data[0]);
				} else if ((is_horiz == false) && (is_vert == true)) {
					var r = new Float32Array(8);
					r[0] = block_data[0][0];
					r[1] = block_data[1][0];
					r[2] = block_data[2][0];
					r[3] = block_data[3][0];
					r[4] = block_data[4][0];
					r[5] = block_data[5][0];
					r[6] = block_data[6][0];
					r[7] = block_data[7][0];
					levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Vert, r);
				} else if ((is_horiz == false) && (is_vert == false)) {
					levels[block_id] = new DecodedDctBlock(DecodedDctBlock.Full, block_data);
				}
			}
		}
		function read_sample(pixel_array, samples_per_row, num_rows, pos) {
			let [x, y] = pos;
			let _x = num_clamp(x, 0, samples_per_row - 1);
			let _y = num_clamp(y, 0, num_rows - 1);
			return pixel_array[_x + (_y * samples_per_row)];
		}
		function lerp(sample_a, sample_b, middle) {
			if (middle) {
				return asU8((sample_a + sample_b + 1) / 2);
			} else {
				return asU8(sample_a);
			}
		}
		function gather_block(pixel_array, samples_per_row, pos, mv, target) {
			var g = mv.into_lerp_parameters();
			let [x_delta, x_interp] = g[0];
			let [y_delta, y_interp] = g[1];
			let src_x = (pos[0] + x_delta) | 0;
			let src_y = (pos[1] + y_delta) | 0;
			let array_height = (pixel_array.length / samples_per_row) | 0;
			let block_cols = num_clamp((samples_per_row - pos[0]), 0, 8);
			let block_rows = num_clamp((array_height - pos[1]), 0, 8);
			if (!x_interp && !y_interp) {
				if (block_cols == 8 && block_rows == 8 && asfgdgdfg(src_x, 0, samples_per_row - 8) && asfgdgdfg(src_y, 0, array_height - 8)) {
					for (var j = 0; j < 8; j++) {
						let src_offset = src_x + ((src_y + j) * samples_per_row);
						let dest_offset = pos[0] + (pos[1] + j) * samples_per_row;
						for (var _ = 0; _ < 8; _++) {
							target[dest_offset + _] = pixel_array[src_offset + _];
						}
					}
				} else {
					for (var _j = 0; _j < block_rows; _j += 1) {
						var j = _j;
						var v = _j + src_y;
						for (var _i = 0; _i < block_cols; _i += 1) {
							var i = _i;
							var u = _i + src_x;
							target[pos[0] + i + ((pos[1] + j) * samples_per_row)] = read_sample(pixel_array, samples_per_row, array_height, [u, v]);
						}
					}
				}
			} else {
				for (var _j = 0; _j < block_rows; _j += 1) {
					var j = _j;
					var v = _j + src_y;
					for (var _i = 0; _i < block_cols; _i += 1) {
						var i = _i;
						var u = _i + src_x;
						let sample_0_0 = read_sample(pixel_array, samples_per_row, array_height, [u, v]);
						let sample_1_0 = read_sample(pixel_array, samples_per_row, array_height, [u + 1, v]);
						let sample_0_1 = read_sample(pixel_array, samples_per_row, array_height, [u, v + 1]);
						let sample_1_1 = read_sample(pixel_array, samples_per_row, array_height, [u + 1, v + 1]);
						if (x_interp && y_interp) {
							let sample = asU8((sample_0_0 + sample_1_0 + sample_0_1 + sample_1_1 + 2) / 4);
							target[pos[0] + i + ((pos[1] + j) * samples_per_row)] = sample;
						} else {
							let sample_mid_0 = lerp(sample_0_0, sample_1_0, x_interp);
							let sample_mid_1 = lerp(sample_0_1, sample_1_1, x_interp);
							target[pos[0] + i + ((pos[1] + j) * samples_per_row)] = lerp(sample_mid_0, sample_mid_1, y_interp);
						}
					}
				}
			}
		}
		function gather(mb_types, reference_picture, mvs, mb_per_line, new_picture) {
			for (var i = 0; i < mb_types.length; i++) {
				var mb_type = mb_types[i];
				var mv = mvs[i];
				if (mb_type.is_inter()) {
					if (!reference_picture)
						throw new Error("UncodedIFrameBlocks");
					let luma_samples_per_row = reference_picture.luma_samples_per_row();
					let pos = [
						Math.floor(i % mb_per_line) * 16,
						Math.floor(i / mb_per_line) * 16
					];
					gather_block(reference_picture.as_luma(), luma_samples_per_row, pos, mv[0], new_picture.as_luma_mut());
					gather_block(reference_picture.as_luma(), luma_samples_per_row, [pos[0] + 8, pos[1]], mv[1], new_picture.as_luma_mut());
					gather_block(reference_picture.as_luma(), luma_samples_per_row, [pos[0], pos[1] + 8], mv[2], new_picture.as_luma_mut());
					gather_block(reference_picture.as_luma(), luma_samples_per_row, [pos[0] + 8, pos[1] + 8], mv[3], new_picture.as_luma_mut());
					let mv_chr = mv[0].add(mv[1].add(mv[2].add(mv[3]))).average_sum_of_mvs();
					let chroma_samples_per_row = reference_picture.chroma_samples_per_row;
					let chroma_pos = [Math.floor(i % mb_per_line) * 8, Math.floor(i / mb_per_line) * 8];
					gather_block(reference_picture.as_chroma_b(), chroma_samples_per_row, [chroma_pos[0], chroma_pos[1]], mv_chr, new_picture.as_chroma_b_mut());
					gather_block(reference_picture.as_chroma_r(), chroma_samples_per_row, [chroma_pos[0], chroma_pos[1]], mv_chr, new_picture.as_chroma_r_mut());
				}
			}
		}
		const BASIS_TABLE = [new Float32Array([0.70710677, 0.70710677, 0.70710677, 0.70710677, 0.70710677, 0.70710677, 0.70710677, 0.70710677]), new Float32Array([0.98078525, 0.8314696, 0.5555702, 0.19509023, -0.19509032, -0.55557036, -0.83146966, -0.9807853]), new Float32Array([0.9238795, 0.38268343, -0.38268352, -0.9238796, -0.9238795, -0.38268313, 0.3826836, 0.92387956]), new Float32Array([0.8314696, -0.19509032, -0.9807853, -0.55557, 0.55557007, 0.98078525, 0.19509007, -0.8314698]), new Float32Array([0.70710677, -0.70710677, -0.70710665, 0.707107, 0.70710677, -0.70710725, -0.70710653,  0.7071068]), new Float32Array([0.5555702, -0.9807853, 0.19509041, 0.83146936, -0.8314698, -0.19508928, 0.9807853, -0.55557007]), new Float32Array([0.38268343, -0.9238795, 0.92387974, -0.3826839, -0.38268384, 0.9238793, -0.92387974,  0.3826839]), new Float32Array([0.19509023, -0.55557, 0.83146936, -0.9807852, 0.98078525, -0.83147013, 0.55557114, -0.19508967])];
		function idct_1d(input, output) {
			output.fill(0);
			for (var i = 0; i < output.length; i++) {
				for (var freq = 0; freq < 8; freq++) {
					output[i] += input[freq] * BASIS_TABLE[freq][i];
				}
			}
		}
		function idct_channel(block_levels, output, blk_per_line, output_samples_per_line) {
			let output_height = (output.length / output_samples_per_line) | 0;
			let blk_height = (block_levels.length / blk_per_line) | 0;
			let idct_intermediate = [new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8)];
			let idct_output = [new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8), new Float32Array(8)];
			for (var y_base = 0; y_base < blk_height; y_base++) {
				for (var x_base = 0; x_base < blk_per_line; x_base++) {
					let block_id = x_base + (y_base * blk_per_line);
					if (block_id >= block_levels.length) 
						continue;
					let xs = num_clamp((output_samples_per_line - x_base * 8), 0, 8);
					let ys = num_clamp((output_height - y_base * 8), 0, 8);
					var b = block_levels[block_id];
					switch(b.type) {
						case DecodedDctBlock.Zero:
							break;
						case DecodedDctBlock.Dc:
							var dc = b.value;
							let clipped_idct = num_clamp(asI16((dc * 0.5 / 4.0 + num_signum(dc) * 0.5)), -256, 255);
							for (var y_offset = 0; y_offset < ys; y_offset++) {
								for (var x_offset = 0; x_offset < xs; x_offset++) {
									let x = x_base * 8 + x_offset;
									let y = y_base * 8 + y_offset;
									let mocomp_pixel = asI16(output[x + (y * output_samples_per_line)]);
									output[x + (y * output_samples_per_line)] = asU8(num_clamp(clipped_idct + mocomp_pixel, 0, 255));
								}
							}
							break;
						case DecodedDctBlock.Horiz:
							var first_row = b.value;
							idct_1d(first_row, idct_intermediate[0]);
							for (var y_offset = 0; y_offset < ys; y_offset++) {
								var _idcts = idct_intermediate[0];
								for (var x_offset = 0; x_offset < xs; x_offset++) {
									var idct = _idcts[x_offset];
									let x = x_base * 8 + x_offset;
									let y = y_base * 8 + y_offset;
									let clipped_idct = num_clamp((asI16(idct * BASIS_TABLE[0][0] / 4.0 + num_signum(idct) * 0.5)), -256, 255);
									let mocomp_pixel = asI16(output[x + (y * output_samples_per_line)]);
									output[x + (y * output_samples_per_line)] = asU8(num_clamp((clipped_idct + mocomp_pixel), 0, 255));
								}
							}
							break;
						case DecodedDctBlock.Vert:
							var first_col = b.value;
							idct_1d(first_col, idct_intermediate[0]);
							var _idcts = idct_intermediate[0];
							for (var y_offset = 0; y_offset < ys; y_offset++) {
								var idct = _idcts[y_offset];
								for (var x_offset = 0; x_offset < xs; x_offset++) {
									let x = x_base * 8 + x_offset;
									let y = y_base * 8 + y_offset;
									let clipped_idct = num_clamp((asI16(idct * BASIS_TABLE[0][0] / 4.0 + num_signum(idct) * 0.5)), -256, 255);
									let mocomp_pixel = asI16(output[x + (y * output_samples_per_line)]);
									output[x + (y * output_samples_per_line)] = asU8(num_clamp((clipped_idct + mocomp_pixel), 0, 255));
								}
							}
							break;
						case DecodedDctBlock.Full:
							var block_data = b.value;
							for (var row = 0; row < 8; row++) {
								idct_1d(block_data[row], idct_output[row]);
								for (var i = 0; i < idct_intermediate.length; i++) {
									idct_intermediate[i][row] = idct_output[row][i];
								}
							}
							for (var row = 0; row < 8; row++) {
								idct_1d(idct_intermediate[row], idct_output[row]);
							}
							for (var x_offset = 0; x_offset < xs; x_offset++) {
								var idct_row = idct_output[x_offset];
								for (var y_offset = 0; y_offset < ys; y_offset++) {
									var idct = idct_row[y_offset];
									let x = x_base * 8 + x_offset;
									let y = y_base * 8 + y_offset;
									let clipped_idct = num_clamp((asI16(idct / 4.0 + num_signum(idct) * 0.5)), -256, 255);
									let mocomp_pixel = asI16(output[x + (y * output_samples_per_line)]);
									output[x + (y * output_samples_per_line)] = asU8(num_clamp((clipped_idct + mocomp_pixel), 0, 255));
								}
							}
							break;
					}
				}
			}
		}
		function predict_candidate(predictor_vectors, current_predictors, mb_per_line, index) {
			let current_mb = predictor_vectors.length;
			let col_index = current_mb % mb_per_line;
			let mv1_pred = null;
			switch(index) {
				case 0:
				case 2:
					if (col_index == 0) {
						mv1_pred = MotionVector.zero();
					} else {
						mv1_pred = predictor_vectors[current_mb - 1][index + 1];
					}
					break;
				case 1:
				case 3:
					mv1_pred = current_predictors[index - 1];
					break;
				default:
					throw new Error("unreachable");
			}
			let line_index = (current_mb / mb_per_line) | 0;
			let last_line_mb = (saturatingSub(line_index, 1) * mb_per_line) + col_index;
			let mv2_pred = null;
			switch(index) {
				case 0:
				case 1:
					if (line_index == 0) {
						mv2_pred = mv1_pred;
					} else {
						var r = predictor_vectors[last_line_mb];
						if (r) {
							mv2_pred = r[index + 2];
						} else {
							mv2_pred = mv1_pred;
						}
					}
					break;
				case 2:
				case 3:
					mv2_pred = current_predictors[0];
					break;
				default:
					throw new Error("unreachable");
			}
			let is_end_of_line = col_index == saturatingSub(mb_per_line, 1);
			let mv3_pred = null;
			switch(index) {
				case 0:
				case 1:
					if (is_end_of_line) {
						mv3_pred = MotionVector.zero();
					} else {
						if (line_index == 0) {
							mv3_pred = mv1_pred;
						} else {
							var r = predictor_vectors[last_line_mb + 1];
							if (r) {
								mv3_pred = r[2];
							} else {
								mv3_pred = mv1_pred;
							}
						}
					}
					break;
				case 2:
				case 3:
					mv3_pred = current_predictors[1];
					break;
				default:
					throw new Error("unreachable");
			}
			return mv1_pred.median_of(mv2_pred, mv3_pred);
		}
		function halfpel_decode(current_picture, running_options, predictor, mvd, is_x) {
			let range = HalfPel.STANDARD_RANGE;
			let out = new HalfPel(asI16(mvd.n + predictor.n));
			if (!out.is_mv_within_range(range)) {
				out = new HalfPel(asI16(mvd.invert().n + predictor.n));
			}
			return out;
		}
		function mv_decode(current_picture, running_options, predictor, mvd) {
			let mvx = mvd.n1;
			let mvy = mvd.n2;
			let cpx = predictor.n1;
			let cpy = predictor.n2;
			let out_x = halfpel_decode(current_picture, running_options, cpx, mvx, true);
			let out_y = halfpel_decode(current_picture, running_options, cpy, mvy, false);
			return new MotionVector(out_x, out_y);
		}
		class H263State {
			constructor(decoderOptions) {
				this.decoderOptions = decoderOptions;
				this.last_picture = null;
				this.reference_picture = null;
				this.running_options = PictureOption.empty();
				this.reference_states = new Map();
			}
			isSorenson() {
				return this.decoderOptions.sorensonSpark;
			}
			getLastPicture() {
				if (this.last_picture === null) {
					return null;
				} else {
					return this.reference_states.get(this.last_picture);
				}
			}
			getReferencePicture() {
				if (this.reference_picture === null) {
					return null;
				} else {
					return this.reference_states.get(this.reference_picture);
				}
			}
			cleanup_buffers() {
				var r1 = this.last_picture;
				let last_picture = this.reference_states.get(r1);
				this.reference_states = new Map();
				if (last_picture) {
					this.reference_states.set(r1, last_picture);
				}
			}
			parsePicture(reader, previous_picture) {
				return decodePicture(reader, this.decoderOptions, previous_picture);
			}
			decodeNextPicture(reader) {
				let next_picture = this.parsePicture(reader, this.getLastPicture());
				var next_running_options = next_picture.options;
				let format = null;
				if (next_picture.format) {
					format = next_picture.format;
				} else if (next_picture.picture_type.type == PictureTypeCode.IFrame) {
					throw new Error("PictureFormatMissing");
				} else {
					var ref_format = null;
					var rfgh = this.getLastPicture();
					if (rfgh !== null) {
						ref_format = rfgh.format;
					} else {
						throw new Error("PictureFormatMissing");
					}
					format = ref_format;
				}
				let reference_picture = this.getReferencePicture();
				let output_dimensions = format.intoWidthAndHeight();
				let mb_per_line = Math.ceil(output_dimensions[0] / 16.0);
				let mb_height = Math.ceil(output_dimensions[1] / 16.0);
				let level_dimensions = [mb_per_line * 16, mb_height * 16];
				let in_force_quantizer = next_picture.quantizer;
				var MAX_L = mb_per_line * mb_height;
				let predictor_vectors = [];
				let macroblock_types = [];
				let next_decoded_picture = new DecodedPicture(next_picture, format);
				var luma_levels = new Array(level_dimensions[0] * level_dimensions[1] / 64);
				var chroma_b_levels = new Array(level_dimensions[0] * level_dimensions[1] / 4 / 64);
				var chroma_r_levels = new Array(level_dimensions[0] * level_dimensions[1] / 4 / 64);
				for (var i = 0; i < luma_levels.length; i++) luma_levels[i] = new DecodedDctBlock(DecodedDctBlock.Zero);
				for (var i = 0; i < chroma_b_levels.length; i++) chroma_b_levels[i] = new DecodedDctBlock(DecodedDctBlock.Zero);
				for (var i = 0; i < chroma_r_levels.length; i++) chroma_r_levels[i] = new DecodedDctBlock(DecodedDctBlock.Zero);
				while (macroblock_types.length < MAX_L) {
					let mb;
					try {
						mb = decode_macroblock(reader, next_decoded_picture.as_header(), next_running_options);
					} catch (e) {
						mb = e.message;
					}
					let pos = [Math.floor(macroblock_types.length % mb_per_line) * 16, Math.floor(macroblock_types.length / mb_per_line) * 16];
					let motion_vectors = [MotionVector.zero(), MotionVector.zero(), MotionVector.zero(), MotionVector.zero()];
					var mb_type = null;
					var isStuffing = false;
					if (typeof mb == "string") {
						if (is_eof_error(mb)) {
							break;
						} else {
							throw new Error(mb);
						}
					} else {
						switch (mb.type) {
							case Macroblock.Stuffing:
								isStuffing = true;
								break;
							case Macroblock.Uncoded:
								if (next_decoded_picture.as_header().picture_type.type == PictureTypeCode.IFrame) throw new Error("UncodedIFrameBlocks");
								mb_type = new MacroblockType(MacroblockType.Inter);
								break;
							case Macroblock.Coded:
								var res = mb.value;
								let quantizer = asI8(asI8(in_force_quantizer) + ((res.d_quantizer === null) ? 0 : res.d_quantizer));
								in_force_quantizer = asU8(num_clamp(quantizer, 1, 31));
								if (res.mb_type.is_inter()) {
									let mv1 = res.motion_vector;
									if (mv1 === null) mv1 = MotionVector.zero();
									let mpred1 = predict_candidate(predictor_vectors, motion_vectors, mb_per_line, 0);
									motion_vectors[0] = mv_decode(next_decoded_picture, next_running_options, mpred1, mv1);
									var addl_motion_vectors = res.addl_motion_vectors;
									if (addl_motion_vectors) {
										let mpred2 = predict_candidate(predictor_vectors, motion_vectors, mb_per_line, 1);
										motion_vectors[1] = mv_decode(next_decoded_picture, next_running_options, mpred2, addl_motion_vectors[0]);
										let mpred3 = predict_candidate(predictor_vectors, motion_vectors, mb_per_line, 2);
										motion_vectors[2] = mv_decode(next_decoded_picture, next_running_options, mpred3, addl_motion_vectors[1]);
										let mpred4 = predict_candidate(predictor_vectors, motion_vectors, mb_per_line, 3);
										motion_vectors[3] = mv_decode(next_decoded_picture, next_running_options, mpred4, addl_motion_vectors[2]);
									} else {
										motion_vectors[1] = motion_vectors[0];
										motion_vectors[2] = motion_vectors[0];
										motion_vectors[3] = motion_vectors[0];
									};
								}
								let luma0 = decode_block(reader, this.decoderOptions, next_decoded_picture.as_header(), next_running_options, res.mb_type, res.coded_block_pattern.codes_luma[0]);
								inverse_rle(luma0, luma_levels, pos, level_dimensions[0] / 8, in_force_quantizer);
								let luma1 = decode_block(reader, this.decoderOptions, next_decoded_picture.as_header(), next_running_options, res.mb_type, res.coded_block_pattern.codes_luma[1]);
								inverse_rle(luma1, luma_levels, [pos[0] + 8, pos[1]], level_dimensions[0] / 8, in_force_quantizer);
								let luma2 = decode_block(reader, this.decoderOptions, next_decoded_picture.as_header(), next_running_options, res.mb_type, res.coded_block_pattern.codes_luma[2]);
								inverse_rle(luma2, luma_levels, [pos[0], pos[1] + 8], level_dimensions[0] / 8, in_force_quantizer);
								let luma3 = decode_block(reader, this.decoderOptions, next_decoded_picture.as_header(), next_running_options, res.mb_type, res.coded_block_pattern.codes_luma[3]);
								inverse_rle(luma3, luma_levels, [pos[0] + 8, pos[1] + 8], level_dimensions[0] / 8, in_force_quantizer);
								let chroma_b = decode_block(reader, this.decoderOptions, next_decoded_picture.as_header(), next_running_options, res.mb_type, res.coded_block_pattern.codes_chroma_b);
								inverse_rle(chroma_b, chroma_b_levels, [pos[0] / 2, pos[1] / 2], mb_per_line, in_force_quantizer);
								let chroma_r = decode_block(reader, this.decoderOptions, next_decoded_picture.as_header(), next_running_options, res.mb_type, res.coded_block_pattern.codes_chroma_r);
								inverse_rle(chroma_r, chroma_r_levels, [pos[0] / 2, pos[1] / 2], mb_per_line, in_force_quantizer);
								mb_type = res.mb_type;
								break;
						}
						if (isStuffing) continue;
					}
					predictor_vectors.push(motion_vectors);
					macroblock_types.push(mb_type);
				}
				while (predictor_vectors.length < MAX_L) predictor_vectors.push(MotionVector.zero());
				while (macroblock_types.length < MAX_L) macroblock_types.push(new MacroblockType(MacroblockType.Inter));
				gather(macroblock_types, reference_picture, predictor_vectors, mb_per_line, next_decoded_picture);
				idct_channel(luma_levels, next_decoded_picture.as_luma_mut(), mb_per_line * 2, (output_dimensions[0]));
				let chroma_samples_per_row = next_decoded_picture.chroma_samples_per_row;
				idct_channel(chroma_b_levels, next_decoded_picture.as_chroma_b_mut(), mb_per_line, chroma_samples_per_row);
				idct_channel(chroma_r_levels, next_decoded_picture.as_chroma_r_mut(), mb_per_line, chroma_samples_per_row);
				if (next_decoded_picture.as_header().picture_type.type == PictureTypeCode.IFrame) this.reference_picture = null;
				let this_tr = next_decoded_picture.as_header().temporal_reference;
				this.last_picture = this_tr;
				if (!next_decoded_picture.as_header().picture_type.is_disposable()) this.reference_picture = this_tr;
				this.reference_states.set(this_tr, next_decoded_picture);
				this.cleanup_buffers();
			}
		}
		class H263Reader {
			constructor(source) {
				this.source = source;
				this.bitsRead = 0;
			}
			readBits(bitsNeeded) {
				let r = this.peekBits(bitsNeeded);
				this.skipBits(bitsNeeded);
				return r;
			}
			readSignedBits(bitsNeeded) {
				let uval = this.readBits(bitsNeeded);
				var shift = 32 - bitsNeeded;
				return (uval << shift) >> shift;
			}
			peekBits(bitsNeeded) {
				if (bitsNeeded == 0) return 0;
				let accum = 0;
				var i = bitsNeeded;
				let last_bits_read = this.bitsRead;
				while (i--) {
					if (bitsNeeded == 0)
						break;
					let bytes_read = Math.floor(this.bitsRead / 8);
					let bits_read = (this.bitsRead % 8);
					if (bytes_read >= this.source.length) {
						throw new Error("EndOfFile");
					}
					let byte = this.source[bytes_read];
					accum <<= 1;
					accum |= ((byte >> (7 - bits_read)) & 0x1);
					this.bitsRead++;
				}
				this.bitsRead = last_bits_read;
				return accum;
			}
			skipBits(bits_to_skip) {
				this.bitsRead += bits_to_skip;
			}
			readUint8() {
				return this.readBits(8);
			}
			recognizeStartCode(in_error) {
				return this.withLookahead(function (reader) {
					let max_skip_bits = reader.realignmentBits();
					let skip_bits = 0;
					let maybe_code = reader.peekBits(17);
					while (maybe_code != 1) {
						if (!in_error && skip_bits > max_skip_bits) {
							return null;
						}
						reader.skipBits(1);
						skip_bits += 1;
						maybe_code = reader.peekBits(17);
					}
					return skip_bits;
				});
			}
			realignmentBits() {
				return (8 - (this.bitsRead % 8)) % 8;
			}
			checkpoint() {
				return this.bitsRead;
			}
			readVLC(table) {
				var index = 0;
				while (true) {
					var res = table[index];
					if (res) {
						switch (res.type) {
							case VlcEntry.End:
								return res.value;
							case VlcEntry.Fork:
								let next_bit = this.readBits(1);
								if (next_bit == 0) {
									index = res.value[0];
								} else {
									index = res.value[1];
								}
								break;
						}
					} else {
						throw new Error("InternalDecoderError");
					}
				}
			}
			read_umv() {
				let start = this.readBits(1);
				if (start == 1) return HalfPel.from_unit(0);
				let mantissa = 0;
				let bulk = 1;
				while (bulk < 4096) {
					var r = this.readBits(2);
					switch (r) {
						case 0b00:
							return HalfPel.from_unit(mantissa + bulk);
						case 0b10:
							return HalfPel.from_unit(-(mantissa + bulk));
						case 0b01:
							mantissa <<= 1;
							bulk <<= 1;
							break;
						case 0b11:
							mantissa = mantissa << 1 | 1;
							bulk <<= 1;
							break;
					}
				}
				throw new Error("InvalidMvd");
			}
			bitAva() {
				return (this.source.length * 8) - this.bitsRead;
			}
			rollback(checkpoint) {
				if (checkpoint > (this.source.length * 8)) throw new Error("InternalDecoderError");
				this.bitsRead = checkpoint;
			}
			withTransaction(f) {
				var checkpoint = this.checkpoint();
				let result;
				try {
					result = f(this);
				} catch (e) {
					this.rollback(checkpoint);
					throw e;
				}
				return result;
			}
			withTransactionUnion(f) {
				var checkpoint = this.checkpoint();
				let result;
				try {
					result = f(this);
					if (result === null) this.rollback(checkpoint);
				} catch (e) {
					this.rollback(checkpoint);
					throw e;
				}
				return result;
			}
			withLookahead(f) {
				var checkpoint = this.checkpoint();
				let result = f(this);
				this.rollback(checkpoint);
				return result;
			}
		}
		wpjsm.exportJS = {
			H263Reader,
			H263State
		}
	},
	"src/utils/at-mp3-decoder.js": function(wpjsm){
		const BitStream = function() {
			this._end = 0;
			this.viewUint8 = null;
			this.bitPos = 0;
			this.bytePos = 0;
		}
		BitStream.prototype.readBit = function() {
			if (this._end <= this.bytePos) return 0;
			var tmp = (this.viewUint8[this.bytePos] >> (7 - (this.bitPos++)));
			if (this.bitPos > 7) {
				this.bitPos = 0;
				this.bytePos++;
			}
			return tmp & 1;
		}
		BitStream.prototype.get_bits = function(num) {
			if (num === 0) return 0;
			if (this._end <= this.bytePos) return 0;
			var value = 0;
			while (num--) {
				value <<= 1;
				value |= this.readBit();
			}
			return value;
		}
		BitStream.prototype.setData = function(vec) {
			this._end = vec.length;
			this.viewUint8 = vec;
			this.bitPos = 0;
			this.bytePos = 0;
		}
		const MP3Header = function() {
			this.h_layer = 0;
			this.h_protection_bit = 0;
			this.h_bitrate_index = 0;
			this.h_padding_bit = 0;
			this.h_mode_extension = 0;
			this.h_version = 0;
			this.h_mode = 0;
			this.h_sample_frequency = 0;
			this.h_number_of_subbands = 0;
			this.h_intensity_stereo_bound = 0;
			this.h_copyright = 0;
			this.h_original = 0;
			this.h_crc = 0;
			this.framesize = 0;
			this.nSlots = 0;
			this.checksum = 0;
		}
		MP3Header.versionTable = [2, 1, 2.5, -1];
		MP3Header.layerTable = [-1, 3, 2, 1];
		MP3Header.frequencies = [[22050, 24000, 16000], [44100, 48000, 32000], [11025, 12000, 8000]];
		MP3Header.MPEG2_LSF = 0;
		MP3Header.MPEG25_LSF = 2;
		MP3Header.MPEG1 = 1;
		MP3Header.STEREO = 0;
		MP3Header.JOINT_STEREO = 1;
		MP3Header.DUAL_CHANNEL = 2;
		MP3Header.SINGLE_CHANNEL = 3;
		MP3Header.FOURTYFOUR_POINT_ONE = 0;
		MP3Header.FOURTYEIGHT = 1;
		MP3Header.THIRTYTWO = 2;
		MP3Header.bitrates = [[[0, 32000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 144000, 160000, 176000, 192000, 224000, 256000, 0], [0, 8000, 16000, 24000, 32000, 40000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 144000, 160000, 0], [0, 8000, 16000, 24000, 32000, 40000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 144000, 160000, 0]], [[0, 32000, 64000, 96000, 128000, 160000, 192000, 224000, 256000, 288000, 320000, 352000, 384000, 416000, 448000, 0], [0, 32000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 160000, 192000, 224000, 256000, 320000, 384000, 0], [0, 32000, 40000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 160000, 192000, 224000, 256000, 320000, 0]], [[0, 32000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 144000, 160000, 176000, 192000, 224000, 256000, 0], [0, 8000, 16000, 24000, 32000, 40000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 144000, 160000, 0], [0, 8000, 16000, 24000, 32000, 40000, 48000, 56000, 64000, 80000, 96000, 112000, 128000, 144000, 160000, 0]]];
		MP3Header.prototype.parseHeader = function(header) {
			this.h_crc = ((header & 0x00010000) >>> 16) >>> 0;
			var channelBitrate = 0;
			this.h_sample_frequency = ((header >>> 10) & 3);
			this.h_version = ((header >>> 19) & 1);
			if (((header >>> 20) & 1) == 0)
				if (this.h_version == MP3Header.MPEG2_LSF)
					this.h_version = MP3Header.MPEG25_LSF;
				else
					throw new Error("UNKNOWN_ERROR");
			this.h_layer = 4 - (header >>> 17) & 3;
			this.h_protection_bit = (header >>> 16) & 1;
			this.h_bitrate_index = (header >>> 12) & 0xF;
			this.h_padding_bit = (header >>> 9) & 1;
			this.h_mode = ((header >>> 6) & 3);
			this.h_mode_extension = (header >>> 4) & 3;
			if (this.h_mode == MP3Header.JOINT_STEREO)
				this.h_intensity_stereo_bound = (this.h_mode_extension << 2) + 4;
			else
				this.h_intensity_stereo_bound = 0; // should never be used
			if (((header >>> 3) & 1) == 1)
				this.h_copyright = true;
			if (((header >>> 2) & 1) == 1)
				this.h_original = true;
			if (this.h_layer == 1)
				this.h_number_of_subbands = 32;
			else {
				channelBitrate = this.h_bitrate_index;
				// calculate bitrate per channel:
				if (this.h_mode != MP3Header.SINGLE_CHANNEL)
					if (channelBitrate == 4)
						channelBitrate = 1;
					else
						channelBitrate -= 4;
				if ((channelBitrate == 1) || (channelBitrate == 2))
					if (this.h_sample_frequency == MP3Header.THIRTYTWO)
						this.h_number_of_subbands = 12;
					else
						this.h_number_of_subbands = 8;
				else if ((this.h_sample_frequency == MP3Header.FOURTYEIGHT) || ((channelBitrate >= 3) && (channelBitrate <= 5)))
					this.h_number_of_subbands = 27;
				else
					this.h_number_of_subbands = 30;
			}
			if (this.h_intensity_stereo_bound > this.h_number_of_subbands)
				this.h_intensity_stereo_bound = this.h_number_of_subbands;
			this.calculate_framesize();
		}
		MP3Header.prototype.frequency = function() {
			return MP3Header.frequencies[this.h_version][this.h_sample_frequency];
		}
		MP3Header.prototype.sample_frequency = function() {
			return this.h_sample_frequency;
		}
		MP3Header.prototype.version = function() {
			return this.h_version;
		}
		MP3Header.prototype.layer = function() {
			return this.h_layer;
		}
		MP3Header.prototype.mode = function() {
			return this.h_mode;
		}
		MP3Header.prototype.checksums = function() {
			return this.h_protection_bit == 0;
		}
		MP3Header.prototype.copyright = function() {
			return this.h_copyright;
		}
		MP3Header.prototype.crc = function() {
			return this.h_crc;
		}
		MP3Header.prototype.original = function() {
			return this.h_original;
		}
		MP3Header.prototype.padding = function() {
			return this.h_padding_bit != 0;
		}
		MP3Header.prototype.slots = function() {
			return this.nSlots;
		}
		MP3Header.prototype.mode_extension = function() {
			return this.h_mode_extension;
		}
		MP3Header.prototype.calculate_framesize = function() {
			if (this.h_layer == 1) {
				this.framesize = ((12 * MP3Header.bitrates[this.h_version][0][this.h_bitrate_index]) / MP3Header.frequencies[this.h_version][this.h_sample_frequency]) | 0;
				if (this.h_padding_bit != 0) this.framesize++;
				this.framesize <<= 2;
				this.nSlots = 0;
			} else {
				this.framesize = ((144 * MP3Header.bitrates[this.h_version][this.h_layer - 1][this.h_bitrate_index]) / MP3Header.frequencies[this.h_version][this.h_sample_frequency]) | 0;
				if (this.h_version == MP3Header.MPEG2_LSF || this.h_version == MP3Header.MPEG25_LSF) this.framesize >>= 1;
				if (this.h_padding_bit != 0) this.framesize++;
				if (this.h_layer == 3) {
					if (this.h_version == MP3Header.MPEG1) {
						this.nSlots = this.framesize - ((this.h_mode == MP3Header.SINGLE_CHANNEL) ? 17 : 32) - ((this.h_protection_bit != 0) ? 0 : 2) - 4; 
					} else {
						this.nSlots = this.framesize - ((this.h_mode == MP3Header.SINGLE_CHANNEL) ? 9 : 17) - ((this.h_protection_bit != 0) ? 0 : 2) - 4;
					}
				} else {
					this.nSlots = 0;
				}
			}
			this.framesize -= 4;
			return this.framesize;
		}
		MP3Header.prototype.layer_string = function() {
			switch (this.h_layer) {
				case 1:
					return "I";
				case 2:
					return "II";
				case 3:
					return "III";
			}
			return null;
		}
		MP3Header.bitrate_str = [[["free format", "32 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "144 kbit/s", "160 kbit/s", "176 kbit/s", "192 kbit/s", "224 kbit/s", "256 kbit/s", "forbidden"], ["free format", "8 kbit/s", "16 kbit/s", "24 kbit/s", "32 kbit/s", "40 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "144 kbit/s", "160 kbit/s", "forbidden"], ["free format", "8 kbit/s", "16 kbit/s", "24 kbit/s", "32 kbit/s", "40 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "144 kbit/s", "160 kbit/s", "forbidden"]], [["free format", "32 kbit/s", "64 kbit/s", "96 kbit/s", "128 kbit/s", "160 kbit/s", "192 kbit/s", "224 kbit/s", "256 kbit/s", "288 kbit/s", "320 kbit/s", "352 kbit/s", "384 kbit/s", "416 kbit/s", "448 kbit/s", "forbidden"], ["free format", "32 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "160 kbit/s", "192 kbit/s", "224 kbit/s", "256 kbit/s", "320 kbit/s", "384 kbit/s", "forbidden"], ["free format", "32 kbit/s", "40 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "160 kbit/s", "192 kbit/s", "224 kbit/s", "256 kbit/s", "320 kbit/s", "forbidden"]], [["free format", "32 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "144 kbit/s", "160 kbit/s", "176 kbit/s", "192 kbit/s", "224 kbit/s", "256 kbit/s", "forbidden"], ["free format", "8 kbit/s", "16 kbit/s", "24 kbit/s", "32 kbit/s", "40 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "144 kbit/s", "160 kbit/s", "forbidden"], ["free format", "8 kbit/s", "16 kbit/s", "24 kbit/s", "32 kbit/s", "40 kbit/s", "48 kbit/s", "56 kbit/s", "64 kbit/s", "80 kbit/s", "96 kbit/s", "112 kbit/s", "128 kbit/s", "144 kbit/s", "160 kbit/s", "forbidden"]]];
		MP3Header.prototype.bitrate_string = function() {
			return MP3Header.bitrate_str[this.h_version][this.h_layer - 1][this.h_bitrate_index];
		}
		MP3Header.prototype.sample_frequency_string = function() {
			switch (this.h_sample_frequency) {
				case MP3Header.THIRTYTWO:
					if (this.h_version == MP3Header.MPEG1)
						return "32 kHz";
					else if (this.h_version == MP3Header.MPEG2_LSF)
						return "16 kHz";
					else    // SZD
						return "8 kHz";
				case MP3Header.FOURTYFOUR_POINT_ONE:
					if (this.h_version == MP3Header.MPEG1)
						return "44.1 kHz";
					else if (this.h_version == MP3Header.MPEG2_LSF)
						return "22.05 kHz";
					else    // SZD
						return "11.025 kHz";
				case MP3Header.FOURTYEIGHT:
					if (this.h_version == MP3Header.MPEG1)
						return "48 kHz";
					else if (this.h_version == MP3Header.MPEG2_LSF)
						return "24 kHz";
					else    // SZD
						return "12 kHz";
			}
			return null;
		}
		MP3Header.isValidHeader = function(h) {
			return (((h >>> 24) == 0xFF) && (((h >> 21) & 2047) == 2047) && ((((h & 0x00180000) >>> 19) >>> 0) != 1) && ((((h & 0x00060000) >>> 17) >>> 0) != 0) && ((((h & 0x0000f000) >>> 12) >>> 0) != 0) && ((((h & 0x0000f000) >>> 12) >>> 0) != 15) && ((((h & 0x00000c00) >>> 10) >>> 0) != 3) && (((h & 0x00000003) >>> 0) != 2));
		}
		const BitReserve = function() {
			this.offset = 0;
			this.totbit = 0;
			this.buf_byte_idx = 0;
			this.buf = new Int32Array(BitReserve.BUFSIZE);
		}
		BitReserve.BUFSIZE = 4096 * 8;
		BitReserve.BUFSIZE_MASK = BitReserve.BUFSIZE - 1;
		BitReserve.prototype.hputbuf = function(val) {
			var ofs = this.offset;
			this.buf[ofs++] = val & 0x80;
			this.buf[ofs++] = val & 0x40;
			this.buf[ofs++] = val & 0x20;
			this.buf[ofs++] = val & 0x10;
			this.buf[ofs++] = val & 0x08;
			this.buf[ofs++] = val & 0x04;
			this.buf[ofs++] = val & 0x02;
			this.buf[ofs++] = val & 0x01;
			if (ofs == BitReserve.BUFSIZE) this.offset = 0;
			else this.offset = ofs;
		}
		BitReserve.prototype.hsstell = function() {
			return this.totbit;
		}
		BitReserve.prototype.hgetbits = function(N) {
			this.totbit += N;
			var val = 0;
			var pos = this.buf_byte_idx;
			if (pos + N < BitReserve.BUFSIZE) {
				while (N-- > 0) {
					val <<= 1;
					val |= ((this.buf[pos++] != 0) ? 1 : 0);
				}
			} else {
				while (N-- > 0) {
					val <<= 1;
					val |= ((this.buf[pos] != 0) ? 1 : 0);
					pos = (pos + 1) & BitReserve.BUFSIZE_MASK;
				}
			}
			this.buf_byte_idx = pos;
			return val;
		}
		BitReserve.prototype.hget1bit = function() {
			this.totbit++;
			var val = this.buf[this.buf_byte_idx];
			this.buf_byte_idx = (this.buf_byte_idx + 1) & BitReserve.BUFSIZE_MASK;
			return val;
		}
		BitReserve.prototype.rewindNbits = function(N) {
			this.totbit -= N;
			this.buf_byte_idx -= N;
			if (this.buf_byte_idx < 0)
				this.buf_byte_idx += BitReserve.BUFSIZE;
		}
		BitReserve.prototype.rewindNbytes = function(N) {
			var bits = (N << 3);
			this.totbit -= bits;
			this.buf_byte_idx -= bits;
			if (this.buf_byte_idx < 0)
				this.buf_byte_idx += BitReserve.BUFSIZE;
		}
		const huffcodetab = function(S, XLEN, YLEN, LINBITS, LINMAX, REF, VAL, TREELEN) {
			this.tablename0 = S.charAt(0);
			this.tablename1 = S.charAt(1);
			this.tablename2 = S.charAt(2);
			this.xlen = XLEN;
			this.ylen = YLEN;
			this.linbits = LINBITS;
			this.linmax = LINMAX;
			this.ref = REF;
			this.val = VAL;
			this.treelen = TREELEN;
		}
		huffcodetab.MXOFF = 250;
		huffcodetab.ValTab0 = [[0, 0]];
		huffcodetab.ValTab1 = [[2, 1], [0, 0], [2, 1], [0, 16], [2, 1], [0, 1], [0, 17]];
		huffcodetab.ValTab2 = [[2, 1], [0, 0], [4, 1], [2, 1], [0, 16], [0, 1], [2, 1], [0, 17], [4, 1], [2, 1], [0, 32], [0, 33], [2, 1], [0, 18], [2, 1], [0, 2], [0, 34]];
		huffcodetab.ValTab3 = [[4, 1], [2, 1], [0, 0], [0, 1], [2, 1], [0, 17], [2, 1], [0, 16], [4, 1], [2, 1], [0, 32], [0, 33], [2, 1], [0, 18], [2, 1], [0, 2], [0, 34]];
		huffcodetab.ValTab4 = [[0, 0]];
		huffcodetab.ValTab5 = [[2, 1], [0, 0], [4, 1], [2, 1], [0, 16], [0, 1], [2, 1], [0, 17], [8, 1], [4, 1], [2, 1], [0, 32], [0, 2], [2, 1], [0, 33], [0, 18], [8, 1], [4, 1], [2, 1], [0, 34], [0, 48], [2, 1], [0, 3], [0, 19], [2, 1], [0, 49], [2, 1], [0, 50], [2, 1], [0, 35], [0, 51]];
		huffcodetab.ValTab6 = [[6, 1], [4, 1], [2, 1], [0, 0], [0, 16], [0, 17], [6, 1], [2, 1], [0, 1], [2, 1], [0, 32], [0, 33], [6, 1], [2, 1], [0, 18], [2, 1], [0, 2], [0, 34], [4, 1], [2, 1], [0, 49], [0, 19], [4, 1], [2, 1], [0, 48], [0, 50], [2, 1], [0, 35], [2, 1], [0, 3], [0, 51]];
		huffcodetab.ValTab7 = [[2, 1], [0, 0], [4, 1], [2, 1], [0, 16], [0, 1], [8, 1], [2, 1], [0, 17], [4, 1], [2, 1], [0, 32], [0, 2], [0, 33], [18, 1], [6, 1], [2, 1], [0, 18], [2, 1], [0, 34], [0, 48], [4, 1], [2, 1], [0, 49], [0, 19], [4, 1], [2, 1], [0, 3], [0, 50], [2, 1], [0, 35], [0, 4], [10, 1], [4, 1], [2, 1], [0, 64], [0, 65], [2, 1], [0, 20], [2, 1], [0, 66], [0, 36], [12, 1], [6, 1], [4, 1], [2, 1], [0, 51], [0, 67], [0, 80], [4, 1], [2, 1], [0, 52], [0, 5], [0, 81], [6, 1], [2, 1], [0, 21], [2, 1], [0, 82], [0, 37], [4, 1], [2, 1], [0, 68], [0, 53], [4, 1], [2, 1], [0, 83], [0, 84], [2, 1], [0, 69], [0, 85]];
		huffcodetab.ValTab8 = [[6, 1], [2, 1], [0, 0], [2, 1], [0, 16], [0, 1], [2, 1], [0, 17], [4, 1], [2, 1], [0, 33], [0, 18], [14, 1], [4, 1], [2, 1], [0, 32], [0, 2], [2, 1], [0, 34], [4, 1], [2, 1], [0, 48], [0, 3], [2, 1], [0, 49], [0, 19], [14, 1], [8, 1], [4, 1], [2, 1], [0, 50], [0, 35], [2, 1], [0, 64], [0, 4], [2, 1], [0, 65], [2, 1], [0, 20], [0, 66], [12, 1], [6, 1], [2, 1], [0, 36], [2, 1], [0, 51], [0, 80], [4, 1], [2, 1], [0, 67], [0, 52], [0, 81], [6, 1], [2, 1], [0, 21], [2, 1], [0, 5], [0, 82], [6, 1], [2, 1], [0, 37], [2, 1], [0, 68], [0, 53], [2, 1], [0, 83], [2, 1], [0, 69], [2, 1], [0, 84], [0, 85]];
		huffcodetab.ValTab9 = [[8, 1], [4, 1], [2, 1], [0, 0], [0, 16], [2, 1], [0, 1], [0, 17], [10, 1], [4, 1], [2, 1], [0, 32], [0, 33], [2, 1], [0, 18], [2, 1], [0, 2], [0, 34], [12, 1], [6, 1], [4, 1], [2, 1], [0, 48], [0, 3], [0, 49], [2, 1], [0, 19], [2, 1], [0, 50], [0, 35], [12, 1], [4, 1], [2, 1], [0, 65], [0, 20], [4, 1], [2, 1], [0, 64], [0, 51], [2, 1], [0, 66], [0, 36], [10, 1], [6, 1], [4, 1], [2, 1], [0, 4], [0, 80], [0, 67], [2, 1], [0, 52], [0, 81], [8, 1], [4, 1], [2, 1], [0, 21], [0, 82], [2, 1], [0, 37], [0, 68], [6, 1], [4, 1], [2, 1], [0, 5], [0, 84], [0, 83], [2, 1], [0, 53], [2, 1], [0, 69], [0, 85]];
		huffcodetab.ValTab10 = [[2, 1], [0, 0], [4, 1], [2, 1], [0, 16], [0, 1], [10, 1], [2, 1], [0, 17], [4, 1], [2, 1], [0, 32], [0, 2], [2, 1], [0, 33], [0, 18], [28, 1], [8, 1], [4, 1], [2, 1], [0, 34], [0, 48], [2, 1], [0, 49], [0, 19], [8, 1], [4, 1], [2, 1], [0, 3], [0, 50], [2, 1], [0, 35], [0, 64], [4, 1], [2, 1], [0, 65], [0, 20], [4, 1], [2, 1], [0, 4], [0, 51], [2, 1], [0, 66], [0, 36], [28, 1], [10, 1], [6, 1], [4, 1], [2, 1], [0, 80], [0, 5], [0, 96], [2, 1], [0, 97], [0, 22], [12, 1], [6, 1], [4, 1], [2, 1], [0, 67], [0, 52], [0, 81], [2, 1], [0, 21], [2, 1], [0, 82], [0, 37], [4, 1], [2, 1], [0, 38], [0, 54], [0, 113], [20, 1], [8, 1], [2, 1], [0, 23], [4, 1], [2, 1], [0, 68], [0, 83], [0, 6], [6, 1], [4, 1], [2, 1], [0, 53], [0, 69], [0, 98], [2, 1], [0, 112], [2, 1], [0, 7], [0, 100], [14, 1], [4, 1], [2, 1], [0, 114], [0, 39], [6, 1], [2, 1], [0, 99], [2, 1], [0, 84], [0, 85], [2, 1], [0, 70], [0, 115], [8, 1], [4, 1], [2, 1], [0, 55], [0, 101], [2, 1], [0, 86], [0, 116], [6, 1], [2, 1], [0, 71], [2, 1], [0, 102], [0, 117], [4, 1], [2, 1], [0, 87], [0, 118], [2, 1], [0, 103], [0, 119]];
		huffcodetab.ValTab11 = [[6, 1], [2, 1], [0, 0], [2, 1], [0, 16], [0, 1], [8, 1], [2, 1], [0, 17], [4, 1], [2, 1], [0, 32], [0, 2], [0, 18], [24, 1], [8, 1], [2, 1], [0, 33], [2, 1], [0, 34], [2, 1], [0, 48], [0, 3], [4, 1], [2, 1], [0, 49], [0, 19], [4, 1], [2, 1], [0, 50], [0, 35], [4, 1], [2, 1], [0, 64], [0, 4], [2, 1], [0, 65], [0, 20], [30, 1], [16, 1], [10, 1], [4, 1], [2, 1], [0, 66], [0, 36], [4, 1], [2, 1], [0, 51], [0, 67], [0, 80], [4, 1], [2, 1], [0, 52], [0, 81], [0, 97], [6, 1], [2, 1], [0, 22], [2, 1], [0, 6], [0, 38], [2, 1], [0, 98], [2, 1], [0, 21], [2, 1], [0, 5], [0, 82], [16, 1], [10, 1], [6, 1], [4, 1], [2, 1], [0, 37], [0, 68], [0, 96], [2, 1], [0, 99], [0, 54], [4, 1], [2, 1], [0, 112], [0, 23], [0, 113], [16, 1], [6, 1], [4, 1], [2, 1], [0, 7], [0, 100], [0, 114], [2, 1], [0, 39], [4, 1], [2, 1], [0, 83], [0, 53], [2, 1], [0, 84], [0, 69], [10, 1], [4, 1], [2, 1], [0, 70], [0, 115], [2, 1], [0, 55], [2, 1], [0, 101], [0, 86], [10, 1], [6, 1], [4, 1], [2, 1], [0, 85], [0, 87], [0, 116], [2, 1], [0, 71], [0, 102], [4, 1], [2, 1], [0, 117], [0, 118], [2, 1], [0, 103], [0, 119]];
		huffcodetab.ValTab12 = [[12, 1], [4, 1], [2, 1], [0, 16], [0, 1], [2, 1], [0, 17], [2, 1], [0, 0], [2, 1], [0, 32], [0, 2], [16, 1], [4, 1], [2, 1], [0, 33], [0, 18], [4, 1], [2, 1], [0, 34], [0, 49], [2, 1], [0, 19], [2, 1], [0, 48], [2, 1], [0, 3], [0, 64], [26, 1], [8, 1], [4, 1], [2, 1], [0, 50], [0, 35], [2, 1], [0, 65], [0, 51], [10, 1], [4, 1], [2, 1], [0, 20], [0, 66], [2, 1], [0, 36], [2, 1], [0, 4], [0, 80], [4, 1], [2, 1], [0, 67], [0, 52], [2, 1], [0, 81], [0, 21], [28, 1], [14, 1], [8, 1], [4, 1], [2, 1], [0, 82], [0, 37], [2, 1], [0, 83], [0, 53], [4, 1], [2, 1], [0, 96], [0, 22], [0, 97], [4, 1], [2, 1], [0, 98], [0, 38], [6, 1], [4, 1], [2, 1], [0, 5], [0, 6], [0, 68], [2, 1], [0, 84], [0, 69], [18, 1], [10, 1], [4, 1], [2, 1], [0, 99], [0, 54], [4, 1], [2, 1], [0, 112], [0, 7], [0, 113], [4, 1], [2, 1], [0, 23], [0, 100], [2, 1], [0, 70], [0, 114], [10, 1], [6, 1], [2, 1], [0, 39], [2, 1], [0, 85], [0, 115], [2, 1], [0, 55], [0, 86], [8, 1], [4, 1], [2, 1], [0, 101], [0, 116], [2, 1], [0, 71], [0, 102], [4, 1], [2, 1], [0, 117], [0, 87], [2, 1], [0, 118], [2, 1], [0, 103], [0, 119]];
		huffcodetab.ValTab13 = [[2, 1], [0, 0], [6, 1], [2, 1], [0, 16], [2, 1], [0, 1], [0, 17], [28, 1], [8, 1], [4, 1], [2, 1], [0, 32], [0, 2], [2, 1], [0, 33], [0, 18], [8, 1], [4, 1], [2, 1], [0, 34], [0, 48], [2, 1], [0, 3], [0, 49], [6, 1], [2, 1], [0, 19], [2, 1], [0, 50], [0, 35], [4, 1], [2, 1], [0, 64], [0, 4], [0, 65], [70, 1], [28, 1], [14, 1], [6, 1], [2, 1], [0, 20], [2, 1], [0, 51], [0, 66], [4, 1], [2, 1], [0, 36], [0, 80], [2, 1], [0, 67], [0, 52], [4, 1], [2, 1], [0, 81], [0, 21], [4, 1], [2, 1], [0, 5], [0, 82], [2, 1], [0, 37], [2, 1], [0, 68], [0, 83], [14, 1], [8, 1], [4, 1], [2, 1], [0, 96], [0, 6], [2, 1], [0, 97], [0, 22], [4, 1], [2, 1], [0, 128], [0, 8], [0, 129], [16, 1], [8, 1], [4, 1], [2, 1], [0, 53], [0, 98], [2, 1], [0, 38], [0, 84], [4, 1], [2, 1], [0, 69], [0, 99], [2, 1], [0, 54], [0, 112], [6, 1], [4, 1], [2, 1], [0, 7], [0, 85], [0, 113], [2, 1], [0, 23], [2, 1], [0, 39], [0, 55], [72, 1], [24, 1], [12, 1], [4, 1], [2, 1], [0, 24], [0, 130], [2, 1], [0, 40], [4, 1], [2, 1], [0, 100], [0, 70], [0, 114], [8, 1], [4, 1], [2, 1], [0, 132], [0, 72], [2, 1], [0, 144], [0, 9], [2, 1], [0, 145], [0, 25], [24, 1], [14, 1], [8, 1], [4, 1], [2, 1], [0, 115], [0, 101], [2, 1], [0, 86], [0, 116], [4, 1], [2, 1], [0, 71], [0, 102], [0, 131], [6, 1], [2, 1], [0, 56], [2, 1], [0, 117], [0, 87], [2, 1], [0, 146], [0, 41], [14, 1], [8, 1], [4, 1], [2, 1], [0, 103], [0, 133], [2, 1], [0, 88], [0, 57], [2, 1], [0, 147], [2, 1], [0, 73], [0, 134], [6, 1], [2, 1], [0, 160], [2, 1], [0, 104], [0, 10], [2, 1], [0, 161], [0, 26], [68, 1], [24, 1], [12, 1], [4, 1], [2, 1], [0, 162], [0, 42], [4, 1], [2, 1], [0, 149], [0, 89], [2, 1], [0, 163], [0, 58], [8, 1], [4, 1], [2, 1], [0, 74], [0, 150], [2, 1], [0, 176], [0, 11], [2, 1], [0, 177], [0, 27], [20, 1], [8, 1], [2, 1], [0, 178], [4, 1], [2, 1], [0, 118], [0, 119], [0, 148], [6, 1], [4, 1], [2, 1], [0, 135], [0, 120], [0, 164], [4, 1], [2, 1], [0, 105], [0, 165], [0, 43], [12, 1], [6, 1], [4, 1], [2, 1], [0, 90], [0, 136], [0, 179], [2, 1], [0, 59], [2, 1], [0, 121], [0, 166], [6, 1], [4, 1], [2, 1], [0, 106], [0, 180], [0, 192], [4, 1], [2, 1], [0, 12], [0, 152], [0, 193], [60, 1], [22, 1], [10, 1], [6, 1], [2, 1], [0, 28], [2, 1], [0, 137], [0, 181], [2, 1], [0, 91], [0, 194], [4, 1], [2, 1], [0, 44], [0, 60], [4, 1], [2, 1], [0, 182], [0, 107], [2, 1], [0, 196], [0, 76], [16, 1], [8, 1], [4, 1], [2, 1], [0, 168], [0, 138], [2, 1], [0, 208], [0, 13], [2, 1], [0, 209], [2, 1], [0, 75], [2, 1], [0, 151], [0, 167], [12, 1], [6, 1], [2, 1], [0, 195], [2, 1], [0, 122], [0, 153], [4, 1], [2, 1], [0, 197], [0, 92], [0, 183], [4, 1], [2, 1], [0, 29], [0, 210], [2, 1], [0, 45], [2, 1], [0, 123], [0, 211], [52, 1], [28, 1], [12, 1], [4, 1], [2, 1], [0, 61], [0, 198], [4, 1], [2, 1], [0, 108], [0, 169], [2, 1], [0, 154], [0, 212], [8, 1], [4, 1], [2, 1], [0, 184], [0, 139], [2, 1], [0, 77], [0, 199], [4, 1], [2, 1], [0, 124], [0, 213], [2, 1], [0, 93], [0, 224], [10, 1], [4, 1], [2, 1], [0, 225], [0, 30], [4, 1], [2, 1], [0, 14], [0, 46], [0, 226], [8, 1], [4, 1], [2, 1], [0, 227], [0, 109], [2, 1], [0, 140], [0, 228], [4, 1], [2, 1], [0, 229], [0, 186], [0, 240], [38, 1], [16, 1], [4, 1], [2, 1], [0, 241], [0, 31], [6, 1], [4, 1], [2, 1], [0, 170], [0, 155], [0, 185], [2, 1], [0, 62], [2, 1], [0, 214], [0, 200], [12, 1], [6, 1], [2, 1], [0, 78], [2, 1], [0, 215], [0, 125], [2, 1], [0, 171], [2, 1], [0, 94], [0, 201], [6, 1], [2, 1], [0, 15], [2, 1], [0, 156], [0, 110], [2, 1], [0, 242], [0, 47], [32, 1], [16, 1], [6, 1], [4, 1], [2, 1], [0, 216], [0, 141], [0, 63], [6, 1], [2, 1], [0, 243], [2, 1], [0, 230], [0, 202], [2, 1], [0, 244], [0, 79], [8, 1], [4, 1], [2, 1], [0, 187], [0, 172], [2, 1], [0, 231], [0, 245], [4, 1], [2, 1], [0, 217], [0, 157], [2, 1], [0, 95], [0, 232], [30, 1], [12, 1], [6, 1], [2, 1], [0, 111], [2, 1], [0, 246], [0, 203], [4, 1], [2, 1], [0, 188], [0, 173], [0, 218], [8, 1], [2, 1], [0, 247], [4, 1], [2, 1], [0, 126], [0, 127], [0, 142], [6, 1], [4, 1], [2, 1], [0, 158], [0, 174], [0, 204], [2, 1], [0, 248], [0, 143], [18, 1], [8, 1], [4, 1], [2, 1], [0, 219], [0, 189], [2, 1], [0, 234], [0, 249], [4, 1], [2, 1], [0, 159], [0, 235], [2, 1], [0, 190], [2, 1], [0, 205], [0, 250], [14, 1], [4, 1], [2, 1], [0, 221], [0, 236], [6, 1], [4, 1], [2, 1], [0, 233], [0, 175], [0, 220], [2, 1], [0, 206], [0, 251], [8, 1], [4, 1], [2, 1], [0, 191], [0, 222], [2, 1], [0, 207], [0, 238], [4, 1], [2, 1], [0, 223], [0, 239], [2, 1], [0, 255], [2, 1], [0, 237], [2, 1], [0, 253], [2, 1], [0, 252], [0, 254]];
		huffcodetab.ValTab14 = [[0, 0]];
		huffcodetab.ValTab15 = [[16, 1], [6, 1], [2, 1], [0, 0], [2, 1], [0, 16], [0, 1], [2, 1], [0, 17], [4, 1], [2, 1], [0, 32], [0, 2], [2, 1], [0, 33], [0, 18], [50, 1], [16, 1], [6, 1], [2, 1], [0, 34], [2, 1], [0, 48], [0, 49], [6, 1], [2, 1], [0, 19], [2, 1], [0, 3], [0, 64], [2, 1], [0, 50], [0, 35], [14, 1], [6, 1], [4, 1], [2, 1], [0, 4], [0, 20], [0, 65], [4, 1], [2, 1], [0, 51], [0, 66], [2, 1], [0, 36], [0, 67], [10, 1], [6, 1], [2, 1], [0, 52], [2, 1], [0, 80], [0, 5], [2, 1], [0, 81], [0, 21], [4, 1], [2, 1], [0, 82], [0, 37], [4, 1], [2, 1], [0, 68], [0, 83], [0, 97], [90, 1], [36, 1], [18, 1], [10, 1], [6, 1], [2, 1], [0, 53], [2, 1], [0, 96], [0, 6], [2, 1], [0, 22], [0, 98], [4, 1], [2, 1], [0, 38], [0, 84], [2, 1], [0, 69], [0, 99], [10, 1], [6, 1], [2, 1], [0, 54], [2, 1], [0, 112], [0, 7], [2, 1], [0, 113], [0, 85], [4, 1], [2, 1], [0, 23], [0, 100], [2, 1], [0, 114], [0, 39], [24, 1], [16, 1], [8, 1], [4, 1], [2, 1], [0, 70], [0, 115], [2, 1], [0, 55], [0, 101], [4, 1], [2, 1], [0, 86], [0, 128], [2, 1], [0, 8], [0, 116], [4, 1], [2, 1], [0, 129], [0, 24], [2, 1], [0, 130], [0, 40], [16, 1], [8, 1], [4, 1], [2, 1], [0, 71], [0, 102], [2, 1], [0, 131], [0, 56], [4, 1], [2, 1], [0, 117], [0, 87], [2, 1], [0, 132], [0, 72], [6, 1], [4, 1], [2, 1], [0, 144], [0, 25], [0, 145], [4, 1], [2, 1], [0, 146], [0, 118], [2, 1], [0, 103], [0, 41], [92, 1], [36, 1], [18, 1], [10, 1], [4, 1], [2, 1], [0, 133], [0, 88], [4, 1], [2, 1], [0, 9], [0, 119], [0, 147], [4, 1], [2, 1], [0, 57], [0, 148], [2, 1], [0, 73], [0, 134], [10, 1], [6, 1], [2, 1], [0, 104], [2, 1], [0, 160], [0, 10], [2, 1], [0, 161], [0, 26], [4, 1], [2, 1], [0, 162], [0, 42], [2, 1], [0, 149], [0, 89], [26, 1], [14, 1], [6, 1], [2, 1], [0, 163], [2, 1], [0, 58], [0, 135], [4, 1], [2, 1], [0, 120], [0, 164], [2, 1], [0, 74], [0, 150], [6, 1], [4, 1], [2, 1], [0, 105], [0, 176], [0, 177], [4, 1], [2, 1], [0, 27], [0, 165], [0, 178], [14, 1], [8, 1], [4, 1], [2, 1], [0, 90], [0, 43], [2, 1], [0, 136], [0, 151], [2, 1], [0, 179], [2, 1], [0, 121], [0, 59], [8, 1], [4, 1], [2, 1], [0, 106], [0, 180], [2, 1], [0, 75], [0, 193], [4, 1], [2, 1], [0, 152], [0, 137], [2, 1], [0, 28], [0, 181], [80, 1], [34, 1], [16, 1], [6, 1], [4, 1], [2, 1], [0, 91], [0, 44], [0, 194], [6, 1], [4, 1], [2, 1], [0, 11], [0, 192], [0, 166], [2, 1], [0, 167], [0, 122], [10, 1], [4, 1], [2, 1], [0, 195], [0, 60], [4, 1], [2, 1], [0, 12], [0, 153], [0, 182], [4, 1], [2, 1], [0, 107], [0, 196], [2, 1], [0, 76], [0, 168], [20, 1], [10, 1], [4, 1], [2, 1], [0, 138], [0, 197], [4, 1], [2, 1], [0, 208], [0, 92], [0, 209], [4, 1], [2, 1], [0, 183], [0, 123], [2, 1], [0, 29], [2, 1], [0, 13], [0, 45], [12, 1], [4, 1], [2, 1], [0, 210], [0, 211], [4, 1], [2, 1], [0, 61], [0, 198], [2, 1], [0, 108], [0, 169], [6, 1], [4, 1], [2, 1], [0, 154], [0, 184], [0, 212], [4, 1], [2, 1], [0, 139], [0, 77], [2, 1], [0, 199], [0, 124], [68, 1], [34, 1], [18, 1], [10, 1], [4, 1], [2, 1], [0, 213], [0, 93], [4, 1], [2, 1], [0, 224], [0, 14], [0, 225], [4, 1], [2, 1], [0, 30], [0, 226], [2, 1], [0, 170], [0, 46], [8, 1], [4, 1], [2, 1], [0, 185], [0, 155], [2, 1], [0, 227], [0, 214], [4, 1], [2, 1], [0, 109], [0, 62], [2, 1], [0, 200], [0, 140], [16, 1], [8, 1], [4, 1], [2, 1], [0, 228], [0, 78], [2, 1], [0, 215], [0, 125], [4, 1], [2, 1], [0, 229], [0, 186], [2, 1], [0, 171], [0, 94], [8, 1], [4, 1], [2, 1], [0, 201], [0, 156], [2, 1], [0, 241], [0, 31], [6, 1], [4, 1], [2, 1], [0, 240], [0, 110], [0, 242], [2, 1], [0, 47], [0, 230], [38, 1], [18, 1], [8, 1], [4, 1], [2, 1], [0, 216], [0, 243], [2, 1], [0, 63], [0, 244], [6, 1], [2, 1], [0, 79], [2, 1], [0, 141], [0, 217], [2, 1], [0, 187], [0, 202], [8, 1], [4, 1], [2, 1], [0, 172], [0, 231], [2, 1], [0, 126], [0, 245], [8, 1], [4, 1], [2, 1], [0, 157], [0, 95], [2, 1], [0, 232], [0, 142], [2, 1], [0, 246], [0, 203], [34, 1], [18, 1], [10, 1], [6, 1], [4, 1], [2, 1], [0, 15], [0, 174], [0, 111], [2, 1], [0, 188], [0, 218], [4, 1], [2, 1], [0, 173], [0, 247], [2, 1], [0, 127], [0, 233], [8, 1], [4, 1], [2, 1], [0, 158], [0, 204], [2, 1], [0, 248], [0, 143], [4, 1], [2, 1], [0, 219], [0, 189], [2, 1], [0, 234], [0, 249], [16, 1], [8, 1], [4, 1], [2, 1], [0, 159], [0, 220], [2, 1], [0, 205], [0, 235], [4, 1], [2, 1], [0, 190], [0, 250], [2, 1], [0, 175], [0, 221], [14, 1], [6, 1], [4, 1], [2, 1], [0, 236], [0, 206], [0, 251], [4, 1], [2, 1], [0, 191], [0, 237], [2, 1], [0, 222], [0, 252], [6, 1], [4, 1], [2, 1], [0, 207], [0, 253], [0, 238], [4, 1], [2, 1], [0, 223], [0, 254], [2, 1], [0, 239], [0, 255]];
		huffcodetab.ValTab16 = [[2, 1], [0, 0], [6, 1], [2, 1], [0, 16], [2, 1], [0, 1], [0, 17], [42, 1], [8, 1], [4, 1], [2, 1], [0, 32], [0, 2], [2, 1], [0, 33], [0, 18], [10, 1], [6, 1], [2, 1], [0, 34], [2, 1], [0, 48], [0, 3], [2, 1], [0, 49], [0, 19], [10, 1], [4, 1], [2, 1], [0, 50], [0, 35], [4, 1], [2, 1], [0, 64], [0, 4], [0, 65], [6, 1], [2, 1], [0, 20], [2, 1], [0, 51], [0, 66], [4, 1], [2, 1], [0, 36], [0, 80], [2, 1], [0, 67], [0, 52], [138, 1], [40, 1], [16, 1], [6, 1], [4, 1], [2, 1], [0, 5], [0, 21], [0, 81], [4, 1], [2, 1], [0, 82], [0, 37], [4, 1], [2, 1], [0, 68], [0, 53], [0, 83], [10, 1], [6, 1], [4, 1], [2, 1], [0, 96], [0, 6], [0, 97], [2, 1], [0, 22], [0, 98], [8, 1], [4, 1], [2, 1], [0, 38], [0, 84], [2, 1], [0, 69], [0, 99], [4, 1], [2, 1], [0, 54], [0, 112], [0, 113], [40, 1], [18, 1], [8, 1], [2, 1], [0, 23], [2, 1], [0, 7], [2, 1], [0, 85], [0, 100], [4, 1], [2, 1], [0, 114], [0, 39], [4, 1], [2, 1], [0, 70], [0, 101], [0, 115], [10, 1], [6, 1], [2, 1], [0, 55], [2, 1], [0, 86], [0, 8], [2, 1], [0, 128], [0, 129], [6, 1], [2, 1], [0, 24], [2, 1], [0, 116], [0, 71], [2, 1], [0, 130], [2, 1], [0, 40], [0, 102], [24, 1], [14, 1], [8, 1], [4, 1], [2, 1], [0, 131], [0, 56], [2, 1], [0, 117], [0, 132], [4, 1], [2, 1], [0, 72], [0, 144], [0, 145], [6, 1], [2, 1], [0, 25], [2, 1], [0, 9], [0, 118], [2, 1], [0, 146], [0, 41], [14, 1], [8, 1], [4, 1], [2, 1], [0, 133], [0, 88], [2, 1], [0, 147], [0, 57], [4, 1], [2, 1], [0, 160], [0, 10], [0, 26], [8, 1], [2, 1], [0, 162], [2, 1], [0, 103], [2, 1], [0, 87], [0, 73], [6, 1], [2, 1], [0, 148], [2, 1], [0, 119], [0, 134], [2, 1], [0, 161], [2, 1], [0, 104], [0, 149], [220, 1], [126, 1], [50, 1], [26, 1], [12, 1], [6, 1], [2, 1], [0, 42], [2, 1], [0, 89], [0, 58], [2, 1], [0, 163], [2, 1], [0, 135], [0, 120], [8, 1], [4, 1], [2, 1], [0, 164], [0, 74], [2, 1], [0, 150], [0, 105], [4, 1], [2, 1], [0, 176], [0, 11], [0, 177], [10, 1], [4, 1], [2, 1], [0, 27], [0, 178], [2, 1], [0, 43], [2, 1], [0, 165], [0, 90], [6, 1], [2, 1], [0, 179], [2, 1], [0, 166], [0, 106], [4, 1], [2, 1], [0, 180], [0, 75], [2, 1], [0, 12], [0, 193], [30, 1], [14, 1], [6, 1], [4, 1], [2, 1], [0, 181], [0, 194], [0, 44], [4, 1], [2, 1], [0, 167], [0, 195], [2, 1], [0, 107], [0, 196], [8, 1], [2, 1], [0, 29], [4, 1], [2, 1], [0, 136], [0, 151], [0, 59], [4, 1], [2, 1], [0, 209], [0, 210], [2, 1], [0, 45], [0, 211], [18, 1], [6, 1], [4, 1], [2, 1], [0, 30], [0, 46], [0, 226], [6, 1], [4, 1], [2, 1], [0, 121], [0, 152], [0, 192], [2, 1], [0, 28], [2, 1], [0, 137], [0, 91], [14, 1], [6, 1], [2, 1], [0, 60], [2, 1], [0, 122], [0, 182], [4, 1], [2, 1], [0, 76], [0, 153], [2, 1], [0, 168], [0, 138], [6, 1], [2, 1], [0, 13], [2, 1], [0, 197], [0, 92], [4, 1], [2, 1], [0, 61], [0, 198], [2, 1], [0, 108], [0, 154], [88, 1], [86, 1], [36, 1], [16, 1], [8, 1], [4, 1], [2, 1], [0, 139], [0, 77], [2, 1], [0, 199], [0, 124], [4, 1], [2, 1], [0, 213], [0, 93], [2, 1], [0, 224], [0, 14], [8, 1], [2, 1], [0, 227], [4, 1], [2, 1], [0, 208], [0, 183], [0, 123], [6, 1], [4, 1], [2, 1], [0, 169], [0, 184], [0, 212], [2, 1], [0, 225], [2, 1], [0, 170], [0, 185], [24, 1], [10, 1], [6, 1], [4, 1], [2, 1], [0, 155], [0, 214], [0, 109], [2, 1], [0, 62], [0, 200], [6, 1], [4, 1], [2, 1], [0, 140], [0, 228], [0, 78], [4, 1], [2, 1], [0, 215], [0, 229], [2, 1], [0, 186], [0, 171], [12, 1], [4, 1], [2, 1], [0, 156], [0, 230], [4, 1], [2, 1], [0, 110], [0, 216], [2, 1], [0, 141], [0, 187], [8, 1], [4, 1], [2, 1], [0, 231], [0, 157], [2, 1], [0, 232], [0, 142], [4, 1], [2, 1], [0, 203], [0, 188], [0, 158], [0, 241], [2, 1], [0, 31], [2, 1], [0, 15], [0, 47], [66, 1], [56, 1], [2, 1], [0, 242], [52, 1], [50, 1], [20, 1], [8, 1], [2, 1], [0, 189], [2, 1], [0, 94], [2, 1], [0, 125], [0, 201], [6, 1], [2, 1], [0, 202], [2, 1], [0, 172], [0, 126], [4, 1], [2, 1], [0, 218], [0, 173], [0, 204], [10, 1], [6, 1], [2, 1], [0, 174], [2, 1], [0, 219], [0, 220], [2, 1], [0, 205], [0, 190], [6, 1], [4, 1], [2, 1], [0, 235], [0, 237], [0, 238], [6, 1], [4, 1], [2, 1], [0, 217], [0, 234], [0, 233], [2, 1], [0, 222], [4, 1], [2, 1], [0, 221], [0, 236], [0, 206], [0, 63], [0, 240], [4, 1], [2, 1], [0, 243], [0, 244], [2, 1], [0, 79], [2, 1], [0, 245], [0, 95], [10, 1], [2, 1], [0, 255], [4, 1], [2, 1], [0, 246], [0, 111], [2, 1], [0, 247], [0, 127], [12, 1], [6, 1], [2, 1], [0, 143], [2, 1], [0, 248], [0, 249], [4, 1], [2, 1], [0, 159], [0, 250], [0, 175], [8, 1], [4, 1], [2, 1], [0, 251], [0, 191], [2, 1], [0, 252], [0, 207], [4, 1], [2, 1], [0, 253], [0, 223], [2, 1], [0, 254], [0, 239]];
		huffcodetab.ValTab24 = [[60, 1], [8, 1], [4, 1], [2, 1], [0, 0], [0, 16], [2, 1], [0, 1], [0, 17], [14, 1], [6, 1], [4, 1], [2, 1], [0, 32], [0, 2], [0, 33], [2, 1], [0, 18], [2, 1], [0, 34], [2, 1], [0, 48], [0, 3], [14, 1], [4, 1], [2, 1], [0, 49], [0, 19], [4, 1], [2, 1], [0, 50], [0, 35], [4, 1], [2, 1], [0, 64], [0, 4], [0, 65], [8, 1], [4, 1], [2, 1], [0, 20], [0, 51], [2, 1], [0, 66], [0, 36], [6, 1], [4, 1], [2, 1], [0, 67], [0, 52], [0, 81], [6, 1], [4, 1], [2, 1], [0, 80], [0, 5], [0, 21], [2, 1], [0, 82], [0, 37], [250, 1], [98, 1], [34, 1], [18, 1], [10, 1], [4, 1], [2, 1], [0, 68], [0, 83], [2, 1], [0, 53], [2, 1], [0, 96], [0, 6], [4, 1], [2, 1], [0, 97], [0, 22], [2, 1], [0, 98], [0, 38], [8, 1], [4, 1], [2, 1], [0, 84], [0, 69], [2, 1], [0, 99], [0, 54], [4, 1], [2, 1], [0, 113], [0, 85], [2, 1], [0, 100], [0, 70], [32, 1], [14, 1], [6, 1], [2, 1], [0, 114], [2, 1], [0, 39], [0, 55], [2, 1], [0, 115], [4, 1], [2, 1], [0, 112], [0, 7], [0, 23], [10, 1], [4, 1], [2, 1], [0, 101], [0, 86], [4, 1], [2, 1], [0, 128], [0, 8], [0, 129], [4, 1], [2, 1], [0, 116], [0, 71], [2, 1], [0, 24], [0, 130], [16, 1], [8, 1], [4, 1], [2, 1], [0, 40], [0, 102], [2, 1], [0, 131], [0, 56], [4, 1], [2, 1], [0, 117], [0, 87], [2, 1], [0, 132], [0, 72], [8, 1], [4, 1], [2, 1], [0, 145], [0, 25], [2, 1], [0, 146], [0, 118], [4, 1], [2, 1], [0, 103], [0, 41], [2, 1], [0, 133], [0, 88], [92, 1], [34, 1], [16, 1], [8, 1], [4, 1], [2, 1], [0, 147], [0, 57], [2, 1], [0, 148], [0, 73], [4, 1], [2, 1], [0, 119], [0, 134], [2, 1], [0, 104], [0, 161], [8, 1], [4, 1], [2, 1], [0, 162], [0, 42], [2, 1], [0, 149], [0, 89], [4, 1], [2, 1], [0, 163], [0, 58], [2, 1], [0, 135], [2, 1], [0, 120], [0, 74], [22, 1], [12, 1], [4, 1], [2, 1], [0, 164], [0, 150], [4, 1], [2, 1], [0, 105], [0, 177], [2, 1], [0, 27], [0, 165], [6, 1], [2, 1], [0, 178], [2, 1], [0, 90], [0, 43], [2, 1], [0, 136], [0, 179], [16, 1], [10, 1], [6, 1], [2, 1], [0, 144], [2, 1], [0, 9], [0, 160], [2, 1], [0, 151], [0, 121], [4, 1], [2, 1], [0, 166], [0, 106], [0, 180], [12, 1], [6, 1], [2, 1], [0, 26], [2, 1], [0, 10], [0, 176], [2, 1], [0, 59], [2, 1], [0, 11], [0, 192], [4, 1], [2, 1], [0, 75], [0, 193], [2, 1], [0, 152], [0, 137], [67, 1], [34, 1], [16, 1], [8, 1], [4, 1], [2, 1], [0, 28], [0, 181], [2, 1], [0, 91], [0, 194], [4, 1], [2, 1], [0, 44], [0, 167], [2, 1], [0, 122], [0, 195], [10, 1], [6, 1], [2, 1], [0, 60], [2, 1], [0, 12], [0, 208], [2, 1], [0, 182], [0, 107], [4, 1], [2, 1], [0, 196], [0, 76], [2, 1], [0, 153], [0, 168], [16, 1], [8, 1], [4, 1], [2, 1], [0, 138], [0, 197], [2, 1], [0, 92], [0, 209], [4, 1], [2, 1], [0, 183], [0, 123], [2, 1], [0, 29], [0, 210], [9, 1], [4, 1], [2, 1], [0, 45], [0, 211], [2, 1], [0, 61], [0, 198], [85, 250], [4, 1], [2, 1], [0, 108], [0, 169], [2, 1], [0, 154], [0, 212], [32, 1], [16, 1], [8, 1], [4, 1], [2, 1], [0, 184], [0, 139], [2, 1], [0, 77], [0, 199], [4, 1], [2, 1], [0, 124], [0, 213], [2, 1], [0, 93], [0, 225], [8, 1], [4, 1], [2, 1], [0, 30], [0, 226], [2, 1], [0, 170], [0, 185], [4, 1], [2, 1], [0, 155], [0, 227], [2, 1], [0, 214], [0, 109], [20, 1], [10, 1], [6, 1], [2, 1], [0, 62], [2, 1], [0, 46], [0, 78], [2, 1], [0, 200], [0, 140], [4, 1], [2, 1], [0, 228], [0, 215], [4, 1], [2, 1], [0, 125], [0, 171], [0, 229], [10, 1], [4, 1], [2, 1], [0, 186], [0, 94], [2, 1], [0, 201], [2, 1], [0, 156], [0, 110], [8, 1], [2, 1], [0, 230], [2, 1], [0, 13], [2, 1], [0, 224], [0, 14], [4, 1], [2, 1], [0, 216], [0, 141], [2, 1], [0, 187], [0, 202], [74, 1], [2, 1], [0, 255], [64, 1], [58, 1], [32, 1], [16, 1], [8, 1], [4, 1], [2, 1], [0, 172], [0, 231], [2, 1], [0, 126], [0, 217], [4, 1], [2, 1], [0, 157], [0, 232], [2, 1], [0, 142], [0, 203], [8, 1], [4, 1], [2, 1], [0, 188], [0, 218], [2, 1], [0, 173], [0, 233], [4, 1], [2, 1], [0, 158], [0, 204], [2, 1], [0, 219], [0, 189], [16, 1], [8, 1], [4, 1], [2, 1], [0, 234], [0, 174], [2, 1], [0, 220], [0, 205], [4, 1], [2, 1], [0, 235], [0, 190], [2, 1], [0, 221], [0, 236], [8, 1], [4, 1], [2, 1], [0, 206], [0, 237], [2, 1], [0, 222], [0, 238], [0, 15], [4, 1], [2, 1], [0, 240], [0, 31], [0, 241], [4, 1], [2, 1], [0, 242], [0, 47], [2, 1], [0, 243], [0, 63], [18, 1], [8, 1], [4, 1], [2, 1], [0, 244], [0, 79], [2, 1], [0, 245], [0, 95], [4, 1], [2, 1], [0, 246], [0, 111], [2, 1], [0, 247], [2, 1], [0, 127], [0, 143], [10, 1], [4, 1], [2, 1], [0, 248], [0, 249], [4, 1], [2, 1], [0, 159], [0, 175], [0, 250], [8, 1], [4, 1], [2, 1], [0, 251], [0, 191], [2, 1], [0, 252], [0, 207], [4, 1], [2, 1], [0, 253], [0, 223], [2, 1], [0, 254], [0, 239]];
		huffcodetab.ValTab32 = [[2, 1], [0, 0], [8, 1], [4, 1], [2, 1], [0, 8], [0, 4], [2, 1], [0, 1], [0, 2], [8, 1], [4, 1], [2, 1], [0, 12], [0, 10], [2, 1], [0, 3], [0, 6], [6, 1], [2, 1], [0, 9], [2, 1], [0, 5], [0, 7], [4, 1], [2, 1], [0, 14], [0, 13], [2, 1], [0, 15], [0, 11]];huffcodetab.ValTab33 = [[16, 1], [8, 1], [4, 1], [2, 1], [0, 0], [0, 1], [2, 1], [0, 2], [0, 3], [4, 1], [2, 1], [0, 4], [0, 5], [2, 1], [0, 6], [0, 7], [8, 1], [4, 1], [2, 1], [0, 8], [0, 9], [2, 1], [0, 10], [0, 11], [4, 1], [2, 1], [0, 12], [0, 13], [2, 1], [0, 14], [0, 15]];
		huffcodetab.ht = null;
		huffcodetab.initHuff = function() {
			if (huffcodetab.ht != null) return;
			huffcodetab.ht = [];
			huffcodetab.ht[0] = new huffcodetab("0  ", 0, 0, 0, 0, -1, huffcodetab.ValTab0, 0);
			huffcodetab.ht[1] = new huffcodetab("1  ", 2, 2, 0, 0, -1, huffcodetab.ValTab1, 7);
			huffcodetab.ht[2] = new huffcodetab("2  ", 3, 3, 0, 0, -1, huffcodetab.ValTab2, 17);
			huffcodetab.ht[3] = new huffcodetab("3  ", 3, 3, 0, 0, -1, huffcodetab.ValTab3, 17);
			huffcodetab.ht[4] = new huffcodetab("4  ", 0, 0, 0, 0, -1, huffcodetab.ValTab4, 0);
			huffcodetab.ht[5] = new huffcodetab("5  ", 4, 4, 0, 0, -1, huffcodetab.ValTab5, 31);
			huffcodetab.ht[6] = new huffcodetab("6  ", 4, 4, 0, 0, -1, huffcodetab.ValTab6, 31);
			huffcodetab.ht[7] = new huffcodetab("7  ", 6, 6, 0, 0, -1, huffcodetab.ValTab7, 71);
			huffcodetab.ht[8] = new huffcodetab("8  ", 6, 6, 0, 0, -1, huffcodetab.ValTab8, 71);
			huffcodetab.ht[9] = new huffcodetab("9  ", 6, 6, 0, 0, -1, huffcodetab.ValTab9, 71);
			huffcodetab.ht[10] = new huffcodetab("10 ", 8, 8, 0, 0, -1, huffcodetab.ValTab10, 127);
			huffcodetab.ht[11] = new huffcodetab("11 ", 8, 8, 0, 0, -1, huffcodetab.ValTab11, 127);
			huffcodetab.ht[12] = new huffcodetab("12 ", 8, 8, 0, 0, -1, huffcodetab.ValTab12, 127);
			huffcodetab.ht[13] = new huffcodetab("13 ", 16, 16, 0, 0, -1, huffcodetab.ValTab13, 511);
			huffcodetab.ht[14] = new huffcodetab("14 ", 0, 0, 0, 0, -1, huffcodetab.ValTab14, 0);
			huffcodetab.ht[15] = new huffcodetab("15 ", 16, 16, 0, 0, -1, huffcodetab.ValTab15, 511);
			huffcodetab.ht[16] = new huffcodetab("16 ", 16, 16, 1, 1, -1, huffcodetab.ValTab16, 511);
			huffcodetab.ht[17] = new huffcodetab("17 ", 16, 16, 2, 3, 16, huffcodetab.ValTab16, 511);
			huffcodetab.ht[18] = new huffcodetab("18 ", 16, 16, 3, 7, 16, huffcodetab.ValTab16, 511);
			huffcodetab.ht[19] = new huffcodetab("19 ", 16, 16, 4, 15, 16, huffcodetab.ValTab16, 511);
			huffcodetab.ht[20] = new huffcodetab("20 ", 16, 16, 6, 63, 16, huffcodetab.ValTab16, 511);
			huffcodetab.ht[21] = new huffcodetab("21 ", 16, 16, 8, 255, 16, huffcodetab.ValTab16, 511);
			huffcodetab.ht[22] = new huffcodetab("22 ", 16, 16, 10, 1023, 16, huffcodetab.ValTab16, 511);
			huffcodetab.ht[23] = new huffcodetab("23 ", 16, 16, 13, 8191, 16, huffcodetab.ValTab16, 511);
			huffcodetab.ht[24] = new huffcodetab("24 ", 16, 16, 4, 15, -1, huffcodetab.ValTab24, 512);
			huffcodetab.ht[25] = new huffcodetab("25 ", 16, 16, 5, 31, 24, huffcodetab.ValTab24, 512);
			huffcodetab.ht[26] = new huffcodetab("26 ", 16, 16, 6, 63, 24, huffcodetab.ValTab24, 512);
			huffcodetab.ht[27] = new huffcodetab("27 ", 16, 16, 7, 127, 24, huffcodetab.ValTab24, 512);
			huffcodetab.ht[28] = new huffcodetab("28 ", 16, 16, 8, 255, 24, huffcodetab.ValTab24, 512);
			huffcodetab.ht[29] = new huffcodetab("29 ", 16, 16, 9, 511, 24, huffcodetab.ValTab24, 512);
			huffcodetab.ht[30] = new huffcodetab("30 ", 16, 16, 11, 2047, 24, huffcodetab.ValTab24, 512);
			huffcodetab.ht[31] = new huffcodetab("31 ", 16, 16, 13, 8191, 24, huffcodetab.ValTab24, 512);
			huffcodetab.ht[32] = new huffcodetab("32 ", 1, 16, 0, 0, -1, huffcodetab.ValTab32, 31);
			huffcodetab.ht[33] = new huffcodetab("33 ", 1, 16, 0, 0, -1, huffcodetab.ValTab33, 31);
		}
		huffcodetab.huffman_decoder = function(h, x, y, v, w, br) {
			var dmask = 1 << ((4 * 8) - 1);
			var hs = 4 * 8;
			var level;
			var point = 0;
			var error = 1;
			level = dmask;
			if (h.val == null) return 2;
			if (h.treelen == 0) {
				x[0] = y[0] = 0;
				return 0;
			}
			do {
				if (h.val[point][0] == 0) {
					x[0] = h.val[point][1] >>> 4;
					y[0] = h.val[point][1] & 0xf;
					error = 0;
					break;
				}
				if (br.hget1bit() != 0) {
					while (h.val[point][1] >= huffcodetab.MXOFF) point += h.val[point][1];
					point += h.val[point][1];
				} else {
					while (h.val[point][0] >= huffcodetab.MXOFF) point += h.val[point][0];
					point += h.val[point][0];
				}
				level >>>= 1;
			} while ((level != 0) || (point < 0));
			if (h.tablename0 == '3' && (h.tablename1 == '2' || h.tablename1 == '3')) {
				v[0] = (y[0] >> 3) & 1;
				w[0] = (y[0] >> 2) & 1;
				x[0] = (y[0] >> 1) & 1;
				y[0] = y[0] & 1;
				if (v[0] != 0)
					if (br.hget1bit() != 0) v[0] = -v[0];
				if (w[0] != 0)
					if (br.hget1bit() != 0) w[0] = -w[0];
				if (x[0] != 0)
					if (br.hget1bit() != 0) x[0] = -x[0];
				if (y[0] != 0)
					if (br.hget1bit() != 0) y[0] = -y[0];
			} else {
				if (h.linbits != 0)
					if ((h.xlen - 1) == x[0])
						x[0] += br.hgetbits(h.linbits);
				if (x[0] != 0)
					if (br.hget1bit() != 0) x[0] = -x[0];
				if (h.linbits != 0)
					if ((h.ylen - 1) == y[0])
						y[0] += br.hgetbits(h.linbits);
				if (y[0] != 0)
					if (br.hget1bit() != 0) y[0] = -y[0];
			}
			return error;
		}
		const SynthesisFilter = function(channelnumber, factor, eq0) {
			if (SynthesisFilter.d == null) {
				SynthesisFilter.d = SynthesisFilter.load_d();
				SynthesisFilter.d16 = SynthesisFilter.splitArray(SynthesisFilter.d, 16);
			}
			this.v1 = new Float32Array(512);
			this.v2 = new Float32Array(512);
			this._tmpOut = new Float32Array(32);
			this.samples = new Float32Array(32);
			this.channel = channelnumber;
			this.scalefactor = factor;
			this.setEQ(this.eq);
			this.reset();
		}
		SynthesisFilter.d = null;
		SynthesisFilter.d16 = null;
		SynthesisFilter.load_d = function() {
			return new Float32Array([0.000000000, -0.000442505,  0.003250122, -0.007003784, 0.031082153, -0.078628540,  0.100311279, -0.572036743, 1.144989014,  0.572036743,  0.100311279,  0.078628540, 0.031082153,  0.007003784,  0.003250122,  0.000442505, -0.000015259, -0.000473022,  0.003326416, -0.007919312, 0.030517578, -0.084182739,  0.090927124, -0.600219727, 1.144287109,  0.543823242,  0.108856201,  0.073059082, 0.031478882,  0.006118774,  0.003173828,  0.000396729, -0.000015259, -0.000534058,  0.003387451, -0.008865356, 0.029785156, -0.089706421,  0.080688477, -0.628295898, 1.142211914,  0.515609741,  0.116577148,  0.067520142, 0.031738281,  0.005294800,  0.003082275,  0.000366211, -0.000015259, -0.000579834,  0.003433228, -0.009841919, 0.028884888, -0.095169067,  0.069595337, -0.656219482, 1.138763428,  0.487472534,  0.123474121,  0.061996460, 0.031845093,  0.004486084,  0.002990723,  0.000320435, -0.000015259, -0.000625610,  0.003463745, -0.010848999, 0.027801514, -0.100540161,  0.057617188, -0.683914185, 1.133926392,  0.459472656,  0.129577637,  0.056533813, 0.031814575,  0.003723145,  0.002899170,  0.000289917, -0.000015259, -0.000686646,  0.003479004, -0.011886597, 0.026535034, -0.105819702,  0.044784546, -0.711318970, 1.127746582,  0.431655884,  0.134887695,  0.051132202, 0.031661987,  0.003005981,  0.002792358,  0.000259399, -0.000015259, -0.000747681,  0.003479004, -0.012939453, 0.025085449, -0.110946655,  0.031082153, -0.738372803, 1.120223999,  0.404083252,  0.139450073,  0.045837402, 0.031387329,  0.002334595,  0.002685547,  0.000244141, -0.000030518, -0.000808716,  0.003463745, -0.014022827, 0.023422241, -0.115921021,  0.016510010, -0.765029907, 1.111373901,  0.376800537,  0.143264771,  0.040634155, 0.031005859,  0.001693726,  0.002578735,  0.000213623, -0.000030518, -0.000885010,  0.003417969, -0.015121460, 0.021575928, -0.120697021,  0.001068115, -0.791213989, 1.101211548,  0.349868774,  0.146362305,  0.035552979, 0.030532837,  0.001098633,  0.002456665,  0.000198364, -0.000030518, -0.000961304,  0.003372192, -0.016235352, 0.019531250, -0.125259399, -0.015228271, -0.816864014, 1.089782715,  0.323318481,  0.148773193,  0.030609131, 0.029937744,  0.000549316,  0.002349854,  0.000167847, -0.000030518, -0.001037598,  0.003280640, -0.017349243, 0.017257690, -0.129562378, -0.032379150, -0.841949463, 1.077117920,  0.297210693,  0.150497437,  0.025817871, 0.029281616,  0.000030518,  0.002243042,  0.000152588, -0.000045776, -0.001113892,  0.003173828, -0.018463135, 0.014801025, -0.133590698, -0.050354004, -0.866363525, 1.063217163,  0.271591187,  0.151596069,  0.021179199, 0.028533936, -0.000442505,  0.002120972,  0.000137329, -0.000045776, -0.001205444,  0.003051758, -0.019577026, 0.012115479, -0.137298584, -0.069168091, -0.890090942, 1.048156738,  0.246505737,  0.152069092,  0.016708374, 0.027725220, -0.000869751,  0.002014160,  0.000122070, -0.000061035, -0.001296997,  0.002883911, -0.020690918, 0.009231567, -0.140670776, -0.088775635, -0.913055420, 1.031936646,  0.221984863,  0.151962280,  0.012420654, 0.026840210, -0.001266479,  0.001907349,  0.000106812, -0.000061035, -0.001388550,  0.002700806, -0.021789551, 0.006134033, -0.143676758, -0.109161377, -0.935195923, 1.014617920,  0.198059082,  0.151306152,  0.008316040, 0.025909424, -0.001617432,  0.001785278,  0.000106812, -0.000076294, -0.001480103,  0.002487183, -0.022857666, 0.002822876, -0.146255493, -0.130310059, -0.956481934, 0.996246338,  0.174789429,  0.150115967,  0.004394531, 0.024932861, -0.001937866,  0.001693726,  0.000091553, -0.000076294, -0.001586914,  0.002227783, -0.023910522, -0.000686646, -0.148422241, -0.152206421, -0.976852417, 0.976852417,  0.152206421,  0.148422241,  0.000686646, 0.023910522, -0.002227783,  0.001586914,  0.000076294, -0.000091553, -0.001693726,  0.001937866, -0.024932861, -0.004394531, -0.150115967, -0.174789429, -0.996246338, 0.956481934,  0.130310059,  0.146255493, -0.002822876, 0.022857666, -0.002487183,  0.001480103,  0.000076294, -0.000106812, -0.001785278,  0.001617432, -0.025909424, -0.008316040, -0.151306152, -0.198059082, -1.014617920, 0.935195923,  0.109161377,  0.143676758, -0.006134033, 0.021789551, -0.002700806,  0.001388550,  0.000061035, -0.000106812, -0.001907349,  0.001266479, -0.026840210, -0.012420654, -0.151962280, -0.221984863, -1.031936646, 0.913055420,  0.088775635,  0.140670776, -0.009231567, 0.020690918, -0.002883911,  0.001296997,  0.000061035, -0.000122070, -0.002014160,  0.000869751, -0.027725220, -0.016708374, -0.152069092, -0.246505737, -1.048156738, 0.890090942,  0.069168091,  0.137298584, -0.012115479, 0.019577026, -0.003051758,  0.001205444,  0.000045776, -0.000137329, -0.002120972,  0.000442505, -0.028533936, -0.021179199, -0.151596069, -0.271591187, -1.063217163, 0.866363525,  0.050354004,  0.133590698, -0.014801025, 0.018463135, -0.003173828,  0.001113892,  0.000045776, -0.000152588, -0.002243042, -0.000030518, -0.029281616, -0.025817871, -0.150497437, -0.297210693, -1.077117920, 0.841949463,  0.032379150,  0.129562378, -0.017257690, 0.017349243, -0.003280640,  0.001037598,  0.000030518, -0.000167847, -0.002349854, -0.000549316, -0.029937744, -0.030609131, -0.148773193, -0.323318481, -1.089782715, 0.816864014,  0.015228271,  0.125259399, -0.019531250, 0.016235352, -0.003372192,  0.000961304,  0.000030518, -0.000198364, -0.002456665, -0.001098633, -0.030532837, -0.035552979, -0.146362305, -0.349868774, -1.101211548, 0.791213989, -0.001068115,  0.120697021, -0.021575928, 0.015121460, -0.003417969,  0.000885010,  0.000030518, -0.000213623, -0.002578735, -0.001693726, -0.031005859, -0.040634155, -0.143264771, -0.376800537, -1.111373901, 0.765029907, -0.016510010,  0.115921021, -0.023422241, 0.014022827, -0.003463745,  0.000808716,  0.000030518, -0.000244141, -0.002685547, -0.002334595, -0.031387329, -0.045837402, -0.139450073, -0.404083252, -1.120223999, 0.738372803, -0.031082153,  0.110946655, -0.025085449, 0.012939453, -0.003479004,  0.000747681,  0.000015259, -0.000259399, -0.002792358, -0.003005981, -0.031661987, -0.051132202, -0.134887695, -0.431655884, -1.127746582, 0.711318970, -0.044784546,  0.105819702, -0.026535034, 0.011886597, -0.003479004,  0.000686646,  0.000015259, -0.000289917, -0.002899170, -0.003723145, -0.031814575, -0.056533813, -0.129577637, -0.459472656, -1.133926392, 0.683914185, -0.057617188,  0.100540161, -0.027801514, 0.010848999, -0.003463745,  0.000625610,  0.000015259, -0.000320435, -0.002990723, -0.004486084, -0.031845093, -0.061996460, -0.123474121, -0.487472534, -1.138763428, 0.656219482, -0.069595337,  0.095169067, -0.028884888, 0.009841919, -0.003433228,  0.000579834,  0.000015259, -0.000366211, -0.003082275, -0.005294800, -0.031738281, -0.067520142, -0.116577148, -0.515609741, -1.142211914, 0.628295898, -0.080688477,  0.089706421, -0.029785156, 0.008865356, -0.003387451,  0.000534058,  0.000015259, -0.000396729, -0.003173828, -0.006118774, -0.031478882, -0.073059082, -0.108856201, -0.543823242, -1.144287109, 0.600219727, -0.090927124,  0.084182739, -0.030517578, 0.007919312, -0.003326416,  0.000473022,  0.000015259]);
		};
		SynthesisFilter.subArray = function(array, offs, len) {
			if (offs + len > array.length) {
				len = array.length - offs;
			}
			if (len < 0) len = 0;
			var subarray = new Float32Array(len);
			arraycopy(array, offs + 0, subarray, 0, len);
			return subarray;
		}
		SynthesisFilter.splitArray = function(array, blockSize) {
			var size = (array.length / blockSize) | 0;
			var split = new Array(size);
			for (var i = 0; i < size; i++) {
				split[i] = SynthesisFilter.subArray(array, i * blockSize, blockSize);
			}
			return split;
		};
		SynthesisFilter.prototype.setEQ = function(eq0) {
			this.eq = eq0;
			if (this.eq == null) {
				this.eq = new Float32Array(32);
				for (var i = 0; i < 32; i++)
					this.eq[i] = 1;
			}
			if (this.eq.length < 32) {
				throw new Error("IllegalArgumentException(eq0)");
			}
		};
		SynthesisFilter.prototype.reset = function() {
			for (var p = 0; p < 512; p++)
				this.v1[p] = this.v2[p] = 0.0;
			for (var p2 = 0; p2 < 32; p2++)
				this.samples[p2] = 0.0;
			this.actual_v = this.v1;
			this.actual_write_pos = 15;
		};
		SynthesisFilter.prototype.input_sample = function() {
		};
		SynthesisFilter.prototype.input_samples = function(s) {
			for (var i = 31; i >= 0; i--) {
				this.samples[i] = s[i] * this.eq[i];
			}
		};
		SynthesisFilter.prototype.compute_new_v = function() {
			var new_v0, new_v1, new_v2, new_v3, new_v4, new_v5, new_v6, new_v7, new_v8, new_v9;
			var new_v10, new_v11, new_v12, new_v13, new_v14, new_v15, new_v16, new_v17, new_v18, new_v19;
			var new_v20, new_v21, new_v22, new_v23, new_v24, new_v25, new_v26, new_v27, new_v28, new_v29;
			var new_v30, new_v31;
			new_v0 = new_v1 = new_v2 = new_v3 = new_v4 = new_v5 = new_v6 = new_v7 = new_v8 = new_v9 = new_v10 = new_v11 = new_v12 = new_v13 = new_v14 = new_v15 = new_v16 = new_v17 = new_v18 = new_v19 = new_v20 = new_v21 = new_v22 = new_v23 = new_v24 = new_v25 = new_v26 = new_v27 = new_v28 = new_v29 = new_v30 = new_v31 = 0.0;
			var s = this.samples;
			var s0 = s[0];
			var s1 = s[1];
			var s2 = s[2];
			var s3 = s[3];
			var s4 = s[4];
			var s5 = s[5];
			var s6 = s[6];
			var s7 = s[7];
			var s8 = s[8];
			var s9 = s[9];
			var s10 = s[10];
			var s11 = s[11];
			var s12 = s[12];
			var s13 = s[13];
			var s14 = s[14];
			var s15 = s[15];
			var s16 = s[16];
			var s17 = s[17];
			var s18 = s[18];
			var s19 = s[19];
			var s20 = s[20];
			var s21 = s[21];
			var s22 = s[22];
			var s23 = s[23];
			var s24 = s[24];
			var s25 = s[25];
			var s26 = s[26];
			var s27 = s[27];
			var s28 = s[28];
			var s29 = s[29];
			var s30 = s[30];
			var s31 = s[31];
			var p0 = s0 + s31;
			var p1 = s1 + s30;
			var p2 = s2 + s29;
			var p3 = s3 + s28;
			var p4 = s4 + s27;
			var p5 = s5 + s26;
			var p6 = s6 + s25;
			var p7 = s7 + s24;
			var p8 = s8 + s23;
			var p9 = s9 + s22;
			var p10 = s10 + s21;
			var p11 = s11 + s20;
			var p12 = s12 + s19;
			var p13 = s13 + s18;
			var p14 = s14 + s17;
			var p15 = s15 + s16;
			var pp0 = p0 + p15;
			var pp1 = p1 + p14;
			var pp2 = p2 + p13;
			var pp3 = p3 + p12;
			var pp4 = p4 + p11;
			var pp5 = p5 + p10;
			var pp6 = p6 + p9;
			var pp7 = p7 + p8;
			var pp8 = (p0 - p15) * SynthesisFilter.cos1_32;
			var pp9 = (p1 - p14) * SynthesisFilter.cos3_32;
			var pp10 = (p2 - p13) * SynthesisFilter.cos5_32;
			var pp11 = (p3 - p12) * SynthesisFilter.cos7_32;
			var pp12 = (p4 - p11) * SynthesisFilter.cos9_32;
			var pp13 = (p5 - p10) * SynthesisFilter.cos11_32;
			var pp14 = (p6 - p9) * SynthesisFilter.cos13_32;
			var pp15 = (p7 - p8) * SynthesisFilter.cos15_32;
			p0 = pp0 + pp7;
			p1 = pp1 + pp6;
			p2 = pp2 + pp5;
			p3 = pp3 + pp4;
			p4 = (pp0 - pp7) * SynthesisFilter.cos1_16;
			p5 = (pp1 - pp6) * SynthesisFilter.cos3_16;
			p6 = (pp2 - pp5) * SynthesisFilter.cos5_16;
			p7 = (pp3 - pp4) * SynthesisFilter.cos7_16;
			p8 = pp8 + pp15;
			p9 = pp9 + pp14;
			p10 = pp10 + pp13;
			p11 = pp11 + pp12;
			p12 = (pp8 - pp15) * SynthesisFilter.cos1_16;
			p13 = (pp9 - pp14) * SynthesisFilter.cos3_16;
			p14 = (pp10 - pp13) * SynthesisFilter.cos5_16;
			p15 = (pp11 - pp12) * SynthesisFilter.cos7_16;
			pp0 = p0 + p3;
			pp1 = p1 + p2;
			pp2 = (p0 - p3) * SynthesisFilter.cos1_8;
			pp3 = (p1 - p2) * SynthesisFilter.cos3_8;
			pp4 = p4 + p7;
			pp5 = p5 + p6;
			pp6 = (p4 - p7) * SynthesisFilter.cos1_8;
			pp7 = (p5 - p6) * SynthesisFilter.cos3_8;
			pp8 = p8 + p11;
			pp9 = p9 + p10;
			pp10 = (p8 - p11) * SynthesisFilter.cos1_8;
			pp11 = (p9 - p10) * SynthesisFilter.cos3_8;
			pp12 = p12 + p15;
			pp13 = p13 + p14;
			pp14 = (p12 - p15) * SynthesisFilter.cos1_8;
			pp15 = (p13 - p14) * SynthesisFilter.cos3_8;
			p0 = pp0 + pp1;
			p1 = (pp0 - pp1) * SynthesisFilter.cos1_4;
			p2 = pp2 + pp3;
			p3 = (pp2 - pp3) * SynthesisFilter.cos1_4;
			p4 = pp4 + pp5;
			p5 = (pp4 - pp5) * SynthesisFilter.cos1_4;
			p6 = pp6 + pp7;
			p7 = (pp6 - pp7) * SynthesisFilter.cos1_4;
			p8 = pp8 + pp9;
			p9 = (pp8 - pp9) * SynthesisFilter.cos1_4;
			p10 = pp10 + pp11;
			p11 = (pp10 - pp11) * SynthesisFilter.cos1_4;
			p12 = pp12 + pp13;
			p13 = (pp12 - pp13) * SynthesisFilter.cos1_4;
			p14 = pp14 + pp15;
			p15 = (pp14 - pp15) * SynthesisFilter.cos1_4;
			var tmp1;
			new_v19 = -(new_v4 = (new_v12 = p7) + p5) - p6;
			new_v27 = -p6 - p7 - p4;
			new_v6 = (new_v10 = (new_v14 = p15) + p11) + p13;
			new_v17 = -(new_v2 = p15 + p13 + p9) - p14;
			new_v21 = (tmp1 = -p14 - p15 - p10 - p11) - p13;
			new_v29 = -p14 - p15 - p12 - p8;
			new_v25 = tmp1 - p12;
			new_v31 = -p0;
			new_v0 = p1;
			new_v23 = -(new_v8 = p3) - p2;
			p0 = (s0 - s31) * SynthesisFilter.cos1_64;
			p1 = (s1 - s30) * SynthesisFilter.cos3_64;
			p2 = (s2 - s29) * SynthesisFilter.cos5_64;
			p3 = (s3 - s28) * SynthesisFilter.cos7_64;
			p4 = (s4 - s27) * SynthesisFilter.cos9_64;
			p5 = (s5 - s26) * SynthesisFilter.cos11_64;
			p6 = (s6 - s25) * SynthesisFilter.cos13_64;
			p7 = (s7 - s24) * SynthesisFilter.cos15_64;
			p8 = (s8 - s23) * SynthesisFilter.cos17_64;
			p9 = (s9 - s22) * SynthesisFilter.cos19_64;
			p10 = (s10 - s21) * SynthesisFilter.cos21_64;
			p11 = (s11 - s20) * SynthesisFilter.cos23_64;
			p12 = (s12 - s19) * SynthesisFilter.cos25_64;
			p13 = (s13 - s18) * SynthesisFilter.cos27_64;
			p14 = (s14 - s17) * SynthesisFilter.cos29_64;
			p15 = (s15 - s16) * SynthesisFilter.cos31_64;
			pp0 = p0 + p15;
			pp1 = p1 + p14;
			pp2 = p2 + p13;
			pp3 = p3 + p12;
			pp4 = p4 + p11;
			pp5 = p5 + p10;
			pp6 = p6 + p9;
			pp7 = p7 + p8;
			pp8 = (p0 - p15) * SynthesisFilter.cos1_32;
			pp9 = (p1 - p14) * SynthesisFilter.cos3_32;
			pp10 = (p2 - p13) * SynthesisFilter.cos5_32;
			pp11 = (p3 - p12) * SynthesisFilter.cos7_32;
			pp12 = (p4 - p11) * SynthesisFilter.cos9_32;
			pp13 = (p5 - p10) * SynthesisFilter.cos11_32;
			pp14 = (p6 - p9) * SynthesisFilter.cos13_32;
			pp15 = (p7 - p8) * SynthesisFilter.cos15_32;
			p0 = pp0 + pp7;
			p1 = pp1 + pp6;
			p2 = pp2 + pp5;
			p3 = pp3 + pp4;
			p4 = (pp0 - pp7) * SynthesisFilter.cos1_16;
			p5 = (pp1 - pp6) * SynthesisFilter.cos3_16;
			p6 = (pp2 - pp5) * SynthesisFilter.cos5_16;
			p7 = (pp3 - pp4) * SynthesisFilter.cos7_16;
			p8 = pp8 + pp15;
			p9 = pp9 + pp14;
			p10 = pp10 + pp13;
			p11 = pp11 + pp12;
			p12 = (pp8 - pp15) * SynthesisFilter.cos1_16;
			p13 = (pp9 - pp14) * SynthesisFilter.cos3_16;
			p14 = (pp10 - pp13) * SynthesisFilter.cos5_16;
			p15 = (pp11 - pp12) * SynthesisFilter.cos7_16;
			pp0 = p0 + p3;
			pp1 = p1 + p2;
			pp2 = (p0 - p3) * SynthesisFilter.cos1_8;
			pp3 = (p1 - p2) * SynthesisFilter.cos3_8;
			pp4 = p4 + p7;
			pp5 = p5 + p6;
			pp6 = (p4 - p7) * SynthesisFilter.cos1_8;
			pp7 = (p5 - p6) * SynthesisFilter.cos3_8;
			pp8 = p8 + p11;
			pp9 = p9 + p10;
			pp10 = (p8 - p11) * SynthesisFilter.cos1_8;
			pp11 = (p9 - p10) * SynthesisFilter.cos3_8;
			pp12 = p12 + p15;
			pp13 = p13 + p14;
			pp14 = (p12 - p15) * SynthesisFilter.cos1_8;
			pp15 = (p13 - p14) * SynthesisFilter.cos3_8;
			p0 = pp0 + pp1;
			p1 = (pp0 - pp1) * SynthesisFilter.cos1_4;
			p2 = pp2 + pp3;
			p3 = (pp2 - pp3) * SynthesisFilter.cos1_4;
			p4 = pp4 + pp5;
			p5 = (pp4 - pp5) * SynthesisFilter.cos1_4;
			p6 = pp6 + pp7;
			p7 = (pp6 - pp7) * SynthesisFilter.cos1_4;
			p8 = pp8 + pp9;
			p9 = (pp8 - pp9) * SynthesisFilter.cos1_4;
			p10 = pp10 + pp11;
			p11 = (pp10 - pp11) * SynthesisFilter.cos1_4;
			p12 = pp12 + pp13;
			p13 = (pp12 - pp13) * SynthesisFilter.cos1_4;
			p14 = pp14 + pp15;
			p15 = (pp14 - pp15) * SynthesisFilter.cos1_4;
			var tmp2;
			new_v5 = (new_v11 = (new_v13 = (new_v15 = p15) + p7) + p11) + p5 + p13;
			new_v7 = (new_v9 = p15 + p11 + p3) + p13;
			new_v16 = -(new_v1 = (tmp1 = p13 + p15 + p9) + p1) - p14;
			new_v18 = -(new_v3 = tmp1 + p5 + p7) - p6 - p14;
			new_v22 = (tmp1 = -p10 - p11 - p14 - p15) - p13 - p2 - p3;
			new_v20 = tmp1 - p13 - p5 - p6 - p7;
			new_v24 = tmp1 - p12 - p2 - p3;
			new_v26 = tmp1 - p12 - (tmp2 = p4 + p6 + p7);
			new_v30 = (tmp1 = -p8 - p12 - p14 - p15) - p0;
			new_v28 = tmp1 - tmp2;
			var dest = this.actual_v;
			var pos = this.actual_write_pos;
			dest[0 + pos] = new_v0;
			dest[16 + pos] = new_v1;
			dest[32 + pos] = new_v2;
			dest[48 + pos] = new_v3;
			dest[64 + pos] = new_v4;
			dest[80 + pos] = new_v5;
			dest[96 + pos] = new_v6;
			dest[112 + pos] = new_v7;
			dest[128 + pos] = new_v8;
			dest[144 + pos] = new_v9;
			dest[160 + pos] = new_v10;
			dest[176 + pos] = new_v11;
			dest[192 + pos] = new_v12;
			dest[208 + pos] = new_v13;
			dest[224 + pos] = new_v14;
			dest[240 + pos] = new_v15;
			dest[256 + pos] = 0.0;
			dest[272 + pos] = -new_v15;
			dest[288 + pos] = -new_v14;
			dest[304 + pos] = -new_v13;
			dest[320 + pos] = -new_v12;
			dest[336 + pos] = -new_v11;
			dest[352 + pos] = -new_v10;
			dest[368 + pos] = -new_v9;
			dest[384 + pos] = -new_v8;
			dest[400 + pos] = -new_v7;
			dest[416 + pos] = -new_v6;
			dest[432 + pos] = -new_v5;
			dest[448 + pos] = -new_v4;
			dest[464 + pos] = -new_v3;
			dest[480 + pos] = -new_v2;
			dest[496 + pos] = -new_v1;
			dest = (this.actual_v === this.v1) ? this.v2 : this.v1;
			dest[0 + pos] = -new_v0;
			dest[16 + pos] = new_v16;
			dest[32 + pos] = new_v17;
			dest[48 + pos] = new_v18;
			dest[64 + pos] = new_v19;
			dest[80 + pos] = new_v20;
			dest[96 + pos] = new_v21;
			dest[112 + pos] = new_v22;
			dest[128 + pos] = new_v23;
			dest[144 + pos] = new_v24;
			dest[160 + pos] = new_v25;
			dest[176 + pos] = new_v26;
			dest[192 + pos] = new_v27;
			dest[208 + pos] = new_v28;
			dest[224 + pos] = new_v29;
			dest[240 + pos] = new_v30;
			dest[256 + pos] = new_v31;
			dest[272 + pos] = new_v30;
			dest[288 + pos] = new_v29;
			dest[304 + pos] = new_v28;
			dest[320 + pos] = new_v27;
			dest[336 + pos] = new_v26;
			dest[352 + pos] = new_v25;
			dest[368 + pos] = new_v24;
			dest[384 + pos] = new_v23;
			dest[400 + pos] = new_v22;
			dest[416 + pos] = new_v21;
			dest[432 + pos] = new_v20;
			dest[448 + pos] = new_v19;
			dest[464 + pos] = new_v18;
			dest[480 + pos] = new_v17;
			dest[496 + pos] = new_v16;
		};
		SynthesisFilter.prototype.compute_pcm_samples0 = function(buffer) {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var pcm_sample;
				var dp = SynthesisFilter.d16[i];
				pcm_sample = ((vp[0 + dvp] * dp[0]) + (vp[15 + dvp] * dp[1]) + (vp[14 + dvp] * dp[2]) + (vp[13 + dvp] * dp[3]) + (vp[12 + dvp] * dp[4]) + (vp[11 + dvp] * dp[5]) + (vp[10 + dvp] * dp[6]) + (vp[9 + dvp] * dp[7]) + (vp[8 + dvp] * dp[8]) + (vp[7 + dvp] * dp[9]) + (vp[6 + dvp] * dp[10]) + (vp[5 + dvp] * dp[11]) + (vp[4 + dvp] * dp[12]) + (vp[3 + dvp] * dp[13]) + (vp[2 + dvp] * dp[14]) + (vp[1 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples1 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[1 + dvp] * dp[0]) + (vp[0 + dvp] * dp[1]) + (vp[15 + dvp] * dp[2]) + (vp[14 + dvp] * dp[3]) + (vp[13 + dvp] * dp[4]) + (vp[12 + dvp] * dp[5]) + (vp[11 + dvp] * dp[6]) + (vp[10 + dvp] * dp[7]) + (vp[9 + dvp] * dp[8]) + (vp[8 + dvp] * dp[9]) + (vp[7 + dvp] * dp[10]) + (vp[6 + dvp] * dp[11]) + (vp[5 + dvp] * dp[12]) + (vp[4 + dvp] * dp[13]) + (vp[3 + dvp] * dp[14]) + (vp[2 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples2 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[2 + dvp] * dp[0]) + (vp[1 + dvp] * dp[1]) + (vp[0 + dvp] * dp[2]) + (vp[15 + dvp] * dp[3]) + (vp[14 + dvp] * dp[4]) + (vp[13 + dvp] * dp[5]) + (vp[12 + dvp] * dp[6]) + (vp[11 + dvp] * dp[7]) + (vp[10 + dvp] * dp[8]) + (vp[9 + dvp] * dp[9]) + (vp[8 + dvp] * dp[10]) + (vp[7 + dvp] * dp[11]) + (vp[6 + dvp] * dp[12]) + (vp[5 + dvp] * dp[13]) + (vp[4 + dvp] * dp[14]) + (vp[3 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples3 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[3 + dvp] * dp[0]) + (vp[2 + dvp] * dp[1]) + (vp[1 + dvp] * dp[2]) + (vp[0 + dvp] * dp[3]) + (vp[15 + dvp] * dp[4]) + (vp[14 + dvp] * dp[5]) + (vp[13 + dvp] * dp[6]) + (vp[12 + dvp] * dp[7]) + (vp[11 + dvp] * dp[8]) + (vp[10 + dvp] * dp[9]) + (vp[9 + dvp] * dp[10]) + (vp[8 + dvp] * dp[11]) + (vp[7 + dvp] * dp[12]) + (vp[6 + dvp] * dp[13]) + (vp[5 + dvp] * dp[14]) + (vp[4 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples4 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[4 + dvp] * dp[0]) + (vp[3 + dvp] * dp[1]) + (vp[2 + dvp] * dp[2]) + (vp[1 + dvp] * dp[3]) + (vp[0 + dvp] * dp[4]) + (vp[15 + dvp] * dp[5]) + (vp[14 + dvp] * dp[6]) + (vp[13 + dvp] * dp[7]) + (vp[12 + dvp] * dp[8]) + (vp[11 + dvp] * dp[9]) + (vp[10 + dvp] * dp[10]) + (vp[9 + dvp] * dp[11]) + (vp[8 + dvp] * dp[12]) + (vp[7 + dvp] * dp[13]) + (vp[6 + dvp] * dp[14]) + (vp[5 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples5 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[5 + dvp] * dp[0]) + (vp[4 + dvp] * dp[1]) + (vp[3 + dvp] * dp[2]) + (vp[2 + dvp] * dp[3]) + (vp[1 + dvp] * dp[4]) + (vp[0 + dvp] * dp[5]) + (vp[15 + dvp] * dp[6]) + (vp[14 + dvp] * dp[7]) + (vp[13 + dvp] * dp[8]) + (vp[12 + dvp] * dp[9]) + (vp[11 + dvp] * dp[10]) + (vp[10 + dvp] * dp[11]) + (vp[9 + dvp] * dp[12]) + (vp[8 + dvp] * dp[13]) + (vp[7 + dvp] * dp[14]) + (vp[6 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples6 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[6 + dvp] * dp[0]) + (vp[5 + dvp] * dp[1]) + (vp[4 + dvp] * dp[2]) + (vp[3 + dvp] * dp[3]) + (vp[2 + dvp] * dp[4]) + (vp[1 + dvp] * dp[5]) + (vp[0 + dvp] * dp[6]) + (vp[15 + dvp] * dp[7]) + (vp[14 + dvp] * dp[8]) + (vp[13 + dvp] * dp[9]) + (vp[12 + dvp] * dp[10]) + (vp[11 + dvp] * dp[11]) + (vp[10 + dvp] * dp[12]) + (vp[9 + dvp] * dp[13]) + (vp[8 + dvp] * dp[14]) + (vp[7 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples7 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[7 + dvp] * dp[0]) + (vp[6 + dvp] * dp[1]) + (vp[5 + dvp] * dp[2]) + (vp[4 + dvp] * dp[3]) + (vp[3 + dvp] * dp[4]) + (vp[2 + dvp] * dp[5]) + (vp[1 + dvp] * dp[6]) + (vp[0 + dvp] * dp[7]) + (vp[15 + dvp] * dp[8]) + (vp[14 + dvp] * dp[9]) + (vp[13 + dvp] * dp[10]) + (vp[12 + dvp] * dp[11]) + (vp[11 + dvp] * dp[12]) + (vp[10 + dvp] * dp[13]) + (vp[9 + dvp] * dp[14]) + (vp[8 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples8 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[8 + dvp] * dp[0]) + (vp[7 + dvp] * dp[1]) + (vp[6 + dvp] * dp[2]) + (vp[5 + dvp] * dp[3]) + (vp[4 + dvp] * dp[4]) + (vp[3 + dvp] * dp[5]) + (vp[2 + dvp] * dp[6]) + (vp[1 + dvp] * dp[7]) + (vp[0 + dvp] * dp[8]) + (vp[15 + dvp] * dp[9]) + (vp[14 + dvp] * dp[10]) + (vp[13 + dvp] * dp[11]) + (vp[12 + dvp] * dp[12]) + (vp[11 + dvp] * dp[13]) + (vp[10 + dvp] * dp[14]) + (vp[9 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples9 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[9 + dvp] * dp[0]) +(vp[8 + dvp] * dp[1]) +(vp[7 + dvp] * dp[2]) +(vp[6 + dvp] * dp[3]) +(vp[5 + dvp] * dp[4]) +(vp[4 + dvp] * dp[5]) +(vp[3 + dvp] * dp[6]) +(vp[2 + dvp] * dp[7]) +(vp[1 + dvp] * dp[8]) +(vp[0 + dvp] * dp[9]) +(vp[15 + dvp] * dp[10]) +(vp[14 + dvp] * dp[11]) +(vp[13 + dvp] * dp[12]) +(vp[12 + dvp] * dp[13]) +(vp[11 + dvp] * dp[14]) +(vp[10 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples10 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[10 + dvp] * dp[0]) + (vp[9 + dvp] * dp[1]) + (vp[8 + dvp] * dp[2]) + (vp[7 + dvp] * dp[3]) + (vp[6 + dvp] * dp[4]) + (vp[5 + dvp] * dp[5]) + (vp[4 + dvp] * dp[6]) + (vp[3 + dvp] * dp[7]) + (vp[2 + dvp] * dp[8]) + (vp[1 + dvp] * dp[9]) + (vp[0 + dvp] * dp[10]) + (vp[15 + dvp] * dp[11]) + (vp[14 + dvp] * dp[12]) + (vp[13 + dvp] * dp[13]) + (vp[12 + dvp] * dp[14]) + (vp[11 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples11 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[11 + dvp] * dp[0]) + (vp[10 + dvp] * dp[1]) + (vp[9 + dvp] * dp[2]) + (vp[8 + dvp] * dp[3]) + (vp[7 + dvp] * dp[4]) + (vp[6 + dvp] * dp[5]) + (vp[5 + dvp] * dp[6]) + (vp[4 + dvp] * dp[7]) + (vp[3 + dvp] * dp[8]) + (vp[2 + dvp] * dp[9]) + (vp[1 + dvp] * dp[10]) + (vp[0 + dvp] * dp[11]) + (vp[15 + dvp] * dp[12]) + (vp[14 + dvp] * dp[13]) + (vp[13 + dvp] * dp[14]) + (vp[12 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples12 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[12 + dvp] * dp[0]) + (vp[11 + dvp] * dp[1]) + (vp[10 + dvp] * dp[2]) + (vp[9 + dvp] * dp[3]) + (vp[8 + dvp] * dp[4]) + (vp[7 + dvp] * dp[5]) + (vp[6 + dvp] * dp[6]) + (vp[5 + dvp] * dp[7]) + (vp[4 + dvp] * dp[8]) + (vp[3 + dvp] * dp[9]) + (vp[2 + dvp] * dp[10]) + (vp[1 + dvp] * dp[11]) + (vp[0 + dvp] * dp[12]) + (vp[15 + dvp] * dp[13]) + (vp[14 + dvp] * dp[14]) + (vp[13 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples13 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[13 + dvp] * dp[0]) + (vp[12 + dvp] * dp[1]) + (vp[11 + dvp] * dp[2]) + (vp[10 + dvp] * dp[3]) + (vp[9 + dvp] * dp[4]) + (vp[8 + dvp] * dp[5]) + (vp[7 + dvp] * dp[6]) + (vp[6 + dvp] * dp[7]) + (vp[5 + dvp] * dp[8]) + (vp[4 + dvp] * dp[9]) + (vp[3 + dvp] * dp[10]) + (vp[2 + dvp] * dp[11]) + (vp[1 + dvp] * dp[12]) + (vp[0 + dvp] * dp[13]) + (vp[15 + dvp] * dp[14]) + (vp[14 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples14 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var dp = SynthesisFilter.d16[i];
				var pcm_sample;
				pcm_sample = ((vp[14 + dvp] * dp[0]) + (vp[13 + dvp] * dp[1]) + (vp[12 + dvp] * dp[2]) + (vp[11 + dvp] * dp[3]) + (vp[10 + dvp] * dp[4]) + (vp[9 + dvp] * dp[5]) + (vp[8 + dvp] * dp[6]) + (vp[7 + dvp] * dp[7]) + (vp[6 + dvp] * dp[8]) + (vp[5 + dvp] * dp[9]) + (vp[4 + dvp] * dp[10]) + (vp[3 + dvp] * dp[11]) + (vp[2 + dvp] * dp[12]) + (vp[1 + dvp] * dp[13]) + (vp[0 + dvp] * dp[14]) + (vp[15 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples15 = function() {
			var vp = this.actual_v;
			var tmpOut = this._tmpOut;
			var dvp = 0;
			for (var i = 0; i < 32; i++) {
				var pcm_sample;
				var dp = SynthesisFilter.d16[i];
				pcm_sample = ((vp[15 + dvp] * dp[0]) + (vp[14 + dvp] * dp[1]) + (vp[13 + dvp] * dp[2]) + (vp[12 + dvp] * dp[3]) + (vp[11 + dvp] * dp[4]) + (vp[10 + dvp] * dp[5]) + (vp[9 + dvp] * dp[6]) + (vp[8 + dvp] * dp[7]) + (vp[7 + dvp] * dp[8]) + (vp[6 + dvp] * dp[9]) + (vp[5 + dvp] * dp[10]) + (vp[4 + dvp] * dp[11]) + (vp[3 + dvp] * dp[12]) + (vp[2 + dvp] * dp[13]) + (vp[1 + dvp] * dp[14]) + (vp[0 + dvp] * dp[15])) * this.scalefactor;
				tmpOut[i] = pcm_sample;
				dvp += 16;
			}
		};
		SynthesisFilter.prototype.compute_pcm_samples = function(buffer) {
			switch (this.actual_write_pos) {
				case 0:
					this.compute_pcm_samples0(buffer);
					break;
				case 1:
					this.compute_pcm_samples1(buffer);
					break;
				case 2:
					this.compute_pcm_samples2(buffer);
					break;
				case 3:
					this.compute_pcm_samples3(buffer);
					break;
				case 4:
					this.compute_pcm_samples4(buffer);
					break;
				case 5:
					this.compute_pcm_samples5(buffer);
					break;
				case 6:
					this.compute_pcm_samples6(buffer);
					break;
				case 7:
					this.compute_pcm_samples7(buffer);
					break;
				case 8:
					this.compute_pcm_samples8(buffer);
					break;
				case 9:
					this.compute_pcm_samples9(buffer);
					break;
				case 10:
					this.compute_pcm_samples10(buffer);
					break;
				case 11:
					this.compute_pcm_samples11(buffer);
					break;
				case 12:
					this.compute_pcm_samples12(buffer);
					break;
				case 13:
					this.compute_pcm_samples13(buffer);
					break;
				case 14:
					this.compute_pcm_samples14(buffer);
					break;
				case 15:
					this.compute_pcm_samples15(buffer);
					break;
			}
			if (buffer != null) {
				buffer.appendSamples(this.channel, this._tmpOut);
			}
		};
		SynthesisFilter.prototype.calculate_pcm_samples = function(buffer) {
			this.compute_new_v();
			this.compute_pcm_samples(buffer);
			this.actual_write_pos = (this.actual_write_pos + 1) & 0xf;
			this.actual_v = (this.actual_v === this.v1) ? this.v2 : this.v1;
			for (var p = 0; p < 32; p++)
				this.samples[p] = 0.0;
		};
		SynthesisFilter.MY_PI = 3.14159265358979323846;
		SynthesisFilter.cos1_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI / 64.0)));
		SynthesisFilter.cos3_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 3.0 / 64.0)));
		SynthesisFilter.cos5_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 5.0 / 64.0)));
		SynthesisFilter.cos7_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 7.0 / 64.0)));
		SynthesisFilter.cos9_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 9.0 / 64.0)));
		SynthesisFilter.cos11_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 11.0 / 64.0)));
		SynthesisFilter.cos13_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 13.0 / 64.0)));
		SynthesisFilter.cos15_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 15.0 / 64.0)));
		SynthesisFilter.cos17_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 17.0 / 64.0)));
		SynthesisFilter.cos19_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 19.0 / 64.0)));
		SynthesisFilter.cos21_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 21.0 / 64.0)));
		SynthesisFilter.cos23_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 23.0 / 64.0)));
		SynthesisFilter.cos25_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 25.0 / 64.0)));
		SynthesisFilter.cos27_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 27.0 / 64.0)));
		SynthesisFilter.cos29_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 29.0 / 64.0)));
		SynthesisFilter.cos31_64 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 31.0 / 64.0)));
		SynthesisFilter.cos1_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI/ 32.0)));
		SynthesisFilter.cos3_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI* 3.0 / 32.0)));
		SynthesisFilter.cos5_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI* 5.0 / 32.0)));
		SynthesisFilter.cos7_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI* 7.0 / 32.0)));
		SynthesisFilter.cos9_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI* 9.0 / 32.0)));
		SynthesisFilter.cos11_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 11.0 / 32.0)));
		SynthesisFilter.cos13_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 13.0 / 32.0)));
		SynthesisFilter.cos15_32 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 15.0 / 32.0)));
		SynthesisFilter.cos1_16 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI / 16.0)));
		SynthesisFilter.cos3_16 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 3.0 / 16.0)));
		SynthesisFilter.cos5_16 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 5.0 / 16.0)));
		SynthesisFilter.cos7_16 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 7.0 / 16.0)));
		SynthesisFilter.cos1_8 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI / 8.0)));
		SynthesisFilter.cos3_8 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI * 3.0 / 8.0)));
		SynthesisFilter.cos1_4 = (1.0 / (2.0 * Math.cos(SynthesisFilter.MY_PI / 4.0)));
		const gr_info_s = function() {
			this.part2_3_length = 0;
			this.big_values = 0;
			this.global_gain = 0;
			this.scalefac_compress = 0;
			this.window_switching_flag = 0;
			this.block_type = 0;
			this.mixed_block_flag = 0;
			this.table_select = new Int32Array(3);
			this.subblock_gain = new Int32Array(3);
			this.region0_count = 0;
			this.region1_count = 0;
			this.preflag = 0;
			this.scalefac_scale = 0;
			this.count1table_select = 0;
		}
		const temporaire = function() {
			this.scfsi = new Int32Array(4);
			this.gr = [new gr_info_s(), new gr_info_s()];
		}
		const temporaire2 = function() {
			this.l = new Int32Array(23);
			this.s = [new Int32Array(13), new Int32Array(13), new Int32Array(13)];
		}
		const III_side_info_t = function() {
			this.main_data_begin = 0;
			this.private_bits = 0;
			this.ch = [new temporaire(), new temporaire()];
		}
		const SBI = function(thel, thes) {
			this.l = thel;
			this.s = thes;
		}
		const Sftable = function(thel, thes) {
			this.l = thel;
			this.s = thes;
		}
		const MP3Layer3 = function(stream0, header0, filtera, filterb, buffer0, which_ch0) {
			huffcodetab.initHuff();

			this.checkSumHuff = 0;

			this.is_1d = new Int32Array(MP3Layer3.SBLIMIT * MP3Layer3.SSLIMIT + 4);
			this.ro = new Array(2);
			this.lr = new Array(2);
			this.prevblck = new Array(2);
			this.k = new Array(2);
			for (var i = 0; i < 2; i++) {
				this.ro[i] = new Array(MP3Layer3.SBLIMIT);
				this.lr[i] = new Array(MP3Layer3.SBLIMIT);
				this.prevblck[i] = new Float32Array(MP3Layer3.SBLIMIT * MP3Layer3.SSLIMIT);
				this.k[i] = new Float32Array(MP3Layer3.SBLIMIT * MP3Layer3.SSLIMIT);
				for (var j = 0; j < MP3Layer3.SBLIMIT; j++) {
					this.ro[i][j] = new Float32Array(MP3Layer3.SSLIMIT);
					this.lr[i][j] = new Float32Array(MP3Layer3.SSLIMIT);
				}
			}
			this.out_1d = new Float32Array(MP3Layer3.SBLIMIT * MP3Layer3.SSLIMIT);
			this.nonzero = new Int32Array(2);

			this.III_scalefac_t = new Array(2);
			this.III_scalefac_t[0] = new temporaire2();
			this.III_scalefac_t[1] = new temporaire2();
			this.scalefac = this.III_scalefac_t;

			MP3Layer3.sfBandIndex = new Array(9);
			var l0 = [0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576];
			var s0 = [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192];
			var l1 = [0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 114, 136, 162, 194, 232, 278, 330, 394, 464, 540, 576];
			var s1 = [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192];
			var l2 = [0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576];
			var s2 = [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192];

			var l3 = [0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 52, 62, 74, 90, 110, 134, 162, 196, 238, 288, 342, 418, 576];
			var s3 = [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192];
			var l4 = [0, 4, 8, 12, 16, 20, 24, 30, 36, 42, 50, 60, 72, 88, 106, 128, 156, 190, 230, 276, 330, 384, 576];
			var s4 = [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192];
			var l5 = [0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 54, 66, 82, 102, 126, 156, 194, 240, 296, 364, 448, 550, 576];
			var s5 = [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192];

			var l6 = [0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576];
			var s6 = [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192];
			var l7 = [0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576];
			var s7 = [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192];
			var l8 = [0, 12, 24, 36, 48, 60, 72, 88, 108, 132, 160, 192, 232, 280, 336, 400, 476, 566, 568, 570, 572, 574, 576];
			var s8 = [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192];

			MP3Layer3.sfBandIndex[0] = new SBI(l0, s0);
			MP3Layer3.sfBandIndex[1] = new SBI(l1, s1);
			MP3Layer3.sfBandIndex[2] = new SBI(l2, s2);

			MP3Layer3.sfBandIndex[3] = new SBI(l3, s3);
			MP3Layer3.sfBandIndex[4] = new SBI(l4, s4);
			MP3Layer3.sfBandIndex[5] = new SBI(l5, s5);
			// SZD: MPEG2.5
			MP3Layer3.sfBandIndex[6] = new SBI(l6, s6);
			MP3Layer3.sfBandIndex[7] = new SBI(l7, s7);
			MP3Layer3.sfBandIndex[8] = new SBI(l8, s8);

			if (MP3Layer3.reorder_table == null) { // SZD: generate LUT
				MP3Layer3.reorder_table = new Array(9);
				for (var i = 0; i < 9; i++)
					MP3Layer3.reorder_table[i] = MP3Layer3.reorder(MP3Layer3.sfBandIndex[i].s);
			}

			var ll0 = [0, 6, 11, 16, 21];
			var ss0 = [0, 6, 12];
			this.sftable = new Sftable(ll0, ss0);

			this.scalefac_buffer = new Int32Array(54);

			this.stream = stream0;
			this.header = header0;
			this.filter1 = filtera;
			this.filter2 = filterb;
			this.buffer = buffer0;
			this.which_channels = which_ch0;

			this.first_channel = 0;
			this.last_channel = 0;

			this.frame_start = 0;
			this.channels = (this.header.mode() == MP3Header.SINGLE_CHANNEL) ? 1 : 2;
			this.max_gr = (this.header.version() == MP3Header.MPEG1) ? 2 : 1;
			this.sfreq = (this.header.sample_frequency() + ((this.header.version() == MP3Header.MPEG1) ? 3 : (this.header.version() == MP3Header.MPEG25_LSF) ? 6 : 0)) | 0;
			
			if (this.channels == 2) {
				this.first_channel = 0;
				this.last_channel = 1;
			} else {
				this.first_channel = this.last_channel = 0;
			}

			this.part2_start = 0;

			for (var ch = 0; ch < 2; ch++)
				for (var j = 0; j < 576; j++)
					this.prevblck[ch][j] = 0.0;

			this.nonzero[0] = this.nonzero[1] = 576;

			this.br = new BitReserve();
			this.si = new III_side_info_t();

			this.samples1 = new Float32Array(32);
			this.samples2 = new Float32Array(32);

			this.new_slen = new Int32Array(4);
		}
		MP3Layer3.reorder_table = null;
		MP3Layer3.reorder = function(scalefac_band) {
			var j = 0;
			var ix = new Int32Array(576);
			for (var sfb = 0; sfb < 13; sfb++) {
				var start = scalefac_band[sfb];
				var end = scalefac_band[sfb + 1];
				for (var _window = 0; _window < 3; _window++)
					for (var i = start; i < end; i++)
						ix[3 * i + _window] = j++;
			}
			return ix;
		}
		MP3Layer3.SSLIMIT = 18;
		MP3Layer3.SBLIMIT = 32;
		MP3Layer3.slen = [
			[0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
			[0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3],
		];
		MP3Layer3.pretab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
		MP3Layer3.d43 = 4 / 3;
		MP3Layer3.t_43 = (function() {
			var t43 = new Float32Array(8192);
			var d43 = (4.0 / 3.0);
			for (var i = 0; i < 8192; i++) {
				t43[i] = Math.pow(i, d43);
			}
			return t43;
		}());
		MP3Layer3.prototype.decodeFrame = function() {
			this.decode();
		}
		MP3Layer3.prototype.decode = function() {
			var br = this.br;
			var out_1d = this.out_1d;
			var nSlots = this.header.slots();
			var flush_main = 0;
			var gr = 0, ch = 0, ss = 0, sb = 0, sb18 = 0;
			var main_data_end = 0;
			var bytes_to_discard = 0;
			var i = 0;
			if (this.header.crc() == 0) {
				this.stream.get_bits(16);
			}
			this.get_side_info();
			for (i = 0; i < nSlots; i++) this.br.hputbuf(this.stream.get_bits(8));
			main_data_end = this.br.hsstell() >>> 3;
			if ((flush_main = (this.br.hsstell() & 7)) != 0) {
				this.br.hgetbits(8 - flush_main);
				main_data_end++;
			}
			bytes_to_discard = this.frame_start - main_data_end - this.si.main_data_begin;
			this.frame_start += nSlots;
			if (bytes_to_discard < 0) {
				return;
			}
			if (main_data_end > 4096) {
				this.frame_start -= 4096;
				this.br.rewindNbytes(4096);
			}
			for (; bytes_to_discard > 0; bytes_to_discard--) br.hgetbits(8);
			for (gr = 0; gr < this.max_gr; gr++) {
				for (ch = 0; ch < this.channels; ch++) {
					this.part2_start = br.hsstell();
					if (this.header.version() == MP3Header.MPEG1) this.get_scale_factors(ch, gr);
					else this.get_LSF_scale_factors(ch, gr);
					this.huffman_decode(ch, gr);
					this.dequantize_sample(this.ro[ch], ch, gr);
				}
				this.stereo(gr);
				for (ch = this.first_channel; ch <= this.last_channel; ch++) {
					this.reorder(this.lr[ch], ch, gr);
					this.antialias(ch, gr);
					this.hybrid(ch, gr);
					for (sb18 = 18; sb18 < 576; sb18 += 36)
						for (ss = 1; ss < MP3Layer3.SSLIMIT; ss += 2)
							out_1d[sb18 + ss] = -out_1d[sb18 + ss];
					if (ch == 0) {
						for (ss = 0; ss < MP3Layer3.SSLIMIT; ss++) {
							sb = 0;
							for (sb18 = 0; sb18 < 576; sb18 += 18) {
								this.samples1[sb] = out_1d[sb18 + ss];
								sb++;
							}
							this.filter1.input_samples(this.samples1);
							this.filter1.calculate_pcm_samples(this.buffer);
						}
					} else {
						for (ss = 0; ss < MP3Layer3.SSLIMIT; ss++) {
							sb = 0;
							for (sb18 = 0; sb18 < 576; sb18 += 18) {
								this.samples2[sb] = out_1d[sb18 + ss];
								sb++;
							}
							this.filter2.input_samples(this.samples2);
							this.filter2.calculate_pcm_samples(this.buffer);
						}
					}
				}
			}
		}
		MP3Layer3.prototype.get_side_info = function() {
			var channels = this.channels;
			var si = this.si;
			var stream = this.stream;
			var ch = 0, gr = 0;
			if (this.header.version() == MP3Header.MPEG1) {
				si.main_data_begin = stream.get_bits(9);
				if (channels == 1) si.private_bits = stream.get_bits(5);
				else si.private_bits = stream.get_bits(3);
				for (ch = 0; ch < channels; ch++) {
					si.ch[ch].scfsi[0] = stream.get_bits(1);
					si.ch[ch].scfsi[1] = stream.get_bits(1);
					si.ch[ch].scfsi[2] = stream.get_bits(1);
					si.ch[ch].scfsi[3] = stream.get_bits(1);
				}
				for (gr = 0; gr < 2; gr++) {
					for (ch = 0; ch < channels; ch++) {
						si.ch[ch].gr[gr].part2_3_length = stream.get_bits(12);
						si.ch[ch].gr[gr].big_values = stream.get_bits(9);
						si.ch[ch].gr[gr].global_gain = stream.get_bits(8);
						si.ch[ch].gr[gr].scalefac_compress = stream.get_bits(4);
						si.ch[ch].gr[gr].window_switching_flag = stream.get_bits(1);
						if ((si.ch[ch].gr[gr].window_switching_flag) != 0) {
							si.ch[ch].gr[gr].block_type = stream.get_bits(2);
							si.ch[ch].gr[gr].mixed_block_flag = stream.get_bits(1);
							si.ch[ch].gr[gr].table_select[0] = stream.get_bits(5);
							si.ch[ch].gr[gr].table_select[1] = stream.get_bits(5);
							si.ch[ch].gr[gr].subblock_gain[0] = stream.get_bits(3);
							si.ch[ch].gr[gr].subblock_gain[1] = stream.get_bits(3);
							si.ch[ch].gr[gr].subblock_gain[2] = stream.get_bits(3);
							if (si.ch[ch].gr[gr].block_type == 0) {
								return false;
							} else if (si.ch[ch].gr[gr].block_type == 2 && si.ch[ch].gr[gr].mixed_block_flag == 0) {
								si.ch[ch].gr[gr].region0_count = 8;
							} else {
								si.ch[ch].gr[gr].region0_count = 7;
							}
							si.ch[ch].gr[gr].region1_count = 20 - si.ch[ch].gr[gr].region0_count;
						} else {
							si.ch[ch].gr[gr].table_select[0] = stream.get_bits(5);
							si.ch[ch].gr[gr].table_select[1] = stream.get_bits(5);
							si.ch[ch].gr[gr].table_select[2] = stream.get_bits(5);
							si.ch[ch].gr[gr].region0_count = stream.get_bits(4);
							si.ch[ch].gr[gr].region1_count = stream.get_bits(3);
							si.ch[ch].gr[gr].block_type = 0;
						}
						si.ch[ch].gr[gr].preflag = stream.get_bits(1);
						si.ch[ch].gr[gr].scalefac_scale = stream.get_bits(1);
						si.ch[ch].gr[gr].count1table_select = stream.get_bits(1);
					}
				}
			} else {
				si.main_data_begin = stream.get_bits(8);
				if (channels == 1) si.private_bits = stream.get_bits(1);
				else si.private_bits = stream.get_bits(2);
				for (ch = 0; ch < channels; ch++) {
					si.ch[ch].gr[0].part2_3_length = stream.get_bits(12);
					si.ch[ch].gr[0].big_values = stream.get_bits(9);
					si.ch[ch].gr[0].global_gain = stream.get_bits(8);
					si.ch[ch].gr[0].scalefac_compress = stream.get_bits(9);
					si.ch[ch].gr[0].window_switching_flag = stream.get_bits(1);
					if ((si.ch[ch].gr[0].window_switching_flag) != 0) {
						si.ch[ch].gr[0].block_type = stream.get_bits(2);
						si.ch[ch].gr[0].mixed_block_flag = stream.get_bits(1);
						si.ch[ch].gr[0].table_select[0] = stream.get_bits(5);
						si.ch[ch].gr[0].table_select[1] = stream.get_bits(5);
						si.ch[ch].gr[0].subblock_gain[0] = stream.get_bits(3);
						si.ch[ch].gr[0].subblock_gain[1] = stream.get_bits(3);
						si.ch[ch].gr[0].subblock_gain[2] = stream.get_bits(3);
						if (si.ch[ch].gr[0].block_type == 0) {
							return false;
						} else if (si.ch[ch].gr[0].block_type == 2 && si.ch[ch].gr[0].mixed_block_flag == 0) {
							si.ch[ch].gr[0].region0_count = 8;
						} else {
							si.ch[ch].gr[0].region0_count = 7;
							si.ch[ch].gr[0].region1_count = 20 - si.ch[ch].gr[0].region0_count;
						}
					} else {
						si.ch[ch].gr[0].table_select[0] = stream.get_bits(5);
						si.ch[ch].gr[0].table_select[1] = stream.get_bits(5);
						si.ch[ch].gr[0].table_select[2] = stream.get_bits(5);
						si.ch[ch].gr[0].region0_count = stream.get_bits(4);
						si.ch[ch].gr[0].region1_count = stream.get_bits(3);
						si.ch[ch].gr[0].block_type = 0;
					}
					si.ch[ch].gr[0].scalefac_scale = stream.get_bits(1);
					si.ch[ch].gr[0].count1table_select = stream.get_bits(1);
				}
			}
			return true;
		}
		MP3Layer3.prototype.get_scale_factors = function(ch, gr) {
			var scalefac = this.scalefac;
			var br = this.br;
			var si = this.si;
			var sfb = 0, _window = 0;
			var gr_info = (si.ch[ch].gr[gr]);
			var scale_comp = gr_info.scalefac_compress;
			var length0 = MP3Layer3.slen[0][scale_comp];
			var length1 = MP3Layer3.slen[1][scale_comp];
			if ((gr_info.window_switching_flag != 0) && (gr_info.block_type == 2)) {
				if ((gr_info.mixed_block_flag) != 0) {
					for (sfb = 0; sfb < 8; sfb++)
						this.scalefac[ch].l[sfb] = br.hgetbits(MP3Layer3.slen[0][gr_info.scalefac_compress]);
					for (sfb = 3; sfb < 6; sfb++)
						for (_window = 0; _window < 3; _window++)
							this.scalefac[ch].s[_window][sfb] = br.hgetbits(MP3Layer3.slen[0][gr_info.scalefac_compress]);
					for (sfb = 6; sfb < 12; sfb++)
						for (_window = 0; _window < 3; _window++)
							this.scalefac[ch].s[_window][sfb] = br.hgetbits(MP3Layer3.slen[1][gr_info.scalefac_compress]);
					for (sfb = 12, _window = 0; _window < 3; _window++)
						this.scalefac[ch].s[_window][sfb] = 0;
				} else {
					scalefac[ch].s[0][0] = br.hgetbits(length0);
					scalefac[ch].s[1][0] = br.hgetbits(length0);
					scalefac[ch].s[2][0] = br.hgetbits(length0);
					scalefac[ch].s[0][1] = br.hgetbits(length0);
					scalefac[ch].s[1][1] = br.hgetbits(length0);
					scalefac[ch].s[2][1] = br.hgetbits(length0);
					scalefac[ch].s[0][2] = br.hgetbits(length0);
					scalefac[ch].s[1][2] = br.hgetbits(length0);
					scalefac[ch].s[2][2] = br.hgetbits(length0);
					scalefac[ch].s[0][3] = br.hgetbits(length0);
					scalefac[ch].s[1][3] = br.hgetbits(length0);
					scalefac[ch].s[2][3] = br.hgetbits(length0);
					scalefac[ch].s[0][4] = br.hgetbits(length0);
					scalefac[ch].s[1][4] = br.hgetbits(length0);
					scalefac[ch].s[2][4] = br.hgetbits(length0);
					scalefac[ch].s[0][5] = br.hgetbits(length0);
					scalefac[ch].s[1][5] = br.hgetbits(length0);
					scalefac[ch].s[2][5] = br.hgetbits(length0);
					scalefac[ch].s[0][6] = br.hgetbits(length1);
					scalefac[ch].s[1][6] = br.hgetbits(length1);
					scalefac[ch].s[2][6] = br.hgetbits(length1);
					scalefac[ch].s[0][7] = br.hgetbits(length1);
					scalefac[ch].s[1][7] = br.hgetbits(length1);
					scalefac[ch].s[2][7] = br.hgetbits(length1);
					scalefac[ch].s[0][8] = br.hgetbits(length1);
					scalefac[ch].s[1][8] = br.hgetbits(length1);
					scalefac[ch].s[2][8] = br.hgetbits(length1);
					scalefac[ch].s[0][9] = br.hgetbits(length1);
					scalefac[ch].s[1][9] = br.hgetbits(length1);
					scalefac[ch].s[2][9] = br.hgetbits(length1);
					scalefac[ch].s[0][10] = br.hgetbits(length1);
					scalefac[ch].s[1][10] = br.hgetbits(length1);
					scalefac[ch].s[2][10] = br.hgetbits(length1);
					scalefac[ch].s[0][11] = br.hgetbits(length1);
					scalefac[ch].s[1][11] = br.hgetbits(length1);
					scalefac[ch].s[2][11] = br.hgetbits(length1);
					scalefac[ch].s[0][12] = 0;
					scalefac[ch].s[1][12] = 0;
					scalefac[ch].s[2][12] = 0;
				}
			} else {
				if ((si.ch[ch].scfsi[0] == 0) || (gr == 0)) {
					scalefac[ch].l[0] = br.hgetbits(length0);
					scalefac[ch].l[1] = br.hgetbits(length0);
					scalefac[ch].l[2] = br.hgetbits(length0);
					scalefac[ch].l[3] = br.hgetbits(length0);
					scalefac[ch].l[4] = br.hgetbits(length0);
					scalefac[ch].l[5] = br.hgetbits(length0);
				}
				if ((si.ch[ch].scfsi[1] == 0) || (gr == 0)) {
					scalefac[ch].l[6] = br.hgetbits(length0);
					scalefac[ch].l[7] = br.hgetbits(length0);
					scalefac[ch].l[8] = br.hgetbits(length0);
					scalefac[ch].l[9] = br.hgetbits(length0);
					scalefac[ch].l[10] = br.hgetbits(length0);
				}
				if ((si.ch[ch].scfsi[2] == 0) || (gr == 0)) {
					scalefac[ch].l[11] = br.hgetbits(length1);
					scalefac[ch].l[12] = br.hgetbits(length1);
					scalefac[ch].l[13] = br.hgetbits(length1);
					scalefac[ch].l[14] = br.hgetbits(length1);
					scalefac[ch].l[15] = br.hgetbits(length1);
				}
				if ((si.ch[ch].scfsi[3] == 0) || (gr == 0)) {
					scalefac[ch].l[16] = br.hgetbits(length1);
					scalefac[ch].l[17] = br.hgetbits(length1);
					scalefac[ch].l[18] = br.hgetbits(length1);
					scalefac[ch].l[19] = br.hgetbits(length1);
					scalefac[ch].l[20] = br.hgetbits(length1);
				}
				scalefac[ch].l[21] = 0;
				scalefac[ch].l[22] = 0;
			}
		}
		MP3Layer3.prototype.get_LSF_scale_data = function(ch, gr) {
			var new_slen = this.new_slen;
			var si = this.si;
			var br = this.br;
			var scalefac_comp = 0, int_scalefac_comp = 0;
			var mode_ext = this.header.mode_extension();
			var m;
			var blocktypenumber = 0;
			var blocknumber = 0;
			var gr_info = (si.ch[ch].gr[gr]);
			scalefac_comp = gr_info.scalefac_compress;
			if (gr_info.block_type == 2) {
				if (gr_info.mixed_block_flag == 0)
					blocktypenumber = 1;
				else if (gr_info.mixed_block_flag == 1)
					blocktypenumber = 2;
				else
					blocktypenumber = 0;
			} else {
				blocktypenumber = 0;
			}
			if (!(((mode_ext == 1) || (mode_ext == 3)) && (ch == 1))) {
				if (scalefac_comp < 400) {
					new_slen[0] = (scalefac_comp >>> 4) / 5;
					new_slen[1] = (scalefac_comp >>> 4) % 5;
					new_slen[2] = (scalefac_comp & 0xF) >>> 2;
					new_slen[3] = (scalefac_comp & 3);
					si.ch[ch].gr[gr].preflag = 0;
					blocknumber = 0;
				} else if (scalefac_comp < 500) {
					new_slen[0] = ((scalefac_comp - 400) >>> 2) / 5;
					new_slen[1] = ((scalefac_comp - 400) >>> 2) % 5;
					new_slen[2] = (scalefac_comp - 400) & 3;
					new_slen[3] = 0;
					si.ch[ch].gr[gr].preflag = 0;
					blocknumber = 1;
				} else if (scalefac_comp < 512) {
					new_slen[0] = (scalefac_comp - 500) / 3;
					new_slen[1] = (scalefac_comp - 500) % 3;
					new_slen[2] = 0;
					new_slen[3] = 0;
					si.ch[ch].gr[gr].preflag = 1;
					blocknumber = 2;
				}
			}
			if ((((mode_ext == 1) || (mode_ext == 3)) && (ch == 1))) {
				int_scalefac_comp = scalefac_comp >>> 1;
				if (int_scalefac_comp < 180) {
					new_slen[0] = int_scalefac_comp / 36;
					new_slen[1] = (int_scalefac_comp % 36) / 6;
					new_slen[2] = (int_scalefac_comp % 36) % 6;
					new_slen[3] = 0;
					si.ch[ch].gr[gr].preflag = 0;
					blocknumber = 3;
				} else if (int_scalefac_comp < 244) {
					new_slen[0] = ((int_scalefac_comp - 180) & 0x3F) >>> 4;
					new_slen[1] = ((int_scalefac_comp - 180) & 0xF) >>> 2;
					new_slen[2] = (int_scalefac_comp - 180) & 3;
					new_slen[3] = 0;
					si.ch[ch].gr[gr].preflag = 0;
					blocknumber = 4;
				} else if (int_scalefac_comp < 255) {
					new_slen[0] = (int_scalefac_comp - 244) / 3;
					new_slen[1] = (int_scalefac_comp - 244) % 3;
					new_slen[2] = 0;
					new_slen[3] = 0;
					si.ch[ch].gr[gr].preflag = 0;
					blocknumber = 5;
				}
			}
			for (var x = 0; x < 45; x++)
				this.scalefac_buffer[x] = 0;
			m = 0;
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < MP3Layer3.nr_of_sfb_block[blocknumber][blocktypenumber][i]; j++) {
					this.scalefac_buffer[m] = (new_slen[i] == 0) ? 0 : br.hgetbits(new_slen[i]);
					m++;
				}
			}
		}
		MP3Layer3.prototype.get_LSF_scale_factors = function(ch, gr) {
			var si = this.si;
			var scalefac = this.scalefac;
			var m = 0;
			var sfb = 0, _window = 0;
			var gr_info = (si.ch[ch].gr[gr]);
			this.get_LSF_scale_data(ch, gr);
			if ((gr_info.window_switching_flag != 0) && (gr_info.block_type == 2)) {
				if (gr_info.mixed_block_flag != 0) { // MIXED
					for (sfb = 0; sfb < 8; sfb++) {
						scalefac[ch].l[sfb] = this.scalefac_buffer[m];
						m++;
					}
					for (sfb = 3; sfb < 12; sfb++) {
						for (_window = 0; _window < 3; _window++) {
							scalefac[ch].s[_window][sfb] = this.scalefac_buffer[m];
							m++;
						}
					}
					for (_window = 0; _window < 3; _window++)
						scalefac[ch].s[_window][12] = 0;

				} else { // SHORT
					for (sfb = 0; sfb < 12; sfb++) {
						for (_window = 0; _window < 3; _window++) {
							scalefac[ch].s[_window][sfb] = this.scalefac_buffer[m];
							m++;
						}
					}
					for (_window = 0; _window < 3; _window++)
						scalefac[ch].s[_window][12] = 0;
				}
			} else { // LONG types 0,1,3
				for (sfb = 0; sfb < 21; sfb++) {
					scalefac[ch].l[sfb] = this.scalefac_buffer[m];
					m++;
				}
				scalefac[ch].l[21] = 0; // Jeff
				scalefac[ch].l[22] = 0;
			}
		}
		var x = new Int32Array(1);
		var y = new Int32Array(1);
		var v = new Int32Array(1);
		var w = new Int32Array(1);
		MP3Layer3.prototype.huffman_decode = function(ch, gr) {
			var br = this.br;
			var si = this.si;
			var is_1d = this.is_1d;
			var sfreq = this.sfreq;
			x[0] = 0;
			y[0] = 0;
			v[0] = 0;
			w[0] = 0;
			var part2_3_end = this.part2_start + si.ch[ch].gr[gr].part2_3_length;
			var num_bits = 0;
			var region1Start = 0;
			var region2Start = 0;
			var index = 0;
			var buf = 0, buf1 = 0;
			var h = null;
			if (((si.ch[ch].gr[gr].window_switching_flag) != 0) && (si.ch[ch].gr[gr].block_type == 2)) {
				region1Start = (sfreq == 8) ? 72 : 36;
				region2Start = 576;
			} else {
				buf = si.ch[ch].gr[gr].region0_count + 1;
				buf1 = buf + si.ch[ch].gr[gr].region1_count + 1;
				if (buf1 > MP3Layer3.sfBandIndex[sfreq].l.length - 1) {
					buf1 = MP3Layer3.sfBandIndex[sfreq].l.length - 1;
				}
				region1Start = MP3Layer3.sfBandIndex[sfreq].l[buf];
				region2Start = MP3Layer3.sfBandIndex[sfreq].l[buf1];
			}
			index = 0;
			for (var i = 0; i < (si.ch[ch].gr[gr].big_values << 1); i += 2) {
				if (i < region1Start) h = huffcodetab.ht[si.ch[ch].gr[gr].table_select[0]];
				else if (i < region2Start) h = huffcodetab.ht[si.ch[ch].gr[gr].table_select[1]];
				else h = huffcodetab.ht[si.ch[ch].gr[gr].table_select[2]];
				huffcodetab.huffman_decoder(h, x, y, v, w, br);
				is_1d[index++] = x[0];
				is_1d[index++] = y[0];
				this.checkSumHuff = this.checkSumHuff + x[0] + y[0];
			}
			h = huffcodetab.ht[si.ch[ch].gr[gr].count1table_select + 32];
			num_bits = br.hsstell();
			while ((num_bits < part2_3_end) && (index < 576)) {
				huffcodetab.huffman_decoder(h, x, y, v, w, br);
				is_1d[index++] = v[0];
				is_1d[index++] = w[0];
				is_1d[index++] = x[0];
				is_1d[index++] = y[0];
				this.checkSumHuff = this.checkSumHuff + v[0] + w[0] + x[0] + y[0];
				num_bits = br.hsstell();
			}
			if (num_bits > part2_3_end) {
				br.rewindNbits(num_bits - part2_3_end);
				index -= 4;
			}
			num_bits = br.hsstell();
			if (num_bits < part2_3_end)
				br.hgetbits(part2_3_end - num_bits);
			this.nonzero[ch] = Math.min(index, 576);
			if (index < 0) index = 0;
			for (; index < 576; index++)
				is_1d[index] = 0;
		}
		MP3Layer3.prototype.dequantize_sample = function(xr, ch, gr) {
			var scalefac = this.scalefac;
			var sfreq = this.sfreq;
			var is_1d = this.is_1d;
			var si = this.si;
			var gr_info = (si.ch[ch].gr[gr]);
			var cb = 0;
			var next_cb_boundary = 0;
			var cb_begin = 0;
			var cb_width = 0;
			var index = 0, t_index = 0, j = 0;
			var g_gain = 0;
			var xr_1d = xr;
			if ((gr_info.window_switching_flag != 0) && (gr_info.block_type == 2)) {
				if (gr_info.mixed_block_flag != 0)
					next_cb_boundary = MP3Layer3.sfBandIndex[sfreq].l[1];
				else {
					cb_width = MP3Layer3.sfBandIndex[sfreq].s[1];
					next_cb_boundary = (cb_width << 2) - cb_width;
					cb_begin = 0;
				}
			} else {
				next_cb_boundary = MP3Layer3.sfBandIndex[sfreq].l[1];
			}
			g_gain = Math.pow(2.0, (0.25 * (gr_info.global_gain - 210.0)));
			for (j = 0; j < this.nonzero[ch]; j++) {
				var reste = j % MP3Layer3.SSLIMIT;
				var quotien = ((j - reste) / MP3Layer3.SSLIMIT) | 0;
				if (is_1d[j] == 0) xr_1d[quotien][reste] = 0.0;
				else {
					var abv = is_1d[j];
					if (abv < MP3Layer3.t_43.length) {
						if (is_1d[j] > 0) xr_1d[quotien][reste] = g_gain * MP3Layer3.t_43[abv];
						else {
							if (-abv < MP3Layer3.t_43.length) xr_1d[quotien][reste] = -g_gain * MP3Layer3.t_43[-abv];
							else xr_1d[quotien][reste] = -g_gain * Math.pow(-abv, MP3Layer3.d43);
						}
					} else {
						if (is_1d[j] > 0) xr_1d[quotien][reste] = g_gain * Math.pow(abv, MP3Layer3.d43);
						else xr_1d[quotien][reste] = -g_gain * Math.pow(-abv, MP3Layer3.d43);
					}
				}
			}
			for (j = 0; j < this.nonzero[ch]; j++) {
				var reste = j % MP3Layer3.SSLIMIT;
				var quotien = ((j - reste) / MP3Layer3.SSLIMIT) | 0;
				if (index == next_cb_boundary) {
					if ((gr_info.window_switching_flag != 0) && (gr_info.block_type == 2)) {
						if (gr_info.mixed_block_flag != 0) {
							if (index == MP3Layer3.sfBandIndex[sfreq].l[8]) {
								next_cb_boundary = MP3Layer3.sfBandIndex[sfreq].s[4];
								next_cb_boundary = (next_cb_boundary << 2) - next_cb_boundary;
								cb = 3;
								cb_width = MP3Layer3.sfBandIndex[sfreq].s[4] - MP3Layer3.sfBandIndex[sfreq].s[3];
								cb_begin = MP3Layer3.sfBandIndex[sfreq].s[3];
								cb_begin = (cb_begin << 2) - cb_begin;
							} else if (index < MP3Layer3.sfBandIndex[sfreq].l[8]) {
								next_cb_boundary = MP3Layer3.sfBandIndex[sfreq].l[(++cb) + 1];
							} else {
								next_cb_boundary = MP3Layer3.sfBandIndex[sfreq].s[(++cb) + 1];
								next_cb_boundary = (next_cb_boundary << 2) - next_cb_boundary;
								cb_begin = MP3Layer3.sfBandIndex[sfreq].s[cb];
								cb_width = MP3Layer3.sfBandIndex[sfreq].s[cb + 1] - cb_begin;
								cb_begin = (cb_begin << 2) - cb_begin;
							}
						} else {
							next_cb_boundary = MP3Layer3.sfBandIndex[sfreq].s[(++cb) + 1];
							next_cb_boundary = (next_cb_boundary << 2) - next_cb_boundary;
							cb_begin = MP3Layer3.sfBandIndex[sfreq].s[cb];
							cb_width = MP3Layer3.sfBandIndex[sfreq].s[cb + 1] - cb_begin;
							cb_begin = (cb_begin << 2) - cb_begin;
						}
					} else {
						next_cb_boundary = MP3Layer3.sfBandIndex[sfreq].l[(++cb) + 1];
					}
				}
				if ((gr_info.window_switching_flag != 0) && (((gr_info.block_type == 2) && (gr_info.mixed_block_flag == 0)) || ((gr_info.block_type == 2) && (gr_info.mixed_block_flag != 0) && (j >= 36)))) {
					t_index = ((index - cb_begin) / cb_width) | 0;
					var idx = scalefac[ch].s[t_index][cb] << gr_info.scalefac_scale;
					idx += (gr_info.subblock_gain[t_index] << 2);
					xr_1d[quotien][reste] *= MP3Layer3.two_to_negative_half_pow[idx];
				} else {
					var idx = scalefac[ch].l[cb];
					if (gr_info.preflag != 0) idx += MP3Layer3.pretab[cb];
					idx = idx << gr_info.scalefac_scale;
					xr_1d[quotien][reste] *= MP3Layer3.two_to_negative_half_pow[idx];
				}
				index++;
			}
			for (j = this.nonzero[ch]; j < 576; j++) {
				var reste = j % MP3Layer3.SSLIMIT;
				var quotien = ((j - reste) / MP3Layer3.SSLIMIT) | 0;
				if (reste < 0) reste = 0;
				if (quotien < 0) quotien = 0;
				xr_1d[quotien][reste] = 0.0;
			}
		}
		MP3Layer3.nr_of_sfb_block = [
			[[6, 5, 5, 5], [9, 9, 9, 9], [6, 9, 9, 9]],
			[[6, 5, 7, 3], [9, 9, 12, 6], [6, 9, 12, 6]],
			[[11, 10, 0, 0], [18, 18, 0, 0], [15, 18, 0, 0]],
			[[7, 7, 7, 0], [12, 12, 12, 0], [6, 15, 12, 0]],
			[[6, 6, 6, 3], [12, 9, 9, 6], [6, 12, 9, 6]],
			[[8, 8, 5, 0], [15, 12, 9, 0], [6, 18, 9, 0]]
		];
		var is_pos = new Int32Array(576);
		var is_ratio = new Float32Array(576);
		MP3Layer3.io = [[1.0000000000E+00, 8.4089641526E-01, 7.0710678119E-01, 5.9460355751E-01, 5.0000000001E-01, 4.2044820763E-01, 3.5355339060E-01, 2.9730177876E-01, 2.5000000001E-01, 2.1022410382E-01, 1.7677669530E-01, 1.4865088938E-01, 1.2500000000E-01, 1.0511205191E-01, 8.8388347652E-02, 7.4325444691E-02, 6.2500000003E-02, 5.2556025956E-02, 4.4194173826E-02, 3.7162722346E-02, 3.1250000002E-02, 2.6278012978E-02, 2.2097086913E-02, 1.8581361173E-02, 1.5625000001E-02, 1.3139006489E-02, 1.1048543457E-02, 9.2906805866E-03, 7.8125000006E-03, 6.5695032447E-03, 5.5242717285E-03, 4.6453402934E-03], [1.0000000000E+00, 7.0710678119E-01, 5.0000000000E-01, 3.5355339060E-01, 2.5000000000E-01, 1.7677669530E-01, 1.2500000000E-01, 8.8388347650E-02, 6.2500000001E-02, 4.4194173825E-02, 3.1250000001E-02, 2.2097086913E-02, 1.5625000000E-02, 1.1048543456E-02, 7.8125000002E-03, 5.5242717282E-03, 3.9062500001E-03, 2.7621358641E-03, 1.9531250001E-03, 1.3810679321E-03, 9.7656250004E-04, 6.9053396603E-04, 4.8828125002E-04, 3.4526698302E-04, 2.4414062501E-04, 1.7263349151E-04, 1.2207031251E-04, 8.6316745755E-05, 6.1035156254E-05, 4.3158372878E-05, 3.0517578127E-05, 2.1579186439E-05]]
		MP3Layer3.TAN12 = new Float32Array([0.0, 0.26794919, 0.57735027, 1.0, 1.73205081, 3.73205081, 9.9999999e10, -3.73205081, -1.73205081, -1.0, -0.57735027, -0.26794919, 0.0, 0.26794919, 0.57735027, 1.0]);
		MP3Layer3.cs = new Float32Array([0.857492925712, 0.881741997318, 0.949628649103, 0.983314592492, 0.995517816065, 0.999160558175, 0.999899195243, 0.999993155067]);
		MP3Layer3.ca = new Float32Array([-0.5144957554270, -0.4717319685650, -0.3133774542040, -0.1819131996110, -0.0945741925262, -0.0409655828852, -0.0141985685725, -0.00369997467375]);
		MP3Layer3.two_to_negative_half_pow = new Float32Array([1.0000000000E+00, 7.0710678119E-01, 5.0000000000E-01, 3.5355339059E-01, 2.5000000000E-01, 1.7677669530E-01, 1.2500000000E-01, 8.8388347648E-02, 6.2500000000E-02, 4.4194173824E-02, 3.1250000000E-02, 2.2097086912E-02, 1.5625000000E-02, 1.1048543456E-02, 7.8125000000E-03, 5.5242717280E-03, 3.9062500000E-03, 2.7621358640E-03, 1.9531250000E-03, 1.3810679320E-03, 9.7656250000E-04, 6.9053396600E-04, 4.8828125000E-04, 3.4526698300E-04, 2.4414062500E-04, 1.7263349150E-04, 1.2207031250E-04, 8.6316745750E-05, 6.1035156250E-05, 4.3158372875E-05, 3.0517578125E-05, 2.1579186438E-05, 1.5258789062E-05, 1.0789593219E-05, 7.6293945312E-06, 5.3947966094E-06, 3.8146972656E-06, 2.6973983047E-06, 1.9073486328E-06, 1.3486991523E-06, 9.5367431641E-07, 6.7434957617E-07, 4.7683715820E-07, 3.3717478809E-07, 2.3841857910E-07, 1.6858739404E-07, 1.1920928955E-07, 8.4293697022E-08, 5.9604644775E-08, 4.2146848511E-08, 2.9802322388E-08, 2.1073424255E-08, 1.4901161194E-08, 1.0536712128E-08, 7.4505805969E-09, 5.2683560639E-09, 3.7252902985E-09, 2.6341780319E-09, 1.8626451492E-09, 1.3170890160E-09, 9.3132257462E-10, 6.5854450798E-10, 4.6566128731E-10, 3.2927225399E-10]);
		MP3Layer3.prototype.i_stereo_k_values = function(is_pos, io_type, i) {
			var k = this.k;
			if (is_pos == 0) {
				k[0][i] = 1.0;
				k[1][i] = 1.0;
			} else if ((is_pos & 1) != 0) {
				k[0][i] = MP3Layer3.io[io_type][(is_pos + 1) >>> 1];
				k[1][i] = 1.0;
			} else {
				k[0][i] = 1.0;
				k[1][i] = MP3Layer3.io[io_type][is_pos >>> 1];
			}
		}
		MP3Layer3.prototype.stereo = function(gr) {
			var sfreq = this.sfreq;
			var scalefac = this.scalefac;
			var ro = this.ro;
			var lr = this.lr;
			var si = this.si;
			var k = this.k;
			var sb = 0, ss = 0;
			if (this.channels == 1) {
				for (sb = 0; sb < MP3Layer3.SBLIMIT; sb++)
					for (ss = 0; ss < MP3Layer3.SSLIMIT; ss += 3) {
						lr[0][sb][ss] = ro[0][sb][ss];
						lr[0][sb][ss + 1] = ro[0][sb][ss + 1];
						lr[0][sb][ss + 2] = ro[0][sb][ss + 2];
					}
			} else {
				var gr_info = (si.ch[0].gr[gr]);
				var mode_ext = this.header.mode_extension();
				var sfb = 0;
				var i = 0;
				var lines = 0, temp = 0, temp2 = 0;
				var ms_stereo = ((this.header.mode() == MP3Header.JOINT_STEREO) && ((mode_ext & 0x2) != 0));
				var i_stereo = ((this.header.mode() == MP3Header.JOINT_STEREO) && ((mode_ext & 0x1) != 0));
				var lsf = ((this.header.version() == MP3Header.MPEG2_LSF || this.header.version() == MP3Header.MPEG25_LSF));
				var io_type = (gr_info.scalefac_compress & 1);
				for (i = 0; i < 576; i++) {
					is_pos[i] = 7;
					is_ratio[i] = 0.0;
				}
				if (i_stereo) {
					if ((gr_info.window_switching_flag != 0) && (gr_info.block_type == 2)) {
						if (gr_info.mixed_block_flag != 0) {
							var max_sfb = 0;
							for (var j = 0; j < 3; j++) {
								var sfbcnt = 0;
								sfbcnt = 2;
								for (sfb = 12; sfb >= 3; sfb--) {
									i = MP3Layer3.sfBandIndex[sfreq].s[sfb];
									lines = MP3Layer3.sfBandIndex[sfreq].s[sfb + 1] - i;
									i = (i << 2) - i + (j + 1) * lines - 1;
									while (lines > 0) {
										if (ro[1][(i / 18) | 0][i % 18] != 0.0) {
											sfbcnt = sfb;
											sfb = -10;
											lines = -10;
										}
										lines--;
										i--;
									}
								}
								sfb = sfbcnt + 1;
								if (sfb > max_sfb)
									max_sfb = sfb;
								while (sfb < 12) {
									temp = MP3Layer3.sfBandIndex[sfreq].s[sfb];
									sb = MP3Layer3.sfBandIndex[sfreq].s[sfb + 1] - temp;
									i = (temp << 2) - temp + j * sb;
									for (; sb > 0; sb--) {
										is_pos[i] = scalefac[1].s[j][sfb];
										if (is_pos[i] != 7)
											if (lsf)
												this.i_stereo_k_values(is_pos[i], io_type, i);
											else
												is_ratio[i] = MP3Layer3.TAN12[is_pos[i]];
										i++;
									}
									sfb++;
								}
								sfb = MP3Layer3.sfBandIndex[sfreq].s[10];
								sb = MP3Layer3.sfBandIndex[sfreq].s[11] - sfb;
								sfb = (sfb << 2) - sfb + j * sb;
								temp = MP3Layer3.sfBandIndex[sfreq].s[11];
								sb = MP3Layer3.sfBandIndex[sfreq].s[12] - temp;
								i = (temp << 2) - temp + j * sb;
								for (; sb > 0; sb--) {
									is_pos[i] = is_pos[sfb];
									if (lsf) {
										k[0][i] = k[0][sfb];
										k[1][i] = k[1][sfb];
									} else {
										is_ratio[i] = is_ratio[sfb];
									}
									i++;
								}
							}
							if (max_sfb <= 3) {
								i = 2;
								ss = 17;
								sb = -1;
								while (i >= 0) {
									if (ro[1][i][ss] != 0.0) {
										sb = (i << 4) + (i << 1) + ss;
										i = -1;
									} else {
										ss--;
										if (ss < 0) {
											i--;
											ss = 17;
										}
									}
								}
								i = 0;
								while (MP3Layer3.sfBandIndex[sfreq].l[i] <= sb)
									i++;
								sfb = i;
								i = MP3Layer3.sfBandIndex[sfreq].l[i];
								for (; sfb < 8; sfb++) {
									sb = MP3Layer3.sfBandIndex[sfreq].l[sfb + 1] - MP3Layer3.sfBandIndex[sfreq].l[sfb];
									for (; sb > 0; sb--) {
										is_pos[i] = scalefac[1].l[sfb];
										if (is_pos[i] != 7)
											if (lsf)
												this.i_stereo_k_values(is_pos[i], io_type, i);
											else
												is_ratio[i] = MP3Layer3.TAN12[is_pos[i]];
										i++;
									}
								}
							}
						} else {
							for (var j = 0; j < 3; j++) {
								var sfbcnt = 0;
								sfbcnt = -1;
								for (sfb = 12; sfb >= 0; sfb--) {
									temp = MP3Layer3.sfBandIndex[sfreq].s[sfb];
									lines = MP3Layer3.sfBandIndex[sfreq].s[sfb + 1] - temp;
									i = (temp << 2) - temp + (j + 1) * lines - 1;
									while (lines > 0) {
										if (ro[1][(i / 18) | 0][i % 18] != 0.0) {
											sfbcnt = sfb;
											sfb = -10;
											lines = -10;
										}
										lines--;
										i--;
									}
								}
								sfb = sfbcnt + 1;
								while (sfb < 12) {
									temp = MP3Layer3.sfBandIndex[sfreq].s[sfb];
									sb = MP3Layer3.sfBandIndex[sfreq].s[sfb + 1] - temp;
									i = (temp << 2) - temp + j * sb;
									for (; sb > 0; sb--) {
										is_pos[i] = scalefac[1].s[j][sfb];
										if (is_pos[i] != 7)
											if (lsf)
												this.i_stereo_k_values(is_pos[i], io_type, i);
											else
												is_ratio[i] = MP3Layer3.TAN12[is_pos[i]];
										i++;
									}
									sfb++;
								}
								temp = MP3Layer3.sfBandIndex[sfreq].s[10];
								temp2 = MP3Layer3.sfBandIndex[sfreq].s[11];
								sb = temp2 - temp;
								sfb = (temp << 2) - temp + j * sb;
								sb = MP3Layer3.sfBandIndex[sfreq].s[12] - temp2;
								i = (temp2 << 2) - temp2 + j * sb;
								for (; sb > 0; sb--) {
									is_pos[i] = is_pos[sfb];
									if (lsf) {
										k[0][i] = k[0][sfb];
										k[1][i] = k[1][sfb];
									} else {
										is_ratio[i] = is_ratio[sfb];
									}
									i++;
								}
							}
						}
					} else {
						i = 31;
						ss = 17;
						sb = 0;
						while (i >= 0) {
							if (ro[1][i][ss] != 0.0) {
								sb = (i << 4) + (i << 1) + ss;
								i = -1;
							} else {
								ss--;
								if (ss < 0) {
									i--;
									ss = 17;
								}
							}
						}
						i = 0;
						while (MP3Layer3.sfBandIndex[sfreq].l[i] <= sb)
							i++;
						sfb = i;
						i = MP3Layer3.sfBandIndex[sfreq].l[i];
						for (; sfb < 21; sfb++) {
							sb = MP3Layer3.sfBandIndex[sfreq].l[sfb + 1] - MP3Layer3.sfBandIndex[sfreq].l[sfb];
							for (; sb > 0; sb--) {
								is_pos[i] = scalefac[1].l[sfb];
								if (is_pos[i] != 7)
									if (lsf)
										this.i_stereo_k_values(is_pos[i], io_type, i);
									else
										is_ratio[i] = MP3Layer3.TAN12[is_pos[i]];
								i++;
							}
						}
						sfb = MP3Layer3.sfBandIndex[sfreq].l[20];
						for (sb = 576 - MP3Layer3.sfBandIndex[sfreq].l[21]; (sb > 0) && (i < 576); sb--) {
							is_pos[i] = is_pos[sfb];
							if (lsf) {
								k[0][i] = k[0][sfb];
								k[1][i] = k[1][sfb];
							} else {
								is_ratio[i] = is_ratio[sfb];
							}
							i++;
						}
					}
				}
				i = 0;
				for (sb = 0; sb < MP3Layer3.SBLIMIT; sb++)
					for (ss = 0; ss < MP3Layer3.SSLIMIT; ss++) {
						if (is_pos[i] == 7) {
							if (ms_stereo) {
								lr[0][sb][ss] = (ro[0][sb][ss] + ro[1][sb][ss]) * 0.707106781;
								lr[1][sb][ss] = (ro[0][sb][ss] - ro[1][sb][ss]) * 0.707106781;
							} else {
								lr[0][sb][ss] = ro[0][sb][ss];
								lr[1][sb][ss] = ro[1][sb][ss];
							}
						} else if (i_stereo) {
							if (lsf) {
								lr[0][sb][ss] = ro[0][sb][ss] * k[0][i];
								lr[1][sb][ss] = ro[0][sb][ss] * k[1][i];
							} else {
								lr[1][sb][ss] = ro[0][sb][ss] / (1 + is_ratio[i]);
								lr[0][sb][ss] = lr[1][sb][ss] * is_ratio[i];
							}
						}
						i++;
					}
			}
		}
		MP3Layer3.prototype.do_downmix = function() {
			var lr = this.lr;
			for (var sb = 0; sb < MP3Layer3.SSLIMIT; sb++) {
				for (var ss = 0; ss < MP3Layer3.SSLIMIT; ss += 3) {
					lr[0][sb][ss] = (lr[0][sb][ss] + lr[1][sb][ss]) * 0.5;
					lr[0][sb][ss + 1] = (lr[0][sb][ss + 1] + lr[1][sb][ss + 1]) * 0.5;
					lr[0][sb][ss + 2] = (lr[0][sb][ss + 2] + lr[1][sb][ss + 2]) * 0.5;
				}
			}
		}
		MP3Layer3.prototype.reorder = function(xr, ch, gr) {
			var sfreq = this.sfreq;
			var si = this.si;
			var out_1d = this.out_1d;
			var gr_info = (si.ch[ch].gr[gr]);
			var freq = 0, freq3 = 0;
			var index = 0;
			var sfb = 0, sfb_start = 0, sfb_lines = 0;
			var src_line = 0, des_line = 0;
			var xr_1d = xr;
			if ((gr_info.window_switching_flag != 0) && (gr_info.block_type == 2)) {
				for (index = 0; index < 576; index++)
					out_1d[index] = 0.0;
				if (gr_info.mixed_block_flag != 0) {
					for (index = 0; index < 36; index++) {
						var reste = index % MP3Layer3.SSLIMIT;
						var quotien = ((index - reste) / MP3Layer3.SSLIMIT) | 0;
						out_1d[index] = xr_1d[quotien][reste];
					}
					for (sfb = 3; sfb < 13; sfb++) {
						sfb_start = MP3Layer3.sfBandIndex[sfreq].s[sfb];
						sfb_lines = MP3Layer3.sfBandIndex[sfreq].s[sfb + 1] - sfb_start;
						var sfb_start3 = (sfb_start << 2) - sfb_start;
						for (freq = 0, freq3 = 0; freq < sfb_lines; freq++, freq3 += 3) {
							src_line = sfb_start3 + freq;
							des_line = sfb_start3 + freq3;
							var reste = src_line % MP3Layer3.SSLIMIT;
							var quotien = ((src_line - reste) / MP3Layer3.SSLIMIT) | 0;
							out_1d[des_line] = xr_1d[quotien][reste];
							src_line += sfb_lines;
							des_line++;
							reste = src_line % MP3Layer3.SSLIMIT;
							quotien = ((src_line - reste) / MP3Layer3.SSLIMIT) | 0;
							out_1d[des_line] = xr_1d[quotien][reste];
							src_line += sfb_lines;
							des_line++;
							reste = src_line % MP3Layer3.SSLIMIT;
							quotien = ((src_line - reste) / MP3Layer3.SSLIMIT) | 0;
							out_1d[des_line] = xr_1d[quotien][reste];
						}
					}
				} else {
					for (index = 0; index < 576; index++) {
						var j = MP3Layer3.reorder_table[sfreq][index];
						var reste = j % MP3Layer3.SSLIMIT;
						var quotien = ((j - reste) / MP3Layer3.SSLIMIT) | 0;
						out_1d[index] = xr_1d[quotien][reste];
					}
				}
			} else {
				for (index = 0; index < 576; index++) {
					var reste = index % MP3Layer3.SSLIMIT;
					var quotien = ((index - reste) / MP3Layer3.SSLIMIT) | 0;
					out_1d[index] = xr_1d[quotien][reste];
				}
			}
		}
		MP3Layer3.prototype.antialias = function(ch, gr) {
			var si = this.si;
			var out_1d = this.out_1d;
			var sb18 = 0, ss = 0, sb18lim = 0;
			var gr_info = (si.ch[ch].gr[gr]);
			if ((gr_info.window_switching_flag != 0) && (gr_info.block_type == 2) && !(gr_info.mixed_block_flag != 0))
				return;
			if ((gr_info.window_switching_flag != 0) && (gr_info.mixed_block_flag != 0) && (gr_info.block_type == 2)) {
				sb18lim = 18;
			} else {
				sb18lim = 558;
			}
			for (sb18 = 0; sb18 < sb18lim; sb18 += 18) {
				for (ss = 0; ss < 8; ss++) {
					var src_idx1 = sb18 + 17 - ss;
					var src_idx2 = sb18 + 18 + ss;
					var bu = out_1d[src_idx1];
					var bd = out_1d[src_idx2];
					out_1d[src_idx1] = (bu * MP3Layer3.cs[ss]) - (bd * MP3Layer3.ca[ss]);
					out_1d[src_idx2] = (bd * MP3Layer3.cs[ss]) + (bu * MP3Layer3.ca[ss]);
				}
			}
		}
		var tsOutCopy = new Float32Array(18);
		var rawout = new Float32Array(36);
		function arraycopy(_in, a, out, b, c) {
			var _ = 0;
			for (var i = b; i < c; i++) {
				out[i] = _in[a + _];
				_++;
			}
		}
		MP3Layer3.prototype.hybrid = function(ch, gr) {
			var si = this.si;
			var out_1d = this.out_1d;
			var bt = 0;
			var sb18 = 0;
			var gr_info = (si.ch[ch].gr[gr]);
			var tsOut = null;
			var prvblk = null;
			for (sb18 = 0; sb18 < 576; sb18 += 18) {
				bt = ((gr_info.window_switching_flag != 0) && (gr_info.mixed_block_flag != 0) && (sb18 < 36)) ? 0 : gr_info.block_type;
				tsOut = out_1d;
				arraycopy(tsOut, 0 + sb18, tsOutCopy, 0, 18);
				this.inv_mdct(tsOutCopy, rawout, bt);
				arraycopy(tsOutCopy, 0, tsOut, 0 + sb18, 18);
				prvblk = this.prevblck;
				tsOut[0 + sb18] = rawout[0] + prvblk[ch][sb18 + 0];
				prvblk[ch][sb18 + 0] = rawout[18];
				tsOut[1 + sb18] = rawout[1] + prvblk[ch][sb18 + 1];
				prvblk[ch][sb18 + 1] = rawout[19];
				tsOut[2 + sb18] = rawout[2] + prvblk[ch][sb18 + 2];
				prvblk[ch][sb18 + 2] = rawout[20];
				tsOut[3 + sb18] = rawout[3] + prvblk[ch][sb18 + 3];
				prvblk[ch][sb18 + 3] = rawout[21];
				tsOut[4 + sb18] = rawout[4] + prvblk[ch][sb18 + 4];
				prvblk[ch][sb18 + 4] = rawout[22];
				tsOut[5 + sb18] = rawout[5] + prvblk[ch][sb18 + 5];
				prvblk[ch][sb18 + 5] = rawout[23];
				tsOut[6 + sb18] = rawout[6] + prvblk[ch][sb18 + 6];
				prvblk[ch][sb18 + 6] = rawout[24];
				tsOut[7 + sb18] = rawout[7] + prvblk[ch][sb18 + 7];
				prvblk[ch][sb18 + 7] = rawout[25];
				tsOut[8 + sb18] = rawout[8] + prvblk[ch][sb18 + 8];
				prvblk[ch][sb18 + 8] = rawout[26];
				tsOut[9 + sb18] = rawout[9] + prvblk[ch][sb18 + 9];
				prvblk[ch][sb18 + 9] = rawout[27];
				tsOut[10 + sb18] = rawout[10] + prvblk[ch][sb18 + 10];
				prvblk[ch][sb18 + 10] = rawout[28];
				tsOut[11 + sb18] = rawout[11] + prvblk[ch][sb18 + 11];
				prvblk[ch][sb18 + 11] = rawout[29];
				tsOut[12 + sb18] = rawout[12] + prvblk[ch][sb18 + 12];
				prvblk[ch][sb18 + 12] = rawout[30];
				tsOut[13 + sb18] = rawout[13] + prvblk[ch][sb18 + 13];
				prvblk[ch][sb18 + 13] = rawout[31];
				tsOut[14 + sb18] = rawout[14] + prvblk[ch][sb18 + 14];
				prvblk[ch][sb18 + 14] = rawout[32];
				tsOut[15 + sb18] = rawout[15] + prvblk[ch][sb18 + 15];
				prvblk[ch][sb18 + 15] = rawout[33];
				tsOut[16 + sb18] = rawout[16] + prvblk[ch][sb18 + 16];
				prvblk[ch][sb18 + 16] = rawout[34];
				tsOut[17 + sb18] = rawout[17] + prvblk[ch][sb18 + 17];
				prvblk[ch][sb18 + 17] = rawout[35];
			}
		}
		MP3Layer3.win = [new Float32Array([-1.6141214951E-02, -5.3603178919E-02, -1.0070713296E-01, -1.6280817573E-01, -4.9999999679E-01, -3.8388735032E-01, -6.2061144372E-01, -1.1659756083E+00, -3.8720752656E+00, -4.2256286556E+00, -1.5195289984E+00, -9.7416483388E-01, -7.3744074053E-01, -1.2071067773E+00, -5.1636156596E-01, -4.5426052317E-01, -4.0715656898E-01, -3.6969460527E-01, -3.3876269197E-01, -3.1242222492E-01, -2.8939587111E-01, -2.6880081906E-01, -5.0000000266E-01, -2.3251417468E-01, -2.1596714708E-01, -2.0004979098E-01, -1.8449493497E-01, -1.6905846094E-01, -1.5350360518E-01, -1.3758624925E-01, -1.2103922149E-01, -2.0710679058E-01, -8.4752577594E-02, -6.4157525656E-02, -4.1131172614E-02, -1.4790705759E-02]), new Float32Array([-1.6141214951E-02, -5.3603178919E-02, -1.0070713296E-01, -1.6280817573E-01, -4.9999999679E-01, -3.8388735032E-01, -6.2061144372E-01, -1.1659756083E+00, -3.8720752656E+00, -4.2256286556E+00, -1.5195289984E+00, -9.7416483388E-01, -7.3744074053E-01, -1.2071067773E+00, -5.1636156596E-01, -4.5426052317E-01, -4.0715656898E-01, -3.6969460527E-01, -3.3908542600E-01, -3.1511810350E-01, -2.9642226150E-01, -2.8184548650E-01, -5.4119610000E-01, -2.6213228100E-01, -2.5387916537E-01, -2.3296291359E-01, -1.9852728987E-01, -1.5233534808E-01, -9.6496400054E-02, -3.3423828516E-02, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00]), new Float32Array([-4.8300800645E-02, -1.5715656932E-01, -2.8325045177E-01, -4.2953747763E-01, -1.2071067795E+00, -8.2426483178E-01, -1.1451749106E+00, -1.7695290101E+00, -4.5470225061E+00, -3.4890531002E+00, -7.3296292804E-01, -1.5076514758E-01, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00]), new Float32Array([0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, 0.0000000000E+00, -1.5076513660E-01, -7.3296291107E-01, -3.4890530566E+00, -4.5470224727E+00, -1.7695290031E+00, -1.1451749092E+00, -8.3137738100E-01, -1.3065629650E+00, -5.4142014250E-01, -4.6528974900E-01, -4.1066990750E-01, -3.7004680800E-01, -3.3876269197E-01, -3.1242222492E-01, -2.8939587111E-01, -2.6880081906E-01, -5.0000000266E-01, -2.3251417468E-01, -2.1596714708E-01, -2.0004979098E-01, -1.8449493497E-01, -1.6905846094E-01, -1.5350360518E-01, -1.3758624925E-01, -1.2103922149E-01, -2.0710679058E-01, -8.4752577594E-02, -6.4157525656E-02, -4.1131172614E-02, -1.4790705759E-02])];
		MP3Layer3.prototype.inv_mdct = function(_in, out, block_type) {
			var win_bt = 0;
			var i = 0;
			var tmpf_0, tmpf_1, tmpf_2, tmpf_3, tmpf_4, tmpf_5, tmpf_6, tmpf_7, tmpf_8, tmpf_9;
			var tmpf_10, tmpf_11, tmpf_12, tmpf_13, tmpf_14, tmpf_15, tmpf_16, tmpf_17;
			tmpf_0 = tmpf_1 = tmpf_2 = tmpf_3 = tmpf_4 = tmpf_5 = tmpf_6 = tmpf_7 = tmpf_8 = tmpf_9 = tmpf_10 = tmpf_11 = tmpf_12 = tmpf_13 = tmpf_14 = tmpf_15 = tmpf_16 = tmpf_17 = 0.0;
			if (block_type == 2) {
				out[0] = 0.0;
				out[1] = 0.0;
				out[2] = 0.0;
				out[3] = 0.0;
				out[4] = 0.0;
				out[5] = 0.0;
				out[6] = 0.0;
				out[7] = 0.0;
				out[8] = 0.0;
				out[9] = 0.0;
				out[10] = 0.0;
				out[11] = 0.0;
				out[12] = 0.0;
				out[13] = 0.0;
				out[14] = 0.0;
				out[15] = 0.0;
				out[16] = 0.0;
				out[17] = 0.0;
				out[18] = 0.0;
				out[19] = 0.0;
				out[20] = 0.0;
				out[21] = 0.0;
				out[22] = 0.0;
				out[23] = 0.0;
				out[24] = 0.0;
				out[25] = 0.0;
				out[26] = 0.0;
				out[27] = 0.0;
				out[28] = 0.0;
				out[29] = 0.0;
				out[30] = 0.0;
				out[31] = 0.0;
				out[32] = 0.0;
				out[33] = 0.0;
				out[34] = 0.0;
				out[35] = 0.0;
				var six_i = 0;
				for (i = 0; i < 3; i++) {
					_in[15 + i] += _in[12 + i];
					_in[12 + i] += _in[9 + i];
					_in[9 + i] += _in[6 + i];
					_in[6 + i] += _in[3 + i];
					_in[3 + i] += _in[0 + i];
					_in[15 + i] += _in[9 + i];
					_in[9 + i] += _in[3 + i];
					var pp1, pp2, sum = 0;
					pp2 = _in[12 + i] * 0.500000000;
					pp1 = _in[6 + i] * 0.866025403;
					sum = _in[0 + i] + pp2;
					tmpf_1 = _in[0 + i] - _in[12 + i];
					tmpf_0 = sum + pp1;
					tmpf_2 = sum - pp1;
					pp2 = _in[15 + i] * 0.500000000;
					pp1 = _in[9 + i] * 0.866025403;
					sum = _in[3 + i] + pp2;
					tmpf_4 = _in[3 + i] - _in[15 + i];
					tmpf_5 = sum + pp1;
					tmpf_3 = sum - pp1;
					tmpf_3 *= 1.931851653;
					tmpf_4 *= 0.707106781;
					tmpf_5 *= 0.517638090;
					var save = tmpf_0;
					tmpf_0 += tmpf_5;
					tmpf_5 = save - tmpf_5;
					save = tmpf_1;
					tmpf_1 += tmpf_4;
					tmpf_4 = save - tmpf_4;
					save = tmpf_2;
					tmpf_2 += tmpf_3;
					tmpf_3 = save - tmpf_3;
					tmpf_0 *= 0.504314480;
					tmpf_1 *= 0.541196100;
					tmpf_2 *= 0.630236207;
					tmpf_3 *= 0.821339815;
					tmpf_4 *= 1.306562965;
					tmpf_5 *= 3.830648788;
					tmpf_8 = -tmpf_0 * 0.793353340;
					tmpf_9 = -tmpf_0 * 0.608761429;
					tmpf_7 = -tmpf_1 * 0.923879532;
					tmpf_10 = -tmpf_1 * 0.382683432;
					tmpf_6 = -tmpf_2 * 0.991444861;
					tmpf_11 = -tmpf_2 * 0.130526192;
					tmpf_0 = tmpf_3;
					tmpf_1 = tmpf_4 * 0.382683432;
					tmpf_2 = tmpf_5 * 0.608761429;
					tmpf_3 = -tmpf_5 * 0.793353340;
					tmpf_4 = -tmpf_4 * 0.923879532;
					tmpf_5 = -tmpf_0 * 0.991444861;
					tmpf_0 *= 0.130526192;
					out[six_i + 6] += tmpf_0;
					out[six_i + 7] += tmpf_1;
					out[six_i + 8] += tmpf_2;
					out[six_i + 9] += tmpf_3;
					out[six_i + 10] += tmpf_4;
					out[six_i + 11] += tmpf_5;
					out[six_i + 12] += tmpf_6;
					out[six_i + 13] += tmpf_7;
					out[six_i + 14] += tmpf_8;
					out[six_i + 15] += tmpf_9;
					out[six_i + 16] += tmpf_10;
					out[six_i + 17] += tmpf_11;
					six_i += 6;
				}
			} else {
				_in[17] += _in[16];
				_in[16] += _in[15];
				_in[15] += _in[14];
				_in[14] += _in[13];
				_in[13] += _in[12];
				_in[12] += _in[11];
				_in[11] += _in[10];
				_in[10] += _in[9];
				_in[9] += _in[8];
				_in[8] += _in[7];
				_in[7] += _in[6];
				_in[6] += _in[5];
				_in[5] += _in[4];
				_in[4] += _in[3];
				_in[3] += _in[2];
				_in[2] += _in[1];
				_in[1] += _in[0];
				_in[17] += _in[15];
				_in[15] += _in[13];
				_in[13] += _in[11];
				_in[11] += _in[9];
				_in[9] += _in[7];
				_in[7] += _in[5];
				_in[5] += _in[3];
				_in[3] += _in[1];
				var tmp0 = 0, tmp1 = 0, tmp2 = 0, tmp3 = 0, tmp4 = 0, tmp0_ = 0, tmp1_ = 0, tmp2_ = 0, tmp3_ = 0;
				var tmp0o, tmp1o, tmp2o, tmp3o, tmp4o, tmp0_o, tmp1_o, tmp2_o, tmp3_o = 0;
				var i00 = _in[0] + _in[0];
				var iip12 = i00 + _in[12];
				tmp0 = iip12 + _in[4] * 1.8793852415718 + _in[8] * 1.532088886238 + _in[16] * 0.34729635533386;
				tmp1 = i00 + _in[4] - _in[8] - _in[12] - _in[12] - _in[16];
				tmp2 = iip12 - _in[4] * 0.34729635533386 - _in[8] * 1.8793852415718 + _in[16] * 1.532088886238;
				tmp3 = iip12 - _in[4] * 1.532088886238 + _in[8] * 0.34729635533386 - _in[16] * 1.8793852415718;
				tmp4 = _in[0] - _in[4] + _in[8] - _in[12] + _in[16];
				var i66_ = _in[6] * 1.732050808;
				tmp0_ = _in[2] * 1.9696155060244 + i66_ + _in[10] * 1.2855752193731 + _in[14] * 0.68404028665134;
				tmp1_ = (_in[2] - _in[10] - _in[14]) * 1.732050808;
				tmp2_ = _in[2] * 1.2855752193731 - i66_ - _in[10] * 0.68404028665134 + _in[14] * 1.9696155060244;
				tmp3_ = _in[2] * 0.68404028665134 - i66_ + _in[10] * 1.9696155060244 - _in[14] * 1.2855752193731;
				var i0 = _in[0 + 1] + _in[0 + 1];
				var i0p12 = i0 + _in[12 + 1];
				tmp0o = i0p12 + _in[4 + 1] * 1.8793852415718 + _in[8 + 1] * 1.532088886238 + _in[16 + 1] * 0.34729635533386;
				tmp1o = i0 + _in[4 + 1] - _in[8 + 1] - _in[12 + 1] - _in[12 + 1] - _in[16 + 1];
				tmp2o = i0p12 - _in[4 + 1] * 0.34729635533386 - _in[8 + 1] * 1.8793852415718 + _in[16 + 1] * 1.532088886238;
				tmp3o = i0p12 - _in[4 + 1] * 1.532088886238 + _in[8 + 1] * 0.34729635533386 - _in[16 + 1] * 1.8793852415718;
				tmp4o = (_in[0 + 1] - _in[4 + 1] + _in[8 + 1] - _in[12 + 1] + _in[16 + 1]) * 0.707106781; // Twiddled
				var i6_ = _in[6 + 1] * 1.732050808;
				tmp0_o = _in[2 + 1] * 1.9696155060244 + i6_ + _in[10 + 1] * 1.2855752193731 + _in[14 + 1] * 0.68404028665134;
				tmp1_o = (_in[2 + 1] - _in[10 + 1] - _in[14 + 1]) * 1.732050808;
				tmp2_o = _in[2 + 1] * 1.2855752193731 - i6_ - _in[10 + 1] * 0.68404028665134 + _in[14 + 1] * 1.9696155060244;
				tmp3_o = _in[2 + 1] * 0.68404028665134 - i6_ + _in[10 + 1] * 1.9696155060244 - _in[14 + 1] * 1.2855752193731;
				var e, o = 0;
				e = tmp0 + tmp0_;
				o = (tmp0o + tmp0_o) * 0.501909918;
				tmpf_0 = e + o;
				tmpf_17 = e - o;
				e = tmp1 + tmp1_;
				o = (tmp1o + tmp1_o) * 0.517638090;
				tmpf_1 = e + o;
				tmpf_16 = e - o;
				e = tmp2 + tmp2_;
				o = (tmp2o + tmp2_o) * 0.551688959;
				tmpf_2 = e + o;
				tmpf_15 = e - o;
				e = tmp3 + tmp3_;
				o = (tmp3o + tmp3_o) * 0.610387294;
				tmpf_3 = e + o;
				tmpf_14 = e - o;
				tmpf_4 = tmp4 + tmp4o;
				tmpf_13 = tmp4 - tmp4o;
				e = tmp3 - tmp3_;
				o = (tmp3o - tmp3_o) * 0.871723397;
				tmpf_5 = e + o;
				tmpf_12 = e - o;
				e = tmp2 - tmp2_;
				o = (tmp2o - tmp2_o) * 1.183100792;
				tmpf_6 = e + o;
				tmpf_11 = e - o;
				e = tmp1 - tmp1_;
				o = (tmp1o - tmp1_o) * 1.931851653;
				tmpf_7 = e + o;
				tmpf_10 = e - o;
				e = tmp0 - tmp0_;
				o = (tmp0o - tmp0_o) * 5.736856623;
				tmpf_8 = e + o;
				tmpf_9 = e - o;
				win_bt = MP3Layer3.win[block_type];
				out[0] = -tmpf_9 * win_bt[0];
				out[1] = -tmpf_10 * win_bt[1];
				out[2] = -tmpf_11 * win_bt[2];
				out[3] = -tmpf_12 * win_bt[3];
				out[4] = -tmpf_13 * win_bt[4];
				out[5] = -tmpf_14 * win_bt[5];
				out[6] = -tmpf_15 * win_bt[6];
				out[7] = -tmpf_16 * win_bt[7];
				out[8] = -tmpf_17 * win_bt[8];
				out[9] = tmpf_17 * win_bt[9];
				out[10] = tmpf_16 * win_bt[10];
				out[11] = tmpf_15 * win_bt[11];
				out[12] = tmpf_14 * win_bt[12];
				out[13] = tmpf_13 * win_bt[13];
				out[14] = tmpf_12 * win_bt[14];
				out[15] = tmpf_11 * win_bt[15];
				out[16] = tmpf_10 * win_bt[16];
				out[17] = tmpf_9 * win_bt[17];
				out[18] = tmpf_8 * win_bt[18];
				out[19] = tmpf_7 * win_bt[19];
				out[20] = tmpf_6 * win_bt[20];
				out[21] = tmpf_5 * win_bt[21];
				out[22] = tmpf_4 * win_bt[22];
				out[23] = tmpf_3 * win_bt[23];
				out[24] = tmpf_2 * win_bt[24];
				out[25] = tmpf_1 * win_bt[25];
				out[26] = tmpf_0 * win_bt[26];
				out[27] = tmpf_0 * win_bt[27];
				out[28] = tmpf_1 * win_bt[28];
				out[29] = tmpf_2 * win_bt[29];
				out[30] = tmpf_3 * win_bt[30];
				out[31] = tmpf_4 * win_bt[31];
				out[32] = tmpf_5 * win_bt[32];
				out[33] = tmpf_6 * win_bt[33];
				out[34] = tmpf_7 * win_bt[34];
				out[35] = tmpf_8 * win_bt[35];
			}
		}
		const SampleBuffer = function(sample_frequency, number_of_channels) {
			this.buffer = new Int16Array(SampleBuffer.OBUFFERSIZE);
			this.bufferp = new Int32Array(SampleBuffer.MAXCHANNELS);
			this.channels = number_of_channels;
			this.frequency = sample_frequency;
			for (var i = 0; i < number_of_channels; ++i)
				this.bufferp[i] = i;
		}
		SampleBuffer.OBUFFERSIZE = 2 * 1152;
		SampleBuffer.MAXCHANNELS = 2;
		SampleBuffer.prototype.getChannelCount = function() {
			return this.channels;
		}
		SampleBuffer.prototype.getSampleFrequency = function() {
			return this.frequency;
		}
		SampleBuffer.prototype.getBuffer = function() {
			return this.buffer;
		}
		SampleBuffer.prototype.getBufferLength = function() {
			return this.bufferp[0];
		}
		SampleBuffer.prototype.write_buffer = function() {
		}
		SampleBuffer.prototype.clear_buffer = function() {
			for (var i = 0; i < this.channels; ++i)
				this.bufferp[i] = i;
		}
		SampleBuffer.prototype.appendSamples = function(channel, f) {
			var pos = this.bufferp[channel];
			var s;
			var fs;
			for (var i = 0; i < 32; ) {
				fs = f[i++];
				fs = (fs > 32767.0 ? 32767.0 : (Math.max(fs, -32767.0)));
				s = fs << 16 >> 16;
				this.buffer[pos] = s;
				pos += this.channels;
			}
			this.bufferp[channel] = pos;
		}
		const MP3Decoder = function() {
			this.output = null;
			this.initialized = false;
		}
		MP3Decoder.prototype.setOutputBuffer = function(out) {
			this.output = out;
		}
		MP3Decoder.prototype.initialize = function(header) {
			var scalefactor = 32700;
			var mode = header.mode();
			var channels = mode == MP3Header.SINGLE_CHANNEL ? 1 : 2;
			if (this.output == null) this.output = new SampleBuffer(header.frequency(), channels);
			this.filter1 = new SynthesisFilter(0, scalefactor, null);
			if (channels == 2) this.filter2 = new SynthesisFilter(1, scalefactor, null);
			this.outputChannels = channels;
			this.outputFrequency = header.frequency();
			this.initialized = true;
		}
		MP3Decoder.prototype.decodeFrame = function(header, stream) {
			if (!this.initialized) {
				this.initialize(header);
			}
			this.output.clear_buffer();
			var decoder = this.retrieveDecoder(header, stream);
			decoder.decodeFrame();
			this.output.write_buffer(1);
			return this.output;
		}
		MP3Decoder.prototype.retrieveDecoder = function(header, stream) {
			if (this.l3decoder == null) {
				this.l3decoder = new MP3Layer3(stream, header, this.filter1, this.filter2, this.output);
			}
			return this.l3decoder;
		}
		wpjsm.exportJS = {
			Decoder: MP3Decoder,
			Header: MP3Header,
			BitStream
		}
	},
	"src/utils/at-nihav-vp6-decoder.js": function(wpjsm){
		function validate(isH) {
			if (!isH) throw new Error("ValidationError");
		}
		const asU8 = function(num) {
			return (num << 24) >>> 24;
		}
		const asI16 = function(num) {
			return (num << 16) >> 16;
		}
		const asU16 = function(num) {
			return (num << 16) >>> 16;
		}
		const asU32 = function(num) {
			return num >>> 0;
		}
		class Bits {
			constructor(src) {
				this.src = src;
				this.bytePos = 0;
				this.bitPos = 0;
			}
			read(n) {
				var value = 0;
				while (n--) (value <<= 1), (value |= this.readBit());
				return value;
			}
			readBit() {
				var val = (this.src[this.bytePos] >> (7 - this.bitPos++)) & 0x1;
				if (this.bitPos > 7) {
					this.bytePos++;
					this.bitPos = 0;
				}
				return val;
			}
			read_bool() {
				return !!this.readBit();
			}
			tell() {
				return (this.bytePos * 8) + this.bitPos;
			}
		}
		function edge_emu(src, xpos, ypos, bw, bh, dst, dstride, comp, align) {
			let stride = src.get_stride(comp);
			let offs   = src.get_offset(comp);
			let [w_, h_] = src.get_dimensions(comp);
			let [hss, vss] = src.get_info().get_format().get_chromaton(comp).get_subsampling();
			let data = src.get_data();
			let framebuf = data;
			let w, h;
			if (align == 0) {
				w = w_;
				h = h_;
			} else {
				let wa = (align > hss) ? (1 << (align - hss)) - 1 : 0;
				let ha = (align > vss) ? (1 << (align - vss)) - 1 : 0;
				w = (w_ + wa) - wa;
				h = (h_ + ha) - ha;
			}
			for (let y = 0; y < bh; y++) {
				let srcy;
				if (y + ypos < 0) {
					srcy = 0;
				} else if ((y) + ypos >= (h)) {
					srcy = h - 1;
				} else {
					srcy = ((y) + ypos);
				}
				for (let x = 0; x < bw; x++) {
					let srcx;
					if ((x) + xpos < 0) {
						srcx = 0;
					} else if ((x) + xpos >= (w)) {
						srcx = w - 1;
					} else {
						srcx = ((x) + xpos);
					}
					dst[x + y * dstride] = framebuf[offs + srcx + srcy * stride];
				}
			}
		}
		class MV {
			constructor(x, y) {
				this.x = asI16(x);
				this.y = asI16(y);
			}
			add(other) {
				return new MV(this.x + other.x, this.y + other.y);
			}
			eq(other) {
				return (this.x == other.x) && (this.y == other.y);
			}
		}
		const ZERO_MV = new MV(0, 0);
		const ZIGZAG = new Uint32Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
		class YUVSubmodel {
			constructor(type) {
				this.type = type;
			}
		}
		YUVSubmodel.YCbCr = 1;
		YUVSubmodel.YIQ = 2;
		YUVSubmodel.YUVJ = 3;
		class ColorModel {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
		}
		ColorModel.RGB = 1;
		ColorModel.YUV = 2;
		ColorModel.CMYK = 3;
		ColorModel.HSV = 4;
		ColorModel.LAB = 5;
		ColorModel.XYZ = 6;
		class NAPixelChromaton {
			constructor(data) {
				this.h_ss = data.h_ss;
				this.v_ss = data.v_ss;
				this.packed = data.packed;
				this.depth = data.depth;
				this.shift = data.shift;
				this.comp_offs = data.comp_offs;
				this.next_elem = data.next_elem;
			}
			get_subsampling() {
				return [this.h_ss, this.v_ss];
			}
			is_packed() {
				return this.packed;
			}
			get_depth() {
				return this.depth;
			}
			get_shift() {
				return this.shift;
			}
			get_offset() {
				return this.comp_offs;
			}
			get_step() {
				return this.next_elem;
			}
			get_width(width) {
				return (width + ((1 << this.h_ss) - 1)) >> this.h_ss;
			}
			get_height(height) {
				return (height + ((1 << this.v_ss) - 1)) >> this.v_ss;
			}
			get_linesize(width) {
				let d = this.depth;
				if (this.packed) {
					return (this.get_width(width) * d + d - 1) >> 3;
				} else {
					return this.get_width(width);
				}
			}
			get_data_size() {
				let nh = (height + ((1 << this.v_ss) - 1)) >> this.v_ss;
				return (this.get_linesize(width) * nh);
			}
		}
		class NAPixelFormaton {
			constructor(data) {
				this.model = data.model;
				this.components = data.components;
				this.comp_info = data.comp_info;
				this.elem_size = data.elem_size;
				this.be = data.be;
				this.alpha = data.alpha;
				this.palette = data.palette;
			}
			get_model() {
				return this.model;
			}
			get_num_comp() {
				return this.components;
			}
			get_chromaton(i) {
				return this.comp_info[i];
			}
			is_be() {
				return this.be;
			}
			has_alpha() {
				return this.alpha;
			}
			is_paletted() {
				return this.palette;
			}
			get_elem_size() {
				return this.elem_size;
			}
		}
		const YUV420_FORMAT = new NAPixelFormaton({
			model: new ColorModel(ColorModel.YUV, new YUVSubmodel(YUVSubmodel.YUVJ)),
			components: 3,
			comp_info: [new NAPixelChromaton({ h_ss: 0, v_ss: 0, packed: false, depth: 8, shift: 0, comp_offs: 0, next_elem: 1 }), new NAPixelChromaton({ h_ss: 1, v_ss: 1, packed: false, depth: 8, shift: 0, comp_offs: 1, next_elem: 1 }), new NAPixelChromaton({ h_ss: 1, v_ss: 1, packed: false, depth: 8, shift: 0, comp_offs: 2, next_elem: 1 }), null, null],
			elem_size: 0,
			be: false,
			alpha: false,
			palette: false
		});
		class NAVideoInfo {
			constructor(w, h, flip, fmt) {
				this.width = w;
				this.height = h;
				this.flipped = flip;
				this.format = fmt;
			}
			get_width() {
				return this.width;
			}
			get_height() {
				return this.height;
			}
			is_flipped() {
				return this.flipped;
			}
			get_format() {
				return this.format;
			}
			set_width(w) {
				this.width = w;
			}
			set_height(h) {
				this.height = h;
			}
			eq(other) {
				return this.width == other.width && this.height == other.height && this.flipped == other.flipped;
			}
		}
		function get_plane_size(info, idx) {
			let chromaton = info.get_format().get_chromaton(idx);
			if (chromaton === null) {
				return [0, 0];
			}
			let [hs, vs] = chromaton.get_subsampling();
			let w = (info.get_width() + ((1 << hs) - 1)) >> hs;
			let h = (info.get_height() + ((1 << vs) - 1)) >> vs;
			return [w, h];
		}
		class NAVideoBuffer {
			constructor(data) {
				this.info = data.info;
				this.data = data.data;
				this.offs = data.offs;
				this.strides = data.strides;
			}
			get_num_refs() {
				return 1;
			}
			get_info() {
				return this.info;
			}
			get_data() {
				return this.data;
			}
			get_dimensions(idx) {
				return get_plane_size(this.info, idx);
			}
			get_offset(idx) {
				if (idx >= this.offs.length) {
					return 0;
				} else {
					return this.offs[idx];
				}
			}
			get_stride(idx) {
				if (idx >= this.strides.length) {
					return 0;
				}
				return this.strides[idx];
			}
			cloned() {
				return new NAVideoBuffer({
					info: this.info,
					data: this.data.slice(0),
					offs: this.offs,
					strides: this.strides
				});
			}
		}
		class NABufferType {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
			get_vbuf() {
				return this.value;
			}
		}
		NABufferType.Video = 1;
		NABufferType.Video16 = 2;
		NABufferType.Video32 = 3;
		NABufferType.VideoPacked = 4;
		NABufferType.Data = 5;
		NABufferType.None = 6;
		const NA_SIMPLE_VFRAME_COMPONENTS = 4;
		class NASimpleVideoFrame {
			constructor(data) {
				this.width = data.width;
				this.height = data.height;
				this.flip = data.flip;
				this.stride = data.stride;
				this.offset = data.offset;
				this.components = data.components;
				this.data = data.data;
			}
			static from_video_buf(vbuf) {
				let vinfo = vbuf.get_info();
				let components = vinfo.format.components;
				if (components > NA_SIMPLE_VFRAME_COMPONENTS) return null;
				let w = new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS);
				let h = new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS);
				let s = new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS);
				let o = new Uint32Array(NA_SIMPLE_VFRAME_COMPONENTS);
				for (var comp = 0; comp < components; comp++) {
					let [width, height] = vbuf.get_dimensions(comp);
					w[comp] = width;
					h[comp] = height;
					s[comp] = vbuf.get_stride(comp);
					o[comp] = vbuf.get_offset(comp);
				}
				let flip = vinfo.flipped;
				return new NASimpleVideoFrame({
					width: w,
					height: h,
					flip,
					stride: s,
					offset: o,
					components,
					data: vbuf.data,
				});
			}
		}
		function alloc_video_buffer(vinfo, align) {
			let fmt = vinfo.format;
			let new_size = 0;
			let offs = [];
			let strides = [];
			for (var i = 0; i < fmt.get_num_comp(); i++) {
				if (!fmt.get_chromaton(i)) {
					throw new Error("AllocatorError::FormatError");
				}
			}
			let align_mod = (1 << align) - 1;
			let width = (vinfo.width + align_mod) - align_mod;
			let height = (vinfo.height + align_mod) - align_mod;
			let max_depth = 0;
			let all_packed = true;
			for (var i = 0; i < fmt.get_num_comp(); i++) {
				let ochr = fmt.get_chromaton(i);
				if (!ochr) continue;
				let chr = ochr;
				if (!chr.is_packed()) {
					all_packed = false;
				}
				max_depth = Math.max(max_depth, chr.get_depth());
			}
			let unfit_elem_size = false;
			switch(fmt.get_elem_size()) {
				case 2:
				case 4:
					unfit_elem_size = true;
					break;
			}
			unfit_elem_size = !unfit_elem_size;
			if (!all_packed) {
				for (var i = 0; i < fmt.get_num_comp(); i++) {
					let ochr = fmt.get_chromaton(i);
					if (!ochr) continue;
					let chr = ochr;
					offs.push(new_size);
					let stride = chr.get_linesize(width);
					let cur_h = chr.get_height(height);
					let cur_sz = (stride * cur_h);
					let new_sz = (new_size + cur_sz);
					new_size = new_sz;
					strides.push(stride);
				}
				if (max_depth <= 8) {
					let data = new Uint8Array(new_size);
					let buf = new NAVideoBuffer({
						data: data,
						info: vinfo,
						offs,
						strides
					});
					return new NABufferType(NABufferType.Video, buf);
				}
			}
		}
		class NAVideoBufferPool {
			constructor(max_len) {
				this.pool = [];
				this.max_len = max_len;
				this.add_len = 0;
			}
			set_dec_bufs(add_len) {
				this.add_len = add_len;
			}
			reset() {
				this.pool = [];
			}
			prealloc_video(vinfo, align) {
				let nbufs = this.max_len + this.add_len - this.pool.length;
				for (var _ = 0; _ < nbufs; _++) {
					let vbuf = alloc_video_buffer(vinfo, align);
					var buf = vbuf.value;
					this.pool.push(buf);
				}
			}
			get_free() {
				for (var i = 0; i < this.pool.length; i++) {
					var e = this.pool[i];
					if (e.get_num_refs() == 1)
						return e;
				}
				return null;
			}
			get_info() {
				if (this.pool.length) {
					return (this.pool[0].get_info());
				} else {
					return null;
				}
			}
			get_copy(rbuf) {
				let dbuf = this.get_free().cloned();
				dbuf.data.set(rbuf.data, 0);
				return dbuf;
			}
		}
		class NADecoderSupport {
			constructor() {
				this.pool_u8 = new NAVideoBufferPool(0);
			}
		}
		const VERSION_VP60 = 6;
		const VERSION_VP62 = 8;
		const VP6_SIMPLE_PROFILE = 0;
		const VP6_ADVANCED_PROFILE = 3;
		const LONG_VECTOR_ORDER = new Uint32Array([0, 1, 2, 7, 6, 5, 4]);
		const NZ_PROBS = new Uint8Array([162, 164]);
		const RAW_PROBS = [new Uint8Array([247, 210, 135, 68, 138, 220, 239, 246]),new Uint8Array([244, 184, 201, 44, 173, 221, 239, 253])];
		const TREE_PROBS = [new Uint8Array([225, 146, 172, 147, 214,  39, 156]),new Uint8Array([204, 170, 119, 235, 140, 230, 228])];
		const ZERO_RUN_PROBS = [new Uint8Array([198, 197, 196, 146, 198, 204, 169, 142, 130, 136, 149, 149, 191, 249]),new Uint8Array([135, 201, 181, 154,  98, 117, 132, 126, 146, 169, 184, 240, 246, 254])];
		const HAS_NZ_PROB = new Uint8Array([237, 231]);
		const HAS_SIGN_PROB = new Uint8Array([246, 243]);
		const HAS_TREE_PROB = [new Uint8Array([253, 253, 254, 254, 254, 254, 254]), new Uint8Array([245, 253, 254, 254, 254, 254, 254])];
		const HAS_RAW_PROB = [new Uint8Array([254, 254, 254, 254, 254, 250, 250, 252]), new Uint8Array([254, 254, 254, 254, 254, 251, 251, 254])];
		const HAS_COEF_PROBS = [new Uint8Array([146, 255, 181, 207, 232, 243, 238, 251, 244, 250, 249]),new Uint8Array([179, 255, 214, 240, 250, 255, 244, 255, 255, 255, 255])];
		const HAS_SCAN_UPD_PROBS = new Uint8Array([0, 132, 132, 159, 153, 151, 161, 170, 164, 162, 136, 110, 103, 114, 129, 118, 124, 125, 132, 136, 114, 110, 142, 135, 134, 123, 143, 126, 153, 183, 166, 161, 171, 180, 179, 164, 203, 218, 225, 217, 215, 206, 203, 217, 229, 241, 248, 243, 253, 255, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]);
		const HAS_ZERO_RUN_PROBS = [new Uint8Array([219, 246, 238, 249, 232, 239, 249, 255, 248, 253, 239, 244, 241, 248]),new Uint8Array([198, 232, 251, 253, 219, 241, 253, 255, 248, 249, 244, 238, 251, 255])];
		const VP6_AC_PROBS = [[[new Uint8Array([227, 246, 230, 247, 244, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 209, 231, 231, 249, 249, 253, 255, 255, 255]),new Uint8Array([255, 255, 225, 242, 241, 251, 253, 255, 255, 255, 255]),new Uint8Array([255, 255, 241, 253, 252, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 248, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])], [new Uint8Array([240, 255, 248, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 240, 253, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])]], [[new Uint8Array([206, 203, 227, 239, 247, 255, 253, 255, 255, 255, 255]),new Uint8Array([207, 199, 220, 236, 243, 252, 252, 255, 255, 255, 255]),new Uint8Array([212, 219, 230, 243, 244, 253, 252, 255, 255, 255, 255]),new Uint8Array([236, 237, 247, 252, 253, 255, 255, 255, 255, 255, 255]),new Uint8Array([240, 240, 248, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])], [new Uint8Array([230, 233, 249, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([238, 238, 250, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([248, 251, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])]], [[new Uint8Array([225, 239, 227, 231, 244, 253, 243, 255, 255, 253, 255]),new Uint8Array([232, 234, 224, 228, 242, 249, 242, 252, 251, 251, 255]),new Uint8Array([235, 249, 238, 240, 251, 255, 249, 255, 253, 253, 255]),new Uint8Array([249, 253, 251, 250, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([251, 250, 249, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])], [new Uint8Array([243, 244, 250, 250, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([249, 248, 250, 253, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255])]]];
		const VP6_DC_WEIGHTS = [[new Int16Array([122, 133]),new Int16Array([133, 51]),new Int16Array([142, -16])], [new Int16Array([0, 1]),new Int16Array([0, 1]),new Int16Array([0, 1])], [new Int16Array([78, 171]),new Int16Array([169, 71]),new Int16Array([221, -30])], [new Int16Array([139, 117]),new Int16Array([214, 44]),new Int16Array([246, -3])], [new Int16Array([168, 79]),new Int16Array([210, 38]),new Int16Array([203, 17])]];
		const VP6_IDX_TO_AC_BAND = new Uint32Array([0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
		const VP6_BICUBIC_COEFFS = [[new Int16Array([0, 128, 0, 0]), new Int16Array([-3, 122, 9, 0]), new Int16Array([-4, 109, 24, -1]), new Int16Array([-5, 91, 45, -3]), new Int16Array([-4, 68, 68, -4]), new Int16Array([-3, 45, 91, -5]), new Int16Array([-1, 24, 109, -4]), new Int16Array([ 0, 9, 122, -3])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-4, 124, 9, -1]), new Int16Array([-5, 110, 25, -2]), new Int16Array([-6, 91, 46, -3]), new Int16Array([-5, 69, 69, -5]), new Int16Array([-3, 46, 91, -6]), new Int16Array([-2, 25, 110, -5]), new Int16Array([-1, 9, 124, -4])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-4, 123, 10, -1]), new Int16Array([-6, 110, 26, -2]), new Int16Array([-7, 92, 47, -4]), new Int16Array([-6, 70, 70, -6]), new Int16Array([-4, 47, 92, -7]), new Int16Array([-2, 26, 110, -6]), new Int16Array([-1, 10, 123, -4])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-5, 124, 10, -1]), new Int16Array([-7, 110, 27, -2]), new Int16Array([-7, 91, 48, -4]), new Int16Array([-6, 70, 70, -6]), new Int16Array([-4, 48, 92, -8]), new Int16Array([-2, 27, 110, -7]), new Int16Array([-1, 10, 124, -5])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-6, 124, 11, -1]), new Int16Array([-8, 111, 28, -3]), new Int16Array([-8, 92, 49, -5]), new Int16Array([-7, 71, 71, -7]), new Int16Array([-5, 49, 92, -8]), new Int16Array([-3, 28, 111, -8]), new Int16Array([-1, 11, 124, -6])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-6, 123, 12, -1]), new Int16Array([-9, 111, 29, -3]), new Int16Array([-9, 93, 50, -6]), new Int16Array([-8, 72, 72, -8]), new Int16Array([-6, 50, 93, -9]), new Int16Array([-3, 29, 111, -9]), new Int16Array([-1, 12, 123, -6])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-7, 124, 12, -1]), new Int16Array([-10, 111, 30, -3]), new Int16Array([-10, 93, 51, -6]), new Int16Array([-9, 73, 73, -9]), new Int16Array([-6, 51, 93, -10]), new Int16Array([-3, 30, 111, -10]), new Int16Array([-1, 12, 124, -7])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-7, 123, 13, -1]), new Int16Array([-11, 112, 31, -4]), new Int16Array([-11, 94, 52, -7]), new Int16Array([-10, 74, 74, -10]), new Int16Array([-7, 52, 94, -11]), new Int16Array([-4, 31, 112, -11]), new Int16Array([-1, 13, 123, -7])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-8, 124, 13, -1]), new Int16Array([-12, 112, 32, -4]), new Int16Array([-12, 94, 53, -7]), new Int16Array([-10, 74, 74, -10]), new Int16Array([-7, 53, 94, -12]), new Int16Array([-4, 32, 112, -12]), new Int16Array([-1, 13, 124, -8])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-9, 124, 14, -1]), new Int16Array([-13, 112, 33, -4]), new Int16Array([-13, 95, 54, -8]), new Int16Array([-11, 75, 75, -11]), new Int16Array([-8, 54, 95, -13]), new Int16Array([-4, 33, 112, -13]), new Int16Array([-1, 14, 124, -9])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-9, 123, 15, -1]), new Int16Array([-14, 113, 34, -5]), new Int16Array([-14, 95, 55, -8]), new Int16Array([-12, 76, 76, -12]), new Int16Array([-8, 55, 95, -14]), new Int16Array([-5, 34, 112, -13]), new Int16Array([-1, 15, 123, -9])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-10, 124, 15, -1]), new Int16Array([-14, 113, 34, -5]), new Int16Array([-15, 96, 56, -9]), new Int16Array([-13, 77, 77, -13]), new Int16Array([-9, 56, 96, -15]), new Int16Array([-5, 34, 113, -14]), new Int16Array([-1, 15, 124, -10])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-10, 123, 16, -1]), new Int16Array([-15, 113, 35, -5]), new Int16Array([-16, 98, 56, -10]), new Int16Array([-14, 78, 78, -14]), new Int16Array([-10, 56, 98, -16]), new Int16Array([-5, 35, 113, -15]), new Int16Array([-1, 16, 123, -10])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-11, 124, 17, -2]), new Int16Array([-16, 113, 36, -5]), new Int16Array([-17, 98, 57, -10]), new Int16Array([-14, 78, 78, -14]), new Int16Array([-10, 57, 98, -17]), new Int16Array([-5, 36, 113, -16]), new Int16Array([-2, 17, 124, -11])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-12, 125, 17, -2]), new Int16Array([-17, 114, 37, -6]), new Int16Array([-18, 99, 58, -11]), new Int16Array([-15, 79, 79, -15]), new Int16Array([-11, 58, 99, -18]), new Int16Array([-6, 37, 114, -17]), new Int16Array([-2, 17, 125, -12])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-12, 124, 18, -2]), new Int16Array([-18, 114, 38, -6]), new Int16Array([-19, 99, 59, -11]), new Int16Array([-16, 80, 80, -16]), new Int16Array([-11, 59, 99, -19]), new Int16Array([-6, 38, 114, -18]), new Int16Array([-2, 18, 124, -12])], [new Int16Array([0, 128, 0, 0]), new Int16Array([-4, 118, 16, -2]), new Int16Array([-7, 106, 34, -5]), new Int16Array([-8,  90, 53, -7]), new Int16Array([-8,  72, 72, -8]), new Int16Array([-7,  53, 90, -8]), new Int16Array([-5,  34, 106, -7]), new Int16Array([-2,  16, 118, -4])]];
		const VP6_DEFAULT_SCAN_ORDER = new Uint32Array([0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15]);
		const VP6_INTERLACED_SCAN_ORDER = new Uint32Array([0, 1, 0, 1, 1, 2, 5, 3, 2, 2, 2, 2, 4, 7, 8, 10, 9, 7, 5, 4, 2, 3, 5, 6, 8, 9, 11, 12, 13, 12, 11, 10, 9, 7, 5, 4, 6, 7, 9, 11, 12, 12, 13, 13, 14, 12, 11, 9, 7, 9, 11, 12, 14, 14, 14, 15, 13, 11, 13, 15, 15, 15, 15, 15]);
		const VP_YUVA420_FORMAT = new NAPixelFormaton({
			model: new ColorModel(ColorModel.YUV, new YUVSubmodel(YUVSubmodel.YUVJ)),
			components: 4,
			comp_info:  [new NAPixelChromaton({ h_ss: 0, v_ss: 0, packed: false, depth: 8, shift: 0, comp_offs: 0, next_elem: 1}), new NAPixelChromaton({ h_ss: 1, v_ss: 1, packed: false, depth: 8, shift: 0, comp_offs: 1, next_elem: 1}), new NAPixelChromaton({ h_ss: 1, v_ss: 1, packed: false, depth: 8, shift: 0, comp_offs: 2, next_elem: 1}), new NAPixelChromaton({ h_ss: 0, v_ss: 0, packed: false, depth: 8, shift: 0, comp_offs: 3, next_elem: 1}), null],
			elem_size: 0,
			be: false,
			alpha: true,
			palette: false
		});
		const VP_REF_INTER = 1;
		const VP_REF_GOLDEN = 2;
		class VPMBType {
			constructor(type) {
				this.type = type;
			}
			is_intra() {
				return this.type == VPMBType.Intra;
			}
			get_ref_id() {
				switch (this.type) {
					case VPMBType.Intra:
						return 0;
					case VPMBType.InterNoMV:
					case VPMBType.InterMV:
					case VPMBType.InterNearest:
					case VPMBType.InterNear:
					case VPMBType.InterFourMV:
						return VP_REF_INTER;
					default:
						return VP_REF_GOLDEN;
				}
			}
		}
		VPMBType.Intra = 1;
		VPMBType.InterNoMV = 2;
		VPMBType.InterMV = 3;
		VPMBType.InterNearest = 4;
		VPMBType.InterNear = 5;
		VPMBType.InterFourMV = 6;
		VPMBType.GoldenNoMV = 7;
		VPMBType.GoldenMV = 8;
		VPMBType.GoldenNearest = 9;
		VPMBType.GoldenNear = 10;
		class VPShuffler {
			constructor() {
				this.lastframe = null;
				this.goldframe = null;
			}
			clear() {
				this.lastframe = null;
				this.goldframe = null;
			}
			add_frame(buf) {
				this.lastframe = buf;
			}
			add_golden_frame(buf) {
				this.goldframe = buf;
			}
			get_last() {
				return this.lastframe;
			}
			get_golden() {
				return this.goldframe;
			}
			has_refs() {
				return !!this.lastframe;
			}
		}
		const VP56_COEF_BASE = new Int16Array([5, 7, 11, 19, 35, 67]);
		const VP56_COEF_ADD_PROBS = [new Uint8Array([159, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new Uint8Array([165, 145, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0]), new Uint8Array([173, 148, 140, 128, 0, 0, 0, 0, 0, 0, 0, 0]), new Uint8Array([176, 155, 140, 135, 128, 0, 0, 0, 0, 0, 0, 0]), new Uint8Array([180, 157, 141, 134, 130, 128, 0, 0, 0, 0, 0, 0]), new Uint8Array([254, 254, 243, 230, 196, 177, 153, 140, 133, 130, 129, 128])];
		const ff_vp56_norm_shift = new Uint8Array([8, 7, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		class BoolCoder {
			constructor(src) {
				if (src.length < 3)
					throw new Error("DecoderError::ShortData");
				let value = asU32(asU32(src[0] << 24) | asU32(src[1] << 16) | asU32(src[2] << 8) | asU32(src[3]));
				this.src = src;
				this.pos = 4;
				this.value = value;
				this.range = 255;
				this.bits = 8;
			}
			read_bool() {
				return this.read_prob(128);
			}
			read_prob(prob) {
				this.renorm();
				let split = asU32(1 + asU32((asU32(this.range - 1) * asU32(prob)) >> 8));
				let bit;
				if (asU32(this.value) < asU32(split << 24)) {
					this.range = split;
					bit = false;
				} else {
					this.range -= split;
					this.range = asU32(this.range);
					this.value -= asU32(split << 24);
					this.value = asU32(this.value);
					bit = true;
				}
				return bit;
			}
			read_bits(bits) {
				let val = 0;
				for (var i = 0; i < bits; i++) {
					val = (val << 1) | asU32(this.read_prob(128));
					val = asU32(val);
				}
				return asU32(val);
			}
			read_probability() {
				let val = asU8(this.read_bits(7));
				if (val == 0) {
					return 1;
				} else {
					return asU8(val << 1);
				}
			}
			renorm() {
				let shift = ff_vp56_norm_shift[this.range];
				this.range <<= shift;
				this.value <<= shift;
				this.range = asU32(this.range);
				this.value = asU32(this.value);
				this.bits -= shift;
				if ((this.bits <= 0) && (this.pos < this.src.length)) {
					this.value |= (this.src[this.pos] << asU8(-this.bits));
					this.pos += 1;
					this.bits += 8;
				}
			}
			skip_bytes(nbytes) {
				for (var i = 0; i < nbytes; i++) {
					this.value <<= 8;
					if (this.pos < this.src.length) {
						this.value |= (this.src[this.pos]);
						this.pos += 1;
					}
				}
			}
		}
		function rescale_prob(prob, weights, maxval) {
			return asU8(Math.max(Math.min((((asU8(prob) * weights[0] + 128) >> 8) + weights[1]), maxval), 1));
		}
		const C1S7 = 64277;
		const C2S6 = 60547;
		const C3S5 = 54491;
		const C4S4 = 46341;
		const C5S3 = 36410;
		const C6S2 = 25080;
		const C7S1 = 12785;
		function mul16(a, b) {
			return (a * b) >> 16;
		}
		function vp_idct(coeffs) {
			let tmp = new Int32Array(64);
			for (var i = 0; i < 64; i += 8) {
				let t_a = mul16(C1S7, (coeffs[i + 1])) + mul16(C7S1, coeffs[i + 7]);
				let t_b = mul16(C7S1, (coeffs[i + 1])) - mul16(C1S7, coeffs[i + 7]);
				let t_c = mul16(C3S5, (coeffs[i + 3])) + mul16(C5S3, coeffs[i + 5]);
				let t_d = mul16(C3S5, (coeffs[i + 5])) - mul16(C5S3, coeffs[i + 3]);
				let t_a1 = mul16(C4S4, t_a - t_c);
				let t_b1 = mul16(C4S4, t_b - t_d);
				t_c = t_a + t_c;
				t_d = t_b + t_d;
				let t_e = mul16(C4S4, (coeffs[i] + coeffs[i + 4]));
				let t_f = mul16(C4S4, (coeffs[i] - coeffs[i + 4]));
				let t_g = mul16(C2S6, (coeffs[i + 2])) + mul16(C6S2, (coeffs[i + 6]));
				let t_h = mul16(C6S2, (coeffs[i + 2])) - mul16(C2S6, (coeffs[i + 6]));
				let t_e1 = t_e - t_g;
				t_g = t_e + t_g;
				t_a = t_f + t_a1;
				t_f = t_f - t_a1;
				t_b = t_b1 - t_h;
				t_h = t_b1 + t_h;
				tmp[i] = (t_g + t_c) | 0;
				tmp[i + 1] = (t_a + t_h) | 0;
				tmp[i + 2] = (t_a - t_h) | 0;
				tmp[i + 3] = (t_e1 + t_d) | 0;
				tmp[i + 4] = (t_e1 - t_d) | 0;
				tmp[i + 5] = (t_f + t_b) | 0;
				tmp[i + 6] = (t_f - t_b) | 0;
				tmp[i + 7] = (t_g - t_c) | 0;
			}
			for (var i = 0; i < 8; i++) {
				let t_a = mul16(C1S7, (tmp[8 + i])) + mul16(C7S1, tmp[56 + i]);
				let t_b = mul16(C7S1, (tmp[8 + i])) - mul16(C1S7, tmp[56 + i]);
				let t_c = mul16(C3S5, (tmp[24 + i])) + mul16(C5S3, tmp[40 + i]);
				let t_d = mul16(C3S5, (tmp[40 + i])) - mul16(C5S3, tmp[24 + i]);
				let t_a1 = mul16(C4S4, t_a - t_c);
				let t_b1 = mul16(C4S4, t_b - t_d);
				t_c = t_a + t_c;
				t_d = t_b + t_d;
				let t_e = mul16(C4S4, (tmp[i] + tmp[32 + i])) + 8;
				let t_f = mul16(C4S4, (tmp[i] - tmp[32 + i])) + 8;
				let t_g = mul16(C2S6, (tmp[16 + i])) + mul16(C6S2, (tmp[48 + i]));
				let t_h = mul16(C6S2, (tmp[16 + i])) - mul16(C2S6, (tmp[48 + i]));
				let t_e1 = t_e - t_g;
				t_g = t_e + t_g;
				t_a = t_f + t_a1;
				t_f = t_f - t_a1;
				t_b = t_b1 - t_h;
				t_h = t_b1 + t_h;
				coeffs[i] = (t_g + t_c) >> 4;
				coeffs[8 + i] = (t_a + t_h) >> 4;
				coeffs[16 + i] = (t_a - t_h) >> 4;
				coeffs[24 + i] = (t_e1 + t_d) >> 4;
				coeffs[32 + i] = (t_e1 - t_d) >> 4;
				coeffs[40 + i] = (t_f + t_b) >> 4;
				coeffs[48 + i] = (t_f - t_b) >> 4;
				coeffs[56 + i] = (t_g - t_c) >> 4;
			}
		}
		function vp_idct_dc(coeffs) {
			let dc = asI16((mul16(C4S4, mul16(C4S4, coeffs[0])) + 8) >> 4);
			for (let i = 0; i < 64; i++) {
				coeffs[i] = dc;
			}
		}
		function vp_put_block(coeffs, bx, by, plane, frm) {
			var data = frm.data;
			vp_idct(coeffs);
			let off = frm.offset[plane] + ((bx * 8) + ((by * 8) * frm.stride[plane]));
			for (var y = 0; y < 8; y++) {
				for (var x = 0; x < 8; x++) {
					data[off + x] = Math.max(Math.min((coeffs[x + (y * 8)] + 128), 255), 0) | 0;
				}
				off += frm.stride[plane];
			}
		}
		function vp_put_block_ilace(coeffs, bx, by, plane, frm) {
			var data = frm.data;
			vp_idct(coeffs);
			let off = frm.offset[plane] + bx * 8 + ((by - 1) * 8 + (by + 1)) * frm.stride[plane];
			for (let y = 0; y < 8; y++) {
				for (let x = 0; x < 8; x++) {
					data[off + x] = Math.max(Math.min((coeffs[x + y * 8] + 128), 255), 0) | 0;
				}
				off += frm.stride[plane] * 2;
			}
		}
		function vp_put_block_dc(coeffs, bx, by, plane, frm) {
			var data = frm.data;
			vp_idct_dc(coeffs);
			let dc = (Math.max(Math.min((coeffs[0] + 128), 255), 0)) | 0;
			let off = frm.offset[plane] + bx * 8 + by * 8 * frm.stride[plane];
			for (let y = 0; y < 8; y++) {
				for (let x = 0; x < 8; x++) {
					data[off + x] = dc;
				}
				off += frm.stride[plane];
			}
		}
		function vp_add_block(coeffs, bx, by, plane, frm) {
			var data = frm.data;
			vp_idct(coeffs);
			let off = frm.offset[plane] + bx * 8 + by * 8 * frm.stride[plane];
			for (let y = 0; y < 8; y++) {
				for (let x = 0; x < 8; x++) {
					data[off + x] = Math.max(Math.min((coeffs[x + y * 8] + asI16(data[off + x])), 255), 0) | 0;
				}
				off += frm.stride[plane];
			}
		}
		function vp_add_block_ilace(coeffs, bx, by, plane, frm) {
			var data = frm.data;
			vp_idct(coeffs);
			let off = frm.offset[plane] + bx * 8 + ((by - 1) * 8 + (by + 1)) * frm.stride[plane];
			for (let y = 0; y < 8; y++) {
				for (let x = 0; x < 8; x++) {
					data[off + x] = Math.max(Math.min((coeffs[x + y * 8] + asI16(data[off + x])), 255), 0) | 0;
				}
				off += frm.stride[plane] * 2;
			}
		}
		function vp_add_block_dc(coeffs, bx, by, plane, frm) {
			var data = frm.data;
			vp_idct_dc(coeffs);
			let dc = coeffs[0];
			let off = frm.offset[plane] + bx * 8 + by * 8 * frm.stride[plane];
			for (let y = 0; y < 8; y++) {
				for (let x = 0; x < 8; x++) {
					data[off + x] = Math.max(Math.min((dc + asI16(data[off + x])), 255), 0) | 0;
				}
				off += frm.stride[plane];
			}
		}
		function vp31_loop_filter(data, off, step, stride, len, loop_str) {
			for (let _ = 0; _ < len; _++) {
				let a = asI16(data[off - step * 2]);
				let b = asI16(data[off - step]);
				let c = asI16(data[off]);
				let d = asI16(data[off + step]);
				let diff = ((a - d) + 3 * (c - b) + 4) >> 3;
				if (Math.abs(diff) >= 2 * loop_str) {
					diff = 0;
				} else if (Math.abs(diff) >= loop_str) {
					if (diff < 0) diff = -diff - 2 * loop_str;
					else diff = -diff + 2 * loop_str;
				}
				if (diff != 0) {
					data[off - step] = Math.min(Math.max((b + diff), 0), 255) | 0;
					data[off] = Math.min(Math.max((c - diff), 0), 255) | 0;
				}
				off += stride;
			}
		}
		class VP56Header {
			constructor() {
				this.is_intra = false;
				this.is_golden = false;
				this.quant = 0;
				this.multistream = false;
				this.use_huffman = false;
				this.version = 0;
				this.profile = 0;
				this.interlaced = false;
				this.offset = 0;
				this.mb_w = 0;
				this.mb_h = 0;
				this.disp_w = 0;
				this.disp_h = 0;
				this.scale = 0;
			}
		}
		class CoeffReader {
			constructor(type, value) {
				this.type = type;
				this.value = value;
			}
		}
		CoeffReader.None = 1;
		CoeffReader.Bool = 2;
		class VP56MVModel {
			constructor() {
				this.nz_prob = 0;
				this.sign_prob = 0;
				this.raw_probs = new Uint8Array(8);
				this.tree_probs = new Uint8Array(7);
			}
		}
		class VP56MBTypeModel {
			constructor() {
				this.probs = new Uint8Array(10);
			}
		}
		class VP56CoeffModel {
			constructor() {
				this.dc_token_probs = [[new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)]];
				this.dc_value_probs = new Uint8Array(11);
				this.ac_ctype_probs = [[[new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)]], [[new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)]], [[new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)]]];
				this.ac_type_probs = [[[[new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)]], [[new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)]], [[new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)], [new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5), new Uint8Array(5)]]]];
				this.ac_val_probs = [[new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11)], [new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11)], [new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11), new Uint8Array(11)]];
			}
		}
		class VP6Models {
			constructor() {
				this.scan_order = new Uint32Array(64);
				this.scan = new Uint32Array(64);
				this.zigzag = new Uint32Array(64);
				this.zero_run_probs = [new Uint8Array(14), new Uint8Array(14)];
			}
		}
		const VP56_DC_QUANTS = new Int16Array([47, 47, 47, 47, 45, 43, 43, 43, 43, 43, 42, 41, 41, 40, 40, 40, 40, 35, 35, 35, 35, 33, 33, 33, 33, 32, 32, 32, 27, 27, 26, 26, 25, 25, 24, 24, 23, 23, 19, 19, 19, 19, 18, 18, 17, 16, 16, 16, 16, 16, 15, 11, 11, 11, 10, 10, 9, 8, 7, 5, 3, 3, 2, 2]);
		const VP56_AC_QUANTS = new Int16Array([94, 92, 90, 88, 86, 82, 78, 74, 70, 66, 62, 58, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 40, 39, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10,  9, 8, 7, 6, 5, 4, 3, 2, 1]);
		const VP56_FILTER_LIMITS = new Uint8Array([14, 14, 13, 13, 12, 12, 10, 10, 10, 10,  8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2]);
		const VP56_MODE_VQ = [[new Uint8Array([9, 15, 32, 25, 7, 19, 9, 21, 1, 12, 14, 12, 3, 18, 14, 23, 3, 10, 0, 4]), new Uint8Array([48, 39, 1, 2, 11, 27, 29, 44, 7, 27, 1, 4, 0, 3, 1, 6, 1, 2, 0, 0]), new Uint8Array([21, 32, 1, 2, 4, 10, 32, 43, 6, 23, 2, 3, 1, 19, 1, 6, 12, 21, 0, 7]), new Uint8Array([69, 83, 0, 0, 0, 2, 10, 29, 3, 12, 0, 1, 0, 3, 0, 3, 2, 2, 0, 0]), new Uint8Array([11, 20, 1, 4, 18, 36, 43, 48, 13, 35, 0, 2, 0, 5, 3, 12, 1, 2, 0, 0]), new Uint8Array([70, 44, 0, 1, 2, 10, 37, 46, 8, 26, 0, 2, 0, 2, 0, 2, 0, 1, 0, 0]), new Uint8Array([8, 15, 0, 1, 8, 21, 74, 53, 22, 42, 0, 1, 0, 2, 0, 3, 1, 2, 0, 0]), new Uint8Array([141, 42, 0, 0, 1, 4, 11, 24, 1, 11, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0]), new Uint8Array([8, 19, 4, 10, 24, 45, 21, 37, 9, 29, 0, 3, 1, 7, 11, 25, 0, 2, 0, 1]), new Uint8Array([46, 42, 0, 1, 2, 10, 54, 51, 10, 30, 0, 2, 0, 2, 0, 1, 0, 1, 0, 0]), new Uint8Array([28, 32, 0, 0, 3, 10, 75, 51, 14, 33, 0, 1, 0, 2, 0, 1, 1, 2, 0, 0]), new Uint8Array([100, 46, 0, 1, 3, 9, 21, 37, 5, 20, 0, 1, 0, 2, 1, 2, 0, 1, 0, 0]), new Uint8Array([27, 29, 0, 1, 9, 25, 53, 51, 12, 34, 0, 1, 0, 3, 1, 5, 0, 2, 0, 0]), new Uint8Array([80, 38, 0, 0, 1, 4, 69, 33, 5, 16, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0]), new Uint8Array([16, 20, 0, 0, 2, 8, 104, 49, 15, 33, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0]), new Uint8Array([194, 16, 0, 0, 1, 1, 1, 9, 1, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0])], [new Uint8Array([41, 22, 1, 0, 1, 31, 0, 0, 0, 0, 0, 1, 1, 7, 0, 1, 98, 25, 4, 10]), new Uint8Array([123, 37, 6, 4, 1, 27, 0, 0, 0, 0, 5, 8, 1, 7, 0, 1, 12, 10, 0, 2]), new Uint8Array([26, 14, 14, 12, 0, 24, 0, 0, 0, 0, 55, 17, 1, 9, 0, 36, 5, 7, 1, 3]), new Uint8Array([209, 5, 0, 0, 0, 27, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]), new Uint8Array([2, 5, 4, 5, 0, 121, 0, 0, 0, 0, 0, 3, 2, 4, 1, 4, 2, 2, 0, 1]), new Uint8Array([175, 5, 0, 1, 0, 48, 0, 0, 0, 0, 0, 2, 0, 1, 0, 2, 0, 1, 0, 0]), new Uint8Array([83, 5, 2, 3, 0, 102, 0, 0, 0, 0, 1, 3, 0, 2, 0, 1, 0, 0, 0, 0]), new Uint8Array([233, 6, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0]), new Uint8Array([34, 16, 112, 21, 1, 28, 0, 0, 0, 0, 6, 8, 1, 7, 0, 3, 2, 5, 0, 2]), new Uint8Array([159, 35, 2, 2, 0, 25, 0, 0, 0, 0, 3, 6, 0, 5, 0, 1, 4, 4, 0, 1]), new Uint8Array([75, 39, 5, 7, 2, 48, 0, 0, 0, 0, 3, 11, 2, 16, 1, 4, 7, 10, 0, 2]), new Uint8Array([212, 21, 0, 1, 0, 9, 0, 0, 0, 0, 1, 2, 0, 2, 0, 0, 2, 2, 0, 0]), new Uint8Array([4, 2, 0, 0, 0, 172, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 2, 0, 0, 0]), new Uint8Array([187, 22, 1, 1, 0, 17, 0, 0, 0, 0, 3, 6, 0, 4, 0, 1, 4, 4, 0, 1]), new Uint8Array([133, 6, 1, 2, 1, 70, 0, 0, 0, 0, 0, 2, 0, 4, 0, 3, 1, 1, 0, 0]), new Uint8Array([251, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])], [new Uint8Array([2, 3, 2, 3, 0, 2, 0, 2, 0, 0, 11, 4, 1, 4, 0, 2, 3, 2, 0, 4]), new Uint8Array([49, 46, 3, 4, 7, 31, 42, 41, 0, 0, 2, 6, 1, 7, 1, 4, 2, 4, 0, 1]), new Uint8Array([26, 25, 1, 1, 2, 10, 67, 39, 0, 0, 1, 1, 0, 14, 0, 2, 31, 26, 1, 6]), new Uint8Array([103, 46, 1, 2, 2, 10, 33, 42, 0, 0, 1, 4, 0, 3, 0, 1, 1, 3, 0, 0]), new Uint8Array([14, 31, 9, 13, 14, 54, 22, 29, 0, 0, 2, 6, 4, 18, 6, 13, 1, 5, 0, 1]), new Uint8Array([85, 39, 0, 0, 1, 9, 69, 40, 0, 0, 0, 1, 0, 3, 0, 1, 2, 3, 0, 0]), new Uint8Array([31, 28, 0, 0, 3, 14, 130, 34, 0, 0, 0, 1, 0, 3, 0, 1, 3, 3, 0, 1]), new Uint8Array([171, 25, 0, 0, 1, 5, 25, 21, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]), new Uint8Array([17, 21, 68, 29, 6, 15, 13, 22, 0, 0, 6, 12, 3, 14, 4, 10, 1, 7, 0, 3]), new Uint8Array([51, 39, 0, 1, 2, 12, 91, 44, 0, 0, 0, 2, 0, 3, 0, 1, 2, 3, 0, 1]), new Uint8Array([81, 25, 0, 0, 2, 9, 106, 26, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0]), new Uint8Array([140, 37, 0, 1, 1, 8, 24, 33, 0, 0, 1, 2, 0, 2, 0, 1, 1, 2, 0, 0]), new Uint8Array([14, 23, 1, 3, 11, 53, 90, 31, 0, 0, 0, 3, 1, 5, 2, 6, 1, 2, 0, 0]), new Uint8Array([123, 29, 0, 0, 1, 7, 57, 30, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0]), new Uint8Array([13, 14, 0, 0, 4, 20, 175, 20, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0]), new Uint8Array([202, 23, 0, 0, 1, 3, 2, 9, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0])]];
		const INVALID_REF = 42;
		class VP56Models {
			constructor() {
				this.mv_models = [new VP56MVModel(), new VP56MVModel()];
				this.mbtype_models = [[new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel()], [new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel()], [new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel(), new VP56MBTypeModel()]];
				this.coeff_models = [new VP56CoeffModel(), new VP56CoeffModel()];
				this.prob_xmitted = [new Uint8Array(20), new Uint8Array(20), new Uint8Array(20)];
				this.vp6models = new VP6Models();
			}
		}
		class MBInfo {
			constructor() {
				this.mb_type = new VPMBType(VPMBType.Intra);
				this.mv = new MV(0, 0);
			}
		}
		class FrameState {
			constructor() {
				this.mb_x = 0;
				this.mb_y = 0;
				this.plane = 0;
				this.coeff_cat = [new Uint8Array(64), new Uint8Array(64), new Uint8Array(64), new Uint8Array(64)];
				this.last_idx = new Uint32Array(4);
				this.top_ctx = 0;
				this.ctx_idx = 0;
				this.dc_quant = 0;
				this.ac_quant = 0;
				this.dc_zero_run = new Uint32Array(2);
				this.ac_zero_run = new Uint32Array(2);
			}
		}
		class VP56DCPred {
			constructor() {
				this.dc_y = new Int16Array(0);
				this.dc_u = new Int16Array(0);
				this.dc_v = new Int16Array(0);
				this.ldc_y = new Int16Array(2);
				this.ldc_u = 0;
				this.ldc_v = 0;
				this.ref_y = new Uint8Array(0);
				this.ref_c = new Uint8Array(0);
				this.ref_left = 0;
				this.y_idx = 0;
				this.c_idx = 0;
			}
			reset() {
				this.update_row();
				for (var i = 1; i < this.ref_y.length; i++) this.ref_y[i] = INVALID_REF;
				for (var i = 1; i < this.ref_c.length; i++) this.ref_c[i] = INVALID_REF;
			}
			update_row() {
				this.y_idx = 1;
				this.c_idx = 1;
				this.ldc_y = new Int16Array(2);
				this.ldc_u = 0;
				this.ldc_v = 0;
				this.ref_left = INVALID_REF;
			}
			resize(mb_w) {
				this.dc_y = new Int16Array(mb_w * 2 + 2);
				this.dc_u = new Int16Array(mb_w + 2);
				this.dc_v = new Int16Array(mb_w + 2);
				this.ref_y = new Uint8Array(mb_w * 2 + 2);
				this.ref_y.fill(INVALID_REF);
				this.ref_c = new Uint8Array(mb_w + 2);
				this.ref_c.fill(INVALID_REF);
				this.ref_c[0] = 0;
			}
			next_mb() {
				this.y_idx += 2;
				this.c_idx += 1;
			}
		}
		function rescale_mb_mode_prob(prob, total) {
			return asU8(255 * prob / (1 + total));
		}
		function map_mb_type(mbtype) {
			switch(mbtype.type) {
				case VPMBType.InterNoMV: return 0;
				case VPMBType.Intra: return 1;
				case VPMBType.InterMV: return 2;
				case VPMBType.InterNearest: return 3;
				case VPMBType.InterNear: return 4;
				case VPMBType.GoldenNoMV: return 5;
				case VPMBType.GoldenMV: return 6;
				case VPMBType.InterFourMV: return 7;
				case VPMBType.GoldenNearest: return 8;
				case VPMBType.GoldenNear: return 9;
			}
		}
		class VP56Decoder {
			constructor(version, hasAlpha, flip) {
				let vt = alloc_video_buffer(new NAVideoInfo(24, 24, false, VP_YUVA420_FORMAT), 4);
				this.version = version;
				this.has_alpha = hasAlpha;
				this.flip = flip;
				this.shuf = new VPShuffler();
				this.width = 0;
				this.height = 0;
				this.mb_w = 0;
				this.mb_h = 0;
				this.models = new VP56Models();
				this.amodels = new VP56Models();
				this.coeffs = [new Int16Array(64), new Int16Array(64), new Int16Array(64), new Int16Array(64), new Int16Array(64), new Int16Array(64)];
				this.last_mbt = new VPMBType(VPMBType.InterNoMV);
				this.loop_thr = 0;
				this.ilace_prob = 0;
				this.ilace_mb = false;
				this.mb_info = [];
				this.fstate = new FrameState();
				this.dc_pred = new VP56DCPred();
				this.last_dc = [new Int16Array(4), new Int16Array(4), new Int16Array(4)];
				this.top_ctx = [new Uint8Array(0), new Uint8Array(0), new Uint8Array(0), new Uint8Array(0)];
				this.mc_buf = vt.get_vbuf();
			}
			set_dimensions(width, height) {
				this.width = width;
				this.height = height;
				this.mb_w = (this.width + 15) >> 4;
				this.mb_h = (this.height + 15) >> 4;
				this.mb_info = [];
				for (var i = 0; i < this.mb_w * this.mb_h; i++) {
					this.mb_info.push(new MBInfo());
				}
				this.top_ctx = [new Uint8Array(this.mb_w * 2), new Uint8Array(this.mb_w), new Uint8Array(this.mb_w), new Uint8Array(this.mb_w * 2)];
			}
			init(supp, vinfo) {
				supp.pool_u8.set_dec_bufs(3 + (vinfo.get_format().has_alpha() ? 1 : 0));
				supp.pool_u8.prealloc_video(new NAVideoInfo(vinfo.get_width(), vinfo.get_height(), false, vinfo.get_format()), 4);
				this.set_dimensions(vinfo.get_width(), vinfo.get_height());
				this.dc_pred.resize(this.mb_w);
			}
			decode_frame(supp, src, br) {
				let aoffset;
				let bc;
				if (this.has_alpha) {
					validate(src.length >= 7);
					aoffset = ((src[0]) << 16) | ((src[1]) << 8) | (src[2]);
					validate((aoffset > 0) && (aoffset < src.length - 3));
					bc = new BoolCoder(src.subarray(3));
				} else {
					validate(src.length >= 4);
					aoffset = src.length;
					bc = new BoolCoder(src);
				}
				let hdr = br.parseHeader(bc);
				validate((hdr.offset) < aoffset);
				if (hdr.mb_w != 0 && (hdr.mb_w != this.mb_w || hdr.mb_h != this.mb_h)) {
					this.set_dimensions(hdr.mb_w * 16, hdr.mb_h * 16);
				}
				let fmt = this.has_alpha ? VP_YUVA420_FORMAT : YUV420_FORMAT;
				let vinfo = new NAVideoInfo(this.width, this.height, this.flip, fmt);
				let ret = supp.pool_u8.get_free();
				if (ret === null) throw new Error("DecoderError::AllocError");
				let buf = ret;
				if (!buf.get_info().eq(vinfo)) {
					this.shuf.clear();
					supp.pool_u8.reset();
					supp.pool_u8.prealloc_video(vinfo, 4);
					let ret = supp.pool_u8.get_free();
					if (ret === null) throw new Error("DecoderError::AllocError");
					buf = ret;
				}
				let dframe = NASimpleVideoFrame.from_video_buf(buf);
				if (hdr.is_intra) {
					this.shuf.clear();
				} else {
					if (!this.shuf.has_refs()) {
						throw new Error("DecoderError::MissingReference");
					}
				}
				let psrc = src.subarray(this.has_alpha ? 3 : 0);
				this.decode_planes(br, dframe, bc, hdr, psrc, false);
				if (this.has_alpha) {
					let asrc = src.subarray(aoffset + 3);
					let _bc = new BoolCoder(asrc);
					let ahdr = br.parseHeader(_bc);
					validate(ahdr.mb_w == hdr.mb_w && ahdr.mb_h == hdr.mb_h);
					var models = this.models;
					this.models = this.amodels;
					this.decode_planes(br, dframe, _bc, ahdr, asrc, true);
					this.models = models;
					if (hdr.is_golden && ahdr.is_golden) {
						this.shuf.add_golden_frame(buf.cloned());
					} else if (hdr.is_golden && !ahdr.is_golden) {
						let cur_golden = this.shuf.get_golden();
						let off = cur_golden.get_offset(3);
						let stride = cur_golden.get_stride(3);
						let new_golden = supp.pool_u8.get_copy(buf);
						let dst = new_golden.get_data();
						let _src = cur_golden.get_data();
						dst.set(_src.subarray(off, off + (stride * this.mb_h * 16)), off);
						this.shuf.add_golden_frame(new_golden);
					} else if (!hdr.is_golden && ahdr.is_golden) {
						let cur_golden = this.shuf.get_golden();
						let off = cur_golden.get_offset(3);
						let stride = cur_golden.get_stride(3);
						let new_golden = supp.pool_u8.get_copy(cur_golden);
						let dst = new_golden.get_data();
						let _src = buf.get_data();
						dst.set(_src.subarray(off, off + (stride * this.mb_h * 16)), off);
						this.shuf.add_golden_frame(new_golden);
					}
				}
				if (hdr.is_golden && !this.has_alpha) this.shuf.add_golden_frame(buf.cloned());
				this.shuf.add_frame(buf.cloned());
				return [new NABufferType(NABufferType.Video, buf), hdr.is_intra];
			}
			reset_mbtype_models() {
				const DEFAULT_XMITTED_PROBS = [new Uint8Array([42, 69, 2, 1, 7, 1, 42, 44, 22, 6, 3, 1, 2, 0, 5, 1, 1, 0, 0, 0]), new Uint8Array([8, 229, 1, 1, 8, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 0, 1, 1, 0, 0]), new Uint8Array([35, 122, 1, 1, 6, 1, 34, 46, 0, 0, 2, 1, 1, 0, 1, 0, 1, 1, 0, 0])];
				this.models.prob_xmitted[0].set(DEFAULT_XMITTED_PROBS[0], 0);
				this.models.prob_xmitted[1].set(DEFAULT_XMITTED_PROBS[1], 0);
				this.models.prob_xmitted[2].set(DEFAULT_XMITTED_PROBS[2], 0);
			}
			decode_planes(br, dframe, bc, hdr, src, alpha) {
				let cr;
				if (hdr.multistream) {
					let off = +hdr.offset.toString();
					if (!hdr.use_huffman) {
						let bc2 = new BoolCoder(src.subarray(off));
						cr = new CoeffReader(CoeffReader.Bool, bc2);
					} else {
						throw new Error("UnimplementedDecoding use_huffman");
					}
				} else {
					cr = new CoeffReader(CoeffReader.None);
				}
				if (hdr.is_intra) {
					br.reset_models(this.models);
					this.reset_mbtype_models();
				} else {
					this.decode_mode_prob_models(bc);
					br.decode_mv_models(bc, this.models.mv_models);
				}
				br.decode_coeff_models(bc, this.models, hdr.is_intra);
				if (hdr.use_huffman) {
					throw new Error("UnimplementedDecoding use_huffman");
				}
				if (hdr.interlaced) {
					this.ilace_prob = asU8(bc.read_bits(8));
				}
				this.fstate = new FrameState();
				this.fstate.dc_quant = asI16(VP56_DC_QUANTS[hdr.quant] * 4);
				this.fstate.ac_quant = asI16(VP56_AC_QUANTS[hdr.quant] * 4);
				this.loop_thr = asI16(VP56_FILTER_LIMITS[hdr.quant]);
				this.last_mbt = new VPMBType(VPMBType.InterNoMV);
				for (var i = 0; i < this.top_ctx.length; i++) {
					var vec = this.top_ctx[i];
					vec.fill(0);
				}
				this.last_dc = [new Int16Array(4), new Int16Array(4), new Int16Array(4)];
				this.last_dc[0][1] = 0x80;
				this.last_dc[0][2] = 0x80;
				this.dc_pred.reset();
				this.ilace_mb = false;
				for (var mb_y = 0; mb_y < this.mb_h; mb_y++) {
					this.fstate.mb_y = mb_y;
					this.fstate.coeff_cat[0].fill(0);
					this.fstate.coeff_cat[1].fill(0);
					this.fstate.coeff_cat[2].fill(0);
					this.fstate.coeff_cat[3].fill(0);
					this.fstate.last_idx.fill(24);
					for (var mb_x = 0; mb_x < this.mb_w; mb_x++) {
						this.fstate.mb_x = mb_x;
						this.decode_mb(dframe, bc, cr, br, hdr, alpha);
						this.dc_pred.next_mb();
					}
					this.dc_pred.update_row();
				}
			}
			decode_mode_prob_models(bc) {
				for (let ctx = 0; ctx < 3; ctx++) {
					if (bc.read_prob(174)) {
						let idx = bc.read_bits(4);
						for (let i = 0; i < 20; i++) {
							this.models.prob_xmitted[ctx][i ^ 1] = VP56_MODE_VQ[ctx][idx][i];
						}
					}
					if (bc.read_prob(254)) {
						for (let set = 0; set < 20; set++) {
							if (bc.read_prob(205)) {
								let sign = bc.read_bool();
								let diff = (bc.read_prob(171) ? (bc.read_prob(199) ? bc.read_bits(7) : (bc.read_prob(140) ? 3 : (bc.read_prob(125) ? 4 : (bc.read_prob(104) ? 5 : 6)))) : (bc.read_prob(83) ? 1 : 2)) * 4;
								validate(diff < 256);
								let _diff = asU8(diff);
								if (!sign) {
									validate(this.models.prob_xmitted[ctx][set ^ 1] <= 255 - _diff);
									this.models.prob_xmitted[ctx][set ^ 1] += _diff;
								} else {
									validate(this.models.prob_xmitted[ctx][set ^ 1] >= _diff);
									this.models.prob_xmitted[ctx][set ^ 1] -= _diff;
								}
							}
						}
					}
				}
				for (let ctx = 0; ctx < 3; ctx++) {
					let prob_xmitted = this.models.prob_xmitted[ctx];
					for (let mode = 0; mode < 10; mode++) {
						let mdl = this.models.mbtype_models[ctx][mode];
						let cnt = new Uint32Array(10);
						let total = 0;
						for (let i = 0; i < 10; i++) {
							if (i == mode) continue;
							cnt[i] = 100 * asU32(prob_xmitted[i * 2]);
							total += cnt[i];
						}
						let sum = asU32(prob_xmitted[mode * 2]) + asU32(prob_xmitted[mode * 2 + 1]);
						mdl.probs[9] = 255 - rescale_mb_mode_prob(asU32(prob_xmitted[mode * 2 + 1]), sum);
						let inter_mv0_weight = cnt[0] + cnt[2];
						let inter_mv1_weight = cnt[3] + cnt[4];
						let gold_mv0_weight = cnt[5] + cnt[6];
						let gold_mv1_weight = cnt[8] + cnt[9];
						let mix_weight = cnt[1] + cnt[7];
						mdl.probs[0] = 1 + rescale_mb_mode_prob(inter_mv0_weight + inter_mv1_weight, total);
						mdl.probs[1] = 1 + rescale_mb_mode_prob(inter_mv0_weight, inter_mv0_weight + inter_mv1_weight);
						mdl.probs[2] = 1 + rescale_mb_mode_prob(mix_weight, mix_weight + gold_mv0_weight + gold_mv1_weight);
						mdl.probs[3] = 1 + rescale_mb_mode_prob(cnt[0], inter_mv0_weight);
						mdl.probs[4] = 1 + rescale_mb_mode_prob(cnt[3], inter_mv1_weight);
						mdl.probs[5] = 1 + rescale_mb_mode_prob(cnt[1], mix_weight);
						mdl.probs[6] = 1 + rescale_mb_mode_prob(gold_mv0_weight, gold_mv0_weight + gold_mv1_weight);
						mdl.probs[7] = 1 + rescale_mb_mode_prob(cnt[5], gold_mv0_weight);
						mdl.probs[8] = 1 + rescale_mb_mode_prob(cnt[8], gold_mv1_weight);
					}
				}
			}
			find_mv_pred(ref_id) {
				const CAND_POS = [new Int8Array([-1, 0]), new Int8Array([0, -1]), new Int8Array([-1, -1]), new Int8Array([-1, 1]), new Int8Array([-2, 0]), new Int8Array([0, -2]), new Int8Array([-1, -2]), new Int8Array([-2, -1]), new Int8Array([-2, 1]), new Int8Array([-1, 2]), new Int8Array([-2, -2]), new Int8Array([-2, 2])];
				let nearest_mv = ZERO_MV;
				let near_mv = ZERO_MV;
				let pred_mv = ZERO_MV;
				let num_mv = 0;
				for (let i = 0; i < CAND_POS.length; i++) {
					let [yoff, xoff] = CAND_POS[i];
					let cx = (this.fstate.mb_x) + xoff;
					let cy = (this.fstate.mb_y) + yoff;
					if ((cx < 0) || (cy < 0)) continue;
					if ((cx >= this.mb_w) || (cy >= this.mb_h)) continue;
					let mb_pos = cx + cy * this.mb_w;
					let mv = this.mb_info[mb_pos].mv;
					if ((this.mb_info[mb_pos].mb_type.get_ref_id() != ref_id) || mv.eq(ZERO_MV)) continue;
					if (num_mv == 0) {
						nearest_mv = mv;
						num_mv += 1;
						if ((this.version > 5) && (i < 2)) pred_mv = mv;
					} else if (!(mv.eq(nearest_mv))) {
						near_mv = mv;
						num_mv += 1;
						break;
					}
				}
				return [num_mv, nearest_mv, near_mv, pred_mv];
			}
			decode_mb_type(bc, ctx) {
				let probs = this.models.mbtype_models[ctx][map_mb_type(this.last_mbt)].probs;
				if (!bc.read_prob(probs[9])) this.last_mbt = bc.read_prob(probs[0]) ? (bc.read_prob(probs[2]) ? (bc.read_prob(probs[6]) ? (bc.read_prob(probs[8]) ? new VPMBType(VPMBType.GoldenNear) : new VPMBType(VPMBType.GoldenNearest)) : (bc.read_prob(probs[7]) ? new VPMBType(VPMBType.GoldenMV) : new VPMBType(VPMBType.GoldenNoMV))) : (bc.read_prob(probs[5]) ? new VPMBType(VPMBType.InterFourMV) : new VPMBType(VPMBType.Intra))) : (bc.read_prob(probs[1]) ? (bc.read_prob(probs[4]) ? new VPMBType(VPMBType.InterNear) : new VPMBType(VPMBType.InterNearest)) : (bc.read_prob(probs[3]) ? new VPMBType(VPMBType.InterMV) : new VPMBType(VPMBType.InterNoMV)));
				return this.last_mbt;
			}
			decode_mb(frm, bc, cr, br, hdr, alpha) {
				const FOURMV_SUB_TYPE = [new VPMBType(VPMBType.InterNoMV), new VPMBType(VPMBType.InterMV), new VPMBType(VPMBType.InterNearest), new VPMBType(VPMBType.InterNear)];
				let mb_x = this.fstate.mb_x;
				let mb_y = this.fstate.mb_y;
				this.coeffs[0].fill(0);
				this.coeffs[1].fill(0);
				this.coeffs[2].fill(0);
				this.coeffs[3].fill(0);
				this.coeffs[4].fill(0);
				this.coeffs[5].fill(0);
				let mb_pos = mb_x + mb_y * this.mb_w;
				let four_mv = [ZERO_MV, ZERO_MV, ZERO_MV, ZERO_MV];
				let four_mbt = [new VPMBType(VPMBType.Intra), new VPMBType(VPMBType.Intra), new VPMBType(VPMBType.Intra), new VPMBType(VPMBType.Intra)];
				if (hdr.interlaced) {
					let iprob = this.ilace_prob;
					let prob;
					if (mb_x == 0) {
						prob = iprob;
					} else if (!this.ilace_mb) {
						prob = asU8(iprob + asU8(((256 - asU16(iprob)) >> 1)));
					} else {
						prob = asU8(iprob - (iprob >> 1));
					}
					this.ilace_mb = bc.read_prob(prob);
				}
				let num_mv;
				let nearest_mv;
				let near_mv;
				let pred_mv;
				if (hdr.is_intra) {
					num_mv = 0;
					nearest_mv = ZERO_MV;
					near_mv = ZERO_MV;
					pred_mv = ZERO_MV;
				} else {
					var ggdfd = this.find_mv_pred(VP_REF_INTER);
					num_mv = ggdfd[0];
					nearest_mv = ggdfd[1];
					near_mv = ggdfd[2];
					pred_mv = ggdfd[3];
				}
				let mb_type;
				if (hdr.is_intra) mb_type = new VPMBType(VPMBType.Intra);
				else mb_type = this.decode_mb_type(bc, (num_mv + 1) % 3);
				this.mb_info[mb_pos].mb_type = mb_type;
				if (mb_type.get_ref_id() != VP_REF_GOLDEN) {
					switch (mb_type.type) {
						case VPMBType.Intra:
						case VPMBType.InterNoMV:
							this.mb_info[mb_pos].mv = ZERO_MV;
							break;
						case VPMBType.InterMV:
							let diff_mv = this.decode_mv(bc, br);
							this.mb_info[mb_pos].mv = pred_mv.add(diff_mv);
							break;
						case VPMBType.InterNearest:
							this.mb_info[mb_pos].mv = nearest_mv;
							break;
						case VPMBType.InterNear:
							this.mb_info[mb_pos].mv = near_mv;
							break;
						case VPMBType.InterFourMV:
							for (var i = 0; i < 4; i++) {
								four_mbt[i] = FOURMV_SUB_TYPE[bc.read_bits(2)];
							}
							for (var i = 0; i < 4; i++) {
								switch (four_mbt[i].type) {
									case VPMBType.InterNoMV:
										break;
									case VPMBType.InterMV:
										let diff_mv = this.decode_mv(bc, br);
										four_mv[i] = pred_mv.add(diff_mv);
										break;
									case VPMBType.InterNearest:
										four_mv[i] = nearest_mv;
										break;
									case VPMBType.InterNear:
										four_mv[i] = near_mv;
										break;
									default:
										throw new Error("unreachable");
								}
							}
							this.mb_info[mb_pos].mv = four_mv[3];
							break;
						default:
							throw new Error("unreachable");
					}
				} else {
					let [_num_mv, nearest_mv, near_mv, pred_mv] = this.find_mv_pred(VP_REF_GOLDEN);
					switch (mb_type.type) {
						case VPMBType.GoldenNoMV:
							this.mb_info[mb_pos].mv = ZERO_MV;
							break;
						case VPMBType.GoldenMV:
							let diff_mv = this.decode_mv(bc, br);
							this.mb_info[mb_pos].mv = pred_mv.add(diff_mv);
							break;
						case VPMBType.GoldenNearest:
							this.mb_info[mb_pos].mv = nearest_mv;
							break;
						case VPMBType.GoldenNear:
							this.mb_info[mb_pos].mv = near_mv;
							break;
					}
				}
				if (!mb_type.is_intra() && (mb_type.type != VPMBType.InterFourMV)) {
					this.do_mc(br, frm, mb_type, this.mb_info[mb_pos].mv, alpha);
				} else if (mb_type.type == VPMBType.InterFourMV) {
					this.do_fourmv(br, frm, four_mv, alpha);
				}
				for (var blk_no = 0; blk_no < 4; blk_no++) {
					this.fstate.plane = (!alpha ? 0 : 3);
					this.fstate.ctx_idx = blk_no >> 1;
					this.fstate.top_ctx = this.top_ctx[this.fstate.plane][mb_x * 2 + (blk_no & 1)];
					switch (cr.type) {
						case CoeffReader.None:
							br.decode_block(bc, this.coeffs[blk_no], this.models.coeff_models[0], this.models.vp6models, this.fstate);
							break;
						case CoeffReader.Bool:
							br.decode_block(cr.value, this.coeffs[blk_no], this.models.coeff_models[0], this.models.vp6models, this.fstate);
							break;
					}
					this.top_ctx[this.fstate.plane][mb_x * 2 + (blk_no & 1)] = this.fstate.top_ctx;
					this.predict_dc(mb_type, mb_pos, blk_no, alpha);
					let bx = mb_x * 2 + (blk_no & 1);
					let by = mb_y * 2 + (blk_no >> 1);
					let has_ac = (this.fstate.last_idx[this.fstate.ctx_idx] > 0);
					if (mb_type.is_intra()) {
						if (!this.ilace_mb) {
							if (has_ac) {
								vp_put_block(this.coeffs[blk_no], bx, by, this.fstate.plane, frm);
							} else {
								vp_put_block_dc(this.coeffs[blk_no], bx, by, this.fstate.plane, frm);
							}
						} else {
							vp_put_block_ilace(this.coeffs[blk_no], bx, by, this.fstate.plane, frm);
						}
					} else {
						if (!this.ilace_mb) {
							if (has_ac) {
								vp_add_block(this.coeffs[blk_no], bx, by, this.fstate.plane, frm);
							} else {
								vp_add_block_dc(this.coeffs[blk_no], bx, by, this.fstate.plane, frm);
							}
						} else {
							vp_add_block_ilace(this.coeffs[blk_no], bx, by, this.fstate.plane, frm);
						}
					}
				}
				for (var blk_no = 4; blk_no < 6; blk_no++) {
					this.fstate.plane = blk_no - 3;
					this.fstate.ctx_idx = blk_no - 2;
					this.fstate.top_ctx = this.top_ctx[this.fstate.plane][mb_x];
					switch (cr.type) {
						case CoeffReader.None:
							br.decode_block(bc, this.coeffs[blk_no], this.models.coeff_models[1], this.models.vp6models, this.fstate);
							break;
						case CoeffReader.Bool:
							br.decode_block(cr.value, this.coeffs[blk_no], this.models.coeff_models[1], this.models.vp6models, this.fstate);
							break;
					}
					this.top_ctx[this.fstate.plane][mb_x] = this.fstate.top_ctx;
					this.predict_dc(mb_type, mb_pos, blk_no, alpha);
					if (!alpha) {
						let has_ac = this.fstate.last_idx[this.fstate.ctx_idx] > 0;
						if (mb_type.is_intra()) {
							if (has_ac) {
								vp_put_block(this.coeffs[blk_no], mb_x, mb_y, this.fstate.plane, frm);
							} else {
								vp_put_block_dc(this.coeffs[blk_no], mb_x, mb_y, this.fstate.plane, frm);
							}
						} else {
							if (has_ac) {
								vp_add_block(this.coeffs[blk_no], mb_x, mb_y, this.fstate.plane, frm);
							} else {
								vp_add_block_dc(this.coeffs[blk_no], mb_x, mb_y, this.fstate.plane, frm);
							}
						}
					}
				}
			}
			do_mc(br, frm, mb_type, mv, alpha) {
				let x = this.fstate.mb_x * 16;
				let y = this.fstate.mb_y * 16;
				let plane = ((!alpha) ? 0 : 3);
				let src;
				if (mb_type.get_ref_id() == VP_REF_INTER) src = this.shuf.get_last();
				else src = this.shuf.get_golden();
				br.mc_block(frm, this.mc_buf, src, plane, x + 0, y + 0, mv, this.loop_thr);
				br.mc_block(frm, this.mc_buf, src, plane, x + 8, y + 0, mv, this.loop_thr);
				br.mc_block(frm, this.mc_buf, src, plane, x + 0, y + 8, mv, this.loop_thr);
				br.mc_block(frm, this.mc_buf, src, plane, x + 8, y + 8, mv, this.loop_thr);
				if (!alpha) {
					let x = this.fstate.mb_x * 8;
					let y = this.fstate.mb_y * 8;
					br.mc_block(frm, this.mc_buf, src, 1, x, y, mv, this.loop_thr);
					br.mc_block(frm, this.mc_buf, src, 2, x, y, mv, this.loop_thr);
				}
			}
			do_fourmv(br, frm, mvs, alpha) {
				let x = this.fstate.mb_x * 16;
				let y = this.fstate.mb_y * 16;
				let plane;
				if (!alpha) {
					plane = 0;
				} else {
					plane = 3;
				};
				let src = this.shuf.get_last();
				for (let blk_no = 0; blk_no < 4; blk_no++) {
					br.mc_block(frm, this.mc_buf, src, plane, x + (blk_no & 1) * 8, y + (blk_no & 2) * 4, mvs[blk_no], this.loop_thr);
				}
				if (!alpha) {
					let x = this.fstate.mb_x * 8;
					let y = this.fstate.mb_y * 8;
					let sum = mvs[0].add(mvs[1].add(mvs[2].add(mvs[3])));
					let mv = new MV(asI16(sum.x / 4), asI16(sum.y / 4));
					br.mc_block(frm, this.mc_buf, src, 1, x, y, mv, this.loop_thr);
					br.mc_block(frm, this.mc_buf, src, 2, x, y, mv, this.loop_thr);
				}
			}
			decode_mv(bc, br) {
				let x = br.decode_mv(bc, this.models.mv_models[0]);
				let y = br.decode_mv(bc, this.models.mv_models[1]);
				return new MV(x, y);
			}
			predict_dc(mb_type, _mb_pos, blk_no, _alpha) {
				let is_luma = blk_no < 4;
				let plane;
				let dcs;
				switch (blk_no) {
					case 4:
						plane = 1;
						dcs = this.dc_pred.dc_u;
						break;
					case 5:
						plane = 2;
						dcs = this.dc_pred.dc_v;
						break;
					default:
						plane = 0;
						dcs = this.dc_pred.dc_y;
				}
				let dc_ref;
				let dc_idx;
				if (is_luma) {
					dc_ref = this.dc_pred.ref_y;
					dc_idx = this.dc_pred.y_idx + (blk_no & 1);
				} else {
					dc_ref = this.dc_pred.ref_c;
					dc_idx = this.dc_pred.c_idx;
				}
				let ref_id = mb_type.get_ref_id();
				let dc_pred = 0;
				let count = 0;
				let has_left_blk = is_luma && ((blk_no & 1) == 1);
				if (has_left_blk || this.dc_pred.ref_left == ref_id) {
					var _ = 0;
					switch (blk_no) {
						case 0:
						case 1:
							_ = this.dc_pred.ldc_y[0];
							break;
						case 2:
						case 3:
							_ = this.dc_pred.ldc_y[1];
							break;
						case 4:
							_ = this.dc_pred.ldc_u;
							break;
						default:
							_ = this.dc_pred.ldc_v;
					}
					dc_pred += _;
					count += 1;
				}
				if (dc_ref[dc_idx] == ref_id) {
					dc_pred += dcs[dc_idx];
					count += 1;
				}
				if (this.version == 5) {
					if ((count < 2) && (dc_ref[dc_idx - 1] == ref_id)) {
						dc_pred += dcs[dc_idx - 1];
						count += 1;
					}
					if ((count < 2) && (dc_ref[dc_idx + 1] == ref_id)) {
						dc_pred += dcs[dc_idx + 1];
						count += 1;
					}
				}
				if (count == 0) {
					dc_pred = this.last_dc[ref_id][plane];
				} else if (count == 2) {
					dc_pred /= 2;
					dc_pred = asI16(dc_pred);
				}
				this.coeffs[blk_no][0] += dc_pred;
				let dc = this.coeffs[blk_no][0];
				if (blk_no != 4) {
					dc_ref[dc_idx] = ref_id;
				}
				switch (blk_no) {
					case 0:
					case 1:
						this.dc_pred.ldc_y[0] = dc;
						break;
					case 2:
					case 3:
						this.dc_pred.ldc_y[1] = dc;
						break;
					case 4:
						this.dc_pred.ldc_u = dc;
						break;
					default:
						this.dc_pred.ldc_v = dc;
						this.dc_pred.ref_left = ref_id;
				}
				dcs[dc_idx] = dc;
				this.last_dc[ref_id][plane] = dc;
				this.coeffs[blk_no][0] = asI16(this.coeffs[blk_no][0] * this.fstate.dc_quant); 
			}
		}
		const TOKEN_LARGE = 5;
		const TOKEN_EOB = 42;
		function update_scan(model) {
			let idx = 1;
			for (var band = 0; band < 16; band++) {
				for (var i = 1; i < 64; i++) {
					if (model.scan_order[i] == band) {
						model.scan[idx] = i;
						idx += 1;
					}
				}
			}
			for (var i = 1; i < 64; i++) {
				model.zigzag[i] = ZIGZAG[model.scan[i]];
			}
		}
		function reset_scan(model, interlaced) {
			if (!interlaced) {
				model.scan_order.set(VP6_DEFAULT_SCAN_ORDER, 0);
			} else {
				model.scan_order.set(VP6_INTERLACED_SCAN_ORDER, 0);
			}
			for (var i = 0; i < 64; i++) {
				model.scan[i] = i;
			}
			model.zigzag.set(ZIGZAG, 0);
		}
		function expand_token_bc(bc, val_probs, token, version) {
			let sign = false;
			let level;
			if (token < TOKEN_LARGE) {
				if (token != 0) {
					sign = bc.read_bool();
				}
				level = asI16(token);
			} else {
				let cat = bc.read_prob(val_probs[6]) ? (bc.read_prob(val_probs[8]) ? (bc.read_prob(val_probs[10]) ? 5 : 4) : (bc.read_prob(val_probs[9]) ? 3 : 2)) : (bc.read_prob(val_probs[7]) ? 1 : 0);
				if (version == 5) {
					sign = bc.read_bool();
				}
				let add = 0;
				let add_probs = VP56_COEF_ADD_PROBS[cat];
				for (var i = 0; i < add_probs.length; i++) {
					var prob = add_probs[i];
					if (prob == 128) {
						break;
					}
					add = (add << 1) | asI16(bc.read_prob(prob));
				}
				if (version != 5) {
					sign = bc.read_bool();
				}
				level = asI16(VP56_COEF_BASE[cat] + asI16(add));
			}
			if (!sign) {
				return asI16(level);
			} else {
				return asI16(-level);
			}
		}
		function decode_token_bc(bc, probs, prob34, is_dc, has_nnz) {
			if (has_nnz && !bc.read_prob(probs[0])) {
				if (is_dc || bc.read_prob(probs[1])) {
					return 0;
				} else {
					return TOKEN_EOB;
				}
			} else {
				return asU8(bc.read_prob(probs[2]) ? (bc.read_prob(probs[3]) ? TOKEN_LARGE : (bc.read_prob(probs[4]) ? (bc.read_prob(prob34) ? 4 : 3) : 2)) : 1);
			}
		}
		function decode_zero_run_bc(bc, probs) {
			let val = bc.read_prob(probs[0]) ? (bc.read_prob(probs[4]) ? 42 : (bc.read_prob(probs[5]) ? (bc.read_prob(probs[7]) ? 7 : 6) : (bc.read_prob(probs[6]) ? 5 : 4))) : (bc.read_prob(probs[1]) ? (bc.read_prob(probs[3]) ? 3 : 2) : (bc.read_prob(probs[2]) ? 1 : 0));
			if (val != 42) {
				return val;
			} else {
				let nval = 8;
				for (var i = 0; i < 6; i++) {
					nval += (bc.read_prob(probs[i + 8])) << i;
				}
				return nval;
			}
		}
		function get_block(dst, dstride, src, comp, dx, dy, mv_x, mv_y) {
			let [w, h] = src.get_dimensions(comp);
			let sx = dx + mv_x;
			let sy = dy + mv_y;
			if ((sx - 2 < 0) || (sx + 8 + 2 > (w)) || (sy - 2 < 0) || (sy + 8 + 2 > (h))) {
				edge_emu(src, sx - 2, sy - 2, 8 + 2 + 2, 8 + 2 + 2, dst, dstride, comp, 0);
			} else {
				let sstride = src.get_stride(comp);
				let soff    = src.get_offset(comp);
				let sdta    = src.get_data();
				let sbuf = sdta;
				let saddr = soff + ((sx - 2)) + ((sy - 2)) * sstride;
				var _t = 12;
				let a = 0;
				let b = 0;
				while(_t--) {
					dst[a + 0] = sbuf[(saddr + b) + 0];
					dst[a + 1] = sbuf[(saddr + b) + 1];
					dst[a + 2] = sbuf[(saddr + b) + 2];
					dst[a + 3] = sbuf[(saddr + b) + 3];
					dst[a + 4] = sbuf[(saddr + b) + 4];
					dst[a + 5] = sbuf[(saddr + b) + 5];
					dst[a + 6] = sbuf[(saddr + b) + 6];
					dst[a + 7] = sbuf[(saddr + b) + 7];
					dst[a + 8] = sbuf[(saddr + b) + 8];
					dst[a + 9] = sbuf[(saddr + b) + 9];
					dst[a + 10] = sbuf[(saddr + b) + 10];
					dst[a + 11] = sbuf[(saddr + b) + 11];
					a += dstride;
					b += sstride;
				}
			}
		}
		function calc_variance(var_off, src, stride) {
			let sum = 0;
			let ssum = 0;
			let j = 0;
			for (let _ = 0; _ < 4; _++) {
				for (let a = 0; a < 4; a++) {
					let el = src[(var_off + j) + (a * 2)];
					let pix = asU32(el);
					sum += pix;
					ssum += pix * pix;
				}
				j += stride * 2;
			}
			return asU16((ssum * 16 - sum * sum) >> 8);
		}
		function mc_filter_bilinear(a, b, c) {
			return asU8((asU16(a) * (8 - c) + asU16(b) * c + 4) >> 3);
		}
		function mc_bilinear(dst_offest, dst, dstride, src, soff, sstride, mx, my) {
			if (my == 0) {
				var dline_offest = 0;
				for (let _ = 0; _ < 8; _++) {
					for (let i = 0; i < 8; i++) {
						dst[(dst_offest + dline_offest) + i] = mc_filter_bilinear(src[soff + i], src[soff + i + 1], mx);
					}
					soff += sstride;
					dline_offest += dstride;
				}
			} else if (mx == 0) {
				var dline_offest = 0;
				for (let _ = 0; _ < 8; _++) {
					for (let i = 0; i < 8; i++) {
						dst[(dst_offest + dline_offest) + i] = mc_filter_bilinear(src[soff + i], src[soff + i + sstride], my);
					}
					soff += sstride;
					dline_offest += dstride;
				}
			} else {
				let tmp = new Uint8Array(8);
				for (let i = 0; i < 8; i++) {
					tmp[i] = mc_filter_bilinear(src[soff + i], src[soff + i + 1], mx);
				}
				soff += sstride;
				var dline_offest = 0;
				for (let _ = 0; _ < 8; _++) {
					for (let i = 0; i < 8; i++) {
						let cur = mc_filter_bilinear(src[soff + i], src[soff + i + 1], mx);
						dst[(dst_offest + dline_offest) + i] = mc_filter_bilinear(tmp[i], cur, my);
						tmp[i] = cur;
					}
					soff += sstride;
					dline_offest += dstride;
				}
			}
		}
		function mc_filter_bicubic($src, $off, $step, $coeffs) {
			return (Math.max(Math.min((($src[$off - $step] * $coeffs[0] + $src[$off] * $coeffs[1] + $src[$off + $step] * $coeffs[2] + $src[$off + $step * 2] * $coeffs[3] + 64) >> 7), 255), 0)) | 0;
		}
		function mc_bicubic(dst_offest, dst, dstride, src, soff, sstride, coeffs_w, coeffs_h) {
			if (coeffs_h[1] == 128) {
				var dline_offest = 0;
				for (let _ = 0; _ < 8; _++) {
					for (let i = 0; i < 8; i++) {
						dst[(dst_offest + dline_offest) + i] = mc_filter_bicubic(src, soff + i, 1, coeffs_w);
					}
					soff += sstride;
					dline_offest += dstride;
				}
			} else if (coeffs_w[1] == 128) {
				var dline_offest = 0;
				for (let _ = 0; _ < 8; _++) {
					for (let i = 0; i < 8; i++) {
						dst[(dst_offest + dline_offest) + i] = mc_filter_bicubic(src, soff + i, sstride, coeffs_h);
					}
					soff += sstride;
					dline_offest += dstride;
				}
			} else {
				let buf = new Uint8Array(16 * 11);
				let a = 0;
				soff -= sstride;
				for (let _ = 0; _ < 11; _++) {
					for (let i = 0; i < 8; i++) {
						buf[a + i] = mc_filter_bicubic(src, soff + i, 1, coeffs_w);
					}
					soff += sstride;
					a += 16;
				}
				let _soff = 16;
				a = 0;
				for (let _ = 0; _ < 8; _++) {
					for (let i = 0; i < 8; i++) {
						dst[(dst_offest + a) + i] = mc_filter_bicubic(buf, _soff + i, 16, coeffs_h);
					}
					_soff += 16;
					a += dstride;
				}
			}
		}
		class VP6BR {
			constructor() {
				this.vpversion = 0;
				this.profile = 0;
				this.interlaced = false;
				this.do_pm = false;
				this.loop_mode = 0;
				this.autosel_pm = false;
				this.var_thresh = 0;
				this.mv_thresh = 0;
				this.bicubic = false;
				this.filter_alpha = 0;
			}
			parseHeader(bc) {
				let hdr = new VP56Header();
				let src = bc.src;
				let br = new Bits(src);
				hdr.is_intra = !br.read_bool();
				hdr.is_golden = hdr.is_intra;
				hdr.quant = br.read(6);
				hdr.multistream = br.read_bool();
				if (hdr.is_intra) {
					hdr.version = br.read(5);
					validate((hdr.version >= VERSION_VP60) && (hdr.version <= VERSION_VP62));
					hdr.profile = br.read(2);
					validate((hdr.profile == VP6_SIMPLE_PROFILE) || (hdr.profile == VP6_ADVANCED_PROFILE));
					hdr.interlaced = br.read_bool();
				} else {
					hdr.version = this.vpversion;
					hdr.profile = this.profile;
					hdr.interlaced = this.interlaced;
				}
				if (hdr.multistream || (hdr.profile == VP6_SIMPLE_PROFILE)) {
					hdr.offset = br.read(16);
					validate(hdr.offset > (hdr.is_intra ? 6 : 2));
					hdr.multistream = true;
				}
				let bytes = br.tell() >> 3;
				bc.skip_bytes(bytes);
				this.loop_mode = 0;
				if (hdr.is_intra) {
					hdr.mb_h = asU8(bc.read_bits(8));
					hdr.mb_w = asU8(bc.read_bits(8));
					hdr.disp_h = asU8(bc.read_bits(8));
					hdr.disp_w = asU8(bc.read_bits(8));
					validate((hdr.mb_h > 0) && (hdr.mb_w > 0));
					hdr.scale = bc.read_bits(2);
				} else {
					hdr.is_golden = bc.read_bool();
					if (hdr.profile == VP6_ADVANCED_PROFILE) {
						this.loop_mode = +bc.read_bool();
						if (this.loop_mode != 0) {
							this.loop_mode += +bc.read_bool();
							validate(this.loop_mode <= 1);
						}
						if (hdr.version == VERSION_VP62) {
							this.do_pm = bc.read_bool();
						}
					}
				}
				if ((hdr.profile == VP6_ADVANCED_PROFILE) && (hdr.is_intra || this.do_pm)) {
					this.autosel_pm = bc.read_bool();
					if (this.autosel_pm) {
						this.var_thresh = bc.read_bits(5);
						if (hdr.version != VERSION_VP62) {
							this.var_thresh <<= 5;
						}
						this.mv_thresh = bc.read_bits(3);
					} else {
						this.bicubic = bc.read_bool();
					}
					if (hdr.version == VERSION_VP62) {
						this.filter_alpha = bc.read_bits(4);
					} else {
						this.filter_alpha = 16;
					}
				}
				hdr.use_huffman = bc.read_bool();
				this.vpversion = hdr.version;
				this.profile = hdr.profile;
				this.interlaced = hdr.interlaced;
				return hdr;
			}
			decode_mv(bc, model) {
				let val;
				if (!bc.read_prob(model.nz_prob)) {
					val = bc.read_prob(model.tree_probs[0]) ? (bc.read_prob(model.tree_probs[4]) ? (bc.read_prob(model.tree_probs[6]) ? 7 : 6) : (bc.read_prob(model.tree_probs[5]) ? 5 : 4)) : (bc.read_prob(model.tree_probs[1]) ? (bc.read_prob(model.tree_probs[3]) ? 3 : 2) : (bc.read_prob(model.tree_probs[2]) ? 1 : 0));
				} else {
					let raw = 0;
					for (var i = 0; i < LONG_VECTOR_ORDER.length; i++) {
						var ord = LONG_VECTOR_ORDER[i];
						raw |= asI16(bc.read_prob(model.raw_probs[ord])) << ord;
					}
					if ((raw & 0xF0) != 0) {
						raw |= asI16(bc.read_prob(model.raw_probs[3])) << 3;
					} else {
						raw |= 1 << 3;
					}
					val = asI16(raw);
				}
				if ((val != 0) && bc.read_prob(model.sign_prob)) {
					return -val;
				} else {
					return val;
				}
			}
			reset_models(models) {
				for (var i = 0; i < models.mv_models.length; i++) {
					var mdl = models.mv_models[i];
					mdl.nz_prob = NZ_PROBS[i];
					mdl.sign_prob = 128;
					mdl.raw_probs.set(RAW_PROBS[i], 0);
					mdl.tree_probs.set(TREE_PROBS[i], 0);
				}
				models.vp6models.zero_run_probs[0].set(ZERO_RUN_PROBS[0], 0);
				models.vp6models.zero_run_probs[1].set(ZERO_RUN_PROBS[1], 0);
				reset_scan(models.vp6models, this.interlaced);
			}
			decode_mv_models(bc, models) {
				for (let comp = 0; comp < 2; comp++) {
					if (bc.read_prob(HAS_NZ_PROB[comp])) {
						models[comp].nz_prob = bc.read_probability();
					}
					if (bc.read_prob(HAS_SIGN_PROB[comp])) {
						models[comp].sign_prob = bc.read_probability();
					}
				}
				for (let comp = 0; comp < 2; comp++) {
					for (let i = 0; i < HAS_TREE_PROB[comp].length; i++) {
						const prob = HAS_TREE_PROB[comp][i];
						if (bc.read_prob(prob)) {
							models[comp].tree_probs[i] = bc.read_probability();
						}
					}
				}
				for (let comp = 0; comp < 2; comp++) {
					for (let i = 0; i < HAS_RAW_PROB[comp].length; i++) {
						const prob = HAS_RAW_PROB[comp][i];
						if (bc.read_prob(prob)) {
							models[comp].raw_probs[i] = bc.read_probability();
						}
					}
				}
			}
			decode_coeff_models(bc, models, is_intra) {
				let def_prob = new Uint8Array(11);
				def_prob.fill(128);
				for (var plane = 0; plane < 2; plane++) {
					for (var i = 0; i < 11; i++) {
						if (bc.read_prob(HAS_COEF_PROBS[plane][i])) {
							def_prob[i] = bc.read_probability();
							models.coeff_models[plane].dc_value_probs[i] = def_prob[i];
						} else if (is_intra) {
							models.coeff_models[plane].dc_value_probs[i] = def_prob[i];
						}
					}
				}
				if (bc.read_bool()) {
					for (var i = 1; i < 64; i++) {
						if (bc.read_prob(HAS_SCAN_UPD_PROBS[i])) {
							models.vp6models.scan_order[i] = bc.read_bits(4);
						}
					}
					update_scan(models.vp6models);
				} else {
					reset_scan(models.vp6models, this.interlaced);
				}
				for (var comp = 0; comp < 2; comp++) {
					for (var i = 0; i < 14; i++) {
						if (bc.read_prob(HAS_ZERO_RUN_PROBS[comp][i])) {
							models.vp6models.zero_run_probs[comp][i] = bc.read_probability();
						}
					}
				}
				for (var ctype = 0; ctype < 3; ctype++) {
					for (var plane = 0; plane < 2; plane++) {
						for (var group = 0; group < 6; group++) {
							for (var i = 0; i < 11; i++) {
								if (bc.read_prob(VP6_AC_PROBS[ctype][plane][group][i])) {
									def_prob[i] = bc.read_probability();
									models.coeff_models[plane].ac_val_probs[ctype][group][i] = def_prob[i];
								} else if (is_intra) {
									models.coeff_models[plane].ac_val_probs[ctype][group][i] = def_prob[i];
								}
							}
						}
					}
				}
				for (var plane = 0; plane < 2; plane++) {
					let mdl = models.coeff_models[plane];
					for (var i = 0; i < 3; i++) {
						for (var k = 0; k < 5; k++) {
							mdl.dc_token_probs[0][i][k] = rescale_prob(mdl.dc_value_probs[k], VP6_DC_WEIGHTS[k][i], 255);
						}
					}
				}
			}
			decode_block(bc, coeffs, model, vp6model, fstate) {
				var left_ctx = fstate.coeff_cat[fstate.ctx_idx][0];
				var top_ctx = fstate.top_ctx;
				var dc_mode = top_ctx + left_ctx;
				var token = decode_token_bc(bc, model.dc_token_probs[0][dc_mode], model.dc_value_probs[5], true, true);
				var val = expand_token_bc(bc, model.dc_value_probs, token, 6);
				coeffs[0] = val;
				fstate.last_idx[fstate.ctx_idx] = 0;
				var idx = 1;
				var last_val = val;
				while (idx < 64) {
					var ac_band = VP6_IDX_TO_AC_BAND[idx];
					var ac_mode = Math.min(Math.abs(last_val), 2);
					var has_nnz = (idx == 1) || (last_val != 0);
					var _token = decode_token_bc(bc, model.ac_val_probs[ac_mode][ac_band], model.ac_val_probs[ac_mode][ac_band][5], false, has_nnz);
					if (_token == 42) break;
					var _val = expand_token_bc(bc, model.ac_val_probs[ac_mode][ac_band], _token, 6);
					coeffs[vp6model.zigzag[idx]] = asI16(_val * fstate.ac_quant);
					idx += 1;
					last_val = _val;
					if (_val == 0) {
						idx += decode_zero_run_bc(bc, vp6model.zero_run_probs[(idx >= 7) ? 1 : 0]);
						validate(idx <= 64);
					}
				}
				fstate.coeff_cat[fstate.ctx_idx][0] = (coeffs[0] != 0) ? 1 : 0;
				fstate.top_ctx = fstate.coeff_cat[fstate.ctx_idx][0];
				fstate.last_idx[fstate.ctx_idx] = idx;
			}
			mc_block(dst, mc_buf, src, plane, x, y, mv, loop_str) {
				let is_luma = (plane != 1) && (plane != 2);
				let sx, sy, mx, my, msx, msy;
				if (is_luma) {
					sx = mv.x >> 2;
					sy = mv.y >> 2;
					mx = (mv.x & 3) << 1;
					my = (mv.y & 3) << 1;
					msx = asI16(mv.x / 4);
					msy = asI16(mv.y / 4);
				} else {
					sx = mv.x >> 3;
					sy = mv.y >> 3;
					mx = mv.x & 7;
					my = mv.y & 7;
					msx = asI16(mv.x / 8);
					msy = asI16(mv.y / 8);
				}
				let tmp_blk = mc_buf.get_data();
				get_block(tmp_blk, 16, src, plane, x, y, sx, sy);
				if ((msx & 7) != 0) {
					let foff = (8 - (sx & 7));
					let off = 2 + foff;
					vp31_loop_filter(tmp_blk, off, 1, 16, 12, loop_str);
				}
				if ((msy & 7) != 0) {
					let foff = (8 - (sy & 7));
					let off = (2 + foff) * 16;
					vp31_loop_filter(tmp_blk, off, 16, 1, 12, loop_str);
				}
				let copy_mode = (mx == 0) && (my == 0);
				let bicubic = !copy_mode && is_luma && this.bicubic;
				if (is_luma && !copy_mode && (this.profile == VP6_ADVANCED_PROFILE)) {
					if (!this.autosel_pm) {
						bicubic = true;
					} else {
						let mv_limit = 1 << (this.mv_thresh + 1);
						if ((Math.abs(mv.x) <= mv_limit) && (Math.abs(mv.y) <= mv_limit)) {
							let var_off = 16 * 2 + 2;
							if (mv.x < 0) var_off += 1;
							if (mv.y < 0) var_off += 16;
							let _var = calc_variance(var_off, tmp_blk, 16);
							if (_var >= this.var_thresh) {
								bicubic = true;
							}
						}
					}
				}
				let dstride = dst.stride[plane];
				let dbuf = dst.data;
				let dbuf_offest = dst.offset[plane] + x + y * dstride;
				if (copy_mode) {
					let src_offest = 2 * 16 + 2;
					let dline_offest = 0;
					let sline_offest = 0;
					for (let _ = 0; _ < 8; _++) {
						dbuf[(dbuf_offest + dline_offest) + 0] = tmp_blk[(src_offest + sline_offest) + 0];
						dbuf[(dbuf_offest + dline_offest) + 1] = tmp_blk[(src_offest + sline_offest) + 1];
						dbuf[(dbuf_offest + dline_offest) + 2] = tmp_blk[(src_offest + sline_offest) + 2];
						dbuf[(dbuf_offest + dline_offest) + 3] = tmp_blk[(src_offest + sline_offest) + 3];
						dbuf[(dbuf_offest + dline_offest) + 4] = tmp_blk[(src_offest + sline_offest) + 4];
						dbuf[(dbuf_offest + dline_offest) + 5] = tmp_blk[(src_offest + sline_offest) + 5];
						dbuf[(dbuf_offest + dline_offest) + 6] = tmp_blk[(src_offest + sline_offest) + 6];
						dbuf[(dbuf_offest + dline_offest) + 7] = tmp_blk[(src_offest + sline_offest) + 7];
						dline_offest += dst.stride[plane];
						sline_offest += 16;
					}
				} else if (bicubic) {
					let coeff_h = VP6_BICUBIC_COEFFS[this.filter_alpha][mx];
					let coeff_v = VP6_BICUBIC_COEFFS[this.filter_alpha][my];
					mc_bicubic(dbuf_offest, dbuf, dstride, tmp_blk, 16 * 2 + 2, 16, coeff_h, coeff_v);
				} else {
					mc_bilinear(dbuf_offest, dbuf, dstride, tmp_blk, 16 * 2 + 2, 16, mx, my);
				}
			}
		}
		wpjsm.exportJS = {
			VP56Decoder,
			VP6BR,
			NADecoderSupport,
			BoolCoder,
			NAVideoInfo,
			YUV420_FORMAT,
			VP_YUVA420_FORMAT
		};
	},
	"src/utils/at-tess.js": function(wpjsm){
		// TODO: Unsupported at-lyon-js.

		var libtess = (function(){var n;function t(a,b){return a.b===b.b&&a.a===b.a}function u(a,b){return a.b<b.b||a.b===b.b&&a.a<=b.a}function v(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?d<e?b.a-a.a+d/(d+e)*(a.a-c.a):b.a-c.a+e/(d+e)*(c.a-a.a):0}function x(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?(b.a-c.a)*d+(b.a-a.a)*e:0}function z(a,b){return a.a<b.a||a.a===b.a&&a.b<=b.b}function aa(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?d<e?b.b-a.b+d/(d+e)*(a.b-c.b):b.b-c.b+e/(d+e)*(c.b-a.b):0}function ba(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?(b.b-c.b)*d+(b.b-a.b)*e:0}function ca(a){return u(a.b.a,a.a)}function da(a){return u(a.a,a.b.a)}function A(a,b,c,d){a=0>a?0:a;c=0>c?0:c;return a<=c?0===c?(b+d)/2:b+a/(a+c)*(d-b):d+c/(a+c)*(b-d)};function ea(a){var b=B(a.b);C(b,a.c);C(b.b,a.c);D(b,a.a);return b}function E(a,b){var c=!1,d=!1;a!==b&&(b.a!==a.a&&(d=!0,F(b.a,a.a)),b.d!==a.d&&(c=!0,G(b.d,a.d)),H(b,a),d||(C(b,a.a),a.a.c=a),c||(D(b,a.d),a.d.a=a))}function I(a){var b=a.b,c=!1;a.d!==a.b.d&&(c=!0,G(a.d,a.b.d));a.c===a?F(a.a,null):(a.b.d.a=J(a),a.a.c=a.c,H(a,J(a)),c||D(a,a.d));b.c===b?(F(b.a,null),G(b.d,null)):(a.d.a=J(b),b.a.c=b.c,H(b,J(b)));fa(a)}function K(a){var b=B(a),c=b.b;H(b,a.e);b.a=a.b.a;C(c,b.a);b.d=c.d=a.d;b=b.b;H(a.b,J(a.b));H(a.b,b);a.b.a=b.a;b.b.a.c=b.b;b.b.d=a.b.d;b.f=a.f;b.b.f=a.b.f;return b}function L(a,b){var c=!1,d=B(a),e=d.b;b.d!==a.d&&(c=!0,G(b.d,a.d));H(d,a.e);H(e,b);d.a=a.b.a;e.a=b.a;d.d=e.d=a.d;a.d.a=e;c||D(d,a.d);return d}function B(a){var b=new M,c=new M,d=a.b.h;c.h=d;d.b.h=b;b.h=a;a.b.h=c;b.b=c;b.c=b;b.e=c;c.b=b;c.c=c;return c.e=b}function H(a,b){var c=a.c,d=b.c;c.b.e=b;d.b.e=a;a.c=d;b.c=c}function C(a,b){var c=b.f,d=new N(b,c);c.e=d;b.f=d;c=d.c=a;do c.a=d,c=c.c;while(c!==a)}function D(a,b){var c=b.d,d=new ga(b,c);c.b=d;b.d=d;d.a=a;d.c=b.c;c=a;do c.d=d,c=c.e;while(c!==a)}function fa(a){var b=a.h;a=a.b.h;b.b.h=a;a.b.h=b}function F(a,b){var c=a.c,d=c;do d.a=b,d=d.c;while(d!==c);c=a.f;d=a.e;d.f=c;c.e=d}function G(a,b){var c=a.a,d=c;do d.d=b,d=d.e;while(d!==c);c=a.d;d=a.b;d.d=c;c.b=d};function ha(a){var b=0;Math.abs(a[1])>Math.abs(a[0])&&(b=1);Math.abs(a[2])>Math.abs(a[b])&&(b=2);return b};var O=4*1E150;function P(a,b){a.f+=b.f;a.b.f+=b.b.f}function ia(a,b,c){a=a.a;b=b.a;c=c.a;if(b.b.a===a)return c.b.a===a?u(b.a,c.a)?0>=x(c.b.a,b.a,c.a):0<=x(b.b.a,c.a,b.a):0>=x(c.b.a,a,c.a);if(c.b.a===a)return 0<=x(b.b.a,a,b.a);b=v(b.b.a,a,b.a);a=v(c.b.a,a,c.a);return b>=a}function Q(a){a.a.i=null;var b=a.e;b.a.c=b.c;b.c.a=b.a;a.e=null}function ja(a,b){I(a.a);a.c=!1;a.a=b;b.i=a}function ka(a){var b=a.a.a;do a=R(a);while(a.a.a===b);a.c&&(b=L(S(a).a.b,a.a.e),ja(a,b),a=R(a));return a}function la(a,b,c){var d=new ma;d.a=c;d.e=na(a.f,b.e,d);return c.i=d}function oa(a,b){switch(a.s){case 100130:return 0!==(b&1);case 100131:return 0!==b;case 100132:return 0<b;case 100133:return 0>b;case 100134:return 2<=b||-2>=b}return!1}function pa(a){var b=a.a,c=b.d;c.c=a.d;c.a=b;Q(a)}function T(a,b,c){a=b;for(b=b.a;a!==c;){a.c=!1;var d=S(a),e=d.a;if(e.a!==b.a){if(!d.c){pa(a);break}e=L(b.c.b,e.b);ja(d,e)}b.c!==e&&(E(J(e),e),E(b,e));pa(a);b=d.a;a=d}return b}function U(a,b,c,d,e,f){var g=!0;do la(a,b,c.b),c=c.c;while(c!==d);for(null===e&&(e=S(b).a.b.c);;){d=S(b);c=d.a.b;if(c.a!==e.a)break;c.c!==e&&(E(J(c),c),E(J(e),c));d.f=b.f-c.f;d.d=oa(a,d.f);b.b=!0;!g&&qa(a,b)&&(P(c,e),Q(b),I(e));g=!1;b=d;e=c}b.b=!0;f&&ra(a,b)}function sa(a,b,c,d,e){var f=[b.g[0],b.g[1],b.g[2]];b.d=null;b.d=a.o?a.o(f,c,d,a.c)||null:null;null===b.d&&(e?a.n||(V(a,100156),a.n=!0):b.d=c[0])}function ta(a,b,c){var d=[null,null,null,null];d[0]=b.a.d;d[1]=c.a.d;sa(a,b.a,d,[.5,.5,0,0],!1);E(b,c)}function ua(a,b,c,d,e){var f=Math.abs(b.b-a.b)+Math.abs(b.a-a.a),g=Math.abs(c.b-a.b)+Math.abs(c.a-a.a),h=e+1;d[e]=.5*g/(f+g);d[h]=.5*f/(f+g);a.g[0]+=d[e]*b.g[0]+d[h]*c.g[0];a.g[1]+=d[e]*b.g[1]+d[h]*c.g[1];a.g[2]+=d[e]*b.g[2]+d[h]*c.g[2]}function qa(a,b){var c=S(b),d=b.a,e=c.a;if(u(d.a,e.a)){if(0<x(e.b.a,d.a,e.a))return!1;if(!t(d.a,e.a))K(e.b),E(d,J(e)),b.b=c.b=!0;else if(d.a!==e.a){var c=a.e,f=d.a.h;if(0<=f){var c=c.b,g=c.d,h=c.e,k=c.c,l=k[f];g[l]=g[c.a];k[g[l]]=l;l<=--c.a&&(1>=l?W(c,l):u(h[g[l>>1]],h[g[l]])?W(c,l):va(c,l));h[f]=null;k[f]=c.b;c.b=f}else for(c.c[-(f+1)]=null;0<c.a&&null===c.c[c.d[c.a-1]];)--c.a;ta(a,J(e),d)}}else{if(0>x(d.b.a,e.a,d.a))return!1;R(b).b=b.b=!0;K(d.b);E(J(e),d)}return!0}function wa(a,b){var c=S(b),d=b.a,e=c.a,f=d.a,g=e.a,h=d.b.a,k=e.b.a,l=new N;x(h,a.a,f);x(k,a.a,g);if(f===g||Math.min(f.a,h.a)>Math.max(g.a,k.a))return!1;if(u(f,g)){if(0<x(k,f,g))return!1}else if(0>x(h,g,f))return!1;var r=h,p=f,q=k,y=g,m,w;u(r,p)||(m=r,r=p,p=m);u(q,y)||(m=q,q=y,y=m);u(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);u(q,p)?u(p,y)?(m=v(r,q,p),w=v(q,p,y),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,p.b)):(m=x(r,q,p),w=-x(r,y,p),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,y.b)):l.b=(q.b+p.b)/2;z(r,p)||(m=r,r=p,p=m);z(q,y)||(m=q,q=y,y=m);z(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);z(q,p)?z(p,y)?(m=aa(r,q,p),w=aa(q,p,y),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,p.a)):(m=ba(r,q,p),w=-ba(r,y,p),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,y.a)):l.a=(q.a+p.a)/2;u(l,a.a)&&(l.b=a.a.b,l.a=a.a.a);r=u(f,g)?f:g;u(r,l)&&(l.b=r.b,l.a=r.a);if(t(l,f)||t(l,g))return qa(a,b),!1;if(!t(h,a.a)&&0<=x(h,a.a,l)||!t(k,a.a)&&0>=x(k,a.a,l)){if(k===a.a)return K(d.b),E(e.b,d),b=ka(b),d=S(b).a,T(a,S(b),c),U(a,b,J(d),d,d,!0),!0;if(h===a.a){K(e.b);E(d.e,J(e));f=c=b;g=f.a.b.a;do f=R(f);while(f.a.b.a===g);b=f;f=S(b).a.b.c;c.a=J(e);e=T(a,c,null);U(a,b,e.c,d.b.c,f,!0);return!0}0<=x(h,a.a,l)&&(R(b).b=b.b=!0,K(d.b),d.a.b=a.a.b,d.a.a=a.a.a);0>=x(k,a.a,l)&&(b.b=c.b=!0,K(e.b),e.a.b=a.a.b,e.a.a=a.a.a);return!1}K(d.b);K(e.b);E(J(e),d);d.a.b=l.b;d.a.a=l.a;d.a.h=xa(a.e,d.a);d=d.a;e=[0,0,0,0];l=[f.d,h.d,g.d,k.d];d.g[0]=d.g[1]=d.g[2]=0;ua(d,f,h,e,0);ua(d,g,k,e,2);sa(a,d,l,e,!0);R(b).b=b.b=c.b=!0;return!1}function ra(a,b){for(var c=S(b);;){for(;c.b;)b=c,c=S(c);if(!b.b&&(c=b,b=R(b),null===b||!b.b))break;b.b=!1;var d=b.a,e=c.a,f;if(f=d.b.a!==e.b.a)a:{f=b;var g=S(f),h=f.a,k=g.a,l=void 0;if(u(h.b.a,k.b.a)){if(0>x(h.b.a,k.b.a,h.a)){f=!1;break a}R(f).b=f.b=!0;l=K(h);E(k.b,l);l.d.c=f.d}else{if(0<x(k.b.a,h.b.a,k.a)){f=!1;break a}f.b=g.b=!0;l=K(k);E(h.e,k.b);l.b.d.c=f.d}f=!0}f&&(c.c?(Q(c),I(e),c=S(b),e=c.a):b.c&&(Q(b),I(d),b=R(c),d=b.a));if(d.a!==e.a)if(d.b.a===e.b.a||b.c||c.c||d.b.a!==a.a&&e.b.a!==a.a)qa(a,b);else if(wa(a,b))break;d.a===e.a&&d.b.a===e.b.a&&(P(e,d),Q(b),I(d),b=R(c))}}function ya(a,b){a.a=b;for(var c=b.c;null===c.i;)if(c=c.c,c===b.c){var c=a,d=b,e=new ma;e.a=d.c.b;var f=c.f,g=f.a;do g=g.a;while(null!==g.b&&!f.c(f.b,e,g.b));var f=g.b,h=S(f),e=f.a,g=h.a;if(0===x(e.b.a,d,e.a))e=f.a,t(e.a,d)||t(e.b.a,d)||(K(e.b),f.c&&(I(e.c),f.c=!1),E(d.c,e),ya(c,d));else{var k=u(g.b.a,e.b.a)?f:h,h=void 0;f.d||k.c?(k===f?h=L(d.c.b,e.e):h=L(g.b.c.b,d.c).b,k.c?ja(k,h):(e=c,f=la(c,f,h),f.f=R(f).f+f.a.f,f.d=oa(e,f.f)),ya(c,d)):U(c,f,d.c,d.c,null,!0)}return}c=ka(c.i);e=S(c);f=e.a;e=T(a,e,null);if(e.c===f){var f=e,e=f.c,g=S(c),h=c.a,k=g.a,l=!1;h.b.a!==k.b.a&&wa(a,c);t(h.a,a.a)&&(E(J(e),h),c=ka(c),e=S(c).a,T(a,S(c),g),l=!0);t(k.a,a.a)&&(E(f,J(k)),f=T(a,g,null),l=!0);l?U(a,c,f.c,e,e,!0):(u(k.a,h.a)?d=J(k):d=h,d=L(f.c.b,d),U(a,c,d,d.c,d.c,!1),d.b.i.c=!0,ra(a,c))}else U(a,c,e.c,f,f,!0)}function za(a,b){var c=new ma,d=ea(a.b);d.a.b=O;d.a.a=b;d.b.a.b=-O;d.b.a.a=b;a.a=d.b.a;c.a=d;c.f=0;c.d=!1;c.c=!1;c.h=!0;c.b=!1;d=a.f;d=na(d,d.a,c);c.e=d};function Aa(a){this.a=new Ba;this.b=a;this.c=ia}function na(a,b,c){do b=b.c;while(null!==b.b&&!a.c(a.b,b.b,c));a=new Ba(c,b.a,b);b.a.c=a;return b.a=a};function Ba(a,b,c){this.b=a||null;this.a=b||this;this.c=c||this};function X(){this.d=Y;this.p=this.b=this.q=null;this.j=[0,0,0];this.s=100130;this.n=!1;this.o=this.a=this.e=this.f=null;this.m=!1;this.c=this.r=this.i=this.k=this.l=this.h=null}var Y=0;n=X.prototype;n.x=function(){Z(this,Y)};n.B=function(a,b){switch(a){case 100142:return;case 100140:switch(b){case 100130:case 100131:case 100132:case 100133:case 100134:this.s=b;return}break;case 100141:this.m=!!b;return;default:V(this,100900);return}V(this,100901)};n.y=function(a){switch(a){case 100142:return 0;case 100140:return this.s;case 100141:return this.m;default:V(this,100900)}return!1};n.A=function(a,b,c){this.j[0]=a;this.j[1]=b;this.j[2]=c};n.z=function(a,b){var c=b?b:null;switch(a){case 100100:case 100106:this.h=c;break;case 100104:case 100110:this.l=c;break;case 100101:case 100107:this.k=c;break;case 100102:case 100108:this.i=c;break;case 100103:case 100109:this.p=c;break;case 100105:case 100111:this.o=c;break;case 100112:this.r=c;break;default:V(this,100900)}};n.C=function(a,b){var c=!1,d=[0,0,0];Z(this,2);for(var e=0;3>e;++e){var f=a[e];-1E150>f&&(f=-1E150,c=!0);1E150<f&&(f=1E150,c=!0);d[e]=f}c&&V(this,100155);c=this.q;null===c?(c=ea(this.b),E(c,c.b)):(K(c),c=c.e);c.a.d=b;c.a.g[0]=d[0];c.a.g[1]=d[1];c.a.g[2]=d[2];c.f=1;c.b.f=-1;this.q=c};n.u=function(a){Z(this,Y);this.d=1;this.b=new Ca;this.c=a};n.t=function(){Z(this,1);this.d=2;this.q=null};n.v=function(){Z(this,2);this.d=1};n.w=function(){Z(this,1);this.d=Y;var a=this.j[0],b=this.j[1],c=this.j[2],d=!1,e=[a,b,c];if(0===a&&0===b&&0===c){for(var b=[-2*1E150,-2*1E150,-2*1E150],f=[2*1E150,2*1E150,2*1E150],c=[],g=[],d=this.b.c,a=d.e;a!==d;a=a.e)for(var h=0;3>h;++h){var k=a.g[h];k<f[h]&&(f[h]=k,g[h]=a);k>b[h]&&(b[h]=k,c[h]=a)}a=0;b[1]-f[1]>b[0]-f[0]&&(a=1);b[2]-f[2]>b[a]-f[a]&&(a=2);if(f[a]>=b[a])e[0]=0,e[1]=0,e[2]=1;else{b=0;f=g[a];c=c[a];g=[0,0,0];f=[f.g[0]-c.g[0],f.g[1]-c.g[1],f.g[2]-c.g[2]];h=[0,0,0];for(a=d.e;a!==d;a=a.e)h[0]=a.g[0]-c.g[0],h[1]=a.g[1]-c.g[1],h[2]=a.g[2]-c.g[2],g[0]=f[1]*h[2]-f[2]*h[1],g[1]=f[2]*h[0]-f[0]*h[2],g[2]=f[0]*h[1]-f[1]*h[0],k=g[0]*g[0]+g[1]*g[1]+g[2]*g[2],k>b&&(b=k,e[0]=g[0],e[1]=g[1],e[2]=g[2]);0>=b&&(e[0]=e[1]=e[2]=0,e[ha(f)]=1)}d=!0}g=ha(e);a=this.b.c;b=(g+1)%3;c=(g+2)%3;g=0<e[g]?1:-1;for(e=a.e;e!==a;e=e.e)e.b=e.g[b],e.a=g*e.g[c];if(d){e=0;d=this.b.a;for(a=d.b;a!==d;a=a.b)if(b=a.a,!(0>=b.f)){do e+=(b.a.b-b.b.a.b)*(b.a.a+b.b.a.a),b=b.e;while(b!==a.a)}if(0>e)for(e=this.b.c,d=e.e;d!==e;d=d.e)d.a=-d.a}this.n=!1;e=this.b.b;for(a=e.h;a!==e;a=d)if(d=a.h,b=a.e,t(a.a,a.b.a)&&a.e.e!==a&&(ta(this,b,a),I(a),a=b,b=a.e),b.e===a){if(b!==a){if(b===d||b===d.b)d=d.h;I(b)}if(a===d||a===d.b)d=d.h;I(a)}this.e=e=new Da;d=this.b.c;for(a=d.e;a!==d;a=a.e)a.h=xa(e,a);Ea(e);this.f=new Aa(this);za(this,-O);for(za(this,O);null!==(e=Fa(this.e));){for(;;){a:if(a=this.e,0===a.a)d=Ga(a.b);else if(d=a.c[a.d[a.a-1]],0!==a.b.a&&(a=Ga(a.b),u(a,d))){d=a;break a}if(null===d||!t(d,e))break;d=Fa(this.e);ta(this,e.c,d.c)}ya(this,e)}this.a=this.f.a.a.b.a.a;for(e=0;null!==(d=this.f.a.a.b);)d.h||++e,Q(d);this.f=null;e=this.e;e.b=null;e.d=null;this.e=e.c=null;e=this.b;for(a=e.a.b;a!==e.a;a=d)d=a.b,a=a.a,a.e.e===a&&(P(a.c,a),I(a));if(!this.n){e=this.b;if(this.m)for(a=e.b.h;a!==e.b;a=d)d=a.h,a.b.d.c!==a.d.c?a.f=a.d.c?1:-1:I(a);else for(a=e.a.b;a!==e.a;a=d)if(d=a.b,a.c){for(a=a.a;u(a.b.a,a.a);a=a.c.b);for(;u(a.a,a.b.a);a=a.e);b=a.c.b;for(c=void 0;a.e!==b;)if(u(a.b.a,b.a)){for(;b.e!==a&&(ca(b.e)||0>=x(b.a,b.b.a,b.e.b.a));)c=L(b.e,b),b=c.b;b=b.c.b}else{for(;b.e!==a&&(da(a.c.b)||0<=x(a.b.a,a.a,a.c.b.a));)c=L(a,a.c.b),a=c.b;a=a.e}for(;b.e.e!==a;)c=L(b.e,b),b=c.b}if(this.h||this.i||this.k||this.l)if(this.m)for(e=this.b,d=e.a.b;d!==e.a;d=d.b){if(d.c){this.h&&this.h(2,this.c);a=d.a;do this.k&&this.k(a.a.d,this.c),a=a.e;while(a!==d.a);this.i&&this.i(this.c)}}else{e=this.b;d=!!this.l;a=!1;b=-1;for(c=e.a.d;c!==e.a;c=c.d)if(c.c){a||(this.h&&this.h(4,this.c),a=!0);g=c.a;do d&&(f=g.b.d.c?0:1,b!==f&&(b=f,this.l&&this.l(!!b,this.c))),this.k&&this.k(g.a.d,this.c),g=g.e;while(g!==c.a)}a&&this.i&&this.i(this.c)}if(this.r){e=this.b;for(a=e.a.b;a!==e.a;a=d)if(d=a.b,!a.c){b=a.a;c=b.e;g=void 0;do g=c,c=g.e,g.d=null,null===g.b.d&&(g.c===g?F(g.a,null):(g.a.c=g.c,H(g,J(g))),f=g.b,f.c===f?F(f.a,null):(f.a.c=f.c,H(f,J(f))),fa(g));while(g!==b);b=a.d;a=a.b;a.d=b;b.b=a}this.r(this.b);this.c=this.b=null;return}}this.b=this.c=null};function Z(a,b){if(a.d!==b)for(;a.d!==b;)if(a.d<b)switch(a.d){case Y:V(a,100151);a.u(null);break;case 1:V(a,100152),a.t()}else switch(a.d){case 2:V(a,100154);a.v();break;case 1:V(a,100153),a.w()}}function V(a,b){a.p&&a.p(b,a.c)};function ga(a,b){this.b=a||this;this.d=b||this;this.a=null;this.c=!1};function M(){this.h=this;this.i=this.d=this.a=this.e=this.c=this.b=null;this.f=0}function J(a){return a.b.e};function Ca(){this.c=new N;this.a=new ga;this.b=new M;this.d=new M;this.b.b=this.d;this.d.b=this.b};function N(a,b){this.e=a||this;this.f=b||this;this.d=this.c=null;this.g=[0,0,0];this.h=this.a=this.b=0};function Da(){this.c=[];this.d=null;this.a=0;this.e=!1;this.b=new Ha}function Ea(a){a.d=[];for(var b=0;b<a.a;b++)a.d[b]=b;a.d.sort(function(a){return function(b,e){return u(a[b],a[e])?1:-1}}(a.c));a.e=!0;Ia(a.b)}function xa(a,b){if(a.e){var c=a.b,d=++c.a;2*d>c.f&&(c.f*=2,c.c=Ja(c.c,c.f+1));var e;0===c.b?e=d:(e=c.b,c.b=c.c[c.b]);c.e[e]=b;c.c[e]=d;c.d[d]=e;c.h&&va(c,d);return e}c=a.a++;a.c[c]=b;return-(c+1)}function Fa(a){if(0===a.a)return Ka(a.b);var b=a.c[a.d[a.a-1]];if(0!==a.b.a&&u(Ga(a.b),b))return Ka(a.b);do--a.a;while(0<a.a&&null===a.c[a.d[a.a-1]]);return b};function Ha(){this.d=Ja([0],33);this.e=[null,null];this.c=[0,0];this.a=0;this.f=32;this.b=0;this.h=!1;this.d[1]=1}function Ja(a,b){for(var c=Array(b),d=0;d<a.length;d++)c[d]=a[d];for(;d<b;d++)c[d]=0;return c}function Ia(a){for(var b=a.a;1<=b;--b)W(a,b);a.h=!0}function Ga(a){return a.e[a.d[1]]}function Ka(a){var b=a.d,c=a.e,d=a.c,e=b[1],f=c[e];0<a.a&&(b[1]=b[a.a],d[b[1]]=1,c[e]=null,d[e]=a.b,a.b=e,0<--a.a&&W(a,1));return f}function W(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f<<1;h<a.a&&u(d[c[h+1]],d[c[h]])&&(h+=1);var k=c[h];if(h>a.a||u(d[g],d[k])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}}function va(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f>>1,k=c[h];if(0===h||u(d[k],d[g])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}};function ma(){this.e=this.a=null;this.f=0;this.c=this.b=this.h=this.d=!1}function S(a){return a.e.c.b}function R(a){return a.e.a.b};var _={GluTesselator:X,windingRule:{GLU_TESS_WINDING_ODD:100130,GLU_TESS_WINDING_NONZERO:100131,GLU_TESS_WINDING_POSITIVE:100132,GLU_TESS_WINDING_NEGATIVE:100133,GLU_TESS_WINDING_ABS_GEQ_TWO:100134},primitiveType:{GL_LINE_LOOP:2,GL_TRIANGLES:4,GL_TRIANGLE_STRIP:5,GL_TRIANGLE_FAN:6},errorType:{GLU_TESS_MISSING_BEGIN_POLYGON:100151,GLU_TESS_MISSING_END_POLYGON:100153,GLU_TESS_MISSING_BEGIN_CONTOUR:100152,GLU_TESS_MISSING_END_CONTOUR:100154,GLU_TESS_COORD_TOO_LARGE:100155,GLU_TESS_NEED_COMBINE_CALLBACK:100156},gluEnum:{GLU_TESS_MESH:100112,GLU_TESS_TOLERANCE:100142,GLU_TESS_WINDING_RULE:100140,GLU_TESS_BOUNDARY_ONLY:100141,GLU_INVALID_ENUM:100900,GLU_INVALID_VALUE:100901,GLU_TESS_BEGIN:100100,GLU_TESS_VERTEX:100101,GLU_TESS_END:100102,GLU_TESS_ERROR:100103,GLU_TESS_EDGE_FLAG:100104,GLU_TESS_COMBINE:100105,GLU_TESS_BEGIN_DATA:100106,GLU_TESS_VERTEX_DATA:100107,GLU_TESS_END_DATA:100108,GLU_TESS_ERROR_DATA:100109,GLU_TESS_EDGE_FLAG_DATA:100110,GLU_TESS_COMBINE_DATA:100111}};X.prototype.gluDeleteTess=X.prototype.x;X.prototype.gluTessProperty=X.prototype.B;X.prototype.gluGetTessProperty=X.prototype.y;X.prototype.gluTessNormal=X.prototype.A;X.prototype.gluTessCallback=X.prototype.z;X.prototype.gluTessVertex=X.prototype.C;X.prototype.gluTessBeginPolygon=X.prototype.u;X.prototype.gluTessBeginContour=X.prototype.t;X.prototype.gluTessEndContour=X.prototype.v;X.prototype.gluTessEndPolygon=X.prototype.w;return _}());
		var tessy = (function initTesselator() {
			// function called for each vertex of tesselator output
			function vertexCallback(data, polyVertArray) {
			  // console.log(data[0], data[1]);
			  polyVertArray[polyVertArray.length] = data[0];
			  polyVertArray[polyVertArray.length] = data[1];
			}
			function begincallback(type) {
			  if (type !== libtess.primitiveType.GL_TRIANGLES) {
				console.log('expected TRIANGLES but got type: ' + type);
			  }
			}
			function errorcallback(errno) {
			  console.log('error callback');
			  console.log('error number: ' + errno);
			}
			// callback for when segments intersect and must be split
			function combinecallback(coords, data, weight) {
			  // console.log('combine callback');
			  return [coords[0], coords[1], coords[2]];
			}
			function edgeCallback(flag) {
			  // don't really care about the flag, but need no-strip/no-fan behavior
			  // console.log('edge flag: ' + flag);
			}

			var tessy = new libtess.GluTesselator();
			// tessy.gluTessProperty(libtess.gluEnum.GLU_TESS_WINDING_RULE, libtess.windingRule.GLU_TESS_WINDING_POSITIVE);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_VERTEX_DATA, vertexCallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_BEGIN, begincallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_ERROR, errorcallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_COMBINE, combinecallback);
			tessy.gluTessCallback(libtess.gluEnum.GLU_TESS_EDGE_FLAG, edgeCallback);

			return tessy;
		})();
		function TaskList() {
			this.list = [];
			this.hash = Object.create(null);
		}
		TaskList.prototype.push = function(index) {
			if (this.hash[index]) return;
			this.hash[index] = true;
			this.list.push(index);
		};
		TaskList.prototype.pop = function() {
			if (this.list.length) {
				var value = this.list.pop();
				delete this.hash[value];
				return value;
			} else return null;
		};
		
		/* Union-find functions */
		
		function unionFindUnion(obj1, obj2) {
			var root1 = unionFindFind(obj1);
			var root2 = unionFindFind(obj2);
			if (root1 !== root2) {
				if (root1.rank < root2.rank) {
					root1.parent = root2;
				} else {
					root2.parent = root1;
					if (root1.rank === root2.rank) root1.rank += 1;
				}
			}
		}
		
		function unionFindFind(x) {
			if (x.parent !== x) x.parent = unionFindFind(x.parent);
			return x.parent;
		}
		
		/* Fast collision test for rectangles*/
		
		function subTest(p1, p2 , r) {
			var position;
			var norm = norm2(p1, p2);
			var product, localPosition;
			for (var i = 0; i < 4; i++) {
				product = innerProduct(p1, p2, p1, r[i]);
				if (product <= 0) localPosition = -1;
				else if (product >= norm) localPosition = 1;
				else return false;
				if (i === 0) {
					position = localPosition;
				} else {
					if (localPosition !== position) {
						return false;
					}
				}
			}
			return true;
		}
		
		function rectanglesCollide(r1, r2) {
			return !(subTest(r1[0], r1[1], r2) || subTest(r1[1], r1[2], r2) || subTest(r2[0], r2[1], r1) || subTest(r2[1], r2[2], r1));
		}
		
		/* Geometry helpers */
		
		function innerProduct(p1, p2, p3, p4) {
			return (p2[0] - p1[0]) * (p4[0] - p3[0]) + (p2[1] - p1[1]) * (p4[1] - p3[1]);
		}
		function norm2(p1, p2) {
			var dx = p2[0] - p1[0];
			var dy = p2[1] - p1[1];
			return dx * dx + dy * dy;
		}
		
		function segmentIntersection(p1, p2, p3, p4) {
			// find intersection point of [p1, p2] and [p3, p4], supposing it exists
			var dx = p2[0] - p1[0];
			var dy = p2[1] - p1[1];
			var dx2 = p4[0] - p3[0];
			var dy2 = p4[1] - p3[1];
			var lambda = ((p2[0] - p3[0]) * dy - dx * (p2[1] - p3[1])) /
				(dx2 * dy - dx * dy2);
			return [p3[0] + lambda * dx2, p3[1] + lambda * dy2];
		}
		function rayIntersection(p1, p2, p3, p4) {
			// find intersection point of (p1, p2] and (p3, p4]
			var dx = p2[0] - p1[0];
			var dy = p2[1] - p1[1];
			var dx2 = p4[0] - p3[0];
			var dy2 = p4[1] - p3[1];
			var denom = dx2 * dy - dx * dy2;
			if (denom === 0) return {point: p1, valid: true};
			var lambda = ((p2[0] - p3[0]) * dy - dx * (p2[1] - p3[1])) / denom;
			var inter = [p3[0] + lambda * dx2, p3[1] + lambda * dy2];
			if (lambda > 1 || innerProduct(p2, inter, p2, p1) < 0) return {point: inter, valid: false};
			else return {point: inter, valid: true};
		}
		
		function getData(from, to, w) {
			var ux = to[0] - from[0];
			var uy = to[1] - from [1];
			var Nu = Math.sqrt(ux * ux + uy * uy);
			var theta = Math.acos(ux / Nu);
			if (uy < 0) theta *= -1;
			return {
				angle: theta,
				norm: Nu,
				dir: [ux, uy],
				ortho: [- w * uy / Nu, w * ux / Nu]
			};
		}
		
		/* main function */
		
		function graphDraw(graph, width, cb, maxAngle) {
			var w = width / 2;
			maxAngle = Math.max(Math.PI, maxAngle || 2 * Math.PI);
			/* Data structures setup */
		
			var vertices = graph.vertices.map(function(coords) {
				return {
					coords: coords,
					neighList: []
				};
			});
			var edges = graph.edges.map(function(edge, index) {
				var from = edge[0];
				var to = edge[1];
				var vertexFrom = vertices[from];
				var vertexTo = vertices[to];
				var data = getData(vertexFrom.coords, vertexTo.coords, w);
				vertexFrom.neighList.push({
					to: to,
					angle: data.angle,
					dir: data.dir,
					ortho: data.ortho,
					index: index
				});
				vertexTo.neighList.push({
					to: from,
					angle: data.angle <= 0 ? data.angle + Math.PI : data.angle - Math.PI,
					dir: [-data.dir[0], -data.dir[1]],
					ortho: [-data.ortho[0], -data.ortho[1]],
					index: index
				});
				var obj = {
					rank: 0,
					edge: edge,
					points: {}
				};
				obj.points[to] = {};
				obj.points[from] = {};
				obj.parent = obj;
				return obj;
			});
		
			/* Build edges contour points */
		
			var toPostProcess = [];
			vertices.forEach(function(vertex, vindex) {
				var point = vertex.coords;
				var prepared = vertex.neighList;
				prepared.sort(function(a, b) {return a.angle - b.angle;});
				var n = prepared.length;
				if (n === 1) {
					var edge = prepared[0];
					var p1 = [point[0] + edge.ortho[0], point[1] + edge.ortho[1]];
					var p2 = [point[0] - edge.ortho[0], point[1] - edge.ortho[1]];
					var edgePoints = edges[edge.index].points;
					edgePoints[vindex].first_vertex = edge.index;
					edgePoints[vindex].last_vertex = edge.index;
					edgePoints[vindex].first = p1;
					edgePoints[vindex].remove_middle_first = true;
					edgePoints[vindex].remove_middle_last = true;
					edgePoints[vindex].last = p2;
				} else {
					prepared.forEach(function(edge, index) {
						var last = (index === n - 1);
						var next = prepared[last ? 0 : index + 1];
						var edgePoints = edges[edge.index].points;
						var nextPoints = edges[next.index].points;
						edgePoints[vindex].first_vertex = next.index;
						nextPoints[vindex].last_vertex = edge.index;
						var p1 = [point[0] + edge.ortho[0], point[1] + edge.ortho[1]];
						var p2 = [p1[0] + edge.dir[0], p1[1] + edge.dir[1]];
						var p3 = [point[0] - next.ortho[0], point[1] - next.ortho[1]];
						var p4 = [p3[0] + next.dir[0], p3[1] + next.dir[1]];
						var intersection = rayIntersection(p1, p2, p3, p4);
						var newPoint = intersection.point;
						if (intersection.valid) {
							var nextAngle = last ? next.angle + 2 * Math.PI : next.angle;
							if (nextAngle - edge.angle > maxAngle) {
								edgePoints[vindex].first = p1;
								nextPoints[vindex].last = p3;
								var vec = [newPoint[0] - point[0], newPoint[1] - point[1]];
								var invNorm = 1 / Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
								edgePoints[vindex].miter_first = nextPoints[vindex].miter_last = [
									point[0] + w * vec[0] * invNorm,
									point[1] + w * vec[1] * invNorm
								];
							} else {
								edgePoints[vindex].first = newPoint;
								nextPoints[vindex].last = newPoint;
							}
							if (n === 2) {
								edgePoints[vindex].remove_middle_first = true;
								nextPoints[vindex].remove_middle_last = true;
							}
						} else {
							var q1 = [newPoint[0] - edge.ortho[0], newPoint[1] - edge.ortho[1]];
							var q3 = [newPoint[0] + next.ortho[0], newPoint[1] + next.ortho[1]];
		
							toPostProcess.push({
								done: [edge.index, next.index],
								todo: [vindex, edge.to, next.to],
								rectangles: [[p1, newPoint, q1, point], [p3, newPoint, q3, point]]
							});
		
							edgePoints[vindex].first = p1;
							nextPoints[vindex].last = p3;
						}
					});
				}
			});
		
			/* Build each edge polygon */
		
			edges.forEach(function(obj) {
				var edge = obj.edge;
				var from = edge[0];
				var to = edge[1];
				var obj1 = obj.points[from];
				var obj2 = obj.points[to];
				var fromCoords = vertices[from].coords;
				var toCoords = vertices[to].coords;
				var newPoly = obj.polygon = [];
		
				if (innerProduct(obj1.last, obj2.first, fromCoords, toCoords) < 0) {
					var i1 = obj1.last_vertex;
					var i2 = obj2.first_vertex;
					unionFindUnion(edges[i1], edges[i2]);
					newPoly.push(segmentIntersection(obj1.miter_last || fromCoords, obj1.last, obj2.first, obj2.miter_first || toCoords));
				} else {
					newPoly.push(obj1.last, obj2.first);
				}
				if (obj2.miter_first) newPoly.push(obj2.miter_first);
				if (!(obj2.remove_middle_first && obj2.remove_middle_last)) newPoly.push(toCoords);
				if (obj2.miter_last) newPoly.push(obj2.miter_last);
				if (innerProduct(obj1.first, obj2.last, fromCoords, toCoords) < 0) {
					var i1 = obj1.first_vertex;
					var i2 = obj2.last_vertex;
					unionFindUnion(edges[i1], edges[i2]);
					newPoly.push(segmentIntersection(obj1.first, obj1.miter_first || fromCoords, obj2.miter_last || toCoords, obj2.last));
				} else {
					newPoly.push(obj2.last, obj1.first);
				}
				if (obj1.miter_first) newPoly.push(obj1.miter_first);
				if (!(obj1.remove_middle_first && obj1.remove_middle_last)) newPoly.push(fromCoords);
				if (obj1.miter_last) newPoly.push(obj1.miter_last);
			});
		
			/* Find locally overlapping edges */
		
			var shapeMemo = Object.create(null);
		
			toPostProcess.forEach(function(obj) {
				var done = Object.create(null);
				var i1 = obj.done[0];
				var i2 = obj.done[1];
				var e1 = edges[i1];
				var e2 = edges[i2];
				unionFindUnion(e1, e2);
				done[i1] = true;
				done[i2] = true;
				var todo = new TaskList();
				obj.todo.forEach(function(vertex) {
					todo.push(vertex);
				});
				var from;
				var r1 = obj.rectangles[0];
				var r2 = obj.rectangles[1];
				while((from = todo.pop()) !== null) {
					vertices[from].neighList.forEach(function(neigh) {
						var index = neigh.index;
						if (done[index]) return;
						var to = neigh.to;
						var rectangle = shapeMemo[index];
						if (!rectangle) {
							var fromCoords = vertices[from].coords;
							var toCoords = vertices[to].coords;
							var p1 = [fromCoords[0] + neigh.ortho[0], fromCoords[1] + neigh.ortho[1]];
							var p2 = [toCoords[0] + neigh.ortho[0], toCoords[1] + neigh.ortho[1]];
							var p3 = [toCoords[0] - neigh.ortho[0], toCoords[1] - neigh.ortho[1]];
							var p4 = [fromCoords[0] - neigh.ortho[0], fromCoords[1] - neigh.ortho[1]];
							rectangle = shapeMemo[index] = [p1, p2, p3, p4];
						}
						done[index] = true;
						if (rectanglesCollide(rectangle, r1) || rectanglesCollide(rectangle, r2)) {
							unionFindUnion(e1, edges[index]);
							todo.push(to);
						}
					});
				}
			});
		
			/* Execute cb on each polygon */
		
			var needUnion = [];
			edges.forEach(function(obj, index) {
				if (obj.rank > 0 && obj.parent === obj) {
					obj.union = obj.union || [];
					obj.union.push(obj.polygon);
					needUnion.push(index);
				} else {
					if (obj.parent === obj) {
						cb(obj.polygon);
					} else {
						var root = unionFindFind(obj);
						root.union = root.union || [];
						root.union.push(obj.polygon);
					}
				}
			});
		}
		function triangulate(contours) {
			tessy.gluTessNormal(0, 0, 1);
			var triangleVerts = [];
			tessy.gluTessBeginPolygon(triangleVerts);
			for (var i = 0; i < contours.length; i++) {
			  tessy.gluTessBeginContour();
			  var contour = contours[i];
			  for (var j = 0; j < contour.length; j += 2) {
				var coords = [contour[j], contour[j + 1], 0];
				tessy.gluTessVertex(coords, coords);
			  }
			  tessy.gluTessEndContour();
			}
			tessy.gluTessEndPolygon();
			return triangleVerts;
		}
		wpjsm.exportJS = {
			stroke: function(arrs, width) {
				var vex = [];
				for (let i = 0; i < arrs.length; i++) {
					var _arr = arrs[i];
					if (_arr.length < 4) continue;
					var vertices = [];
					var edges = [];
					var id = 0;
					for (let j = 0; j < _arr.length; j+=2) {
						var fs1 = _arr[j];
						var fs2 = _arr[j + 1];
						if (j == 0) {
							vertices.push([fs1, fs2])
						} else {
							vertices.push([fs1, fs2])
							edges.push([id - 1, id]);
						}
						id++;
					}
					graphDraw({vertices, edges}, width, function(fhfg) {
						var r = [];
						for (let j = 0; j < fhfg.length; j++) {
							const s = fhfg[j];
							if (!(isNaN(s[0]) || isNaN(s[1]))) {
								r.push(s[0]);
								r.push(s[1]);
							}
						}
						vex.push(...triangulate([r]));
					});
				}
				return vex;
			},
			fill: function(data) {
				return triangulate(data);
			}
		}
	},
	"src/utils/ByteStream.js": function(wpjsm){
		const ByteStream = function(arrayBuffer, start = 0, end = arrayBuffer.byteLength) {
			this.arrayBuffer = arrayBuffer;
			this.dataView = new DataView(arrayBuffer);
			this.start = start;
			this.end = end;
			this.bit_offset = 0;
			this._position = 0;
			this.littleEndian = true;
		}
		Object.defineProperties(ByteStream.prototype, {
			"position": {
				get: function() {
					return this._position - this.start;
				},
				set: function(value) {
					this._position = (value + this.start);
				}
			}
		});
		ByteStream.prototype.readString = function(length) {
			var str = "";
			var count = length;
			while (count) {
				var code = this.dataView.getUint8(this._position++);
				str += String.fromCharCode(code);
				count--;
			}
			return str;
		}
		ByteStream.prototype.readBytes = function(length) {
			this.byteAlign();
			var bytes = this.arrayBuffer.slice(this._position, this._position + length);
			this._position += length;
			return bytes;
		}
		ByteStream.prototype.readStringWithUntil = function() {
			this.byteAlign();
			var bo = this._position;
			var offset = 0;
			var length = this.end;
			var ret = '';
			var uint8 = [];
			while (true) {
				var val = this.dataView.getUint8(bo + offset);
				offset++;
				if (val === 0 || (bo + offset) >= length) {
					break;
				}
				uint8.push(val);
				ret += String.fromCharCode(val);
			}
			this._position = bo + offset;
			return new TextDecoder().decode(new Uint8Array(uint8));
		}
		ByteStream.prototype.readStringWithLength = function() {
			var count = this.readUint8();
			var val = '';
			while (count--) {
				var dat = this.dataView.getUint8(this._position++);;
				if (dat == 0) {
					continue;
				}
				val += String.fromCharCode(dat);
			}
			return val;
		}
		ByteStream.prototype.incrementOffset = function(byteInt, bitInt) {
			this._position += byteInt;
			this.bit_offset += bitInt;
			this.byteCarry();
		}
		ByteStream.prototype.setOffset = function(byteInt, bitInt) {
			this._position = byteInt + this.start;
			this.bit_offset = bitInt;
		}
		ByteStream.prototype.getLength = function() {
			return this.end - this.start;
		};
		ByteStream.prototype.getBytesAvailable = function() {
			return this.end - this._position;
		};
		//////// ByteReader ////////
		ByteStream.prototype.byteAlign = function() {
			if (!this.bit_offset) return;
			this._position += ((this.bit_offset + 7) / 8) | 0;
			this.bit_offset = 0;
		}
		ByteStream.prototype.readUint8 = function() {
			this.byteAlign();
			return this.dataView.getUint8(this._position++);
		}
		ByteStream.prototype.readUint16 = function() {
			this.byteAlign();
			var value = this.dataView.getUint16(this._position, this.littleEndian);
			this._position += 2;
			return value;
		}
		ByteStream.prototype.readUint24 = function() {
			this.byteAlign();
			var value = this.dataView.getUint8(this._position++);
			value += (0x100 * this.dataView.getUint8(this._position++));
			value += (0x10000 * this.dataView.getUint8(this._position++));
			return value;
		}
		ByteStream.prototype.readUint32 = function() {
			this.byteAlign();
			var value = this.dataView.getUint32(this._position, this.littleEndian);
			this._position += 4;
			return value;
		}
		ByteStream.prototype.readUint64 = function() {
			this.byteAlign();
			var value = this.dataView.getUint8(this._position++);
			value += (0x100 * this.dataView.getUint8(this._position++));
			value += (0x10000 * this.dataView.getUint8(this._position++));
			value += (0x1000000 * this.dataView.getUint8(this._position++));
			value += (0x100000000 * this.dataView.getUint8(this._position++));
			value += (0x10000000000 * this.dataView.getUint8(this._position++));
			value += (0x1000000000000 * this.dataView.getUint8(this._position++));
			value += ((0x100000000 * 0x1000000) * this.dataView.getUint8(this._position++));
			return value;
		}
		ByteStream.prototype.readInt8 = function() {
			this.byteAlign();
			return this.dataView.getInt8(this._position++);
		}
		ByteStream.prototype.readInt16 = function() {
			this.byteAlign();
			var value = this.dataView.getInt16(this._position, this.littleEndian);
			this._position += 2;
			return value;
		}
		ByteStream.prototype.readInt24 = function() {
			let t = this.readUint24();
			return t >> 23 && (t -= 16777216),t
		}
		ByteStream.prototype.readInt32 = function() {
			this.byteAlign();
			var value = this.dataView.getInt32(this._position, this.littleEndian);
			this._position += 4;
			return value;
		}
		ByteStream.prototype.readFixed8 = function() {
			return +(this.readInt16() / 0x100).toFixed(1);
		}
		ByteStream.prototype.readFixed16 = function() {
			return +(this.readInt32() / 0x10000).toFixed(2);
		}
		ByteStream.prototype.readFloat16 = function() {
			const t = this.dataView.getUint8(this._position++);
			let e = 0;
			return e |= this.dataView.getUint8(this._position++) << 8,e |= t << 0,e
		}
		ByteStream.prototype.readFloat32 = function() {
			var t = this.dataView.getUint8(this._position++);
			var e = this.dataView.getUint8(this._position++)
			var s = this.dataView.getUint8(this._position++);
			var a = 0;
			a |= this.dataView.getUint8(this._position++) << 24,a |= s << 16,a |= e << 8,a |= t << 0;
			const i = a >> 23 & 255;
			return a && 2147483648 !== a ? (2147483648 & a ? -1 : 1) * (8388608 | 8388607 & a) * Math.pow(2, i - 127 - 23) : 0
		}
		ByteStream.prototype.readFloat64 = function() {
			var upperBits = this.readUint32();
			var lowerBits = this.readUint32();
			var sign = upperBits >>> 31 & 0x1;
			var exp = upperBits >>> 20 & 0x7FF;
			var upperFraction = upperBits & 0xFFFFF;
			return (!upperBits && !lowerBits) ? 0 : ((sign === 0) ? 1 : -1) * (upperFraction / 1048576 + lowerBits / 4503599627370496 + 1) * Math.pow(2, exp - 1023);
		}
		ByteStream.prototype.readDouble = function() {
			var v = this.dataView.getFloat64(this._position, this.littleEndian);
			this._position += 8;
			return v;
		}
		ByteStream.prototype.getU30 = function() {
			this.byteAlign();
			let t = 0;
			for (let e = 0; 5 > e; ++e) {
				const s = this.dataView.getUint8(this._position++);
				if (t |= (127 & s) << 7 * e, !(128 & s)) break
			}
			return t
		}
		ByteStream.prototype.getS30 = function() {
			const t = this._position;
			let e = this.getU30();
			const s = 8 * (this._position - t) | 0;
			return e >> s - 1 && (e -= Math.pow(2, s)),e
		}
		//////// BitReader ////////
		ByteStream.prototype.byteCarry = function() {
			if (this.bit_offset > 7) {
				this._position += ((this.bit_offset + 7) / 8) | 0;
				this.bit_offset &= 0x07;
			} else {
				while (this.bit_offset < 0) {
					this._position--;
					this.bit_offset += 8;
				}
			}
		}
		ByteStream.prototype.getUIBits = function(n) {
			var value = 0;
			while (n--) {
				value <<= 1;
				value |= this.getUIBit();
			}
			return value;
		}
		ByteStream.prototype.getUIBit = function() {
			this.byteCarry();
			return (this.dataView.getUint8(this._position) >> (7 - this.bit_offset++)) & 0x1;	
		}
		ByteStream.prototype.getSIBits = function(n) {
			var value = this.getUIBits(n);
			var msb = value & (0x1 << (n - 1));
			if (msb) {
				var bitMask = (2 * msb) - 1;
				return -(value ^ bitMask) - 1;
			}
			return value;
		}
		ByteStream.prototype.getSIBitsFixed8 = function(n) {
			return +(this.getSIBits(n) / 0x100).toFixed(2);
		}
		ByteStream.prototype.getSIBitsFixed16 = function(n) {
			return +(this.getSIBits(n) / 0x10000).toFixed(4);
		}
		wpjsm.exportJS = ByteStream;
	},
	"src/utils/LZMA.js": function(wpjsm){
		function __init(e) {
			const t = [];
			t.push(e[12], e[13], e[14], e[15], e[16], e[4], e[5], e[6], e[7]);
			let s = 8;
			for (let e = 5; e < 9; ++e) {
				if (t[e] >= s) {
					t[e] = t[e] - s | 0;
					break
				}
				t[e] = 256 + t[e] - s | 0,s = 1
			}
			return t.push(0, 0, 0, 0), e.set(t, 4),e.subarray(4)
		}
		function __reverseDecode2(e, t, s, i) {
			let r = 1, o = 0, d = 0;
			for (; d < i; ++d) {
				const i = s.decodeBit(e, t + r);
				r = r << 1 | i,o |= i << d
			}
			return o
		}
		function __decompress(e, t) {
			const s = new Decoder, i = s.decodeHeader(e), r = i.uncompressedSize;
			if (s.setProperties(i),!s.decodeBody(e, t, r))
				throw new Error("Error in lzma data stream");
			return t
		}
		const OutWindow = function() {
			this._buffer = null,
			this._stream = null,
			this._pos = 0,
			this._streamPos = 0,
			this._windowSize = 0
		}
		OutWindow.prototype.create = function(e) {
			this._buffer && this._windowSize === e || (this._buffer = new Uint8Array(e)),
			this._windowSize = e
		}
		OutWindow.prototype.flush = function() {
			const e = this._pos - this._streamPos;
			e && (this._stream.writeBytes(this._buffer, e),
			this._pos >= this._windowSize && (this._pos = 0),
			this._streamPos = this._pos)
		}
		OutWindow.prototype.releaseStream = function() {
			this.flush(),
			this._stream = null
		}
		OutWindow.prototype.setStream = function(e) {
			this._stream = e
		}
		OutWindow.prototype.init = function(e=!1) {
			e || (this._streamPos = 0,this._pos = 0)
		}
		OutWindow.prototype.copyBlock = function(e, t) {
			let s = this._pos - e - 1;
			for (s < 0 && (s += this._windowSize); t--; )
				s >= this._windowSize && (s = 0),
				this._buffer[this._pos++] = this._buffer[s++],
				this._pos >= this._windowSize && this.flush()
		}
		OutWindow.prototype.putByte = function(e) {
			this._buffer[this._pos++] = e,
			this._pos >= this._windowSize && this.flush()
		}
		OutWindow.prototype.getByte = function(e) {
			let t = this._pos - e - 1;
			return t < 0 && (t += this._windowSize),this._buffer[t]
		}
		const RangeDecoder = function() {
			this._stream = null,
			this._code = 0,
			this._range = -1
		}
		RangeDecoder.prototype.setStream = function(e) {
			this._stream = e
		}
		RangeDecoder.prototype.releaseStream = function() {
			this._stream = null
		}
		RangeDecoder.prototype.init = function() {
			let e = 5;
			for (this._code = 0,this._range = -1; e--; ) this._code = this._code << 8 | this._stream.readByte()
		}
		RangeDecoder.prototype.decodeDirectBits = function(e) {
			let t = 0, s = e;
			for (; s--; ) {
				this._range >>>= 1;
				const e = this._code - this._range >>> 31;
				this._code -= this._range & e - 1,t = t << 1 | 1 - e,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8)
			}
			return t
		}
		RangeDecoder.prototype.decodeBit = function(e, t) {
			const s = e[t], i = (this._range >>> 11) * s;
			return (2147483648 ^ this._code) < (2147483648 ^ i) ? (this._range = i,e[t] += 2048 - s >>> 5,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8),0) : (this._range -= i,this._code -= i,e[t] -= s >>> 5,0 == (4278190080 & this._range) && (this._code = this._code << 8 | this._stream.readByte(),this._range <<= 8),1)
		}
		const BitTreeDecoder = function(e) {
			this._models = Array(1 << e).fill(1024),
			this._numBitLevels = e
		}
		BitTreeDecoder.prototype.decode = function(e) {
			let t = 1, s = this._numBitLevels;
			for (; s--; )t = t << 1 | e.decodeBit(this._models, t);
			return t - (1 << this._numBitLevels)
		}
		BitTreeDecoder.prototype.reverseDecode = function(e) {
			let t = 1, s = 0, i = 0;
			for (; i < this._numBitLevels; ++i) {
				const r = e.decodeBit(this._models, t);
				t = t << 1 | r,s |= r << i
			}
			return s
		}
		const LenDecoder = function() {
			this._choice = [1024, 1024],
			this._lowCoder = [],
			this._midCoder = [],
			this._highCoder = new BitTreeDecoder(8),
			this._numPosStates = 0
		}
		LenDecoder.prototype.create = function(e) {
			for (; this._numPosStates < e; ++this._numPosStates) this._lowCoder[this._numPosStates] = new BitTreeDecoder(3),this._midCoder[this._numPosStates] = new BitTreeDecoder(3)
		}
		LenDecoder.prototype.decode = function(e, t) {
			return 0 === e.decodeBit(this._choice, 0) ? this._lowCoder[t].decode(e) : 0 === e.decodeBit(this._choice, 1) ? 8 + this._midCoder[t].decode(e) : 16 + this._highCoder.decode(e)
		}
		const Decoder2 = function() {
			this._decoders = Array(768).fill(1024)
		}
		Decoder2.prototype.decodeNormal = function(e) {
			let t = 1;
			do {
				t = t << 1 | e.decodeBit(this._decoders, t)
			} while (t < 256);return 255 & t
		}
		Decoder2.prototype.decodeWithMatchByte = function(e, t) {
			let s = 1;
			do {
				const i = t >> 7 & 1;
				t <<= 1;
				const r = e.decodeBit(this._decoders, (1 + i << 8) + s);
				if (s = s << 1 | r,i !== r) {
					for (; s < 256; )s = s << 1 | e.decodeBit(this._decoders, s);
					break
				}
			} while (s < 256);return 255 & s
		}
		const LiteralDecoder = function() {
		}
		LiteralDecoder.prototype.create = function(e, t) {
			if (this._coders && this._numPrevBits === t && this._numPosBits === e) return;
			this._numPosBits = e,
			this._posMask = (1 << e) - 1,
			this._numPrevBits = t,
			this._coders = [];
			let s = 1 << this._numPrevBits + this._numPosBits;
			for (; s--; )this._coders[s] = new Decoder2
		}
		LiteralDecoder.prototype.getDecoder = function(e, t) {
			return this._coders[((e & this._posMask) << this._numPrevBits) + ((255 & t) >>> 8 - this._numPrevBits)]
		}
		const Decoder = function() {
			this._outWindow = new OutWindow,
			this._rangeDecoder = new RangeDecoder,
			this._isMatchDecoders = Array(192).fill(1024),
			this._isRepDecoders = Array(12).fill(1024),
			this._isRepG0Decoders = Array(12).fill(1024),
			this._isRepG1Decoders = Array(12).fill(1024),
			this._isRepG2Decoders = Array(12).fill(1024),
			this._isRep0LongDecoders = Array(192).fill(1024),
			this._posDecoders = Array(114).fill(1024),
			this._posAlignDecoder = new BitTreeDecoder(4),
			this._lenDecoder = new LenDecoder,
			this._repLenDecoder = new LenDecoder,
			this._literalDecoder = new LiteralDecoder,
			this._dictionarySize = -1,
			this._dictionarySizeCheck = -1,
			this._posSlotDecoder = [new BitTreeDecoder(6), new BitTreeDecoder(6), new BitTreeDecoder(6), new BitTreeDecoder(6)]
		}
		Decoder.prototype.setDictionarySize = function(e) {
			return !(e < 0) && (this._dictionarySize !== e && (this._dictionarySize = e,this._dictionarySizeCheck = Math.max(this._dictionarySize, 1),this._outWindow.create(Math.max(this._dictionarySizeCheck, 4096))),!0)
		}
		Decoder.prototype.setLcLpPb = function(e, t, s) {
			if (e > 8 || t > 4 || s > 4)return !1;
			const i = 1 << s;
			return this._literalDecoder.create(t, e),this._lenDecoder.create(i),this._repLenDecoder.create(i),this._posStateMask = i - 1,!0
		}
		Decoder.prototype.setProperties = function(e) {
			if (!this.setLcLpPb(e.lc, e.lp, e.pb))throw Error("Incorrect stream properties");
			if (!this.setDictionarySize(e.dictionarySize))throw Error("Invalid dictionary size")
		}
		Decoder.prototype.decodeHeader = function(e) {
			if (e._$size < 13)return !1;
			let t = e.readByte();
			const s = t % 9;
			t = ~~(t / 9);
			const i = t % 5, r = ~~(t / 5);let o = e.readByte();o |= e.readByte() << 8,o |= e.readByte() << 16,o += 16777216 * e.readByte();let d = e.readByte();return d |= e.readByte() << 8,d |= e.readByte() << 16,d += 16777216 * e.readByte(),e.readByte(),e.readByte(),e.readByte(),e.readByte(),{lc: s,lp: i,pb: r,dictionarySize: o,uncompressedSize: d}
		}
		Decoder.prototype.decodeBody = function(e, t, s) {
			let i, r, o = 0, d = 0, h = 0, c = 0, n = 0, _ = 0, a = 0;
			for (this._rangeDecoder.setStream(e),this._rangeDecoder.init(),this._outWindow.setStream(t),this._outWindow.init(!1); _ < s; ) {
				const e = _ & this._posStateMask;if (0 === this._rangeDecoder.decodeBit(this._isMatchDecoders, (o << 4) + e)) {
					const e = this._literalDecoder.getDecoder(_++, a);a = o >= 7 ? e.decodeWithMatchByte(this._rangeDecoder, this._outWindow.getByte(d)) : e.decodeNormal(this._rangeDecoder),this._outWindow.putByte(a),o = o < 4 ? 0 : o - (o < 10 ? 3 : 6)
				} else {
					if (1 === this._rangeDecoder.decodeBit(this._isRepDecoders, o))i = 0,0 === this._rangeDecoder.decodeBit(this._isRepG0Decoders, o) ? 0 === this._rangeDecoder.decodeBit(this._isRep0LongDecoders, (o << 4) + e) && (o = o < 7 ? 9 : 11,i = 1) : (0 === this._rangeDecoder.decodeBit(this._isRepG1Decoders, o) ? r = h : (0 === this._rangeDecoder.decodeBit(this._isRepG2Decoders, o) ? r = c : (r = n,n = c),c = h),h = d,d = r),0 === i && (i = 2 + this._repLenDecoder.decode(this._rangeDecoder, e),o = o < 7 ? 8 : 11);else {n = c,c = h,h = d,i = 2 + this._lenDecoder.decode(this._rangeDecoder, e),o = o < 7 ? 7 : 10;const t = this._posSlotDecoder[i <= 5 ? i - 2 : 3].decode(this._rangeDecoder);
						if (t >= 4) {
							const e = (t >> 1) - 1;if (d = (2 | 1 & t) << e,t < 14)d += __reverseDecode2(this._posDecoders, d - t - 1, this._rangeDecoder, e);
							else if (d += this._rangeDecoder.decodeDirectBits(e - 4) << 4,d += this._posAlignDecoder.reverseDecode(this._rangeDecoder),d < 0) {
								if (-1 === d)break;
								return !1
							}
						} else d = t
					}
					if (d >= _ || d >= this._dictionarySizeCheck)return !1;
					this._outWindow.copyBlock(d, i),_ += i,a = this._outWindow.getByte(0)
				}
			}
			return this._outWindow.releaseStream(),this._rangeDecoder.releaseStream(),!0
		}
		const InStream = function(e) {
			this._$data = e;
			this._$size = e.length;this._$offset = 0;
		}
		InStream.prototype.readByte = function() {
			return this._$data[this._$offset++];
		}
		const OutStream = function(e) {
			this.size = 8;
			this.buffers = e;
		}
		OutStream.prototype.writeBytes = function(e, t) {
			if (e.length === t) {
				this.buffers.set(e, this.size);
			} else {
				this.buffers.set(e.subarray(0, t), this.size);
			}
			this.size += t;
		}
		wpjsm.exportJS = {
			parse: function (data, fileLength) {
				const t = fileLength,s = data,i = new Uint8Array(t + 8);
				i.set(s.slice(0, 8), 0);
				__decompress(new InStream(__init(s)), new OutStream(i));
				return i
			}
		};
	},
	"src/utils/nellymoser.js": function(wpjsm){
		/*
		 * Nellymoser Decoder JS
		 * 
		 * A pure Javascript decoder for the Nellymoser audio codec.
		 * 
		 * (c) 2024 ATFSMedia Productions.
		 * 
		 * Made in Peru
		 */
		
		const Bits = function() {
			this.bytePos = 0;
			this.bitPos = 0;
		}
		Bits.prototype.pop = function(len, buf) {
			let val = (buf[this.bytePos] & 0xff) >> this.bitPos;
			let bits_read = 8 - this.bitPos;
			if (len >= bits_read) {
				this.bytePos++;
				if (len > bits_read) {
					val |= buf[this.bytePos] << bits_read;
				}
			}
			this.bitPos = (this.bitPos + len) & 7;
			return val & ((1 << len) - 1);
		}
		const NormalizedInt32 = function(val) {
			this.value = 0;
			this.scale = 0;
			if (val == 0) {
				this.value = val;
				this.scale = 31;
				return;
			} else if (val >= (1 << 30)) {
				this.value = 0;
				this.scale = 0;
				return;
			}
			let v = val;
			let s = 0;
			if (v > 0) {
				do {
					v <<= 1;
					++s;
				} while (v < (1 << 30));
			} else {
				let floor = 1 << 31; // lowest possible 32bit value
				do {
					v <<= 1;
					++s;
				} while (v > floor + (1 << 30));
			}
			this.value = v;
			this.scale = s;
		}
		
		const bandBound = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 21, 24, 28, 32, 37, 43, 49, 56, 64, 73, 83, 95, 109, 124];
		const gainBit = [6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		const table1 = [3134, 5342, 6870, 7792, 8569, 9185, 9744, 10191, 10631, 11061, 11434, 11770, 12116, 12513, 12925, 13300, 13674, 14027, 14352, 14716, 15117, 15477, 15824, 16157, 16513, 16804, 17090, 17401, 17679, 17948, 18238, 18520, 18764, 19078, 19381, 19640, 19921, 20205, 20500, 20813, 21162, 21465, 21794, 22137, 22453, 22756, 23067, 23350, 23636, 23926, 24227, 24521, 24819, 25107, 25414, 25730, 26120, 26497, 26895, 27344, 27877, 28463, 29426, 31355];
		const table2 = [-11725, -9420, -7910, -6801, -5948, -5233, -4599, -4039, -3507, -3030, -2596, -2170, -1774, -1383, -1016, -660, -329, -1, 337, 696, 1085, 1512, 1962, 2433, 2968, 3569, 4314, 5279, 6622, 8154, 10076, 12975];
		const table3 = [0.0, -0.847256005,    0.722470999,    -1.52474797, -0.453148007,   0.375360996,    1.47178996,     -1.98225796, -1.19293797,   -0.582937002,   -0.0693780035,    0.390956998, 0.906920016,   1.486274,       2.22154093,     -2.38878703, -1.80675399,   -1.41054201,    -1.07736099,     -0.799501002, -0.555810988,  -0.333402008,   -0.132449001,     0.0568020009, 0.254877001,   0.477355003,    0.738685012,     1.04430604, 1.39544594,    1.80987501,     2.39187598,     -2.38938308, -1.98846805,   -1.75140405,    -1.56431198,     -1.39221299, -1.216465,     -1.04694998,    -0.890510023,    -0.764558017, -0.645457983,  -0.52592802,    -0.405954987,    -0.302971989, -0.209690005,  -0.123986997,   -0.0479229987,    0.025773, 0.100134,      0.173718005,    0.258554012,     0.352290004, 0.456988007,   0.576775014,    0.700316012,     0.842552006, 1.00938797,    1.18213499,     1.35345602,      1.53208196, 1.73326194,    1.97223496,     2.39781404,     -2.5756309, -2.05733204,   -1.89849198,    -1.77278101,     -1.66626, -1.57421803,   -1.49933195,    -1.43166399,     -1.36522806, -1.30009902,   -1.22809303,    -1.15885794,     -1.09212506, -1.013574,     -0.920284986,   -0.828705013,    -0.737488985, -0.644775987,  -0.559094012,   -0.485713989,    -0.411031991, -0.345970005,  -0.285115987,   -0.234162003,    -0.187058002, -0.144250005,  -0.110716999,   -0.0739680007,   -0.0365610011, -0.00732900016, 0.0203610007,   0.0479039997,    0.0751969963, 0.0980999991,  0.122038998,    0.145899996,     0.169434994, 0.197045997,   0.225243002,    0.255686998,     0.287010014, 0.319709986,   0.352582991,    0.388906986,     0.433492005, 0.476945996,   0.520482004,    0.564453006,     0.612204015, 0.668592989,   0.734165013,    0.803215981,     0.878404021, 0.956620991,   1.03970695,     1.12937701,      1.22111595, 1.30802798,    1.40248001,     1.50568199,      1.62277305, 1.77249599,    1.94308805,     2.29039311,      0.0];
		const table4 = [0.999981225,    0.999529421,    0.998475611,     0.996820271, 0.994564593,    0.991709828,    0.988257587,     0.984210074, 0.979569793,    0.974339426,    0.968522072,     0.962121427, 0.955141187,    0.947585583,    0.939459205,     0.930767, 0.921513975,    0.911705971,    0.901348829,     0.890448689, 0.879012227,    0.867046177,    0.854557991,     0.841554999, 0.828045011,    0.81403631,     0.799537301,     0.784556627, 0.769103289,    0.753186822,    0.736816585,     0.720002472, 0.702754676,    0.685083687,    0.666999876,     0.64851439, 0.629638195,    0.610382795,    0.590759695,     0.570780694, 0.550458014,    0.529803574,    0.50883007,      0.487550199, 0.465976506,    0.444122106,    0.422000289,     0.399624199, 0.377007395,    0.354163498,    0.331106305,     0.307849586, 0.284407496,    0.260794103,    0.237023607,     0.213110298, 0.189068705,    0.164913103,    0.1406582,       0.116318598, 0.0919089988,   0.0674438998,   0.0429382995,    0.0184067003];
		const table5 = [0.125, 0.124962397,    0.124849401,     0.124661297,0.124398097,    0.124059901,    0.123647101,     0.123159699, 0.122598201,    0.121962801,    0.1212539,       0.120471999, 0.119617499,    0.118690997,    0.117693,        0.116624102, 0.115484901,    0.114276201,    0.112998702,     0.111653, 0.110240199,    0.108760901,    0.107216097,     0.105606697, 0.103933699,    0.102198102,    0.100400902,     0.0985433012, 0.0966262966,   0.094651103,    0.0926188976,    0.0905309021, 0.0883883014,   0.0861926004,   0.0839449018,    0.0816465989, 0.0792991966,   0.076903902,    0.0744623989,    0.0719759986, 0.069446303,    0.0668746978,   0.0642627999,    0.0616123006, 0.0589246005,   0.0562013984,   0.0534444004,    0.0506552011, 0.0478353985,   0.0449868999,   0.0421111993,    0.0392102003, 0.0362856016,   0.0333391018,   0.0303725004,    0.0273876991, 0.0243862998,   0.0213702004,   0.0183412991,    0.0153013002, 0.0122520998,   0.0091955997,   0.00613350002,   0.00306769996];
		const table6 = [-0.00613590004,-0.0306748003,  -0.0551952012,   -0.0796824023,-0.104121603,  -0.128498107,   -0.152797207,    -0.177004203,-0.201104596,  -0.225083902,   -0.248927593,    -0.272621393,-0.296150893,  -0.319501996,   -0.342660695,    -0.365613014,-0.388345003,  -0.410843194,   -0.433093786,    -0.455083609,-0.47679919,   -0.498227686,   -0.519356012,    -0.540171504,-0.560661614,  -0.580814004,   -0.600616515,    -0.620057225,-0.639124393,  -0.657806695,   -0.676092684,    -0.693971515,-0.711432219,  -0.728464425,   -0.745057821,    -0.761202395,-0.77688849,   -0.792106628,   -0.806847572,    -0.8211025,-0.834862888,  -0.848120272,   -0.860866904,    -0.873094976,-0.884797096,  -0.895966172,   -0.906595707,    -0.916679084,-0.926210225,  -0.935183525,   -0.943593502,    -0.95143503,-0.958703518,  -0.965394378,   -0.971503913,    -0.977028072,-0.981963873,  -0.986308098,   -0.990058184,    -0.993211925,-0.995767415,  -0.997723103,   -0.999077678,    -0.999830604];
		const table7 = [0.00613590004,  0.0184067003,   0.0306748003,    0.0429382995,0.0551952012,   0.0674438998,   0.0796824023,    0.0919089988,0.104121603,    0.116318598,    0.128498107,     0.1406582,0.152797207,    0.164913103,    0.177004203,     0.189068705,0.201104596,    0.213110298,    0.225083902,     0.237023607,0.248927593,    0.260794103,    0.272621393,     0.284407496,0.296150893,    0.307849586,    0.319501996,     0.331106305,0.342660695,    0.354163498,    0.365613014,     0.377007395,0.388345003,    0.399624199,    0.410843194,     0.422000289,0.433093786,    0.444122106,    0.455083609,     0.465976506,0.47679919,     0.487550199,    0.498227686,     0.50883007,0.519356012,    0.529803574,    0.540171504,     0.550458014,0.560661614,    0.570780694,    0.580814004,     0.590759695,0.600616515,    0.610382795,    0.620057225,     0.629638195,0.639124393,    0.64851439,     0.657806695,     0.666999876,0.676092684,    0.685083687,    0.693971515,     0.702754676,0.711432219,    0.720002472,    0.728464425,     0.736816585,0.745057821,    0.753186822,    0.761202395,     0.769103289,0.77688849,     0.784556627,    0.792106628,     0.799537301,0.806847572,    0.81403631,     0.8211025,       0.828045011,0.834862888,    0.841554999,    0.848120272,     0.854557991,0.860866904,    0.867046177,    0.873094976,     0.879012227,0.884797096,    0.890448689,    0.895966172,     0.901348829,0.906595707,    0.911705971,    0.916679084,     0.921513975,0.926210225,    0.930767,       0.935183525,     0.939459205,0.943593502,    0.947585583,    0.95143503,      0.955141187,0.958703518,    0.962121427,    0.965394378,     0.968522072,0.971503913,    0.974339426,    0.977028072,     0.979569793,0.981963873,    0.984210074,    0.986308098,     0.988257587,0.990058184,    0.991709828,    0.993211925,     0.994564593,0.995767415,    0.996820271,    0.997723103,     0.998475611,0.999077678,    0.999529421,    0.999830604,     0.999981225];
		const table9 = [32767, 30840, 29127, 27594, 26214, 24966, 23831, 22795,21845, 20972, 20165, 19418, 18725, 18079, 17476, 16913,16384, 0,     0,     0,     0,     0,     0,     0,0,     0,     0,     0,     0,     0,     0,     0];
		const table10 = [0.0,      0.0122715384,   0.024541229,     0.0368072242,0.0490676723,   0.061320737,    0.0735645667,    0.0857973099,0.0980171412,   0.110222213,    0.122410677,     0.134580716,0.146730468,    0.158858135,    0.170961887,     0.183039889,0.195090324,    0.207111374,    0.219101235,     0.231058106,0.242980182,    0.254865646,    0.266712755,     0.27851969,0.290284693,    0.302005947,    0.313681751,     0.32531029,0.336889863,    0.348418683,    0.359895051,     0.371317178,0.382683426,    0.393992037,    0.405241311,     0.416429549,0.427555084,    0.438616246,    0.449611336,     0.460538715,0.471396744,    0.482183784,    0.492898196,     0.50353837,0.514102757,    0.524589658,    0.534997642,     0.545324981,0.555570245,    0.565731823,    0.575808167,     0.585797846,0.59569931,     0.605511069,    0.615231574,     0.624859512,0.634393275,    0.643831551,    0.653172851,     0.662415802,0.671558976,    0.680601001,    0.689540565,     0.698376238,0.707106769,    0.715730846,    0.724247098,     0.732654274,0.740951121,    0.749136388,    0.757208824,     0.765167296,0.773010433,    0.780737221,    0.78834641,      0.795836926,0.803207517,    0.81045723,     0.817584813,     0.824589312,0.831469595,    0.838224709,    0.84485358,      0.851355195,0.857728601,    0.863972843,    0.870086968,     0.876070082,0.881921232,    0.887639642,    0.893224299,     0.898674488,0.903989315,    0.909168005,    0.914209783,     0.919113874,0.923879504,    0.928506076,    0.932992816,     0.937339008,0.941544056,    0.945607305,    0.949528158,     0.953306019,0.956940353,    0.960430503,    0.963776052,     0.966976464,0.970031261,    0.972939968,    0.975702107,     0.97831738,0.980785251,    0.983105481,    0.985277653,     0.987301409,0.989176512,    0.990902662,    0.992479503,     0.993906975,0.99518472,     0.996312618,    0.997290432,     0.998118103,0.99879545,     0.999322355,    0.999698818,     0.999924719,1.0];
		
		const NELLY_BLOCK_LEN = 64; // usize
		const NELLY_HEADER_BITS = 116; // usize
		const NELLY_DETAIL_BITS = 198; // i32
		const NELLY_BUF_LEN = 128; // usize
		const NELLY_FILL_LEN = 124; // usize
		const NELLY_BIT_CAP = 6; // i16
		const NELLY_BASE_OFF = 4228; // i32
		const NELLY_BASE_SHIFT = 19; // i16
		const NELLY_SAMPLES = NELLY_BUF_LEN * 2; // usize
		
		const Factor = function(val) {
			this.value = 0;
			this.shift = 0;
			if (val == NELLY_FILL_LEN) {
				// Common case optimization.
				this.value = NELLY_BASE_OFF;
				this.shift = NELLY_BASE_SHIFT;
				return;
			} else if (val == 0) {
				this.value = 0;
				this.shift = 0;
				return;
			}
			var sign = ((~val >>> 31) << 1) - 1;
			var abs = val * sign;
			var scale = -1;
			while ((abs & (1 << 15)) == 0) {
				abs <<= 1;
				scale++;
			}
			abs >>= 1;
			this.shift = 27 - scale;
			var table_val = table9[(abs - 0x3e00) >> 10];
			var tmp = abs * table_val;
			tmp = (1 << 30) - tmp;
			tmp += (1 << 14);
			tmp >>= 15;
			tmp *= table_val;
			tmp += (1 << 14);
			tmp >>= 15;
			var tmp2 = tmp;
			tmp *= abs;
			tmp = (1 << 29) - tmp;
			tmp += (1 << 14);
			tmp >>= 15;
			tmp *= tmp2;
			tmp += (1 << 13);
			tmp >>= 14;
			tmp *= sign;
			if (tmp > 32767 && sign == 1) {
				tmp = 32767;
			} else if (tmp < -32768 && sign == -1) {
				tmp = -32768;
			}
			this.value = tmp;
		}
		const getD = function(_in, scale, len, upper_bound, base) {
			var d = 0;
			if (len <= 0) {
				return (d | 0);
			}
			var var_1 = 1 << (scale - 1);
			for (var i = 0; i < len; ++i) {
				var var_2 = _in[i] - base;
				if (var_2 < 0) {
					var_2 = 0;
				} else {
					var_2 = (var_2 + var_1) >> scale;
				}
				d += Math.min(var_2, upper_bound);
			}
			return (d | 0);
		}
		const wc = function(_in, len, total_bits, packed_sizes) {
			var max_input = 0;
			for (var i = 0; i < len; ++i) {
				if (_in[i] > max_input) {
					max_input = _in[i];
				}
			}
			var max_input_scale = 0;
			var normalized = new NormalizedInt32(max_input);
			max_input_scale = normalized.scale - 16;
			var scaled_input = new Int16Array(NELLY_FILL_LEN);
			if (max_input_scale < 0) {
				for (var i = 0; i < len; ++i) {
					scaled_input[i] = (_in[i] >> -max_input_scale);
				}
			} else {
				for (var i = 0; i < len; ++i) {
					scaled_input[i] = (_in[i] << max_input_scale);
				}
			}
			var factor = new Factor(len);
			for (var i = 0; i < len; ++i) {
				scaled_input[i] = ((scaled_input[i] * 3) >> 2); // *= 0.75
			}
			var scaled_input_sum = 0;
			for (var i = 0; i < len; ++i) {
				scaled_input_sum += scaled_input[i];
			}
			max_input_scale += 11;
			scaled_input_sum -= total_bits << max_input_scale;
			var scaled_input_base = 0;
			var val = scaled_input_sum - (total_bits << max_input_scale);
			var normalized = new NormalizedInt32(val);
			scaled_input_base = ((val >> 16) * factor.value) >> 15;
			var shift = 31 - factor.shift - normalized.scale;
			if (shift >= 0) {
				scaled_input_base <<= shift;
			} else {
				scaled_input_base >>= -shift;
			}
			var bits_used = getD(scaled_input, max_input_scale, len, 6, scaled_input_base);
			if (bits_used != total_bits) {
				var diff = (bits_used - total_bits);
				var diff_scale = 0;
				if (diff <= 0) {
					for (; diff >= -16384; diff <<= 1) {
						diff_scale++;
					}
				} else {
					for (; diff < 16384; diff <<= 1) {
						diff_scale++;
					}
				}
				var base_delta = (diff * factor.value) >> 15;
				diff_scale = max_input_scale - (factor.shift + diff_scale - 15);
				if (diff_scale >= 0) {
					base_delta <<= diff_scale;
				} else {
					base_delta >>= -diff_scale;
				}
				var num_revisions = 1;
				var last_bits_used = 0;
				var last_scaled_input_base = 0;
				for (;;) {
					last_bits_used = bits_used;
					last_scaled_input_base = scaled_input_base;
					scaled_input_base += base_delta;
					bits_used = getD(scaled_input, max_input_scale, len, 6, scaled_input_base);
					if (++num_revisions > 19) {
						break;
					}
					if ((bits_used - total_bits) * (last_bits_used - total_bits) <= 0) {
						break;
					}
				}
				if (bits_used != total_bits) {
					var scaled_input_base_1 = 0;
					var bits_used_1 = 0;
					var bits_used_2 = 0;
					if (bits_used > total_bits) {
						scaled_input_base_1 = scaled_input_base;
						scaled_input_base = last_scaled_input_base;
						bits_used_1 = bits_used;
						bits_used_2 = last_bits_used;
					} else {
						scaled_input_base_1 = last_scaled_input_base;
						bits_used_1 = last_bits_used;
						bits_used_2 = bits_used;
					}
					while (bits_used != total_bits && num_revisions < 20) {
						var avg = (scaled_input_base + scaled_input_base_1) >> 1;
						bits_used = getD(scaled_input, max_input_scale, len, 6, avg);
						++num_revisions;
						if (bits_used > total_bits) {
							scaled_input_base_1 = avg;
							bits_used_1 = bits_used;
						} else {
							scaled_input_base = avg;
							bits_used_2 = bits_used;
						}
					}
					var dev_1 = Math.abs((bits_used_1 - total_bits) | 0);
					var dev_2 = Math.abs((bits_used_2 - total_bits) | 0);
					if (dev_1 < dev_2) {
						scaled_input_base = scaled_input_base_1;
						bits_used = bits_used_1;
					} else {
						bits_used = bits_used_2;
					}
				}
			}
			for (var i = 0; i < len; ++i) {
				var tmp = scaled_input[i] - scaled_input_base;
				if (tmp >= 0) {
					tmp = (tmp + (1 << (max_input_scale - 1))) >> max_input_scale;
				} else {
					tmp = 0;
				}
				packed_sizes[i] = Math.min(tmp, 6);
			}
			if (bits_used > total_bits) {
				var i = 0;
				var bit_count = 0;
				for (; bit_count < total_bits; ++i) {
					bit_count += packed_sizes[i];
				}
				bit_count -= packed_sizes[i - 1];
				packed_sizes[i - 1] = total_bits - bit_count;
				bits_used = total_bits;
				for (; i < len; ++i) {
					packed_sizes[i] = 0;
				}
			}
			return (total_bits - bits_used) | 0;
		}
		const HarXfmHelper = function(data, data_off, half_len) {
			var len = half_len << 1;
			var j = 1;
			for (var i = 1; i < len; i += 2) {
				if (i < j) {
					var tmp1 = data[data_off + i];
					data[data_off + i] = data[data_off + j];
					data[data_off + j] = tmp1;
					
					var tmp2 = data[data_off + i - 1];
					data[data_off + i - 1] = data[data_off + j - 1];
					data[data_off + j - 1] = tmp2;
				}
				var x = half_len;
				while (x > 1 && x < j) {
					j -= x;
					x >>= 1;
				}
				j += x;
			}
		}
		const HarXfm = function(data, data_off, half_len_log2) {
			var half_len = 1 << half_len_log2;
			HarXfmHelper(data, data_off, half_len);
			var j = 0;
			for (var i = (half_len >> 1); i > 0; --i, j += 4) {
				var j0 = data[data_off + j];
				var j1 = data[data_off + j + 1];
				var j2 = data[data_off + j + 2];
				var j3 = data[data_off + j + 3];
				data[data_off + j] = j0 + j2;
				data[data_off + j + 1] = j1 + j3;
				data[data_off + j + 2] = j0 - j2;
				data[data_off + j + 3] = j1 - j3;
			}
			j = 0;
			for (var i = (half_len >> 2); i > 0; --i, j += 8) {
				var j0 = data[data_off + j];
				var j1 = data[data_off + j + 1];
				var j2 = data[data_off + j + 2];
				var j3 = data[data_off + j + 3];
				var j4 = data[data_off + j + 4];
				var j5 = data[data_off + j + 5];
				var j6 = data[data_off + j + 6];
				var j7 = data[data_off + j + 7];
				data[data_off + j] = j0 + j4;
				data[data_off + j + 1] = j1 + j5;
				data[data_off + j + 2] = j2 + j7;
				data[data_off + j + 3] = j3 - j6;
				data[data_off + j + 4] = j0 - j4;
				data[data_off + j + 5] = j1 - j5;
				data[data_off + j + 6] = j2 - j7;
				data[data_off + j + 7] = j3 + j6;
			}
			var i = 0;
			var x = (half_len >> 3);
			var y = 64;
			var z = 4;
			for (var idx1 = half_len_log2 - 2; idx1 > 0; --idx1, z <<= 1, y >>= 1, x >>= 1) {
				j = 0;
				for (var idx2 = x; idx2 != 0; --idx2, j += z << 1) {
					for (var idx3 = z >> 1; idx3 > 0; --idx3, j += 2, i += y) {
						var k = j + (z << 1);
						var j0 = data[data_off + j];
						var j1 = data[data_off + j + 1];
						var k0 = data[data_off + k];
						var k1 = data[data_off + k + 1];
						data[data_off + k] = (j0 - (k0 * table10[NELLY_BUF_LEN - i] + k1 * table10[i]));
						data[data_off + j] = (j0 + (k0 * table10[NELLY_BUF_LEN - i] + k1 * table10[i]));
						data[data_off + k + 1] = (j1 + (k0 * table10[i] - k1 * table10[NELLY_BUF_LEN - i]));
						data[data_off + j + 1] = (j1 - (k0 * table10[i] - k1 * table10[NELLY_BUF_LEN - i]));
					}
					for (var idx4 = z >> 1; idx4 > 0; --idx4, j += 2, i -= y) {
						var k = j + (z << 1);
						var j0 = data[data_off + j];
						var j1 = data[data_off + j + 1];
						var k0 = data[data_off + k];
						var k1 = data[data_off + k + 1];
						data[data_off + k] = (j0 + (k0 * table10[NELLY_BUF_LEN - i] - k1 * table10[i]));
						data[data_off + j] = (j0 - (k0 * table10[NELLY_BUF_LEN - i] - k1 * table10[i]));
						data[data_off + k + 1] = (j1 + (k1 * table10[NELLY_BUF_LEN - i] + k0 * table10[i]));
						data[data_off + j + 1] = (j1 - (k1 * table10[NELLY_BUF_LEN - i] + k0 * table10[i]));
					}
				}
			}
		}
		const auxceps = function(_in, in_off, len_log2, out, out_off) {
			var len = 1 << len_log2;
			var half_len_m1 = (len >> 1) - 1;
			var quarter_len = len >> 2;
			for (var i = 0; i < quarter_len; ++i) {
				var i2 = i << 1;
				var j = len - 1 - i2;
				var k = j - 1;
				var in_i2 = _in[in_off + i2];
				var in_i2_1 = _in[in_off + i2 + 1];
				var in_j = _in[in_off + j];
				var in_k = _in[in_off + k];
				out[out_off + i2] = (table4[i] * in_i2 - table6[i] * in_j);
				out[out_off + i2 + 1] = (in_j * table4[i] + in_i2 * table6[i]);
				out[out_off + k] = (table4[half_len_m1 - i] * in_k - table6[half_len_m1 - i] * in_i2_1);
				out[out_off + j] = (in_i2_1 * table4[half_len_m1 - i] + in_k * table6[half_len_m1 - i]);
			}
			HarXfm(out, out_off, len_log2 - 1);
			var last_out = out[out_off + len - 1];
			var pre_last_out = out[out_off + len - 2];
			out[out_off] = table5[0] * out[out_off];
			out[out_off + len - 1] = out[out_off + 1] * -table5[0];
			out[out_off + len - 2] = table5[half_len_m1] * out[out_off + len - 2] + table5[1] * last_out;
			out[out_off + 1] = pre_last_out * table5[1] - last_out * table5[half_len_m1];
			var i_out = len - 3;
			var i_tbl = half_len_m1;
			var j = 3;
			for (var i = 1; i < quarter_len; ++i, --i_tbl, i_out -= 2, j += 2) {
				var old_out_a = out[out_off + i_out];
				var old_out_b = out[out_off + i_out - 1];
				var old_out_c = out[out_off + j];
				var old_out_d = out[out_off + j - 1];
				out[out_off + j - 1] = (table5[i_tbl] * old_out_c + table5[(j - 1) >> 1] * old_out_d);
				out[out_off + j] = (old_out_b * table5[(j + 1) >> 1] - old_out_a * table5[i_tbl - 1]);
				out[out_off + i_out] = (old_out_d * table5[i_tbl] - old_out_c * table5[(j - 1) >> 1]);
				out[out_off + i_out - 1] = (table5[(j + 1) >> 1] * old_out_a + table5[i_tbl - 1] * old_out_b);
			}
		}
		const iTransfm = function(state, _in, len_log2, out, out_off) {
			var len = 1 << len_log2;
			var quarter_len = len >> 2;
			var y = len - 1;
			var x = len >> 1;
			var j = x - 1;
			var i = 0;
			auxceps(_in, 0, len_log2, out, out_off);
			for (; i < quarter_len; ++i, --j, ++x, --y) {
				var state_i = state[i];
				var state_j = state[j];
				var out_x = out[out_off + x];
				var out_y = out[out_off + y];
				state[i] = -out[out_off + j];
				state[j] = -out[out_off + i];
				out[out_off + i] = (state_i * table7[y] + out_x * table7[i]);
				out[out_off + j] = (state_j * table7[x] + out_y * table7[j]);
				out[out_off + x] = (table7[x] * -out_y + table7[j] * state_j);
				out[out_off + y] = (table7[y] * -out_x + table7[i] * state_i);
			}
		}
		const decodeBlock = function(state, _in, out) {
			// state --> float[]
			// _in --> byte[]
			// out --> float[]
			var unpacked_input = new Uint8Array(NELLY_FILL_LEN);
			var var_808 = new Float32Array(NELLY_BUF_LEN);
			var var_608 = new Float32Array(NELLY_FILL_LEN);
			var var_418 = new Float32Array(NELLY_FILL_LEN);
			var bs = new Bits();
			var unpacked_byte = bs.pop(gainBit[0], _in);
			unpacked_input[0] = unpacked_byte;
			var_808[0] = table1[unpacked_byte];
			for (var i = 1; i < 23; i++) {
				unpacked_byte = bs.pop(gainBit[i], _in);
				unpacked_input[i] = unpacked_byte;
				var_808[i] = var_808[i - 1] + table2[unpacked_byte];
			}
			for (var i = 0; i < 23; i++) {
				var pow = Math.pow(2.0, var_808[i] * (0.5 * 0.0009765625));
				var bound = bandBound[i];
				var next_bound = bandBound[i + 1];
				for (; bound < next_bound; ++bound) {
					var_418[bound] = var_808[i];
					var_608[bound] = pow;
				}
			}
			var packed_byte_sizes = new Int32Array(NELLY_FILL_LEN);
			var leftover = wc(var_418, NELLY_FILL_LEN, NELLY_DETAIL_BITS, packed_byte_sizes);
			for (var out_off = 0; out_off < NELLY_SAMPLES; out_off += NELLY_BUF_LEN) {
				for (var i = 0; i < NELLY_FILL_LEN; ++i) {
					var packed_size = packed_byte_sizes[i];
					var val = var_608[i];
					if (packed_size > 0) {
						var pow2 = 1 << packed_size;
						unpacked_byte = bs.pop(packed_size, _in);
						unpacked_input[i] = unpacked_byte;
						val *= table3[pow2 - 1 + unpacked_byte];
					} else {
						var rnd_u32 = Math.random() * 4294967296.0;
						if (rnd_u32 < (1<<30) + (1<<14)) {
							val *= -0.707099974;
						} else {
							val *= 0.707099974;
						}
					}
					var_808[i] = val;
				}
				for (var i = NELLY_FILL_LEN; i < NELLY_BUF_LEN; ++i) {
					var_808[i] = 0;
				}
				for (var i = leftover; i > 0; i -= 8) {
					if (i > 8) {
						bs.pop(8, _in);
					} else {
						bs.pop(i, _in);
						break;
					}
				}
				iTransfm(state, var_808, 7, out, out_off);
			}
		}
		wpjsm.exportJS = function(out, data) {
			var _pos_buffer = 0;
			var state = new Float32Array(NELLY_BUF_LEN);
			var r = 0;
			var audioD = new Float32Array(NELLY_SAMPLES);
			while (true) {
				var block = new Uint8Array(data.slice(r, r + NELLY_BLOCK_LEN));
				decodeBlock(state, block, audioD);
				for (let i = 0; i < NELLY_SAMPLES; i++) {
					out[_pos_buffer] = (audioD[i] / 32768);
					_pos_buffer++;
				};
				r += NELLY_BLOCK_LEN;
				if (r >= data.byteLength) {
					break;
				}
			}
		}
	},
	"src/utils/shapeUtils.js": function(wpjsm){
		function cloneObject(src) {
			return JSON.parse(JSON.stringify(src));
		}
		const shapeUtils = {
			calculateShapeBounds: function(shapeRecords) {
				var xMin = Infinity;
				var yMin = Infinity;
				var xMax = -Infinity;
				var yMax = -Infinity;
				function dfgfd(x, y) {
					if (x < xMin) {
						xMin = x;
					}
					if (y < yMin) {
						yMin = y;
					}
					if (x > xMax) {
						xMax = x;
					}
					if (y > yMax) {
						yMax = y;
					}
				}
				var currentPosition = {x: 0, y: 0};
				var hasShapeRecord = false;
				for (let i = 0; i < shapeRecords.length; i++) {
					const record = shapeRecords[i];
					if (!record) continue;
					hasShapeRecord = true;
					if (record.isChange) {
						if (record.stateMoveTo) {
							currentPosition.x = record.moveX;
							currentPosition.y = record.moveY;
							dfgfd(currentPosition.x, currentPosition.y);
						}
					} else {
						var isCurved = record.isCurved;
						if (isCurved) {
							var _controlX = currentPosition.x + record.controlDeltaX;
							var _controlY = currentPosition.y + record.controlDeltaY;
							currentPosition.x = _controlX + record.anchorDeltaX;
							currentPosition.y = _controlY + record.anchorDeltaY;
							dfgfd(_controlX, _controlY);
							dfgfd(currentPosition.x, currentPosition.y);
						} else {
							currentPosition.x += record.deltaX;
							currentPosition.y += record.deltaY;
							dfgfd(currentPosition.x, currentPosition.y);
						}
					}
				}
				if (hasShapeRecord) {
					return {xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax};
				} else {
					return {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
				}
			},
			convertCurrentPosition: function(src) {
				var array = [];
				var currentPosition = {x: 0, y: 0};
				for (let i = 0; i < src.length; i++) {
					const record = src[i];
					if (record) {
						if (record.isChange) {
							if (record.stateMoveTo) {
								currentPosition.x = record.moveX;
								currentPosition.y = record.moveY;
							}
							array.push(record);
						} else {
							var isCurved = record.isCurved;
							if (isCurved) {
								var _controlX = currentPosition.x + record.controlDeltaX;
								var _controlY = currentPosition.y + record.controlDeltaY;
								currentPosition.x = _controlX + record.anchorDeltaX;
								currentPosition.y = _controlY + record.anchorDeltaY;
								array.push({
									controlX: _controlX,
									controlY: _controlY,
									anchorX: currentPosition.x,
									anchorY: currentPosition.y,
									isCurved: true,
									isChange: false
								});
							} else {
								currentPosition.x += record.deltaX;
								currentPosition.y += record.deltaY;
								array.push({
									controlX: 0,
									controlY: 0,
									anchorX: currentPosition.x,
									anchorY: currentPosition.y,
									isCurved: false,
									isChange: false
								});
							}
						}
					} else {
						array.push(null);
					}
				}
				array.push(null);
				return array;
			},
			convertWithCacheCodes: function(shapeRecords) {
				var records = this.convertCurrentPosition(shapeRecords);
				var _cmd = [];
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					if (!record) {
						break;
					}
					var isCurved = record.isCurved;
					var isChange = record.isChange;
					var code;
					if (isChange) {
						code = [0, record.moveX, record.moveY];
					} else {
						if (isCurved) {
							code = [1, record.controlX, record.controlY, record.anchorX, record.anchorY];
						} else {
							code = [2, record.anchorX, record.anchorY];
						}
					}
					_cmd.push(code);
				}
				return _cmd;
			},
			convert: function(shapes, type) {
				var isMorph = (type == "morphshape");
				var lineStyles = shapes.lineStyles || [];
				var fillStyles = shapes.fillStyles || [];
				var records = this.convertCurrentPosition(shapes.shapeRecords);
				var idx = 0;
				var obj = {};
				var cache = [];
				var AnchorX = 0;
				var AnchorY = 0;
				var MoveX = 0;
				var MoveY = 0;
				var LineX = 0;
				var LineY = 0;
				var FillStyle0 = 0;
				var FillStyle1 = 0;
				var LineStyle = 0;
				var fills0 = [];
				var fills1 = [];
				var lines = [];
				var stack = [];
				var depth = 0;
				var length = records.length;
				for (var i = 0; i < length; i++) {
					var record = records[i];
					if (!record) {
						this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
						this.setStack(stack, lines);
						break;
					}
					if (record.isChange) {
						depth++;
						if (record.stateNewStyles) {
							AnchorX = 0;
							AnchorY = 0;
							this.setStack(stack, this.fillMerge(fills0, fills1, isMorph));
							this.setStack(stack, lines);
							fills0 = [];
							fills1 = [];
							lines = [];
							if (record.numFillBits) {
								fillStyles = record.fillStyles;
							}
							if (record.numLineBits) {
								lineStyles = record.lineStyles;
							}
						}
						MoveX = AnchorX;
						MoveY = AnchorY;
						if (record.stateMoveTo) {
							MoveX = record.moveX;
							MoveY = record.moveY;
						}
						LineX = MoveX;
						LineY = MoveY;
						if (record.stateFillStyle0) {
							FillStyle0 = record.fillStyle0;
						}
						if (record.stateFillStyle1) {
							FillStyle1 = record.fillStyle1;
						}
						if (record.stateLineStyle) {
							LineStyle = record.lineStyle;
						}
					} else {
						var isCurved = record.isCurved;
						AnchorX = record.anchorX;
						AnchorY = record.anchorY;
						var ControlX = record.controlX;
						var ControlY = record.controlY;
						if (FillStyle0) {
							idx = FillStyle0 - 1;
							if (!(idx in fills0)) {
								fills0[idx] = [];
							}
							if (!(depth in fills0[idx])) {
								fills0[idx][depth] = {
									obj: fillStyles[idx],
									startX: MoveX,
									startY: MoveY,
									endX: 0,
									endY: 0,
									cache: []
								};
							}
							obj = fills0[idx][depth];
							cache = obj.cache;
							cache[cache.length] = cloneObject(record);
							obj.endX = AnchorX;
							obj.endY = AnchorY;
						}
						if (FillStyle1) {
							idx = FillStyle1 - 1;
							if (!(idx in fills1)) {
								fills1[idx] = [];
							}
							if (!(depth in fills1[idx])) {
								fills1[idx][depth] = {
									obj: fillStyles[idx],
									startX: MoveX,
									startY: MoveY,
									endX: 0,
									endY: 0,
									cache: []
								};
							}
							obj = fills1[idx][depth];
							cache = obj.cache;
							cache[cache.length] = cloneObject(record);
							obj.endX = AnchorX;
							obj.endY = AnchorY;
						}
						if (LineStyle) {
							idx = LineStyle - 1;
							if (!(idx in lines)) {
								lines[idx] = {
									obj: lineStyles[idx],
									cache: []
								};
							}
							obj = lines[idx];
							cache = obj.cache;
							cache[cache.length] = [0, LineX, LineY];
							var code = [2, AnchorX, AnchorY];
							if (isCurved) {
								code = [1, ControlX, ControlY, AnchorX, AnchorY];
							}
							cache[cache.length] = code;
						}
						LineX = AnchorX;
						LineY = AnchorY;
					}
				}
				return stack;
			},
			fillMerge: function(fills0, fills1, isMorph) {
				fills0 = this.fillReverse(fills0);
				if (fills0.length) {
					for (var i in fills0) {
						if (!fills0.hasOwnProperty(i)) {
							continue;
						}
						var fills = fills0[i];
						if (i in fills1) {
							var fill1 = fills1[i];
							for (var depth in fills) {
								if (!fills.hasOwnProperty(depth)) {
									continue;
								}
								fill1[fill1.length] = fills[depth];
							}
						} else {
							fills1[i] = fills;
						}
					}
				}
				return this.coordinateAdjustment(fills1, isMorph);
			},
			fillReverse: function(fills0) {
				if (!fills0.length) {
					return fills0;
				}
				for (var i in fills0) {
					if (!fills0.hasOwnProperty(i)) {
						continue;
					}
					var fills = fills0[i];
					for (var depth in fills) {
						if (!fills.hasOwnProperty(depth)) {
							continue;
						}
						var AnchorX = 0;
						var AnchorY = 0;
						var obj = fills[depth];
						var cacheX = obj.startX;
						var cacheY = obj.startY;
						var cache = obj.cache;
						var length = cache.length;
						if (length) {
							for (var idx in cache) {
								if (!cache.hasOwnProperty(idx)) {
									continue;
								}
								var recode = cache[idx];
								AnchorX = recode.anchorX;
								AnchorY = recode.anchorY;
								recode.anchorX = cacheX;
								recode.anchorY = cacheY;
								cacheX = AnchorX;
								cacheY = AnchorY;
							}
							var array = [];
							if (length > 0) {
								while (length--) {
									array[array.length] = cache[length];
								}
							}
							obj.cache = array;
						}
						cacheX = obj.startX;
						cacheY = obj.startY;
						obj.startX = obj.endX;
						obj.startY = obj.endY;
						obj.endX = cacheX;
						obj.endY = cacheY;
					}
				}
				return fills0;
			},
			coordinateAdjustment: function(fills1, isMorph) {
				for (var i in fills1) {
					if (!fills1.hasOwnProperty(i)) {
						continue;
					}
					var array = [];
					var fills = fills1[i];
					for (var depth in fills) {
						if (!fills.hasOwnProperty(depth)) {
							continue;
						}
						array[array.length] = fills[depth];
					}
					var adjustment = [];
					if (array.length > 1 && !isMorph) {
						while (true) {
							if (!array.length) {
								break;
							}
							var fill = array.shift();
							if (fill.startX === fill.endX && fill.startY === fill.endY) {
								adjustment[adjustment.length] = fill;
								continue;
							}
							var mLen = array.length;
							if (mLen < 0) {
								break;
							}
							var isMatch = 0;
							while (mLen--) {
								var comparison = array[mLen];
								if (comparison.startX === fill.endX && comparison.startY === fill.endY) {
									fill.endX = comparison.endX;
									fill.endY = comparison.endY;
									var cache0 = fill.cache;
									var cache1 = comparison.cache;
									var cLen = cache1.length;
									for (var cIdx = 0; cIdx < cLen; cIdx++) {
										cache0[cache0.length] = cache1[cIdx];
									}
									array.splice(mLen, 1);
									array.unshift(fill);
									isMatch = 1;
									break;
								}
							}
							if (!isMatch) {
								array.unshift(fill);
							}
						}
					} else {
						adjustment = array;
					}
					var aLen = adjustment.length;
					var cache = [];
					var obj = {};
					for (var idx = 0; idx < aLen; idx++) {
						var data = adjustment[idx];
						obj = data.obj;
						var caches = data.cache;
						var cacheLength = caches.length;
						cache[cache.length] = [0, data.startX, data.startY];
						for (var compIdx = 0; compIdx < cacheLength; compIdx++) {
							var r = caches[compIdx];
							var code = [2, r.anchorX, r.anchorY];
							if (r.isCurved) {
								code = [1, r.controlX, r.controlY, r.anchorX, r.anchorY];
							}
							cache[cache.length] = code;
						}
					}
					fills1[i] = {cache: cache, obj: obj};
				}
				return fills1;
			},
			setStack: function(stack, array) {
				if (array.length) {
					for (var i in array) {
						if (!array.hasOwnProperty(i)) {
							continue;
						}
						var data = array[i];
						stack.push({
							obj: data.obj,
							cmd: data.cache
						});
					}
				}
			},
		}
		wpjsm.exportJS = shapeUtils;
	},
	"src/utils/TransformStack.js": function(wpjsm){
		function multiplicationMatrix(a, b) {
			return [
				a[0] * b[0] + a[2] * b[1], // ScaleX
				a[1] * b[0] + a[3] * b[1], // RotateSkew0
				a[0] * b[2] + a[2] * b[3], // RotateSkew1
				a[1] * b[2] + a[3] * b[3], // ScaleY
				a[0] * b[4] + a[2] * b[5] + a[4], // TranslateX
				a[1] * b[4] + a[3] * b[5] + a[5] // TranslateY
			];
		}
		function multiplicationColor(a, b) {
			return [
				a[0] * b[0], // Red Multiply
				a[1] * b[1], // Green Multiply
				a[2] * b[2], // Blue Multiply
				a[3] * b[3], // Alpha Multiply
				a[0] * b[4] + a[4], // Red Addition
				a[1] * b[5] + a[5], // Green Addition
				a[2] * b[6] + a[6], // Blue Addition
				a[3] * b[7] + a[7] // Transparency Addition
			];
		}
		const TransformStack = function() {
			this.stackMt = [[1, 0, 0, 1, 0, 0]];
			this.stackCT = [[1, 1, 1, 1, 0, 0, 0, 0]];
			this.pushTotal = 1;
		}
		TransformStack.prototype.reset = function() {
			this.stackMt = [[1, 0, 0, 1, 0, 0]];
			this.stackCT = [[1, 1, 1, 1, 0, 0, 0, 0]];
			this.pushTotal = 1;
		}
		TransformStack.prototype.stackPush = function(matrix, colorTransform) {
			this.stackMt.push(multiplicationMatrix(this.getMatrix(), matrix));
			this.stackCT.push(multiplicationColor(this.getColorTransform(), colorTransform));
			if (this.stackCT.length > this.pushTotal) {
				this.pushTotal = this.stackCT.length;
			}
		}
		TransformStack.prototype.stackPop = function() {
			this.stackMt.pop();
			this.stackCT.pop();
		}
		TransformStack.prototype.getMatrix = function() {
			return this.stackMt[this.stackMt.length - 1];
		}
		TransformStack.prototype.getColorTransform = function() {
			return this.stackCT[this.stackCT.length - 1];
		}
		TransformStack.prototype.setMatrix = function(matrix) {
			this.stackMt = [matrix];
		}
		TransformStack.prototype.setColorTransform = function(colorTransform) {
			this.stackCT = [colorTransform];
		}
		wpjsm.exportJS = TransformStack;
	},
	"src/utils/ZLib.js": function(wpjsm){
		const fixedDistTable = {
			key: new Uint16Array([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]),
			value: new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
		}
		const fixedLitTable = {
			key: new Uint16Array([7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]),
			value: new Uint16Array([256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 280, 281, 282, 283, 284, 285, 286, 287, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255])
		}

		const ORDER = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
		const LEXT = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99]);
		const LENS = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]);
		const DEXT = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
		const DISTS = new Uint16Array([ 1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577]);
		
		class ZLib {
			constructor(data, size, startOffset) {
				this.stream = new Uint8Array(data);
				this.isEnd = false;
				this.result = null;
				this.size = size + startOffset;
				this.loaded = 0;
				this.isLoad = false;
				this._data = new Uint8Array(size);
				for (let i = 0; i < startOffset; i++) {
					this._data[i] = this.stream[i];
				}
				this._size = startOffset;
				this.byte_offset = startOffset + 2;
				this.bit_offset = 8;
				this.bit_buffer = null;
			}
			static decompress(arrayBuffer, uncompressedSizesize, startOffset) {
				var r = new ZLib(arrayBuffer, uncompressedSizesize, startOffset || 0);
				return r.tick(true);
			}
			readUB(length) {
				var value = 0;
				for (var i = 0; i < length; i++) {
					if (this.bit_offset === 8) {
						this.bit_buffer = this.stream[this.byte_offset++];
						this.bit_offset = 0;
					}
					value |= (this.bit_buffer & (1 << this.bit_offset++) ? 1 : 0) << i;
				}
				return value;
			}
			readNumber(n) {
				var value = 0;
				var o = this.byte_offset;
				var i = o + n;
				while (i > o) {
					value = (value << 8) | this.stream[--i];
				}
				this.byte_offset += n;
				return value;
			}
			tick(tsTurbo) {
				if (this.isEnd) return;
				var _buildHuffTable = this.buildHuffTable.bind(this);
				var _decodeSymbol = this.decodeSymbol.bind(this);
				var sym = 0;
				var i = 0;
				var length = 0;
				var data = this._data;
				var _this = this;
				var flag = 0;
				var _size = this._size;
				var startTime = Date.now();
				var codeLengths = new Uint8Array(19);
				while (true) {
					flag = _this.readUB(1);
					var type = _this.readUB(2);
					var distTable = null;
					var litTable = null;
					switch (type) {
						case 0:
							this.bit_offset = 8;
							this.bit_buffer = null;
							length = _this.readNumber(2);
							_this.readNumber(2);
							while (length--) {
								data[_size++] = _this.readNumber(1);
							}
							break;
						default:
							switch (type) {
								case 1:
									distTable = fixedDistTable;
									litTable = fixedLitTable;
									break;
								default:
									const numLitLengths = _this.readUB(5) + 257;
									const numDistLengths = _this.readUB(5) + 1;
									const numCodeLengths = _this.readUB(4) + 4;
									for (i = 0; i < numCodeLengths; i++) {
										codeLengths[ORDER[i]] = _this.readUB(3);
									}
									const codeTable = _buildHuffTable(codeLengths);
									codeLengths.fill(0);
									var prevCodeLen = 0;
									const maxLengths = numLitLengths + numDistLengths;
									const litLengths = new Uint8Array(maxLengths);
									let litLengthSize = 0;
									while (litLengthSize < maxLengths) {
										sym = _decodeSymbol(_this, codeTable.key, codeTable.value);
										switch (sym) {
											case 0:
											case 1:
											case 2:
											case 3:
											case 4:
											case 5:
											case 6:
											case 7:
											case 8:
											case 9:
											case 10:
											case 11:
											case 12:
											case 13:
											case 14:
											case 15:
												litLengths[litLengthSize++] = sym;
												prevCodeLen = sym;
												break;
											case 16:
												i = _this.readUB(2) + 3;
												litLengths.fill(prevCodeLen, litLengthSize, litLengthSize + i);
												litLengthSize += i;
												break;
											case 17:
												i = _this.readUB(3) + 3;
												litLengthSize += i;
												break;
											case 18:
												i = _this.readUB(7) + 11;
												litLengthSize += i;
												break;
										}
									}
									distTable = _buildHuffTable(litLengths.subarray(numLitLengths));
									litTable = _buildHuffTable(litLengths.subarray(0, numLitLengths));
							}
							sym = 0;
							while (true) {
								sym = (0 | _decodeSymbol(_this, litTable.key, litTable.value));
								if (256 === sym) break;
								if (sym < 256) {
									data[_size++] = sym;
								} else {
									const mapIdx = sym - 257 | 0;
									length = LENS[mapIdx] + _this.readUB(LEXT[mapIdx]) | 0;
									const distMap = _decodeSymbol(_this, distTable.key, distTable.value);
									i = _size - (DISTS[distMap] + _this.readUB(DEXT[distMap]) | 0) | 0;
									while (length--) {
										data[_size++] = data[i++];
									}
								}
							}
					}
					if (flag) {
						this.isEnd = true;
						this.isLoad = true;
						this.result = data.buffer;
						break;
					}
					if (!tsTurbo && ((Date.now() - startTime) > 20)) {
						break;
					}
				}
				if (tsTurbo) {
					return this.result;
				}
				this._size = _size;
				this.loaded = (_size / this.size);
			}
			getProgress() {
				return [this.byte_offset, this.stream.length];
			}
			buildHuffTable(data) {
				const length = data.length;
				let maxBits = Math.max.apply(null, data);
				const blCount = new Uint8Array(maxBits);
				let i = length;
				let len = 0;
				while (i--) 
					len = data[i],
					blCount[len] += (len > 0);
				let code = 0;
				const nextCode = new Uint16Array(maxBits + 1);
				let o = 0;
				for (i = 0; i < maxBits; ) {
					code = (code + blCount[i++]) << 1;
					nextCode[i] = code | 0;
					o = Math.max(o, code);
				}
				const n = o + length;
				const key = new Uint16Array(n);
				const value = new Uint16Array(n);
				for (i = 0; i < length; i++) {
					len = data[i];
					if (len) {
						const tt = nextCode[len];
						key[tt] = len;
						value[tt] = i;
						nextCode[len] = (tt + 1) | 0;
					}
				}
				return { key, value };
			}
			decodeSymbol(b, key, value) {
				var len = 0;
				var code = 0;
				while (true) {
					code = (code << 1) | b.readUB(1);
					len++;
					if (key[code] === len) {
						return value[code];
					}
				}
			}
		}
		wpjsm.exportJS = ZLib;
	},
	"src/Avm1.js": function(wpjsm){
		const Avm1Activation = wpjsm.importJS("src/avm1/Activation.js");
		const Avm1Object = wpjsm.importJS("src/avm1/Object.js");
		const Avm1ScriptObject = wpjsm.importJS("src/avm1/objects/ScriptObject.js");
		const Types = wpjsm.importJS("src/avm1/ValueTypes.js");
		
		/*
			Object
			Array
			Function
			Number
		
			MovieClip
			MovieClipLoader
			LoadVars
			Xml
			Sound
			SharedObject
			Color
			Global
		*/
		
		const globalLibrary = {};
		globalLibrary["object"] = function(avm1) {
			function _valueOf(activation, _este, args) {
				
			}
			var proto_decs = [];
			proto_decs.push({
				name: "valueOf",
				value: _valueOf,
				type: "method"
			});
		}
		globalLibrary["array"] = function(avm1) {
		
		}
		globalLibrary["boolean"] = function(avm1) {
		
		}
		globalLibrary["number"] = function(avm1) {
		
		}
		
		class Avm1 {
			constructor(movieplayer) {
				this.version = 6;
				this.clipExecList = null;
				this.movieplayer = movieplayer;
			}
			createActivation(caches, clip) {
				return new Avm1Activation(this, caches, clip);
			}
			findDisplayObjectsPendingRemoval(obj, out) {
				var parent = obj;
				if (parent.isContainer()) {
					var children = parent.iterRenderList();
					for (let i = 0; i < children.length; i++) {
						const child = children[i];
						if (child.isAvm1PendingRemoval()) {
							out.push(child);
							this.findDisplayObjectsPendingRemoval(child, out);
						}
					}
				}
			}
			removePending() {
				var vec = [];
				var rootClip = this.movieplayer.clip;
				if (rootClip) {
					this.findDisplayObjectsPendingRemoval(rootClip, vec);
				}
				for (let i = 0; i < vec.length; i++) {
					const child = vec[i];
					let parent = child.getParent();
					if (parent && (parent.isContainer())) {
						parent.removeChildDirectly(child);
						parent.updatePendingRemovals();
					}
				}
			}
			runFrame() {
				// Remove pending objects
				this.removePending();
		
				// In AVM1, we only ever execute the idle phase, and all the work that
				// would ordinarily be phased is instead run all at once in whatever order
				// the SWF requests it.
				this.movieplayer.framePhase = "idle";
				var prev = null;
				var next = this.clipExecList;
				while (true) {
					var clip = next;
					if (!clip) {
						break;
					}
					next = clip.nextAvm1Clip;
					if (clip.AVM1_REMOVED) {
						// Clean up removed clips from this frame or a previous frame.
						if (prev) {
							prev.nextAvm1Clip = next;
						} else {
							this.clipExecList = next;
						}
						clip.nextAvm1Clip = null;
					} else {
						clip.runFrameAvm1();
						prev = clip;
					}
				}
				this.movieplayer.framePhase = "idle";
			}
			addExecuteList(clip) {
				// Adding while iterating is safe, as this does not modify any active nodes.
				if (!clip.nextAvm1Clip) {
					clip.nextAvm1Clip = this.clipExecList;
					this.clipExecList = clip;
				}
			}
			valueTypeof(value) {
				var r = (typeof value);
				return r;
			}
			valueToI32(value) {
				var typ = value[0];
				var result = value[1];
				switch (typ) {
					case Types.Null:
					case Types.Undefined:
						return 0;
					case Types.Number:
					case Types.Bool:
					case Types.String:
						return result | 0;
					default:
						return 0;
				}
			}
			valueToF64(value) {
				var typ = value[0];
				var result = value[1];
				switch (typ) {
					case Types.Null:
					case Types.Undefined:
					case Types.String:
						return NaN;
					case Types.Number:
						return result;
					case Types.Bool:
						return result ? 1 : 0;
					default:
						return NaN;
				}
			}
			valueToString(value) {
			}
			valueToBool(value) {
			}
			abstractLT(value) {
			}
			abstractEQ(value) {
			}
			fromDisplayObject(child) {
				switch (child.displayType) {
					case "MovieClip":
						return this.createNewObject();
					case "Buttom":
						return this.createNewObject();
				}
			}
			createNewObject() {
				var scriptObject = new Avm1ScriptObject();
				var obj = new Avm1Object(scriptObject);
				return obj;
			}
			executeGetObject(object, name) {
				
			}
			objectGetPropertyOnSlashPath(object, name) {
				
			}
			objectGetProperty(object, name) {
				
			}
			objectSetProperty(object, name, value) {
			}
			objectCallFunction(object, name, args) {
			}
			createFunction() {
			}
			runStackFrameForAction(clip, name, caches) {
				if (!this.movieplayer.allowAvm) return;
				var activation = this.createActivation(caches, clip);
				activation.runActions();
			}
			fromSwfFunction(activation, actions) {
				var _constantPool = activation.constantPool.slice(0);
				var _registers = activation.registers.slice(0);
				var func = function (act, ___this, args) {
					var a = activation.avm1.createActivation(actions, activation.clip);
					a.parent = activation;
					a.setConstantPool(_constantPool);
					a.registers = _registers;
					return a.runActions();
				};
				return func;
			}
		}
		wpjsm.exportJS = Avm1;
	},
	"src/binarydata.js": function(wpjsm){
		class BinaryData {
			constructor(data) {
				this.data = data.data;
				this.characterId = data.id;
			}
			static fromSwfTag(tag) {
				return new BinaryData(tag);
			}
		}
		wpjsm.exportJS = BinaryData;
	},
	"src/DisplayObject.js": function(wpjsm){
		const Avm1ValueTypes = wpjsm.importJS("src/avm1/ValueTypes.js");
		
		// Red: MovieClip
		// Orange: Bitmap
		// Yellow: TextField
		// Green Avm1Buttom
		// Blue: Shape
		// SBlue: MorphShape
		// Pulpe: StaticText
		// Pink: Video
		
		function cloneArray(src) {
			var arr = [];
			var length = src.length;
			for (var i = 0; i < length; i++) {
				arr[i] = src[i];
			}
			return arr;
		}
		
		const SoundTransform = function() {
		}
		class DisplayObject {
			constructor() {
				this.movieplayer = null;
		
				this.matrix = [1, 0, 0, 1, 0, 0];
				this.colorTransform = [1, 1, 1, 1, 0, 0, 0, 0];
				this.blendMode = "normal";
				this.filters = [];
		
				this.id = 0;
		
				this.parent = null;
				this.placeFrame = 0;
				this.depth = 0;
				this.name = "";
				this.clipDepth = 0;
				this.nextAvm1Clip = null;
				this.soundTransform = new SoundTransform();
				this.masker = null;
				this.maskee = null;
				this.opaqueBackground = [0, 0, 0, 0];
		
				/// flags
				this.AVM1_REMOVED = false;
				this.VISIBLE = true;
				this.SCALE_ROTATION_CACHED = false;
				this.TRANSFORMED_BY_SCRIPT = false;
				this.PLACED_BY_SCRIPT = false;
				this.INSTANTIATED_BY_TIMELINE = false;
				this.IS_ROOT = false;
				this.LOCK_ROOT = false;
				this.CACHE_AS_BITMAP = false;
				this.HAS_SCROLL_RECT = false;
				this.HAS_EXPLICIT_NAME = false;
				this.SKIP_NEXT_ENTER_FRAME = false;
				this.CACHE_INVALIDATED = false;
		
				this.displayType = "Base";
				this.coll = [0, 0, 0, 1];
				this._debug_colorDisplayType = [0, 0, 0, 1];
				this._debug_boundsLast = { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
				this._debug_matrix = [0,0,0,0,0,0];
				this._debug_colorTransform = [0,0,0,1,255,255,255,0];

			}
			boundsMatrix(bounds, matrix) {
				var no = Number.MAX_VALUE;
				var xMax = -no;
				var yMax = -no;
				var xMin = no;
				var yMin = no;
				var _xMin = bounds.xMin;
				var _xMax = bounds.xMax;
				var _yMin = bounds.yMin;
				var _yMax = bounds.yMax;
				var x0 = _xMax * matrix[0] + _yMax * matrix[2] + matrix[4];
				var x1 = _xMax * matrix[0] + _yMin * matrix[2] + matrix[4];
				var x2 = _xMin * matrix[0] + _yMax * matrix[2] + matrix[4];
				var x3 = _xMin * matrix[0] + _yMin * matrix[2] + matrix[4];
				var y0 = _xMax * matrix[1] + _yMax * matrix[3] + matrix[5];
				var y1 = _xMax * matrix[1] + _yMin * matrix[3] + matrix[5];
				var y2 = _xMin * matrix[1] + _yMax * matrix[3] + matrix[5];
				var y3 = _xMin * matrix[1] + _yMin * matrix[3] + matrix[5];
				return {
					xMin: Math.min(Math.min(Math.min(Math.min(xMin, x0), x1), x2), x3),
					xMax: Math.max(Math.max(Math.max(Math.max(xMax, x0), x1), x2), x3),
					yMin: Math.min(Math.min(Math.min(Math.min(yMin, y0), y1), y2), y3),
					yMax: Math.max(Math.max(Math.max(Math.max(yMax, y0), y1), y2), y3)
				};
			}
			////////  Transform  ////////
			getColorTransform() {
				return this.colorTransform;
			}
			getMatrix() {
				return this.matrix;
			}
			applyColorTransform(colorTransform) {
				this.colorTransform[0] = colorTransform[0];
				this.colorTransform[1] = colorTransform[1];
				this.colorTransform[2] = colorTransform[2];
				this.colorTransform[3] = colorTransform[3];
				this.colorTransform[4] = colorTransform[4];
				this.colorTransform[5] = colorTransform[5];
				this.colorTransform[6] = colorTransform[6];
				this.colorTransform[7] = colorTransform[7];
			}
			applyMatrix(matrix) {
				this.matrix[0] = matrix[0];
				this.matrix[1] = matrix[1];
				this.matrix[2] = matrix[2];
				this.matrix[3] = matrix[3];
				this.matrix[4] = matrix[4];
				this.matrix[5] = matrix[5];
			}
			getBlendMode() {
				return this.blendMode;
			}
			setBlendMode(mode) {
				this.blendMode = mode;
			}

			getRenderMatrix() {
				//return [
				//	this.matrix[0] + (Math.random() * 0.0015),
				//	this.matrix[1],
				//	this.matrix[2],
				//	this.matrix[3] + (Math.random() * 0.0015),
				//	this.matrix[4] - (Math.random() * 5),
				//	this.matrix[5] - (Math.random() * 5),
				//];
				return this.movieplayer.useLastBound ? this._debug_matrix : this.matrix;
			}
			getRenderColorTransform() {
				return this.movieplayer.useLastBound ? this._debug_colorTransform : this.colorTransform;
				//return this.colorTransform;
			}

			getDepth() {
				return this.depth;
			}
			setDepth(depth) {
				this.depth = depth;
			}
			getId() {
				return this.id;
			}
			setId(id) {
				this.id = id;
			}
			getVisible() {
				return this.VISIBLE;
			}
			setVisible(visible) {
				this.VISIBLE = visible;
			}
			getX() {
				var matrix = this.getMatrix();
				return (matrix) ? (matrix[4] / 20) : undefined;
			}
			setX(x) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				matrix[4] = x * 20;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
			}
			getY() {
				var matrix = this.getMatrix();
				return (matrix) ? (matrix[5] / 20) : undefined;
			}
			setY(y) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				matrix[5] = y * 20;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
			}
			getXScale() {
				var matrix = this.getMatrix();
				var xScale = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]) * 100;
				if (0 > matrix[0]) {
					xScale *= -1;
				}
				return xScale;
			}
			setXScale(xscale) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				var adjustment = 1;
				if (0 > matrix[0]) {
					adjustment = -1;
				}
				var radianX = Math.atan2(matrix[1], matrix[0]);
				xscale /= 100;
				matrix[0] = xscale * Math.cos(radianX) * adjustment;
				matrix[1] = xscale * Math.sin(radianX) * adjustment;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
			}
			getYScale() {
				var matrix = this.getMatrix();
				var yScale = Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]) * 100;
				if (0 > matrix[3]) {
					yScale *= -1;
				}
				return yScale;
			}
			setYScale(yscale) {
				var _matrix = this.getMatrix();
				var matrix = cloneArray(_matrix);
				var adjustment = 1;
				if (0 > matrix[3]) {
					adjustment = -1;
				}
				var radianY = Math.atan2(-matrix[2], matrix[3]);
				yscale /= 100;
				matrix[2] = -yscale * Math.sin(radianY) * adjustment;
				matrix[3] = yscale * Math.cos(radianY) * adjustment;
				this.applyMatrix(matrix);
				this.TRANSFORMED_BY_SCRIPT = true;
			}
			getWidth() {
				var matrix = this.getMatrix();
				var bounds = this.boundsMatrix(this.selfBounds(), matrix);
				return Math.abs(bounds.xMax - bounds.xMin) / 20;
			}
			getHeight() {
				var matrix = this.getMatrix();
				var bounds = this.boundsMatrix(this.selfBounds(), matrix);
				return Math.abs(bounds.yMax - bounds.yMin) / 20;
			}
			getPlaceFrame() {
				return this.placeFrame;
			}
			setPlaceFrame(frame) {
				this.placeFrame = frame;
			}
			getParent() {
				return this.parent;
			}
			setParent(parent) {
				this.parent = parent;
			}
			getBackgroundColor() {
				return this.opaqueBackground;
			}
			setBackgroundColor(color) {
				this.opaqueBackground = color;
			}
			isRoot() {
				return this.IS_ROOT;
			}
			setIsRoot(bool) {
				this.IS_ROOT = bool;
			}
			getName() {
				return this.name;
			}
			setName(name) {
				this.name = name;
			}
			setDefaultInstanceName() {
				if (!this.name.length) {
					var r = this.movieplayer.addInstanceCounter();
					this.setName("instance" + r);
				}
			}
			isAvm1PendingRemoval() {
				return this.depth < 0;
			}
			setSkipNextEnterFrame(b) {
				this.SKIP_NEXT_ENTER_FRAME = b;
			}
			shouldSkipNextEnterFrame() {
				return this.SKIP_NEXT_ENTER_FRAME;
			}
			applyPlaceObject(placeObject) {
				if (!this.TRANSFORMED_BY_SCRIPT) {
					if ("matrix" in placeObject) { // Matrix
						this.applyMatrix(placeObject.matrix);
					}
					if ("colorTransform" in placeObject) {
						this.applyColorTransform(placeObject.colorTransform); // ColorTransform
					}
					if ("blendMode" in placeObject) {
						this.setBlendMode(placeObject.blendMode);
					}
					if ("visible" in placeObject) { // Visible
						this.setVisible(!!placeObject.visible);
					}
					if (this.displayType == "MorphShape" || this.displayType == "Video") {
						if ("ratio" in placeObject) {
							this.setRatio(placeObject.ratio);
						}
					}
					if ("backgroundColor" in placeObject) { // BackgroundColor
						this.setBackgroundColor(placeObject.backgroundColor);
					}
				}
			}
			/// Called when this object should be replaced by a PlaceObject tag.
			replaceWith(characterId) {
				// Noop for most symbols; only shapes can replace their innards with another Graphic.
			}
			postInstantiation(initObject, instantiatedBy, runFrame) {
				if (runFrame) {
					this.runFrameAvm1();
				}
			}
			getObject() {
				return Avm1ValueTypes.originalUndefined;
			}
			getObject2() {
				//return Avm2Undefined;
			}
			selfBounds() {
				return { xMin: 0, yMin: 0, xMax: 0, yMax: 0 };
			}
			render() {
				this.renderBase();
			}
			renderBase() {
				let blendMode = this.getBlendMode();
				let blendNotNormal = (blendMode != "normal");
				if (blendNotNormal) this.movieplayer.renderer.pushBlendMode(blendMode);
				this.movieplayer.transformStack.stackPush(this.getRenderMatrix(), this.getRenderColorTransform());
				this.renderSelf();
				if (blendNotNormal) this.movieplayer.renderer.popBlendMode();
				this.movieplayer.transformStack.stackPop();
			}
			renderSelf() { }
			debugSetLastBound(isSet, b) {
				if (isSet) {
					this._debug_boundsLast.xMin = b.xMin;
					this._debug_boundsLast.yMin = b.yMin;
					this._debug_boundsLast.xMax = b.xMax;
					this._debug_boundsLast.yMax = b.yMax;  
				} else {
					var val = (this.movieplayer.wth == 1) ? 0.04 : this.movieplayer.getTickForFrameRate();
					this._debug_boundsLast.xMin += (b.xMin - this._debug_boundsLast.xMin) * val;
					this._debug_boundsLast.yMin += (b.yMin - this._debug_boundsLast.yMin) * val;
					this._debug_boundsLast.xMax += (b.xMax - this._debug_boundsLast.xMax) * val;
					this._debug_boundsLast.yMax += (b.yMax - this._debug_boundsLast.yMax) * val;    
				}
			}
			debugSetLastMC(isSet, m, c) {
				if (isSet) {
					if (this.movieplayer.wth == 1) {
						this._debug_matrix[0] = Math.random();
						this._debug_matrix[1] = Math.random();
						this._debug_matrix[2] = Math.random();
						this._debug_matrix[3] = Math.random();
						this._debug_matrix[4] = m[4];
						this._debug_matrix[5] = m[5];
					} else {
						this._debug_matrix[0] = m[0];
						this._debug_matrix[1] = m[1];
						this._debug_matrix[2] = m[2];
						this._debug_matrix[3] = m[3];
						this._debug_matrix[4] = m[4];
						this._debug_matrix[5] = m[5];
					}
					this._debug_colorTransform[0] = c[0];
					this._debug_colorTransform[1] = c[1];
					this._debug_colorTransform[2] = c[2];
					this._debug_colorTransform[3] = c[3];
					this._debug_colorTransform[4] = c[4];
					this._debug_colorTransform[5] = c[5];
					this._debug_colorTransform[6] = c[6];
					this._debug_colorTransform[7] = c[7];
				} else {
					var val = (this.movieplayer.wth == 1) ? (0.04 * (this.movieplayer.interpolation ? (this.movieplayer.speed / 2) : (45 / this.movieplayer.frameRate))) : this.movieplayer.getTickForFrameRate();
					this._debug_colorTransform[0] += ((c[0] - this._debug_colorTransform[0]) * val);
					this._debug_colorTransform[1] += ((c[1] - this._debug_colorTransform[1]) * val);
					this._debug_colorTransform[2] += ((c[2] - this._debug_colorTransform[2]) * val);
					this._debug_colorTransform[3] += ((c[3] - this._debug_colorTransform[3]) * val);
					this._debug_colorTransform[4] += ((c[4] - this._debug_colorTransform[4]) * val);
					this._debug_colorTransform[5] += ((c[5] - this._debug_colorTransform[5]) * val);
					this._debug_colorTransform[6] += ((c[6] - this._debug_colorTransform[6]) * val);
					this._debug_colorTransform[7] += ((c[7] - this._debug_colorTransform[7]) * val);
					if (this.movieplayer.wth == 2) return;
					this._debug_matrix[0] += ((m[0] - this._debug_matrix[0]) * val);
					this._debug_matrix[1] += ((m[1] - this._debug_matrix[1]) * val);
					this._debug_matrix[2] += ((m[2] - this._debug_matrix[2]) * val);
					this._debug_matrix[3] += ((m[3] - this._debug_matrix[3]) * val);
					this._debug_matrix[4] += ((m[4] - this._debug_matrix[4]) * val);
					this._debug_matrix[5] += ((m[5] - this._debug_matrix[5]) * val);
				}
			}
			debugRender(ctx) {
				this.movieplayer.debugTransformStack.stackPush(this.getRenderMatrix(), this.getRenderColorTransform());
				var b = this.selfBounds();
				if (this.movieplayer.useLastBound) 
					b = this._debug_boundsLast;
				var bm = this.boundsMatrix(b, this.movieplayer.debugTransformStack.getMatrix());
				var coll = this._debug_colorDisplayType;
				var collC = [coll[0] / 255, coll[1] / 255, coll[2] / 255, coll[3], 0, 0, 0, 0];
				var collM = [((b.xMax - b.xMin) / 100) * 1, 0, 0, ((b.yMax - b.yMin) / 100) * 1, b.xMin, b.yMin];
				this.movieplayer.transformStack.stackPush(this.movieplayer.debugTransformStack.getMatrix(), this.movieplayer.debugTransformStack.getColorTransform());
				this.movieplayer.transformStack.stackPush(collM, collC);
				ctx.setColorTransform(...this.movieplayer.transformStack.getColorTransform());
				ctx.setTransform(...this.movieplayer.transformStack.getMatrix());
				ctx.renderShape(this.movieplayer.debugRectLineShapeRender);
				this.movieplayer.transformStack.stackPop();
				this.movieplayer.transformStack.stackPop();
				this.movieplayer.transformStack.stackPush([1, 0, 0, 1, 0, 0], this.movieplayer.debugTransformStack.getColorTransform());
				this.movieplayer.transformStack.stackPush([(bm.xMax - bm.xMin) / 100, 0, 0, (bm.yMax - bm.yMin) / 100, bm.xMin, bm.yMin], [0, 0, 0, 1, 0, 0, 0, 0]);
				ctx.setColorTransform(...this.movieplayer.transformStack.getColorTransform());
				ctx.setTransform(...this.movieplayer.transformStack.getMatrix());
				ctx.renderShape(this.movieplayer.debugRectLineShapeRender);
				this.movieplayer.transformStack.stackPop();
				this.movieplayer.transformStack.stackPush([1, 0, 0, 1, 0, 0], [coll[0] / 255, coll[1] / 255, coll[2] / 255, coll[3], 0, 0, 0, 0]);
				this.movieplayer.drawTextW(bm.xMin, (bm.yMin - (15 * this.movieplayer.getScaleBoundsText())), 0.25 * this.movieplayer.getScaleBoundsText(), this.getDisplayName());
				this.movieplayer.transformStack.stackPop();
				this.movieplayer.transformStack.stackPop();
				this.movieplayer.debugTransformStack.stackPop();
			}
			/// Run any start-of-frame actions for this display object.
			///
			/// When fired on `Stage`, this also emits the AVM2 `enterFrame` broadcast.
			enterFrame() { }
			/// Execute all other timeline actions on this object.
			runFrameAvm1() { }
			isInteractive() {
				return false;
			}
			isContainer() {
				return false;
			}
			avm1Unload() {
				// Unload children.
				if (this.isContainer()) {
					var children = this.iterRenderList();
					for (let i = 0; i < children.length; i++) {
						const child = children[i];
						child.avm1Unload();
					}
				}
				this.AVM1_REMOVED = true;
			}
			setState() {
			}
			getDisplayName() {
				return this.displayType + ": " + this.id;
			}
			takeHitButton() {
			}
		}
		
		wpjsm.exportJS = DisplayObject;
	},
	"src/font.js": function(wpjsm){
		const shapeUtils = wpjsm.importJS("src/utils/shapeUtils.js");
		
		class Glyph {
			constructor(shapeHandle) {
				this.shapeHandle = shapeHandle;
			}
		}
		class GlyphSource {
			constructor() {
				this.glyphs = [];
				this.codePointToGlyph = [];
			}
			addGlyphs(e) {
				var g = new Glyph(e);
				this.glyphs.push(g);
			}
			getByIndex(i) {
				return this.glyphs[i];
			}
		}
		class FlashFont {
			constructor(movieplayer) {
				this.movieplayer = movieplayer;
				this.glyphs = new GlyphSource();
			}
			static fromSwfTag(movieplayer, tag) {
				var f = new FlashFont(movieplayer);
				f.initGlyphs(tag.glyphs);
				return f;
			}
			initGlyphs(glyphs) {
				if (glyphs) {
					for (var i = 0; i < glyphs.length; i++) {
						var result = shapeUtils.convertWithCacheCodes(glyphs[i]);
						const sh = this.movieplayer.registerShape(result);
						this.glyphs.addGlyphs(sh);
					}
				}
			}
			setAlignZones(alignZones) {
				this.alignZones = alignZones;
			}
			getGlyph(index) {
				return this.glyphs.getByIndex(index);
			}
		}
		wpjsm.exportJS = FlashFont;
	},
	"src/index.js": function(wpjsm){
		const config = wpjsm.importJS("src/config.js");
		const SwfTag = wpjsm.importJS("src/SwfTag.js");
		const shapeUtils = wpjsm.importJS("src/utils/shapeUtils.js");
		const Player = wpjsm.importJS("src/PinkFiePlayer.js");
		const AT_H263_Decoder = wpjsm.importJS("src/utils/at-h263-decoder.js");
		const AT_NIHAV_VP6_Decoder = wpjsm.importJS("src/utils/at-nihav-vp6-decoder.js");
		
		wpjsm.exportJS = {
			SwfTag,
			shapeUtils,
			Player,
			AT_H263_Decoder,
			AT_NIHAV_VP6_Decoder,
			config
		}
	},
	"src/config.js": function(wpjsm){
		wpjsm.exportJS = {
			useWebGL: false
		}
	},
	"src/IO.js": function(wpjsm){
		const ZLib = wpjsm.importJS("src/utils/ZLib.js");
		const MoviePlayer = wpjsm.importJS("src/MoviePlayer.js");
		const SwfParser = wpjsm.importJS("src/SwfTag.js");
		const Shape = wpjsm.importJS("src/display_objects/Shape.js");
		const MorphShape = wpjsm.importJS("src/display_objects/MorphShape.js");
		const StaticText = wpjsm.importJS("src/display_objects/StaticText.js");
		const TextField = wpjsm.importJS("src/display_objects/TextField.js");
		const VideoDisplay = wpjsm.importJS("src/display_objects/VideoDisplay.js");
		const BitmapGraphic = wpjsm.importJS("src/display_objects/BitmapGraphic.js");
		const Avm1Buttom = wpjsm.importJS("src/display_objects/Avm1Buttom.js");
		const MovieClip = wpjsm.importJS("src/display_objects/MovieClip.js");
		const BinaryData = wpjsm.importJS("src/binarydata.js");
		const FlashFont = wpjsm.importJS("src/font.js");
		
		
		function getByteText(byte) {
			if (byte >= 1000000) {
				return "" + (Math.floor(byte / 10000) / 100) + "MB";
			} else {
				if (byte >= 1000) {
					return "" + Math.floor(byte / 1000) + "KB";
				} else {
					return "" + byte + "B";
				}
			}
		}
		
		function decodeDefineBitsLossless(bitmapTag) {
			var isAlpha = (bitmapTag.version == 2);
			var width = bitmapTag.width;
			var height = bitmapTag.height;
			var format = bitmapTag.format;
			var colorTableSize = 0;
			if (format === 3) {
				colorTableSize = bitmapTag.numColors + 1;
			}
			var sizeZLib = 5;
			var dat = ZLib.decompress(bitmapTag.data, ((width * height) * sizeZLib), 0);
			var data = new Uint8Array(dat);
			var canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			var imageContext = canvas.getContext("2d");
			var imgData = imageContext.createImageData(width, height);
			var pxData = imgData.data;
			var idx = 0;
			var pxIdx = 0;
			var x = width;
			var y = height;
			if (format === 5 && !isAlpha) {
				idx = 0;
				pxIdx = 0;
				for (y = height; y--;) {
					for (x = width; x--;) {
						idx++;
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = data[idx++];
						pxData[pxIdx++] = 255;
					}
				}
			} else {
				var bpp = (isAlpha) ? 4 : 3;
				var cmIdx = colorTableSize * bpp;
				var pad = 0;
				if (colorTableSize) {
					pad = ((width + 3) & ~3) - width;
				}
				for (y = height; y--;) {
					for (x = width; x--;) {
						idx = (colorTableSize) ? data[cmIdx++] * bpp : cmIdx++ * bpp;
						if (!isAlpha) {
							pxData[pxIdx++] = data[idx++];
							pxData[pxIdx++] = data[idx++];
							pxData[pxIdx++] = data[idx++];
							idx++;
							pxData[pxIdx++] = 255;
						} else {
							var alpha = (format === 3) ? data[idx + 3] : data[idx++];
							pxData[pxIdx++] = data[idx++];
							pxData[pxIdx++] = data[idx++];
							pxData[pxIdx++] = data[idx++];
							pxData[pxIdx++] = alpha;
							if (format === 3) {
								idx++;
							}
						}
					}
					cmIdx += pad;
				}
			}
			imageContext.putImageData(imgData, 0, 0);
			return canvas;
		}
		
		/// Glues the JPEG encoding tables from a JPEGTables SWF tag to the JPEG data
		/// in a DefineBits tag, producing complete JPEG data suitable for a decoder.
		function glueTablesToJpeg(jpedData, jpedTable) {
			if (jpedTable && (jpedTable.byteLength > 4)) {
				var margeData = [];
				var _jpegTables = new Uint8Array(jpedTable);
				var len = _jpegTables.length - 2;
				for (var idx = 0; idx < len; idx++) {
					margeData[margeData.length] = _jpegTables[idx];
				}
				len = jpedData.length;
				for (idx = 2; idx < len; idx++) {
					margeData[margeData.length] = jpedData[idx];
				}
				return margeData;
			} else {
		
				// No JPEG tables or not enough data; return JPEG data as is
				return jpedData;
			}
		}
		function removeInvalidJpegData(JPEGData) {
			var i = 0;
			var idx = 0;
			var str = "";
			var length = JPEGData.length;
			if (JPEGData[0] === 0xFF && JPEGData[1] === 0xD9 && JPEGData[2] === 0xFF && JPEGData[3] === 0xD8) {
				for (i = 4; i < length; i++) {
					str += String.fromCharCode(JPEGData[i]);
				}
			} else if (JPEGData[i++] === 0xFF && JPEGData[i++] === 0xD8) {
				for (idx = 0; idx < i; idx++) {
					str += String.fromCharCode(JPEGData[idx]);
				}
				while (i < length) {
					if (JPEGData[i] === 0xFF) {
						if (JPEGData[i + 1] === 0xD9 && JPEGData[i + 2] === 0xFF && JPEGData[i + 3] === 0xD8) {
							i += 4;
							for (idx = i; idx < length; idx++) {
								str += String.fromCharCode(JPEGData[idx]);
							}
							break;
						} else if (JPEGData[i + 1] === 0xDA) {
							for (idx = i; idx < length; idx++) {
								str += String.fromCharCode(JPEGData[idx]);
							}
							break;
						} else {
							var segmentLength = (JPEGData[i + 2] << 8) + JPEGData[i + 3] + i + 2;
							for (idx = i; idx < segmentLength; idx++) {
								str += String.fromCharCode(JPEGData[idx]);
							}
							i += segmentLength - i;
						}
					}
				}
			} else {
				for (i = 0; i < length; i++) {
					str += String.fromCharCode(JPEGData[i]);
				}
			}
			return str;
		}
		function decodeDefineBitsJpeg(jpedData, alphaData, callback) {
			var image = new Image();
			image.onload = function() {
				if (alphaData) {
					var width = image.width;
					var height = image.height;
					var canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;
					var imageContext = canvas.getContext("2d");
					imageContext.drawImage(image, 0, 0, width, height);
					var imgData = imageContext.getImageData(0, 0, width, height);
					var pxData = imgData.data;
					var dat = ZLib.decompress(alphaData, (width * height), 0);
					var adata = new Uint8Array(dat);
					var pxIdx = 3;
					var len = width * height;
					for (var i = 0; i < len; i++) {
						pxData[pxIdx] = adata[i];
						pxIdx += 4;
					}
					imageContext.putImageData(imgData, 0, 0);
					callback(canvas);
				} else {
					callback(image);
				}
			}
			image.onerror = function() {
				console.log("jped failed");
				callback(null);
			}
			var fi = removeInvalidJpegData(jpedData);
			image.src = "data:image/jpeg;base64," + window.btoa(fi);
		}
		class Loader {
			constructor(file) {
				this.progressText = 'loading';
				// Compressing SWF
				// Building Tags
				this.swfFile = file;
				this.onload = null;
				this.onerror = null;
				this.onprogress = null;
				this.swfparser = null;
				this.aborted = false;
				this.audioContext = null;
			}
			cancel() {
				if (this.swfparser) {
					this.swfparser.cancel();
					this.swfparser = null;
				}
				this.onload = null;
				this.onerror = null;
				this.onprogress = null;
				this.aborted = true;
			}
			loadTags(tagCallback, clip, stage, endFunc) {
				var _this = this;
				var obj = {};
				obj.frameCount = 0;
				obj.resultSoundStreamBlock = null;
				obj.soundStreamBlockRecords = [];
				obj.soundStreamBlocks = [];
				obj.endTagFound = false;
				var timelineTags = [];
				tagCallback._ontag = function (tag) {
					switch (tag.tagType) {
						//////// frames ////////
						case "End":
							obj.endTagFound = true;
							break;
						case "ShowFrame":
							obj.frameCount++;
							if (obj.resultSoundStreamBlock) {
								obj.soundStreamBlocks.push(obj.resultSoundStreamBlock);
								obj.resultSoundStreamBlock = null;
							} else {
								if (obj.soundStreamBlocks.length) {
									obj.soundStreamBlockRecords.push(obj.soundStreamBlocks);
									obj.soundStreamBlocks = [];
								}
							}
							timelineTags.push(tag);
							break;
						case "PlaceObject":
						case "PlaceObject2":
						case "PlaceObject3":
						case "PlaceObject4":
						case "RemoveObject":
						case "RemoveObject2":
						case "StartSound":
						case "StartSound2":
						case "DoAction":
						case "FrameLabel":
							timelineTags.push(tag);
							break;
						case "SoundStreamHead":
						case "SoundStreamHead2":
							_this.soundStreamHead(stage, clip, tag);
							timelineTags.push(tag);
							break;
						case "SoundStreamBlock":
							obj.resultSoundStreamBlock = tag;
							timelineTags.push(tag);
							break;
						//////// Define ////////
						case "DefineFont":
						case "DefineFont2":
						case "DefineFont3":
							_this.defineFont(tag, stage);
							break;
						case "DefineBitsLossless":
						case "DefineBitsLossless2":
							_this.defineLossless(tag, stage);
							break;
						case "DefineBits":
						case "DefineBitsJpeg2":
						case "DefineBitsJpeg3":
						case "DefineBitsJpeg4":
							return _this.defineBits(tag, stage);
						case "DefineSound":
							return _this.defineSound(tag, stage);
						case "DefineVideoStream":
							_this.defineVideoStream(tag, stage);
							break;
						case "DefineShape":
						case "DefineShape2":
						case "DefineShape3":
						case "DefineShape4":
							_this.defineShape(tag, stage);
							break;
						case "DefineMorphShape":
						case "DefineMorphShape2":
							_this.defineMorphShape(tag, stage);
							break;
						case "DefineSprite":
							_this.defineSprite(tag, stage);
							break;
						case "DefineText":
						case "DefineText2":
							_this.defineText(tag, stage);
							break;
						case "DoAbc":
						case "DoAbc2":
							break;
						case "SymbolClass":
							_this.symbolClass(tag, stage);
							break;
						case "DoInitAction":
							_this.doInitAction(tag, stage);
							break;
						case "DefineEditText":
							_this.defineEditText(tag, stage);
							break;
						case "DefineButton":
						case "DefineButton2":
							_this.defineButton(tag, stage);
							break;
						case "DefineBinaryData":
							_this.defineBinaryData(tag, stage);
							break;
						case "DefineFontAlignZones":
							_this.defineFontAlignZones(tag, stage);
							break;
						case "DefineButtonSound":
							_this.defineButtonSound(tag, stage);
							break;
						case "DefineButtonCxform":
							_this.defineButtonCxform(tag, stage);
							break;
						//////// . ////////
						case "SetBackgroundColor":
							stage.setBackgroundColor(...tag.rgb);
							break;
						case "JpegTables":
							stage.library.setJpegTables(tag.jpegtable);
							break;
						case "FileAttributes":
							stage.initAttributes(tag);
							break;
						case "VideoFrame":
							_this.preloadVideoFrame(tag, stage);
							break;
						case "ExportAssets":
							_this.exportAssets(tag, stage);
							break;
						case "CsmTextSettings":
							_this.csmTextSettings(tag, stage);
							break;
						//////// . ////////
						case "DefineSceneAndFrameLabelData":
						case "ScriptLimits":
							break;
						// N/A
						case "DefineFontInfo":
						case "DefineFontInfo2":
						case "DefineFontName":
						case "SetTabIndex":
						case "ImportAssets":
						case "ImportAssets2":
						case "DefineScalingGrid":
							break;
						// Not documented
						case "Metadata":
						case "Protect":
						case "NameCharacter":
						case "ProductInfo":
						case "EnableDebugger":
						case "EnableDebugger2":
						case "DebugID":
						case "EnableTelemetry":
							break;
					}
				};
				tagCallback._onend = function () {
					if (obj.soundStreamBlocks.length) {
						obj.soundStreamBlockRecords.push(obj.soundStreamBlocks);
						obj.soundStreamBlocks = [];
					}
					clip.frameCount = obj.frameCount;
					clip.init(timelineTags);
					if (obj.soundStreamBlockRecords.length) {
						return function (callback) {
							_this.loadSoundStreamSprite(clip, stage, obj.soundStreamBlockRecords, function () {
								callback();
								endFunc();
							});
						};
					} else {
						endFunc();
					}
				};
			}
			defineFont(tag, stage) {
				stage.library.registerCharacter(tag.id, FlashFont.fromSwfTag(stage, tag));
			}
			defineBits(tag1, stage) {
				var rr = stage.library.jpegTables;
				var tag = BitmapGraphic.createStatic(stage, tag1.id);
				if (tag1.tagType == "DefineBits") {
					tag.jpegTable = rr;
				}
				var JPEGData = new Uint8Array(tag1.data);
				var bitmadA = tag1.alphaData;
				return function (callback) {
					var jpegTables = tag.jpegTable;
					var _JPEGData = glueTablesToJpeg(JPEGData, jpegTables);
					decodeDefineBitsJpeg(_JPEGData, bitmadA, function (img) {
						if (img) {
							tag.setBitmap(img);
						}
						stage.library.registerCharacter(tag1.id, tag);
						callback();
					});
				};
			}
			defineLossless(bitmapInfo, stage) {
				var canvas = decodeDefineBitsLossless(bitmapInfo);
				var rg = BitmapGraphic.createStatic(stage, bitmapInfo.id);
				rg.setBitmap(canvas);
				stage.library.registerCharacter(bitmapInfo.id, rg);
			}
			defineSound(tag, stage) {
				var sp = stage.audio.registerSound(tag);
				var _this = this;
				return function (callback) {
					stage.audio.decodeSound(tag, function (a) {
						sp.setAudio(a);
						stage.library.registerCharacter(tag.id, sp);
						callback();
					});
				};
			}
			defineShape(tag, stage) {
				var shape = Shape.fromSwfTag(stage, tag);
				stage.library.registerCharacter(tag.id, shape);
			}
			defineMorphShape(tag, stage) {
				var shape = MorphShape.fromSwfTag(stage, tag);
				stage.library.registerCharacter(tag.id, shape);
			}
			defineSprite(tag, stage) {
				var clip = MovieClip.createStatic(stage);
				clip.characterId = tag.id;
				clip.totalframes = tag.numFrames;
				this.loadTags(tag.tagCallback, clip, stage, function () {
					stage.library.registerCharacter(tag.id, clip);
				});
			}
			defineText(tag, stage) {
				stage.library.registerCharacter(tag.id, StaticText.fromSwfTag(stage, tag));
			}
			defineEditText(tag, stage) {
				stage.library.registerCharacter(tag.id, TextField.fromSwfTag(stage, tag));
			}
			defineButton(tag, stage) {
				var r = Avm1Buttom.fromSwfTag(stage, tag);
				stage.library.registerCharacter(tag.id, r);
			}
			defineFontAlignZones(tag, stage) {
				var resultFont = stage.library.characterById(tag.id);
				resultFont.setAlignZones(tag);
			}
			defineBinaryData(tag, stage) {
				stage.library.registerCharacter(tag.id, new BinaryData(tag));
			}
			defineVideoStream(tag, stage) {
				stage.library.registerCharacter(tag.id, VideoDisplay.fromSwfTag(stage, tag));
			}
			defineButtonSound(tag, stage) {
				var resultButton = stage.library.characterById(tag.buttonId);
				if (resultButton) {
					resultButton.setSounds(tag);
				} else {
					console.log("DefineButtonSound: Character ID " + tag.buttonId + " doesn't exist");
				}
			}
			defineButtonCxform(tag, stage) {
				var resultButton = stage.library.characterById(tag.id);
				if (resultButton) {
					resultButton.setColorTransforms(tag);
				} else {
					console.log("DefineButtonSound: Character ID " + tag.id + " doesn't exist");
				}
			}
			symbolClass(tag, stage) {
				console.log(tag);
			}
			doInitAction(tag, stage) {
				var spriteId = tag.spriteId;
				var action = tag.action;
				var movieclip = stage.library.characterById(spriteId);
				console.log(movieclip);
			}
			soundStreamHead(stage, clip, tag) {
				clip.audioStreamInfo = tag;
		
			}
			preloadVideoFrame(tag, stage) {
				let vframe = tag;
				let library = stage.library;
				let v = library.characterById(vframe.streamId);
				if (v) {
					v.preloadSwfFrame(vframe, stage);
				}
			}
			exportAssets(tag, stage) {
				var packages = tag.packages;
				for (let i = 0; i < packages.length; i++) {
					let _package = packages[i];
					let id = _package[0];
					let name = _package[1];
		
					// TODO: do other types of Character need to know their exported name?
					stage.library.registerExport(id, name);
					var character = stage.library.characterById(id);
					if (character) {
						if (character.displayType == "movieclip") {
							character.exportedName = name;
						}
					} else {
						console.log("Can't register export {}: Character ID {} doesn't exist");
					}
				}
			}
			csmTextSettings(tag, stage) {
				var text = stage.library.characterById(tag.id);
				if (text) {
					if (text.displayType == "text") {
						text.setRenderSettings(tag);
					} else if (text.displayType == "edittext") {
						text.setRenderSettings(tag);
					} else {
						console.log("Tried to apply CSMTextSettings to non-text character ID");
					}
				} else {
					console.log("Tried to apply CSMTextSettings to unregistered character ID");
				}
			}
			loadSoundStreamSprite(sp, stage, blockRecords, callback) {
				var audioStreamInfo = sp.audioStreamInfo;
				if (audioStreamInfo) {
					var c = blockRecords.length;
					if (c == 0) {
						callback();
						return;
					}
					var result = [];
					for (let i = 0; i < blockRecords.length; i++) {
						const blockRecord = blockRecords[i];
						result.push(this.loadSoundStream(audioStreamInfo, blockRecord, stage, function () {
							c--;
							if (c == 0) {
								callback();
							}
						}));
					}
					sp.soundStreamBlockRecords = result;
				} else {
					callback();
				}
			}
			loadSoundStream(streamInfo, blocks, stage, callback2) {
				var soundInfo = {
					blocks: blocks,
					streamInfo: streamInfo
				};
				var result = {};
				result.soundInfo = soundInfo;
				stage.audio.decodeSoundStream(streamInfo, blocks, function (a) {
					result.audioStream = a;
					callback2();
				}, true);
				return result;
			}
			loadSwfMovie(swfData, calllback) {
				var _this = this;
		
				var stage = new MoviePlayer(this.audioContext);
		
				var swfparser = new SwfParser(swfData);
				swfparser.onprogress = function (fs) {
					_this.progressText = ((fs[0] > 0) ? 'Building Tags ' : 'Descompressing SWF ') + (getByteText(swfparser.getProgress().bytesLoaded) + " / " + getByteText(swfparser.getProgress().bytesTotal));
					if (_this.onprogress) {
						_this.onprogress(fs);
					}
				};
				swfparser.onload = function () {
					stage.swf = swfparser.result;
					if (!_this.aborted) {
						stage.isLoad = true;
						calllback(stage);
					}
					_this.swfparser = null;
				};
				swfparser.onerror = function (e) {
					if (_this.onerror) {
						_this.onerror(e);
					}
				};
				swfparser.onmessage = function (message, type) {
					console.log(message, type);
				};
				swfparser.onstartmovie = function (headerInfo, movieInfo, tagCallback) {
					stage.swfData = swfData;
					stage.version = headerInfo.version;
					stage.bounds = movieInfo.bounds;
					stage.frameRate = movieInfo.frameRate;
					stage.setPlayerBounds();
					var rootClip = MovieClip.createStatic(stage);
					rootClip.isRoot = true;
					stage.rootClipTag = rootClip;
					_this.loadTags(tagCallback, rootClip, stage, function () {
					});
				};
				_this.swfparser = swfparser;
				swfparser.load();
			}
			load() {
				var _this = this;
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = e.target.result;
					_this.loadSwfMovie(data, function (stage) {
						if (_this.onload) {
							_this.onload(stage);
						}
					});
				};
				reader.readAsArrayBuffer(this.swfFile);
			}
		}
		wpjsm.exportJS = Loader;
	},
	"src/Library.js": function(wpjsm){
		class Library {
			constructor(stage) {
				this.stage = stage;
				this.characters = [];
				this.exportCharacters = [];
				this.jpegTables = null;
			}
			characterById(id) {
				return this.characters[id];
			}
			registerCharacter(id, character) {
				// TODO(Herschel): What is the behavior if id already exists?
				if (!this.containsCharacter(id)) {
					this.characters[id] = character;
				} else {
					console.log("Character ID collision: Tried to register ID twice: " + id);
				}
			}
			registerExport(id, exportName) {
				this.exportCharacters[id] = exportName;
			}
			containsCharacter(id) {
				return (id in this.characters);
			}
			instantiateById(id) {
				var c = this.characterById(id);
				if (c) {
					return this.instantiateDisplayObject(c);
				} else {
					console.log("Character id doesn't exist");
				}
			}
			getDisplays() {
				var result = [];
				var characters = this.characters;
				for (var i = 0; i < characters.length; i++) {
					var c = characters[i];
					if (c) {
						result.push(c);
					}
				}
				return result;
			}
			getDisplayTypes() {
				var resultTypes = {};
				var characters = this.characters;
				for (var i = 0; i < characters.length; i++) {
					var c = characters[i];
					if (c) {
						var displayType = c.displayType;
						if (displayType) {
							if (!(displayType in resultTypes)) {
								resultTypes[displayType] = [];
							}
							resultTypes[displayType].push(c);
						}    
					}
				}
				return resultTypes;
			}
			instantiateDisplayObject(character) {
				switch (character.displayType) {
					case "shape":
					case "morphshape":
					case "text":
					case "edittext":
					case "movieclip":
					case "buttom":
					case "video":
					case "bitmap":
						return character.instantiate();
					default:
						console.log("Not a DisplayObject", character);
				}
			}
			setJpegTables(jt) {
				if (this.jpegTables) {
					// SWF spec says there should only be one JPEGTables tag.
					// TODO: What is the behavior when there are multiples?
					console.log("SWF contains multiple JPEGTables tags");
					return;
				}
				if (jt.byteLength) {
					this.jpegTables = jt;
				}
			}
		}
		wpjsm.exportJS = Library;
	},
	"src/MoviePlayer.js": function(wpjsm){
		const Library = wpjsm.importJS("src/Library.js");
		const AudioBackend = wpjsm.importJS("src/audio/AudioBackend.js");
		const Avm1 = wpjsm.importJS("src/Avm1.js");
		const TransformStack = wpjsm.importJS("src/utils/TransformStack.js");
		const RenderCanvas2d = wpjsm.importJS("src/renderer/Canvas2d.js");
		const RenderWebGL = wpjsm.importJS("src/renderer/WebGL.js");
		const pinkfieFont = wpjsm.importJS("src/PinkFieFonts.js");
		const MovieClip = wpjsm.importJS("src/display_objects/MovieClip.js");
		const config = wpjsm.importJS("src/config.js");
		
		class Timer {
			constructor() {
				this.startTime = 0;
				this.tickTime = 0;
			}
			update(t) {
				this.tickTime = t;
			}
			getTime() {
				return this.tickTime - this.startTime;
			}
		}
		
		function calculateCmd2dPathBounds(cmd) {
			var bounds = {
				xMin: Infinity,
				yMin: Infinity,
				xMax: -Infinity,
				yMax: -Infinity
			}
			function dfgfd(x, y) {
				if (x < bounds.xMin) {
					bounds.xMin = x;
				}
				if (y < bounds.yMin) {
					bounds.yMin = y;
				}
				if (x > bounds.xMax) {
					bounds.xMax = x;
				}
				if (y > bounds.yMax) {
					bounds.yMax = y;
				}
			}
			for (let i = 0; i < cmd.length; i++) {
				const cmm = cmd[i];
				if (cmm[0] == 0) {
					dfgfd(cmm[1], cmm[2]);
				} else if (cmm[0] == 1) {
					dfgfd(cmm[1], cmm[2]);
				} else if (cmm[0] == 2) {
					dfgfd(cmm[1], cmm[2]);
				}
			}
			return bounds;
		}
		
		class PinkFieFonts {
			constructor() {
				this.glyphs = [];
				this.glyphBounds = [];
				this.codeTables = [];
				this.movieplayer = null;
			}
			getGlyph(idx) {
				return this.glyphs[idx];
			}
			getGlyphAtStrCode(charCode) {
				return this.getGlyph(this.codeTables.indexOf(charCode));
			}
			toGlyph(glyph) {
				var shapeRender = this.movieplayer.renderer.shapeToInterval([{
					type: 0,
					path2d: glyph,
					fill: {
						type: 0,
						color: [255, 255, 255, 1]
					}
				}]);
				var bounds = calculateCmd2dPathBounds(glyph);
				return {
					shapeRender,
					bounds,
				};
			}
			install(movieplayer) {
				this.movieplayer = movieplayer;
				var glyphs = pinkfieFont.glyphs;
				for (let i = 0; i < glyphs.length; i++) {
					const glyph = glyphs[i];
					var t = this.toGlyph(glyph);
					this.glyphs.push(t);
				}
				this.codeTables = pinkfieFont.codeTable;
			}
		}

		function scaleMat(mat, sx, sy) {
			mat[0] *= sx;
			mat[1] *= sy;
			mat[2] *= sx;
			mat[3] *= sy;
			mat[4] *= sx;
			mat[5] *= sy;
		}

		function translateMat(mat, dx, dy) {
			mat[4] += dx;
			mat[5] += dy;
		}

		function invertMat(mat) {
			var det = mat[0] * mat[3] - mat[2] * mat[1];
			var tx = (mat[3] * mat[4] - mat[2] * mat[5]) / -det;
			var ty = (mat[1] * mat[4] - mat[0] * mat[5]) / det;
			var a = mat[3] / det;
			var b = mat[1] / -det;
			var c = mat[2] / -det;
			var d = mat[0] / det;

			mat[0] = a;
			mat[1] = b;
			mat[2] = c;
			mat[3] = d;
			mat[4] = tx;
			mat[5] = ty;
		}
		
		class MoviePlayer {
			constructor(audioContext) {
				this.audioContext = audioContext;
		
				this.onload = null;
				this.onerror = null;
				this.onprogress = null;
		
				this._width = 0;
				this._height = 0;
		
				this.speed = 1;
		
				this.width = 0;
				this.height = 0;
				this.version = 0;
				this.frameRate = 5;
				this.isLoad = false;
				this.mousePosition = [0, 0];
				this.mousePressed = false;
				this.needsRender = false;
		
				this.framePhase = "";
		
				this.quality = "high";
		
				this.clip = null;
				this.rootClipTag = null;
				this.playing = false;

				this.vCamId = 0;
				this.vCamShow = false;

				this.allowAvm = false;

				this.debugSample = false;

				this.renderScaleType = 2;
		
				this.backgroundColor = [255, 255, 255, 1];
		
				this.root = document.createElement('div');
				this.root.classList.add('pinkfie-root');
		
				this.library = new Library(this);
				
				try {
					if (config.useWebGL) {
						this.renderer = new RenderWebGL();
					} else {
						this.renderer = new RenderCanvas2d();
					}
				} catch(e) {
					console.log(e);
					this.renderer = new RenderCanvas2d();
				}
		
				this.canvas = this.renderer.canvas;
		
				this.root.appendChild(this.canvas);
		
				this.canvas.tabIndex = 0;
				this.canvas.style.outline = 'none';
		
				this.audio = new AudioBackend(this);
				this.avm1 = new Avm1(this);

				this.useLastBound = false;
				this.wth = false;
				this.interpolation = false;
				this.unloop = false;
		
				this.transformStack = new TransformStack();
				this.debugTransformStack = new TransformStack();
				this.buttomTransformStack = new TransformStack();
		
				this.timer = new Timer();
		
				this.instanceCounter = 0;
				this.actionQueue = [];
		
				this.attributes = {};
				this.attributes.useDirectBlit = false;
				this.attributes.useGPU = false;
				this.attributes.hasMetadata = false;
				this.attributes.isActionScript3 = false;
				this.attributes.useNetworkSandbox = false;
		
				this.cursor = 0;
		
				this.tickTime = 0;
				this._starttime = 0;
				this.lastTime = 0;
				this._startOffset = 0;
		
				this.renderType = "render";
		
				this.addEventListeners();
		
				this.backgroundShape = [{
					type: 0,
					path2d: [[0, 0, 0], [2, 1, 0], [2, 1, 1], [2, 0, 1]],
					fill: {
						type: 0,
						color: [255, 255, 255, 1]
					}
				}];
				this.backgroundShapeRender = this.renderer.shapeToInterval(this.backgroundShape);
		
				this.debugRectLineShapeRender = this.renderer.shapeToInterval([{
					type: 1,
					width: 2,
					path2d: [[0, 0, 0], [2, 100, 0], [2, 100, 100], [2, 0, 100], [2, 0, 0]],
					fill: {
						type: 0,
						color: [255, 255, 255, 1]
					}
				}]);
		
				this.pkfFonts = new PinkFieFonts();
				this.pkfFonts.install(this);
			}
			addEventListeners() {
				this._onmousedown = this._onmousedown.bind(this);
				this._onmouseup = this._onmouseup.bind(this);
				this._onmousemove = this._onmousemove.bind(this);
				this._ontouchstart = this._ontouchstart.bind(this);
				this._ontouchend = this._ontouchend.bind(this);
				this._ontouchmove = this._ontouchmove.bind(this);
				document.addEventListener('mousedown', this._onmousedown);
				document.addEventListener('mouseup', this._onmouseup);
				document.addEventListener('mousemove', this._onmousemove);
				document.addEventListener('touchstart', this._ontouchstart, { passive: false });
				document.addEventListener('touchend', this._ontouchend);
				document.addEventListener('touchmove', this._ontouchmove);
			}
			removeEventListeners() {
				document.removeEventListener('mousedown', this._onmousedown);
				document.removeEventListener('mouseup', this._onmouseup);
				document.removeEventListener('mousemove', this._onmousemove);
				document.removeEventListener('touchstart', this._ontouchstart);
				document.removeEventListener('touchend', this._ontouchend);
				document.removeEventListener('touchmove', this._ontouchmove);
			}
			_onmousedown(e) {
				if (e.target === this.canvas) {
					this.updateMouse(e);
					this.updateMouseDown(e);
					e.preventDefault();
				}
			}
			_onmouseup(e) {
				this.updateMouseUp(e);
				if (e.target === this.canvas)
					e.preventDefault();
			}
			_onmousemove(e) {
				this.updateMouse(e);
			}
			_ontouchstart(e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					const t = e.changedTouches[i];
					if (e.target === this.canvas) {
						this.updateMouse(t);
						this.updateMouseDown(t);
						e.preventDefault();
					}
				}
			}
			_ontouchend(e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					const t = e.changedTouches[i];
					if (e.target === this.canvas) {
						this.updateMouseUp(t);
						e.preventDefault();
					}
				}
			}
			_ontouchmove(e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					const t = e.changedTouches[i];
					if (e.target === this.canvas) 
						this.updateMouse(t);
				}
			}
			updateMouse(e) {
				var rect = this.canvas.getBoundingClientRect();
				var xm = e.clientX - rect.left;
				var ym = e.clientY - rect.top;
		
				var rc = this.getRectStage();

				var g = this.getScaleRender();

				var x = ((xm / g[6]) - g[2]) / g[4];
				var y = ((ym / g[7]) - g[3]) / g[5];
		
				var wx = Math.round(x * this.width);
				var wy = Math.round(y * this.height);
		
				this.mouseMove(Math.max(Math.min(wx, this.width), 0), Math.max(Math.min(wy, this.height), 0));
			}
			allowStrokeMaxWidth() {
				return this.renderer instanceof RenderWebGL;
			}
			updateMouseDown(e) {
				this.mouseDown();
			}
			updateMouseUp() {
				this.mouseUp();
			}
			resetAttributes() {
				this.attributes.useDirectBlit = false;
				this.attributes.useGPU = false;
				this.attributes.hasMetadata = false;
				this.attributes.isActionScript3 = false;
				this.attributes.useNetworkSandbox = false;
			}
			initAttributes(info) {
				if (info.useDirectBlit) {
					this.attributes.useDirectBlit = true;
				}
				if (info.useGPU) {
					this.attributes.useGPU = true;
				}
				if (info.hasMetadata) {
					this.attributes.hasMetadata = true;
				}
				if (info.isActionScript3) {
					this.attributes.isActionScript3 = true;
				}
				if (info.useNetworkSandbox) {
					this.attributes.useNetworkSandbox = true;
				}
			}
			isActionScript3() {
				return this.attributes.isActionScript3;
			}
			getInstanceCounter() {
				return this.instanceCounter;
			}
			getTotalFrames() {
				return this.rootClipTag.frameCount;
			}
			addInstanceCounter() {
				return this.instanceCounter++;
			}
			isSoundPlaying(sound) {
				return this.audio.isSoundPlaying(sound);
			}
			stopAllSounds() {
				this.audio.stopAllSounds(false);
			}
			getDisplayTypes() {
				return Object.keys(this.library.getDisplayTypes());
			}
			getCompressVideo() {
				var characters = this.library.getDisplays();
				var resultType = {};
				for (var i = 0; i < characters.length; i++) {
					var c = characters[i];
					if (c.displayType == "video") {
						resultType[c.data.codec] = true;
					}
				}
				return Object.keys(resultType);
			}
			queueAction(clip, action, isUnload) {
				let _action = {};
				_action.clip = clip;
				_action.action = action;
				_action.isUnload = isUnload;
				this.actionQueue.push(_action);
			}
			popAction() {
				return this.actionQueue.pop();
			}
			getDebugVideoText() {
				if (!this.clip) return "";
				var resultTypes = this.getChildTypes(this.clip);

				var result = [];
				for (var i = 0; i < resultTypes.length; i++) {
					var r = resultTypes[i];
					if (r.displayType == "Video") {
						result.push(r);
					}
				}
				var txt = "";
				for (var i = 0; i < result.length; i++) {
					var r = result[i];
					txt += r.getDebugVideoText();
					if (i != (result.length - 1)) {
						txt += ", ";
					}
				}
				return txt;
			}
			getScaleBoundsText() {
				var scaleW = this._width / 640;
				var scaleH = this._height / 360;
				var scale = Math.min(Math.abs(scaleW), Math.abs(scaleH));
				if (this.quality == "low") {
					scale *= 0.5;
				} else if (this.quality == "medium") {
					scale *= 0.8;
				}
				return (this.renderScaleType == 1) ? 1 : scale;
			}
			getRectStage() {
				var _movieCanvas = this.canvas;
				var w, h;
				var x = 0, y = 0;
				var __Width = this._width;
				var __Height = this._height;
				if (this.renderScaleType) {
					w = _movieCanvas.width;
					h = _movieCanvas.height;
					x = 0;
					y = 0;
				} else {
					if ((__Height - (_movieCanvas.height * (__Width / _movieCanvas.width))) < 0) {
						w = (_movieCanvas.width * (__Height / _movieCanvas.height));
						h = (_movieCanvas.height * (__Height / _movieCanvas.height));
						x = (__Width - w) / 2;
					} else {
						w = (_movieCanvas.width * (__Width / _movieCanvas.width));
						h = (_movieCanvas.height * (__Width / _movieCanvas.width));
						y = (__Height - h) / 2;
					}	
				}
				return [x, y, w, h];
			}
			hitStageMouse() {
				return true;
			}
			getTickForFrameRate() {
				return Math.min(1, ((1 - (10 * (1 / this.frameRate))) * this.speed) * (1 * this.speed));
			}
			getPlayingAudioCount() {
				return this.audio.getPlayingAudioCount();
			}
			getScaleRender() {
				var tx = 0;
				var ty = 0;
				var scaleX;
				var scaleY;
				var r = this.getRectStage();
				var a = r[2];
				var b = r[3];
				var c = 0;
				var d = 0;
				if (this.renderScaleType == 2) {
					scaleX = (this.canvas.width / this.width);
					scaleY = (this.canvas.height / this.height);
					a = this.width;
					b = this.height;
					c = (this._width / this.width);
					d = (this._height / this.height);
					tx = 0;
					ty = 0;
				} else if (this.renderScaleType == 1) {
					scaleX = scaleY = 1;
					a = this.width;
					b = this.height;
					c = (this._width / this.canvas.width);
					d = (this._height / this.canvas.height);
					tx = ((this.canvas.width / 2) - (this.width / 2));
					ty = ((this.canvas.height / 2) - (this.height / 2));
				} else {
					scaleX = (this.canvas.width / this.width);
					scaleY = (this.canvas.height / this.height);
					c = 1;
					d = 1;
				}
				return [scaleX, scaleY, tx, ty, a, b, c, d];
			}
			tick() {
				this.closeCursor();
				this.timeUpdate();
				if (this.isLoad) {
					if (this.playing) {
						if (this.clip) {
							var rate = +((1000 / this.frameRate).toFixed(1));
							this.lastTime = this.tickTime;
							var _fgh = Date.now();
							while ((this.tickTime >= this._startOffset) && ((Date.now() - _fgh) < 50)) {
								if (this.useLastBound && !this.interpolation) {
									this.updateDebugLast();
									if (this.interpolation) this.needsRender = true;
								}
								this.runFrame();
								this._startOffset += rate;
							}
							if (this.useLastBound && this.interpolation) {
								this.updateDebugLast();
								if (this.interpolation) this.needsRender = true;
							}
							this.audio.tick();
							this.buttomTransformStack.stackPush([1 / 20, 0, 0, 1 / 20, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0]);
							this.clip.takeHitButton(this.mousePosition[0], this.mousePosition[1]);
							this.buttomTransformStack.stackPop();
							var tgs = (this.cursor > 0) && this.hitStageMouse();
							if (tgs) {
								this.canvas.style.cursor = "pointer";
							} else {
								this.canvas.style.cursor = "auto";
							}
						}
						if (!this.clip) {
							this.audio.stopAllSounds(true);
							this.audio.stopAllSoundStream(true);
							this.avm1.clipExecList = null;
							this._starttime = this.timer.getTime();
							this._startOffset = 0;
							this.initRoot();
						}
					} else {
						this._starttime = (this.timer.getTime() - (this.lastTime / this.speed));
					}
					if (this.needsRender) {
						this.render();
						this.needsRender = false;
					}
				}
			}
			updateDebugLast() {
				var parent = this.clip;
				if (parent) {
					this.updateDebugLastChild(parent);
				}
			}
			updateDebugLastChild(child) {
				if (child.isContainer()) {
					var children = child.iterRenderList();
					for (var i = 0; i < children.length; i++) {
						var c = children[i];
						this.updateDebugLastChild(c);
					}
				}
				child.debugSetLastMC(false, child.getMatrix(), child.getColorTransform());
				child.debugSetLastBound(false, child.selfBounds());
			}
			getChildrenTypes() {
				var types = [];
				var resultTypes = this.getChildTypes(this.clip);
				for (var i = 0; i < resultTypes.length; i++) {
					var c = resultTypes[i];
					types.push(c.displayType);
				}
				return types;
			}
			getChildTypes(child) {
				var types = [];
				if (child.isContainer()) {
					var children = child.iterRenderList();
					for (var i = 0; i < children.length; i++) {
						var c = children[i];
						var resultTypes = this.getChildTypes(c);
						for (var l = 0; l < resultTypes.length; l++) {
							types.push(resultTypes[l]);
						}
					}
				}
				types.push(child);
				return types;
			}
			timeUpdate() {
				this.tickTime = (this.timer.getTime() - this._starttime) * this.speed;
			}
			stopSounds() {
				this.audio.stopAllSounds();
			}
			setSpeed(speed) {
				this.speed = speed;
				var r = this.tickTime;
				this._starttime = (this.timer.getTime() - (r / this.speed));
			}
			setQuality(quality) {
				this.quality = quality;
				this.renderer.setQuality(quality);
			}
			pause() {
				this.playing = false;
				this.audio.pause();
			}
			resume() {
				this.playing = true;
				this.audio.resume();
			}
			clipPlay() {
				this.needsRender = true;
				if (this.clip) {
					this.clip.play();
				}
			}
			clipStop() {
				if (this.clip) {
					this.clip.stop();
				}
			}
			clipGetLoop() {
				if (this.clip) {
					return this.clip.isLoop;
				}
				return false;
			}
			clipSetLoop(value) {
				if (this.clip) {
					this.clip.isLoop = value;
				}
			}
			togglePlayRootMovie() {
				if (this.clip) {
					if (this.clip.isPlaying) {
						this.clip.stop();
					} else {
						this.clip.play();
					}
				}
			}
			rewindRootMovie() {
				this.needsRender = true;
				if (this.clip) {
					this.clip.gotoFrame(1, true);
				}
			}
			forwardRootMovie() {
				this.needsRender = true;
				if (this.clip) {
					this.clip.nextFrame();
				}
			}
			backRootMovie() {
				this.needsRender = true;
				if (this.clip) {
					this.clip.prevFrame();
				}
			}
			initRoot() {
				var mc = this.rootClipTag.instantiate();
				if (this.rootClipTag.characterId > 0) {
					mc.setX(this.width / 2);
					mc.setY(this.height / 2);
					mc.setXScale(50);
					mc.setYScale(50);
				}
				mc.postInstantiation(null, null, false);
				mc.setIsRoot(true);
				mc.isLoop = !this.unloop;
				mc._debug_matrix = [1,0,0,1,0,0];
				mc._debug_colorTransform = [1,1,1,1,0,0,0,0];
				this.clip = mc;
			}
			runFrame() {
				this.needsRender = true;
				this.avm1.runFrame();
				this.runActions();
				var _parent = this.clip;
				if (this.vCamId) {
					var resultVcamId = null;
					var useScaleStage = false;
					try {
						resultVcamId = JSON.parse("[" + this.vCamId + "]");
					} catch(e) {
					}
					if (resultVcamId) {
						if (resultVcamId[0] == "USS") 
							useScaleStage = true;
						this.executeVCamById(_parent, resultVcamId, useScaleStage);
					}
				} else {
					_parent.applyMatrix([1, 0, 0, 1, 0, 0]);
					_parent.applyColorTransform([1, 1, 1, 1, 0, 0, 0, 0]);
				}
			}
			executeVCamById(clip, idList, useScaleStage) {
				var children = clip.iterRenderList();
				var activeVCam = false;
				for (var i = 0; i < children.length; i++) {
					var mc = children[i];
					if (mc instanceof MovieClip) {
						if (idList.indexOf(mc.getId()) >= 0) {
							activeVCam = true;
							this.executeVCam(clip, mc, useScaleStage);
						} else {
							this.executeVCamById(mc, idList, useScaleStage);
						}
					}
				}
				if (clip.hasClipVCam) {
					if (!activeVCam) {
						console.log("DESACTIVE VCAM", clip);
						clip.hasClipVCam = false;
						clip.applyMatrix([1, 0, 0, 1, 0, 0]);
						clip.applyColorTransform([1, 1, 1, 1, 0, 0, 0, 0]);  
					}
				} else {
					if (activeVCam) {
						if (!clip.hasClipVCam) {
							console.log("ACTIVE VCAM v1.1", clip);
							clip.hasClipVCam = true;
						}
					}
				}
			}
			executeVCam(_parent, vCam, useScaleStage) {
				if (vCam && (vCam instanceof MovieClip)) {
					var c = vCam.getColorTransform();
					vCam.setVisible(!!this.vCamShow);

					var bounds = vCam.selfBounds();

					var camW = Math.abs(bounds.xMax - bounds.xMin) / 20;
					var camH = Math.abs(bounds.yMax - bounds.yMin) / 20;
					var sw = this.width;
					var sh = this.height;

					if (useScaleStage) {
						camW = sw;
						camH = sh;
					}

					var w = camW * vCam.getXScale();
					var h = camH * vCam.getYScale();
					var _scaleX = sw / w;
					var _scaleY = sh / h;

					var matrix = JSON.parse(JSON.stringify(vCam.getMatrix()));

					matrix[4] /= 20;
					matrix[5] /= 20;

					invertMat(matrix);
					scaleMat(matrix, vCam.getXScale(), vCam.getYScale());
					translateMat(matrix, (w / 2), (h / 2));
					scaleMat(matrix, _scaleX, _scaleY);

					matrix[4] *= 20;
					matrix[5] *= 20;

					_parent.applyMatrix(matrix);
					_parent.applyColorTransform([c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7]]);
				}
			}
			runActions() {
				for (let i = 0; i < this.actionQueue.length; i++) {
					const actionInfo = this.actionQueue[i];
					if (actionInfo) {
						var action = actionInfo.action;
						switch (action.type) {
							case "normal":
								this.avm1.runStackFrameForAction(actionInfo.clip, "[Frame]", action.caches);
								break;
						}
						actionInfo.ended = true;
					}
				}
				var newActionQueue = [];
				for (let i = 0; i < this.actionQueue.length; i++) {
					const a = this.actionQueue[i];
					if (!a.ended) {
						newActionQueue.push(a);
					}
				}
				this.actionQueue = newActionQueue;
			}
			resize(w, h) {
				this.needsRender = true;
		
				this._width = w;
				this._height = h;
		
				var scaleW = w / this.width;
				var scaleH = h / this.height;
				var scale = Math.min(Math.abs(scaleW), Math.abs(scaleH));
		
				var qScale = 1;
				if (this.quality == "low") {
					qScale = 0.5;
				} else if (this.quality == "medium") {
					qScale = 0.8;
				}
				if (this.quality == "high") {
					qScale *= (window.devicePixelRatio || 1);
				}
		
				var _w = this.renderScaleType ? w : Math.floor(this.width * scale);
				var _h = this.renderScaleType ? h : Math.floor(this.height * scale);
		
				this.renderer.resize(_w * qScale, _h * qScale);
		
				var rc = this.getRectStage();
		
				this.canvas.style.left = rc[0] + "px";
				this.canvas.style.top = rc[1] + "px";
		
				this.canvas.style.width = _w + "px";
				this.canvas.style.height = _h + "px";
		
				this.render();
				this.needsRender = false;
			}
			render() {
				this.renderer.clear();
				var isR = this.renderType !== "bounds without render";
				var isB = (this.renderType == "bounds without render") || (this.renderType == "render with bounds");
				this.renderer.setTransform(this.canvas.width, 0, 0, this.canvas.height, 0, 0);
				if (isR) {
					this.renderer.setColorTransform(this.backgroundColor[0] / 255, this.backgroundColor[1] / 255, this.backgroundColor[2] / 255, this.backgroundColor[3], 0, 0, 0, 0);
				} else {
					this.renderer.setColorTransform(1, 1, 1, 1, 0, 0, 0, 0);
				}
				this.renderer.renderShape(this.backgroundShapeRender);
				if (this.clip && this.isLoad) {
					let [scaleX, scaleY, tx, ty] = this.getScaleRender();
					if (isR) {
						this.transformStack.stackPush([scaleX / 20, 0, 0, scaleY / 20, tx, ty], [1, 1, 1, 1, 0, 0, 0, 0]);
						this.clip.render();
						this.transformStack.stackPop();
					} 
					if (isB) {
						this.transformStack.stackPush([1, 0, 0, 1, 0, 0], [1, 1, 1, 1, 0, 0, 0, 0]);
						this.debugTransformStack.stackPush([scaleX / 20, 0, 0, scaleY / 20, tx, ty], [1, 1, 1, 1, 0, 0, 0, 0]);
						this.clip.debugRender(this.renderer);
						this.debugTransformStack.stackPop();
						this.transformStack.stackPop();    
					}
				}
				this.renderer.render();
			}
			drawTextW(x, y, scal, txt) {
				var renderer = this.renderer;
				var sc = scal;
				var rrr = 0;
				const l = txt;
				for (let k = 0; k < l.length; k++) {
					const glyph = this.pkfFonts.getGlyphAtStrCode(l.charCodeAt(k));
					if (l[k] == " ") {
						rrr += 12;
					} else {
						if (glyph) {
							var bounds = glyph.bounds;
							var fgdg = ((bounds.xMax - bounds.xMin) / 20);
							this.transformStack.stackPush([0.0025 * sc, 0, 0, 0.0025 * sc, (x + (rrr * sc)), y + (40 * sc)], [1, 1, 1, 1, 0, 0, 0, 0]);
							renderer.setColorTransform(...this.transformStack.getColorTransform());
							renderer.setTransform(...this.transformStack.getMatrix());
							renderer.renderShape(glyph.shapeRender);
							this.transformStack.stackPop();
							rrr += ((fgdg / 20) + 7);
						}
					}
				}
			}
			registerShape(shapes) {
				var ts = this.shapeToRendererInfo(shapes);
				return this.renderer.shapeToInterval(ts);
			}
			shapeToRendererInfo(shapes) {
				if (Array.isArray(shapes[0])) {
					return [{
						type: 0,
						path2d: shapes,
						fill: {
							type: 0,
							color: [255, 255, 255, 1]
						}
					}];
				}
				var result = [];
				for (let i = 0; i < shapes.length; i++) {
					const s = shapes[i];
					var obj = s.obj;
					var cmd = s.cmd;
					result.push(this.lagObjToInfo(obj, cmd));
				}
				return result;
			}
			lagObjToInfo(obj, cmd) {
				var isLine = ("width" in obj);
				if (isLine) {
					var fgh = this.allowStrokeMaxWidth();
					return {
						type: 1,
						width: fgh ? Math.max(obj.width, 20) : obj.width,
						path2d: cmd,
						fill: this.lineToInfo(obj),
					};
				} else {
					return {
						type: 0,
						path2d: cmd,
						fill: this.fillToInfo(obj),
					};
				}
			}
			fillToInfo(fill) {
				var type = fill.type;
				switch (type) {
					case 0:
						var color = fill.color;
						return {
							type: 0,
							color: color
						};
					case 0x10:
					case 0x12:
					case 0x13:
						var gradient = fill.gradient;
						if (!gradient) {
							gradient = fill.linearGradient;
						}
						if (!gradient) {
							gradient = fill.radialGradient;
						}
						var gradientMatrix = gradient.matrix;
						var isRadial = (type !== 16);
						var focal = 0;
						if (type == 19) {
							focal = fill.focalPoint;
						}
						var gradientRecords = gradient.gradientRecords;
						var css = [];
						for (var rIdx = 0; rIdx < gradientRecords.length; rIdx++) {
							var record = gradientRecords[rIdx];
							var color = record.color;
							var ratio = record.ratio;
							css.push([color, ratio]);
						}
						var repeatMode = 0;
						if (gradient.spreadMode == "repeat") {
							repeatMode = 1;
						}
						if (gradient.spreadMode == "reflect") {
							repeatMode = 2;
						}
						return {
							type: 1,
							matrix: gradientMatrix,
							focal: focal,
							isRadial,
							repeat: repeatMode,
							records: css
						};
					case 0x40:
					case 0x41:
					case 0x42:
					case 0x43:
						var bitmapId = fill.bitmapId;
						var bMatrix = fill.bitmapMatrix;
						var image = this.library.characterById(bitmapId);
						var texture = (image ? image.getTexture() : null);
						return {
							type: 2,
							matrix: bMatrix,
							texture: texture,
							isSmoothed: fill.isSmoothed,
							isRepeating: fill.isRepeating,
						};
					default:
						return null;
				}
			}
			lineToInfo(line) {
				if ("fillType" in line) {
					return this.fillToInfo(line.fillType);
				} else {
					return {
						type: 0,
						color: line.color
					};
				}
			}
			renderShape(shapeRender, m2, colorTransform) {
				this.renderer.setColorTransform(...colorTransform);
				this.renderer.setTransform(...m2);
				this.renderer.renderShape(shapeRender);
			}
			setBackgroundColor(r, g, b) {
				this.backgroundColor[0] = r;
				this.backgroundColor[1] = g;
				this.backgroundColor[2] = b;
			}
			setPlayerBounds() {
				this.width = (this.bounds.xMax - this.bounds.xMin) / 20;
				this.height = (this.bounds.yMax - this.bounds.yMin) / 20;
			}
			closeCursor() {
				this.cursor = 0;
			}
			openCursor() {
				this.cursor = 1;
			}
			mouseMove(x, y) {
				this.mousePosition = [x, y];
			}
			mouseDown() {
				this.mousePressed = true;
			}
			mouseUp() {
				this.mousePressed = false;
			}
			destroy() {
				this.audio.cleanup();
				this.removeEventListeners();
				this.isLoad = false;
				this.renderer.destroy();
			}
		}
		
		wpjsm.exportJS = MoviePlayer;
	},
	"src/PinkFieFonts.js": function(wpjsm){
		wpjsm.exportJS = {"codeTable": [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,160,163,164,166,167,168,169,171,172,173,174,175,176,177,178,179,181,182,183,184,185,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,1025,1029,1030,1031,1032,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053],"glyphs":[[],[[0,4915,-2888],[2,4915,0],[2,1925,0],[2,1925,-2888],[2,4915,-2888],[0,4997,-10957],[2,4157,-4076],[2,2641,-4076],[2,1842,-10957],[2,1842,-14705],[2,4996,-14705],[2,4997,-10957]],[[0,5673,-9155],[2,5673,-14705],[2,7701,-14705],[2,7681,-9155],[2,5673,-9155],[0,1987,-9155],[2,1987,-14705],[2,4015,-14705],[2,3995,-9155],[2,1987,-9155]],[[0,10404,-5919],[2,10158,-4076],[2,8171,-4076],[2,7618,0],[2,5693,0],[2,6246,-4076],[2,4259,-4076],[2,3706,0],[2,1781,0],[2,2334,-4076],[2,347,-4076],[2,593,-5919],[2,2580,-5919],[2,2949,-8377],[2,962,-8377],[2,1187,-10220],[2,3174,-10220],[2,3747,-14296],[2,5672,-14296],[2,5099,-10220],[2,7086,-10220],[2,7659,-14296],[2,9584,-14296],[2,9011,-10220],[2,10998,-10220],[2,10773,-8377],[2,8786,-8377],[2,8417,-5919],[2,10404,-5919],[0,6861,-8376],[2,4874,-8376],[2,4505,-5918],[2,6492,-5918],[2,6861,-8376]],[[0,10465,-10260],[2,7823,-10260],[1,7823,-11530,7291,-12022],[1,6922,-12370,6164,-12370],[2,6164,-8540],[1,7516,-8110,8356,-7700],[1,9196,-7290,9585,-6921],[1,10322,-6225,10568,-5303],[1,10711,-4771,10711,-4054],[1,10711,-2375,9707,-1146],[1,8478,349,6164,349],[2,6184,2356],[2,5242,2356],[2,5222,349],[1,2805,349,1709,-849],[1,613,-2047,613,-4402],[2,3296,-4402],[1,3398,-3173,3705,-2681],[1,4115,-2026,5221,-1821],[2,5221,-6122],[1,3214,-6654,2313,-7330],[1,920,-8374,920,-10279],[1,920,-12081,1964,-13248],[1,3111,-14538,5200,-14538],[2,5200,-15869],[2,6142,-15869],[2,6142,-14538],[1,7924,-14354,8866,-13719],[1,10463,-12654,10463,-10258],[2,10465,-10260],[0,5222,-8827],[2,5222,-12370],[1,4382,-12370,3942,-11878],[1,3502,-11386,3502,-10772],[1,3502,-9871,4055,-9379],[1,4485,-8990,5222,-8826],[2,5222,-8827],[0,6164,-5775],[2,6164,-1822],[1,6819,-1822,7311,-2232],[1,7966,-2785,7966,-3829],[1,7966,-4628,7372,-5160],[1,6921,-5570,6163,-5775],[2,6164,-5775]],[[0,10179,-3482],[1,10179,-5038,11264,-6123],[1,12349,-7208,13905,-7208],[1,15441,-7208,16537,-6112],[1,17633,-5016,17633,-3480],[1,17633,-1944,16537,-848],[1,15441,248,13905,248],[1,12369,248,11273,-827],[1,10177,-1902,10177,-3479],[2,10179,-3482],[0,12288,-3482],[1,12288,-2806,12759,-2335],[1,13230,-1864,13906,-1864],[1,14561,-1864,15042,-2325],[1,15523,-2786,15523,-3482],[1,15523,-4158,15052,-4629],[1,14581,-5100,13905,-5100],[1,13250,-5100,12769,-4639],[1,12288,-4178,12288,-3482],[0,553,-10813],[1,553,-12369,1638,-13454],[1,2723,-14539,4279,-14539],[1,5815,-14539,6911,-13443],[1,8007,-12347,8007,-10811],[1,8007,-9255,6922,-8170],[1,5837,-7085,4301,-7085],[1,2745,-7085,1649,-8160],[1,553,-9235,553,-10812],[2,553,-10813],[0,2662,-10813],[1,2662,-10137,3133,-9666],[1,3604,-9195,4280,-9195],[1,4935,-9195,5416,-9656],[1,5897,-10117,5897,-10813],[1,5897,-11489,5426,-11960],[1,4955,-12431,4279,-12431],[1,3624,-12431,3143,-11970],[1,2662,-11509,2662,-10813],[0,13865,-14541],[2,5734,389],[2,4218,389],[2,12349,-14541],[2,13865,-14541]],[[0,7946,-11325],[1,7946,-11919,7598,-12226],[1,7250,-12533,6697,-12533],[1,6185,-12533,5857,-12226],[1,5529,-11919,5529,-11346],[1,5529,-10629,6594,-9503],[1,7229,-9913,7587,-10343],[1,7945,-10773,7945,-11326],[2,7946,-11325],[0,11674,-3215],[2,14357,0],[2,10896,0],[2,9892,-1249],[1,9114,-471,8315,-102],[1,7230,390,5694,390],[1,3646,390,2366,-849],[1,1086,-2088,1086,-3788],[1,1086,-5037,1578,-5897],[1,2233,-7044,3933,-8068],[2,4240,-8252],[1,3667,-8907,3339,-9562],[1,2909,-10443,2909,-11324],[1,2909,-12819,3994,-13761],[1,5079,-14703,6820,-14703],[1,8213,-14703,9217,-13904],[1,10405,-12962,10405,-11303],[1,10405,-10238,9821,-9388],[1,9237,-8538,7988,-7801],[2,10077,-5221],[1,10528,-5938,10671,-6450],[1,10814,-6962,10814,-7638],[2,13354,-7638],[1,13354,-6225,12903,-5160],[1,12575,-4361,11674,-3214],[2,11674,-3215],[0,8417,-3052],[2,5714,-6431],[1,4731,-5714,4403,-5304],[1,3973,-4751,3973,-3973],[1,3973,-3318,4403,-2786],[1,4997,-2028,6144,-2028],[1,6820,-2028,7455,-2356],[1,7906,-2581,8418,-3052],[2,8417,-3052]],[[0,1413,-9155],[2,1433,-14705],[2,3440,-14705],[2,3420,-9155],[2,1413,-9155]],[[0,6431,4260],[2,4322,4260],[1,2684,2048,1824,41],[1,698,-2601,698,-5345],[1,698,-8110,1783,-10731],[1,2643,-12779,4302,-15032],[2,6411,-15032],[1,5080,-12759,4445,-10772],[1,3646,-8253,3646,-5345],[1,3646,-3358,4035,-1556],[1,4363,-20,5039,1536],[1,5571,2744,6431,4260]],[[0,369,-15032],[2,2478,-15032],[1,4116,-12841,4976,-10813],[1,6082,-8192,6082,-5427],[1,6082,-2642,5017,-41],[1,4157,2048,2498,4260],[2,389,4260],[1,1741,1987,2355,0],[1,3133,-2458,3133,-5428],[1,3133,-8336,2314,-10835],[1,1700,-12719,369,-15033],[2,369,-15032]],[[0,6922,-12964],[2,7393,-11469],[2,5243,-10814],[2,6677,-8827],[2,5366,-7926],[2,3994,-9790],[2,2560,-7926],[2,1290,-8827],[2,2662,-10814],[2,532,-11469],[2,1024,-12964],[2,3092,-12268],[2,3112,-14705],[2,4853,-14705],[2,4833,-12268],[2,6922,-12964]],[[0,4833,-6328],[2,4833,-10363],[2,7127,-10363],[2,7127,-6328],[2,11141,-6328],[2,11141,-4034],[2,7127,-4034],[2,7127,1],[2,4833,1],[2,4833,-4034],[2,819,-4034],[2,819,-6328],[2,4833,-6328]],[[0,4383,-2990],[2,4383,-410],[1,4383,1351,3523,2293],[1,2786,3092,1332,3440],[2,1332,2355],[1,2131,2068,2459,1740],[1,3032,1146,3032,-1],[2,1312,-1],[2,1312,-2991],[2,4383,-2990]],[[0,6246,-7066],[2,6266,-4404],[2,552,-4404],[2,552,-7066],[2,6246,-7066]],[[0,4383,-2990],[2,4383,0],[2,1311,0],[2,1311,-2990],[2,4383,-2990]],[[0,6369,-15094],[2,1720,389],[2,-676,389],[2,3973,-15094],[2,6369,-15094]],[[0,655,-7086],[1,655,-10916,1874,-12728],[1,3093,-14540,5673,-14540],[1,8253,-14540,9492,-12728],[1,10731,-10916,10731,-7086],[1,10731,-3256,9502,-1433],[1,8273,390,5693,390],[1,3133,390,1894,-1443],[1,655,-3276,655,-7085],[2,655,-7086],[0,3604,-7086],[1,3604,-4219,4044,-3062],[1,4484,-1905,5692,-1905],[1,6900,-1905,7340,-3052],[1,7780,-4199,7780,-7087],[1,7780,-9954,7329,-11101],[1,6878,-12248,5670,-12248],[1,4482,-12248,4042,-11101],[1,3602,-9954,3602,-7087],[2,3604,-7086]],[[0,1413,-10015],[2,1413,-12022],[2,1823,-12022],[1,3707,-12022,4629,-12862],[1,5366,-13538,5366,-14542],[2,7721,-14542],[2,7741,-1],[2,4874,-1],[2,4874,-10016],[2,1413,-10015]],[[0,3482,-9400],[2,697,-9400],[1,697,-12472,2581,-13742],[1,3748,-14541,5427,-14541],[1,7598,-14541,9011,-13322],[1,10424,-12103,10424,-9953],[1,10424,-8294,9441,-7024],[1,8786,-6164,7414,-5222],[1,6513,-4587,5632,-3973],[1,4403,-3072,4157,-2540],[2,10465,-2540],[2,10465,0],[2,532,0],[1,532,-1638,1024,-2662],[1,1761,-4218,3911,-5774],[1,5713,-7085,6205,-7515],[1,7557,-8703,7557,-10055],[1,7557,-10874,7086,-11447],[1,6533,-12123,5550,-12123],[1,4239,-12123,3768,-11160],[1,3481,-10566,3481,-9399],[2,3482,-9400]],[[0,4342,-6369],[2,4342,-8417],[2,4793,-8417],[1,5797,-8417,6329,-8683],[1,7251,-9154,7251,-10383],[1,7251,-11264,6739,-11756],[1,6227,-12248,5408,-12248],[1,4138,-12248,3687,-11265],[1,3441,-10733,3441,-9873],[2,779,-9873],[1,779,-12003,1946,-13232],[1,3195,-14543,5591,-14543],[1,7352,-14543,8581,-13683],[1,10117,-12598,10117,-10489],[1,10117,-9445,9564,-8687],[1,9113,-8052,8355,-7724],[1,9399,-7355,9983,-6454],[1,10567,-5553,10567,-4304],[1,10567,-2236,9195,-925],[1,7823,386,5611,386],[1,3112,386,1822,-904],[1,532,-2194,532,-4467],[2,3338,-4467],[1,3338,-3504,3666,-2890],[1,4198,-1907,5468,-1907],[1,6390,-1907,6963,-2480],[1,7618,-3135,7618,-4302],[1,7618,-5613,6492,-6084],[1,5796,-6371,4342,-6371],[2,4342,-6369]],[[0,2662,-5448],[2,6328,-5448],[2,6328,-11694],[2,2662,-5448],[0,10772,-5448],[2,10752,-3216],[2,9155,-3216],[2,9155,-1],[2,6288,-1],[2,6288,-3216],[2,554,-3216],[2,554,-5694],[2,5879,-14541],[2,9156,-14541],[2,9156,-5448],[2,10772,-5448]],[[0,4055,-11878],[2,3563,-8724],[1,4055,-9072,4526,-9256],[1,5243,-9522,6165,-9522],[1,7865,-9522,9094,-8437],[1,10569,-7147,10569,-4833],[1,10569,-2846,9545,-1474],[1,8152,390,5285,390],[1,3360,390,2049,-634],[1,533,-1822,533,-3890],[2,3400,-3890],[1,3502,-2948,4014,-2426],[1,4526,-1904,5448,-1904],[1,6452,-1904,7036,-2662],[1,7620,-3420,7620,-4628],[1,7620,-5693,7128,-6410],[1,6555,-7229,5490,-7229],[1,4917,-7229,4589,-7106],[1,3934,-6860,3545,-6184],[2,985,-6307],[2,1989,-14294],[2,9976,-14294],[2,9976,-11877],[2,4055,-11878]],[[0,10363,-10854],[2,7516,-10854],[1,7434,-11509,7024,-11878],[1,6614,-12247,5815,-12247],[1,4545,-12247,3931,-10957],[1,3419,-9872,3419,-8234],[2,3480,-8193],[1,3972,-8869,4658,-9135],[1,5344,-9401,6204,-9401],[1,8313,-9401,9542,-7988],[1,10648,-6698,10648,-4916],[1,10648,-2520,9337,-1066],[1,8026,388,5896,388],[1,2885,388,1615,-1906],[1,632,-3667,632,-6923],[1,632,-8848,898,-10118],[1,1308,-12064,2373,-13170],[1,3704,-14542,6018,-14542],[1,6714,-14542,7451,-14358],[1,8495,-14092,8987,-13600],[1,9622,-12986,9898,-12464],[1,10174,-11942,10358,-10857],[2,10363,-10854],[0,7762,-4669],[1,7762,-5918,7066,-6573],[1,6493,-7105,5694,-7105],[1,4772,-7105,4199,-6552],[1,3503,-5876,3503,-4606],[1,3503,-3398,4117,-2650],[1,4731,-1902,5775,-1902],[1,6635,-1902,7198,-2578],[1,7761,-3254,7761,-4667],[2,7762,-4669]],[[0,10793,-14295],[2,10793,-12083],[1,9605,-10772,8827,-9687],[1,7393,-7680,6574,-5591],[1,5509,-2847,5509,0],[2,2560,0],[1,2560,-2642,3625,-5345],[1,4444,-7413,5837,-9420],[1,6718,-10690,7722,-11755],[2,493,-11755],[2,493,-14295],[2,10793,-14295]],[[0,5714,-8643],[1,6554,-8643,7015,-9145],[1,7476,-9647,7476,-10446],[1,7476,-11245,6995,-11747],[1,6514,-12249,5797,-12249],[1,4834,-12249,4332,-11768],[1,3830,-11287,3830,-10447],[1,3830,-9730,4332,-9187],[1,4834,-8644,5715,-8644],[2,5714,-8643],[0,10732,-4321],[1,10732,-2580,9667,-1290],[1,8295,389,5694,389],[1,3134,389,1782,-1065],[1,656,-2294,656,-4035],[1,656,-5079,922,-5755],[1,1434,-7066,2847,-7721],[1,1106,-8602,1106,-10568],[1,1106,-12391,2376,-13466],[1,3646,-14541,5612,-14541],[1,7783,-14541,9053,-13415],[1,10241,-12350,10241,-10753],[1,10241,-9749,9831,-9012],[1,9421,-8275,8540,-7824],[1,9666,-7271,10158,-6534],[1,10731,-5674,10731,-4322],[2,10732,-4321],[0,7782,-4198],[1,7782,-5099,7311,-5713],[1,6738,-6471,5632,-6471],[1,4772,-6471,4188,-5908],[1,3604,-5345,3604,-4219],[1,3604,-3154,4167,-2529],[1,4730,-1904,5713,-1904],[1,6757,-1904,7310,-2662],[1,7781,-3297,7781,-4198],[2,7782,-4198]],[[0,3461,-9728],[1,3461,-8212,4116,-7577],[1,4648,-7065,5611,-7065],[1,6451,-7065,7045,-7638],[1,7741,-8314,7741,-9502],[1,7741,-10772,7178,-11479],[1,6615,-12186,5530,-12186],[1,4731,-12186,4219,-11756],[1,3461,-11121,3461,-9728],[0,901,-3359],[2,3748,-3359],[1,3871,-2622,4311,-2264],[1,4751,-1906,5427,-1906],[1,6431,-1906,7066,-2787],[1,7824,-3852,7824,-5961],[2,7763,-6002],[1,7312,-5326,6534,-5019],[1,5879,-4773,5019,-4773],[1,3012,-4773,1814,-6094],[1,616,-7415,616,-9320],[1,616,-11900,2009,-13272],[1,3299,-14542,5552,-14542],[1,8112,-14542,9392,-12730],[1,10672,-10918,10672,-7068],[1,10672,-3156,9034,-1231],[1,7662,387,5409,387],[1,3545,387,2316,-617],[1,1087,-1621,903,-3362],[2,901,-3359]],[[0,4956,-2990],[2,4956,0],[2,1884,0],[2,1884,-2990],[2,4956,-2990],[0,4956,-10486],[2,4956,-7496],[2,1884,-7496],[2,1884,-10486],[2,4956,-10486]],[[0,4956,-2990],[2,4956,-410],[1,4956,1351,4096,2293],[1,3359,3092,1905,3440],[2,1905,2355],[1,2704,2068,3032,1740],[1,3605,1146,3605,-1],[2,1885,-1],[2,1885,-2991],[2,4956,-2990],[0,4956,-10486],[2,4956,-7496],[2,1884,-7496],[2,1884,-10486],[2,4956,-10486]],[[0,11182,-2048],[2,11182,164],[2,778,-4260],[2,778,-6103],[2,11161,-10527],[2,11161,-8315],[2,3747,-5182],[2,11182,-2048]],[[0,11121,-8581],[2,11121,-6287],[2,799,-6287],[2,799,-8581],[2,11121,-8581],[0,11121,-4076],[2,11121,-1782],[2,799,-1782],[2,799,-4076],[2,11121,-4076]],[[0,778,-2048],[2,8212,-5181],[2,757,-8314],[2,757,-10526],[2,11161,-6102],[2,11181,-4259],[2,777,165],[2,778,-2048]],[[0,7660,-4260],[2,4957,-4260],[1,4957,-5857,5315,-6656],[1,5673,-7455,7025,-8418],[1,8295,-9299,8295,-10446],[1,8295,-11552,7640,-12064],[1,7128,-12474,6309,-12474],[1,5367,-12474,4804,-11952],[1,4241,-11430,4098,-10119],[2,1231,-10099],[1,1231,-12536,2849,-13826],[1,4180,-14891,6146,-14891],[1,8604,-14891,10038,-13683],[1,11369,-12557,11369,-10529],[1,11369,-9341,10734,-8440],[1,10202,-7682,8891,-6760],[1,8174,-6228,7949,-5839],[1,7662,-5327,7662,-4262],[2,7660,-4260],[0,7864,-2888],[2,7864,0],[2,4874,0],[2,4874,-2888],[2,7864,-2888]],[[0,10465,-7700],[1,10465,-8458,9994,-8950],[1,9523,-9442,8806,-9442],[1,7802,-9442,7106,-8561],[1,6410,-7680,6410,-6676],[1,6410,-5857,6830,-5355],[1,7250,-4853,8008,-4853],[1,9073,-4853,9769,-5723],[1,10465,-6593,10465,-7699],[2,10465,-7700],[0,11080,-10097],[2,11326,-11182],[2,13128,-11182],[2,11961,-5960],[1,11900,-5673,11859,-5448],[1,11818,-5223,11818,-5080],[1,11818,-4670,12105,-4670],[1,12986,-4670,13713,-5674],[1,14440,-6678,14440,-8275],[1,14440,-10733,12884,-12095],[1,11328,-13457,8850,-13457],[1,6249,-13457,4631,-11716],[1,3013,-9975,3013,-7313],[1,3013,-4589,4723,-2920],[1,6433,-1251,9136,-1251],[1,10385,-1251,11491,-1691],[1,12597,-2131,13437,-2909],[2,15260,-2909],[1,14195,-1332,12567,-472],[1,10939,388,9014,388],[1,5676,388,3321,-1824],[1,966,-4036,966,-7354],[1,966,-10610,3290,-12853],[1,5614,-15096,8891,-15096],[1,11799,-15096,13888,-13376],[1,16100,-11553,16100,-8768],[1,16100,-5860,14032,-4140],[1,12435,-2809,10879,-2809],[1,10408,-2809,10050,-3085],[1,9692,-3361,9692,-3893],[1,9221,-3422,8648,-3115],[1,8075,-2808,7522,-2808],[1,6191,-2808,5208,-3863],[1,4225,-4918,4225,-6372],[1,4225,-8379,5413,-9854],[1,6683,-11431,8608,-11431],[1,9427,-11431,10031,-11124],[1,10635,-10817,11086,-10100],[2,11080,-10097]],[[0,4649,-3031],[2,3645,0],[2,409,0],[2,5652,-14705],[2,9195,-14705],[2,14376,0],[2,11038,0],[2,10075,-3031],[2,4649,-3031],[0,5489,-5571],[2,9237,-5571],[2,7394,-11387],[2,5489,-5571]],[[0,1556,0],[2,1556,-14705],[2,8704,-14705],[1,11121,-14705,12309,-13394],[1,13231,-12370,13231,-10936],[1,13231,-9564,12555,-8765],[1,12166,-8314,11408,-7925],[1,12657,-7454,13210,-6450],[1,13681,-5590,13681,-4361],[1,13681,-2538,12432,-1330],[1,11715,-634,10937,-368],[1,9852,1,7784,1],[2,1556,0],[0,4485,-6472],[2,4505,-2540],[2,8273,-2540],[1,9420,-2540,10024,-3062],[1,10628,-3584,10628,-4690],[1,10628,-5591,9973,-6031],[1,9318,-6471,8396,-6471],[2,4485,-6472],[0,4485,-12165],[2,4505,-8950],[2,8109,-8950],[1,9092,-8950,9645,-9319],[1,10280,-9749,10280,-10589],[1,10280,-11429,9686,-11798],[1,9092,-12167,8007,-12167],[2,4485,-12165]],[[0,14008,-9892],[2,10936,-9892],[1,10649,-10957,10157,-11489],[1,9317,-12431,7658,-12431],[1,6245,-12431,5303,-11427],[1,4033,-10075,4033,-7290],[1,4033,-5119,4873,-3788],[1,5836,-2272,7679,-2272],[1,8969,-2272,9809,-2979],[1,10649,-3686,10915,-5038],[2,13987,-5038],[1,13516,-2519,11980,-1126],[1,10321,390,7618,390],[1,4587,390,2785,-1556],[1,880,-3604,880,-7331],[1,880,-11058,2846,-13147],[1,4669,-15093,7659,-15093],[1,10649,-15093,12410,-13311],[1,13844,-11857,14008,-9891],[2,14008,-9892]],[[0,1556,0],[2,1556,-14705],[2,8048,-14705],[1,11366,-14705,12902,-12247],[1,14028,-10445,14028,-7701],[1,14028,-4731,12799,-2683],[1,11202,0,7925,0],[2,1556,0],[0,4547,-12165],[2,4567,-2539],[2,7557,-2539],[1,9277,-2539,10158,-4095],[1,10895,-5406,10895,-7474],[1,10895,-10341,9687,-11447],[1,8909,-12164,7496,-12164],[2,4547,-12165]],[[0,12370,-14705],[2,12370,-12104],[2,4567,-12104],[2,4567,-9012],[2,11735,-9012],[2,11735,-6411],[2,4567,-6411],[2,4567,-2602],[2,12718,-2602],[2,12718,-1],[2,1556,-1],[2,1556,-14706],[2,12370,-14705]],[[0,4608,-6185],[2,4628,0],[2,1556,0],[2,1556,-14705],[2,12021,-14705],[2,12021,-12104],[2,4628,-12104],[2,4608,-8786],[2,11080,-8786],[2,11080,-6185],[2,4608,-6185]],[[0,8438,-5448],[2,8438,-7926],[2,14582,-7926],[2,14582,0],[2,12554,0],[2,12247,-1843],[1,11366,-819,10670,-389],[1,9421,389,7660,389],[1,4813,389,2949,-1516],[1,901,-3605,901,-7312],[1,901,-10589,2621,-12698],[1,4567,-15094,8090,-15094],[1,11162,-15094,12985,-13374],[1,14521,-11920,14521,-10138],[2,11449,-10138],[1,11449,-10773,10671,-11551],[1,9667,-12555,8233,-12555],[1,6431,-12555,5305,-11326],[1,4015,-9913,4015,-7271],[1,4015,-4506,5367,-3236],[1,6452,-2212,8316,-2212],[1,9279,-2212,10098,-2704],[1,11470,-3523,11880,-5448],[2,8438,-5448]],[[0,10260,-6595],[2,4526,-6595],[2,4526,0],[2,1454,0],[2,1454,-14705],[2,4526,-14705],[2,4526,-9134],[2,10260,-9134],[2,10260,-14705],[2,13332,-14705],[2,13332,0],[2,10260,0],[2,10260,-6595]],[[0,4383,-14705],[2,4383,0],[2,1311,0],[2,1311,-14705],[2,4383,-14705]],[[0,9912,-14705],[2,9912,-4260],[1,9912,-1946,8755,-789],[1,7598,368,5345,368],[1,2089,368,1065,-1537],[1,451,-2663,451,-5551],[2,3318,-5551],[1,3318,-3626,3605,-2971],[1,3974,-2111,5121,-2111],[1,6186,-2111,6575,-2766],[1,6841,-3217,6841,-4261],[2,6841,-14706],[2,9912,-14705]],[[0,4854,-4977],[2,4854,0],[2,1782,0],[2,1782,-14705],[2,4854,-14705],[2,4854,-8725],[2,10466,-14705],[2,14439,-14705],[2,8418,-8684],[2,14787,0],[2,10834,0],[2,6287,-6451],[2,4854,-4977]],[[0,4628,-14705],[2,4628,-2663],[2,11939,-2663],[2,11939,-1],[2,1556,-1],[2,1556,-14706],[2,4628,-14705]],[[0,15667,-14705],[2,15667,0],[2,12800,0],[2,12800,-12288],[2,10015,0],[2,7004,0],[2,4321,-12288],[2,4280,0],[2,1413,0],[2,1413,-14705],[2,5898,-14705],[2,8560,-3113],[2,11222,-14705],[2,15667,-14705]],[[0,10527,-14705],[2,13394,-14705],[2,13394,0],[2,10322,0],[2,4321,-10486],[2,4280,0],[2,1413,0],[2,1413,-14705],[2,4649,-14705],[2,10465,-4465],[2,10527,-14705]],[[0,881,-7352],[1,881,-10506,2274,-12431],[1,3359,-13926,5264,-14622],[1,6554,-15093,7967,-15093],[1,9360,-15093,10650,-14622],[1,12534,-13926,13619,-12431],[1,15012,-10506,15012,-7352],[1,15012,-4198,13619,-2273],[1,12534,-757,10670,-81],[1,9380,390,7967,390],[1,6554,390,5264,-81],[1,3400,-757,2294,-2273],[1,881,-4219,881,-7352],[0,3953,-7352],[1,3953,-4567,5325,-3236],[1,6390,-2212,7967,-2212],[1,9523,-2212,10567,-3236],[1,11939,-4567,11939,-7352],[1,11939,-10137,10587,-11468],[1,9543,-12492,7966,-12492],[1,6410,-12492,5345,-11468],[1,3952,-10137,3952,-7352],[2,3953,-7352]],[[0,4628,-5304],[2,4628,0],[2,1556,0],[2,1556,-14705],[2,8273,-14705],[1,10403,-14705,11622,-13445],[1,12841,-12185,12841,-9994],[1,12841,-8438,11981,-7148],[1,10752,-5305,8151,-5305],[2,4628,-5304],[0,4608,-7844],[2,7455,-7844],[1,8930,-7844,9462,-8745],[1,9749,-9237,9749,-10138],[1,9749,-11223,9114,-11694],[1,8479,-12165,7045,-12165],[2,4608,-12165],[2,4608,-7844]],[[0,8131,-3994],[2,9728,-5653],[2,11284,-4199],[1,11591,-4793,11765,-5581],[1,11939,-6369,11939,-7352],[1,11939,-10137,10587,-11468],[1,9543,-12492,7966,-12492],[1,6410,-12492,5345,-11468],[1,3952,-10137,3952,-7352],[1,3952,-4567,5324,-3236],[1,6389,-2212,7966,-2212],[1,8396,-2212,8816,-2304],[1,9236,-2396,9625,-2601],[2,8131,-3994],[0,15094,-594],[2,13476,1065],[2,11735,-594],[1,10793,-41,9646,205],[1,8786,389,7967,389],[1,6554,389,5264,-82],[1,3400,-758,2294,-2274],[1,881,-4220,881,-7353],[1,881,-10507,2274,-12432],[1,3359,-13927,5264,-14623],[1,6554,-15094,7967,-15094],[1,9360,-15094,10650,-14623],[1,12534,-13927,13619,-12432],[1,15012,-10507,15012,-7353],[1,15012,-5592,14623,-4312],[1,14234,-3032,13497,-2110],[2,15094,-594]],[[0,1556,0],[2,1556,-14705],[2,8990,-14705],[1,11550,-14705,12758,-13108],[1,13598,-11982,13598,-10548],[1,13598,-9319,12994,-8367],[1,12390,-7415,11325,-7046],[1,12369,-6595,12717,-6022],[1,13188,-5244,13188,-3319],[1,13188,-1558,13290,-1066],[1,13392,-574,13863,-390],[2,13863,-1],[2,10463,-1],[1,10299,-595,10217,-1209],[1,10135,-1823,10135,-2970],[1,10135,-4649,9807,-5120],[1,9356,-5755,7738,-5755],[2,4564,-5755],[2,4564,0],[2,1556,0],[0,4547,-8233],[2,8151,-8233],[1,9380,-8233,9953,-8694],[1,10526,-9155,10526,-10240],[1,10526,-10998,10137,-11490],[1,9584,-12166,8376,-12166],[2,4546,-12166],[2,4547,-8233]],[[0,799,-4526],[2,3748,-4526],[1,3748,-3625,4280,-3031],[1,5079,-2150,6861,-2150],[1,8172,-2150,8950,-2519],[1,9933,-2990,9933,-4055],[1,9933,-4854,9196,-5264],[1,8704,-5530,7270,-5878],[2,5693,-6247],[1,3338,-6800,2478,-7394],[1,1024,-8398,1024,-10569],[1,1024,-12269,2048,-13436],[1,3502,-15095,6676,-15095],[1,9687,-15095,11223,-13395],[1,12390,-12105,12390,-10344],[2,9441,-10344],[1,9339,-11225,8929,-11696],[1,8192,-12556,6431,-12556],[1,5387,-12556,4711,-12187],[1,3871,-11716,3871,-10794],[1,3871,-10036,4424,-9647],[1,4731,-9422,5427,-9258],[2,9031,-8377],[1,10854,-7926,11714,-7209],[1,12881,-6246,12881,-4423],[1,12881,-2191,11406,-962],[1,9788,390,7085,390],[1,3501,390,1924,-1371],[1,798,-2620,798,-4525],[2,799,-4526]],[[0,7803,-12104],[2,7803,0],[2,4731,0],[2,4731,-12104],[2,287,-12104],[2,287,-14705],[2,12247,-14705],[2,12247,-12104],[2,7803,-12104]],[[0,13312,-14705],[2,13312,-5141],[1,13312,-2315,11694,-922],[1,10178,389,7290,389],[1,5979,389,4935,61],[1,3522,-390,2600,-1394],[1,1453,-2725,1453,-4957],[2,1473,-14705],[2,4606,-14705],[2,4606,-5161],[1,4606,-3707,5343,-2959],[1,6080,-2211,7227,-2211],[1,8763,-2211,9480,-2928],[1,10197,-3645,10197,-5017],[2,10197,-14704],[2,13312,-14705]],[[0,10076,-14705],[2,13271,-14705],[2,8274,0],[2,5345,0],[2,389,-14705],[2,3686,-14705],[2,6840,-3564],[2,10076,-14705]],[[0,4485,0],[2,328,-14705],[2,3605,-14705],[1,4404,-11305,4977,-8725],[1,5325,-7209,5591,-5837],[1,5857,-4465,5939,-3953],[1,6205,-5489,6492,-7005],[1,6902,-9196,8028,-14705],[2,11284,-14705],[1,12472,-9093,12902,-7025],[1,13189,-5612,13476,-3953],[1,13742,-5325,14100,-6922],[1,14458,-8519,15912,-14704],[2,19025,-14704],[2,14888,1],[2,11939,1],[1,11611,-1555,10792,-5549],[1,10464,-7187,10157,-8754],[1,9850,-10321,9645,-11468],[1,9399,-10055,9194,-8929],[1,8866,-7250,8559,-5734],[1,7945,-2867,7351,0],[2,4485,0]],[[0,8561,-7639],[2,13374,0],[2,9626,0],[2,6841,-5018],[2,3871,0],[2,287,0],[2,5038,-7516],[2,553,-14704],[2,4219,-14704],[2,6820,-9953],[2,9523,-14704],[2,13066,-14704],[2,8561,-7639]],[[0,8458,-5509],[2,8458,0],[2,5386,0],[2,5386,-5550],[2,307,-14705],[2,3932,-14705],[2,6963,-8315],[2,9892,-14705],[2,13374,-14705],[2,8458,-5509]],[[0,12001,-2601],[2,12001,0],[2,512,0],[2,512,-2601],[2,8110,-12104],[2,717,-12104],[2,717,-14705],[2,11961,-14705],[2,11961,-12288],[2,4261,-2601],[2,12001,-2601]],[[0,3768,-12820],[2,3768,2048],[2,6328,2048],[2,6328,4014],[2,1269,4014],[2,1269,-14787],[2,6307,-14787],[2,6307,-12821],[2,3768,-12820]],[[0,3973,389],[2,-676,-15094],[2,1720,-15094],[2,6369,389],[2,3973,389]],[[0,3031,2048],[2,3011,-12820],[2,471,-12820],[2,471,-14786],[2,5509,-14786],[2,5529,4015],[2,491,4015],[2,491,2049],[2,3031,2048]],[[0,3502,-6615],[2,1270,-6615],[2,4936,-14295],[2,6984,-14295],[2,10691,-6615],[2,8438,-6615],[2,5980,-12001],[2,3502,-6615]],[[0,11387,2560],[2,0,2560],[2,0,1536],[2,11387,1536],[2,11387,2560]],[[0,3543,-12370],[2,532,-15360],[2,3686,-15360],[2,5611,-12370],[2,3543,-12370]],[[0,10138,-8028],[2,10158,-2130],[1,10158,-1229,10322,-881],[1,10486,-533,10793,-431],[2,10793,-1],[2,7701,-1],[1,7496,-615,7435,-1291],[1,6739,-554,6166,-247],[1,5224,285,3913,285],[1,2541,285,1640,-452],[1,596,-1312,596,-2889],[1,596,-4425,1446,-5295],[1,2296,-6165,3771,-6370],[2,6331,-6759],[1,6925,-6841,7140,-7056],[1,7355,-7271,7355,-7619],[1,7355,-8418,6679,-8705],[1,6249,-8889,5450,-8889],[1,4508,-8889,4078,-8377],[1,3771,-8008,3710,-7373],[2,945,-7373],[1,1150,-9626,2645,-10527],[1,3730,-11182,5798,-11182],[1,7436,-11182,8542,-10629],[1,10139,-9830,10139,-8028],[2,10138,-8028],[0,7352,-3912],[2,7352,-5305],[1,7147,-5141,6696,-4987],[1,6245,-4833,5334,-4690],[1,4423,-4547,4034,-4281],[1,3461,-3892,3461,-3073],[1,3461,-2397,3912,-2049],[1,4281,-1762,4793,-1762],[1,5817,-1762,6585,-2356],[1,7353,-2950,7353,-3913],[2,7352,-3912]],[[0,8888,-5366],[1,8888,-6820,8356,-7680],[1,7721,-8704,6431,-8704],[1,5079,-8704,4485,-7619],[1,3993,-6738,3993,-5202],[1,3993,-3871,4566,-3031],[1,5221,-2068,6511,-2068],[1,7760,-2068,8395,-3235],[1,8887,-4136,8887,-5365],[2,8888,-5366],[0,4096,-14705],[2,4096,-9483],[1,4792,-10425,5570,-10804],[1,6348,-11183,7290,-11183],[1,9215,-11183,10464,-9790],[1,11836,-8274,11836,-5571],[1,11836,-3093,10771,-1516],[1,9542,286,7248,286],[1,6265,286,5487,-83],[1,4586,-513,4094,-1373],[2,4053,-1],[2,1247,-1],[2,1247,-14706],[2,4096,-14705]],[[0,7803,-3973],[2,10711,-3973],[1,10588,-2560,9687,-1434],[1,8335,286,5734,286],[1,2990,286,1679,-1557],[1,675,-2970,675,-5141],[1,675,-7926,1904,-9482],[1,3235,-11182,5897,-11182],[1,7617,-11182,8846,-10383],[1,10546,-9298,10730,-7004],[2,7822,-7004],[1,7638,-7946,7085,-8397],[1,6634,-8766,5917,-8766],[1,4688,-8766,4094,-7701],[1,3623,-6861,3623,-5612],[1,3623,-3666,4166,-2867],[1,4709,-2068,5835,-2068],[1,6777,-2068,7350,-2826],[1,7801,-3420,7801,-3973],[2,7803,-3973]],[[0,11284,-14705],[2,11284,0],[2,8478,0],[2,8478,-1372],[1,7966,-512,7065,-82],[1,6287,287,5283,287],[1,3010,287,1781,-1515],[1,696,-3112,696,-5570],[1,696,-8273,2048,-9789],[1,3277,-11182,5202,-11182],[1,6451,-11182,7311,-10609],[1,7905,-10220,8356,-9483],[2,8397,-14705],[2,11284,-14705],[0,3645,-5366],[1,3645,-4117,4116,-3236],[1,4730,-2069,5979,-2069],[1,7269,-2069,7945,-3032],[1,8539,-3872,8539,-5203],[1,8539,-6719,8047,-7600],[1,7433,-8706,6061,-8706],[1,4791,-8706,4177,-7682],[1,3645,-6801,3645,-5367],[2,3645,-5366]],[[0,7741,-3195],[2,10690,-3195],[1,10158,-1372,8724,-471],[1,7516,287,5898,287],[1,3379,287,2027,-1003],[1,471,-2498,471,-5672],[1,471,-7536,1270,-8908],[1,2581,-11181,5673,-11181],[1,7741,-11181,9052,-10055],[1,10813,-8539,10813,-5180],[2,10793,-4668],[2,3318,-4668],[1,3502,-3214,4106,-2610],[1,4710,-2006,5898,-2006],[1,6533,-2006,7055,-2313],[1,7577,-2620,7741,-3193],[2,7741,-3195],[0,3420,-6533],[2,7864,-6533],[1,7741,-7741,7045,-8335],[1,6472,-8827,5653,-8827],[1,4649,-8827,4096,-8233],[1,3543,-7639,3420,-6533]],[[0,4649,-8847],[2,4649,0],[2,1782,0],[2,1782,-8847],[2,205,-8847],[2,185,-10895],[2,1762,-10895],[2,1762,-11776],[1,1762,-13394,2591,-14142],[1,3420,-14890,4976,-14890],[2,6430,-14849],[2,6430,-12535],[2,5631,-12535],[1,4955,-12535,4801,-12310],[1,4647,-12085,4647,-11327],[2,4627,-10897],[2,6491,-10897],[2,6511,-8849],[2,4649,-8847]],[[0,8561,-10895],[2,11326,-10895],[2,11326,-573],[1,11326,1577,10589,2642],[1,9340,4444,5817,4444],[1,3912,4444,2601,3686],[1,1065,2785,1065,1167],[2,4178,1167],[1,4301,1699,4588,1924],[1,5059,2272,6185,2272],[1,8458,2272,8458,-227],[2,8458,-1538],[2,8417,-1579],[1,8007,-842,7434,-453],[1,6676,59,5509,59],[1,3441,59,2192,-1313],[1,820,-2829,820,-5573],[1,820,-8276,2172,-9792],[1,3401,-11185,5326,-11185],[1,6678,-11185,7559,-10509],[1,8173,-10038,8521,-9280],[2,8561,-10895],[0,3768,-5386],[1,3768,-4157,4239,-3358],[1,4833,-2354,6021,-2354],[1,7352,-2354,7966,-3358],[1,8478,-4177,8478,-5508],[1,8478,-6880,7823,-7791],[1,7168,-8702,6001,-8702],[1,5059,-8702,4486,-8006],[1,3769,-7146,3769,-5385],[2,3768,-5386]],[[0,11162,-7537],[2,11182,0],[2,8315,0],[2,8315,-6615],[1,8315,-7537,8069,-7988],[1,7659,-8766,6451,-8766],[1,5468,-8766,4833,-8111],[1,4198,-7456,4198,-6248],[2,4198,-2],[2,1331,-2],[2,1331,-14707],[2,4178,-14707],[2,4178,-9485],[1,4526,-10202,5386,-10694],[1,6246,-11186,7372,-11186],[1,9031,-11186,10096,-10234],[1,11161,-9282,11161,-7541],[2,11162,-7537]],[[0,1393,-10895],[2,4260,-10895],[2,4260,0],[2,1393,0],[2,1393,-10895],[0,4260,-14848],[2,4260,-12186],[2,1393,-12186],[2,1393,-14848],[2,4260,-14848]],[[0,4280,-10895],[2,4280,1147],[1,4280,3134,3358,3830],[1,2621,4383,798,4383],[2,81,4383],[2,61,2089],[2,573,2089],[1,901,2089,1085,1966],[1,1413,1741,1413,1086],[2,1413,-10895],[2,4280,-10895],[0,4280,-14848],[2,4280,-12186],[2,1413,-12186],[2,1413,-14848],[2,4280,-14848]],[[0,4280,-3441],[2,4280,0],[2,1413,0],[2,1413,-14705],[2,4260,-14705],[2,4260,-6759],[2,7864,-10896],[2,11387,-10896],[2,7537,-6677],[2,11510,-1],[2,8069,-1],[2,5448,-4670],[2,4280,-3441]],[[0,4280,-14705],[2,4280,0],[2,1413,0],[2,1413,-14705],[2,4280,-14705]],[[0,16896,-7537],[2,16916,0],[2,14049,0],[2,14049,-6615],[1,14049,-7762,13629,-8264],[1,13209,-8766,12492,-8766],[1,11468,-8766,11007,-8172],[1,10546,-7578,10546,-6534],[2,10546,-1],[2,7679,-1],[2,7679,-6555],[1,7679,-7599,7474,-8009],[1,7105,-8767,5958,-8767],[1,5016,-8767,4596,-8194],[1,4176,-7621,4176,-6638],[2,4176,-2],[2,1309,-2],[2,1289,-10897],[2,4033,-10897],[2,4033,-9300],[1,4504,-10099,5036,-10509],[1,5896,-11185,7166,-11185],[1,8292,-11185,8947,-10775],[1,9602,-10365,10196,-9443],[1,10749,-10201,11138,-10508],[1,11978,-11184,13104,-11184],[1,14763,-11184,15828,-10232],[1,16893,-9280,16893,-7539],[2,16896,-7537]],[[0,11162,-7537],[2,11182,0],[2,8315,0],[2,8315,-6615],[1,8315,-7537,8069,-7988],[1,7659,-8766,6451,-8766],[1,5468,-8766,4833,-8111],[1,4198,-7456,4198,-6248],[2,4198,-2],[2,1331,-2],[2,1331,-10897],[2,4055,-10897],[2,4055,-9300],[1,4751,-10344,5539,-10764],[1,6327,-11184,7371,-11184],[1,9030,-11184,10095,-10232],[1,11160,-9280,11160,-7539],[2,11162,-7537]],[[0,11837,-5448],[1,11837,-2642,10158,-1106],[1,8642,287,6266,287],[1,3890,287,2374,-1106],[1,695,-2642,695,-5448],[1,695,-8233,2374,-9789],[1,3890,-11182,6245,-11182],[1,8600,-11182,10136,-9789],[1,11836,-8233,11836,-5448],[2,11837,-5448],[0,8888,-5448],[1,8888,-6800,8417,-7619],[1,7762,-8766,6267,-8766],[1,4792,-8766,4137,-7640],[1,3645,-6780,3645,-5449],[1,3645,-4097,4116,-3278],[1,4771,-2131,6266,-2131],[1,7741,-2131,8396,-3257],[1,8888,-4117,8888,-5448]],[[0,4014,-5202],[1,4014,-3850,4567,-3031],[1,5222,-2068,6512,-2068],[1,7761,-2068,8396,-3235],[1,8888,-4136,8888,-5365],[1,8888,-6819,8356,-7679],[1,7721,-8703,6431,-8703],[1,5079,-8703,4485,-7618],[1,4014,-6758,4014,-5202],[0,3994,-10895],[2,4014,-9318],[1,4587,-10178,5140,-10567],[1,6000,-11181,7290,-11181],[1,9215,-11181,10464,-9788],[1,11836,-8272,11836,-5569],[1,11836,-3091,10771,-1514],[1,9542,288,7248,288],[1,5958,288,5098,-326],[1,4586,-695,4156,-1391],[2,4136,4241],[2,1269,4241],[2,1269,-10894],[2,3994,-10895]],[[0,8540,-10895],[2,11284,-10895],[2,11304,4240],[2,8437,4240],[2,8437,-1351],[1,7495,287,5304,287],[1,2969,287,1720,-1597],[1,696,-3133,696,-5222],[1,696,-7721,1802,-9339],[1,3072,-11182,5448,-11182],[1,6677,-11182,7517,-10506],[1,8070,-10055,8500,-9277],[2,8540,-10895],[0,3625,-5243],[1,3625,-3727,4229,-2928],[1,4833,-2129,6103,-2129],[1,7168,-2129,7834,-2948],[1,8500,-3767,8500,-5385],[1,8500,-7331,7496,-8171],[1,6861,-8703,6021,-8703],[1,4997,-8703,4403,-8027],[1,3625,-7146,3625,-5241],[2,3625,-5243]],[[0,1311,0],[2,1291,-10895],[2,4035,-10895],[2,4055,-9011],[1,4649,-10096,5120,-10506],[1,5878,-11182,7066,-11182],[2,7639,-11141],[2,7619,-8233],[1,7435,-8253,7261,-8263],[1,7087,-8273,6821,-8273],[1,5305,-8273,4670,-7433],[1,4178,-6798,4178,-5672],[2,4178,1],[2,1311,0]],[[0,10301,-7578],[2,7495,-7578],[1,7372,-8274,7085,-8561],[1,6634,-9012,5569,-9012],[1,4525,-9012,4095,-8664],[1,3788,-8418,3788,-7947],[1,3788,-7312,5549,-6923],[1,8089,-6370,8847,-6022],[1,10629,-5182,10629,-3462],[1,10629,-1373,8888,-410],[1,7618,286,5857,286],[1,3666,286,2314,-492],[1,614,-1475,614,-3482],[2,3563,-3482],[1,3563,-2724,4106,-2304],[1,4649,-1884,5939,-1884],[1,6902,-1884,7394,-2294],[1,7763,-2601,7763,-3011],[1,7763,-3687,6022,-4076],[1,3421,-4649,2745,-4956],[1,984,-5775,984,-7536],[1,984,-8970,1906,-9953],[1,3073,-11182,5387,-11182],[1,7455,-11182,8643,-10547],[1,10302,-9666,10302,-7577],[2,10301,-7578]],[[0,4547,-13844],[2,4527,-10895],[2,6329,-10895],[2,6329,-8847],[2,4547,-8847],[2,4527,-2928],[1,4527,-2396,4722,-2222],[1,4917,-2048,5736,-2048],[2,6330,-2089],[2,6330,82],[2,4978,123],[2,4609,123],[1,2868,123,2213,-512],[1,1681,-1024,1681,-2232],[2,1681,-8847],[2,206,-8847],[2,186,-10895],[2,1661,-10895],[2,1681,-13844],[2,4547,-13844]],[[0,11162,-10895],[2,11162,0],[2,8418,0],[2,8418,-1536],[1,7333,287,5060,287],[1,3360,287,2397,-676],[1,1353,-1720,1353,-3727],[2,1333,-10895],[2,4221,-10895],[2,4221,-4137],[1,4221,-2990,4815,-2498],[1,5266,-2129,6085,-2129],[1,6966,-2129,7539,-2621],[1,8297,-3276,8297,-4607],[2,8297,-10894],[2,11162,-10895]],[[0,11100,-10895],[2,7188,0],[2,4177,0],[2,245,-10895],[2,3440,-10895],[2,5713,-2867],[2,8048,-10895],[2,11100,-10895]],[[0,15729,-10895],[2,12616,0],[2,9667,0],[2,7947,-7946],[2,6227,0],[2,3278,0],[2,186,-10895],[2,3238,-10895],[2,4958,-3072],[2,6514,-10895],[2,9402,-10895],[2,11061,-3072],[2,12781,-10895],[2,15729,-10895]],[[0,7373,-5550],[2,11080,0],[2,7537,0],[2,5653,-3277],[2,3769,0],[2,308,0],[2,4015,-5550],[2,431,-10895],[2,3913,-10895],[2,5756,-7721],[2,7558,-10895],[2,10937,-10895],[2,7373,-5550]],[[0,11018,-10895],[2,7291,-184],[1,6247,2908,5633,3604],[1,4937,4382,3094,4382],[2,1783,4341],[2,1783,2047],[2,2336,2088],[1,3217,2088,3565,1842],[1,4036,1514,4220,449],[2,185,-10897],[2,3380,-10897],[2,5735,-2869],[2,7988,-10897],[2,11018,-10895]],[[0,9626,-8540],[2,4096,-2355],[2,9810,-2355],[2,9830,0],[2,409,0],[2,409,-2232],[2,5980,-8601],[2,778,-8601],[2,778,-10895],[2,9625,-10895],[2,9626,-8540]],[[0,7475,2212],[2,7475,4014],[2,5775,4014],[1,4669,4014,3850,3338],[1,2908,2560,2908,1208],[2,2908,-2888],[1,2908,-3728,2171,-4138],[1,1639,-4445,984,-4445],[2,984,-6329],[1,1639,-6329,2151,-6616],[1,2909,-7046,2909,-7886],[2,2889,-11982],[1,2889,-13334,3831,-14112],[1,4650,-14788,5756,-14788],[2,7476,-14788],[2,7476,-12986],[2,6554,-12986],[1,6001,-12986,5704,-12710],[1,5407,-12434,5407,-11635],[2,5407,-7621],[1,5264,-6474,4424,-5880],[1,3851,-5491,3073,-5409],[1,3851,-5286,4404,-4897],[1,5264,-4283,5407,-3157],[2,5407,857],[1,5407,1471,5571,1758],[1,5837,2209,6554,2209],[2,7475,2212]],[[0,1720,389],[2,1720,-15094],[2,4014,-15094],[2,4014,389],[2,1720,389]],[[0,6984,-6328],[2,6984,-4444],[1,6329,-4444,5817,-4157],[1,5059,-3727,5059,-2887],[2,5059,1209],[1,5059,2561,4117,3339],[1,3298,4015,2192,4015],[2,492,4015],[2,492,2213],[2,1414,2213],[1,1967,2213,2264,1937],[1,2561,1661,2561,862],[2,2561,-3152],[1,2704,-4299,3544,-4893],[1,4117,-5282,4895,-5364],[1,4117,-5487,3564,-5876],[1,2704,-6490,2561,-7616],[2,2561,-11630],[1,2561,-12244,2397,-12531],[1,2131,-12982,1414,-12982],[2,492,-12982],[2,472,-14784],[2,2172,-14784],[1,3278,-14784,4097,-14108],[1,5039,-13330,5039,-11978],[2,5059,-7882],[1,5059,-7042,5796,-6632],[1,6328,-6325,6983,-6325],[2,6984,-6328]],[[0,9974,-7025],[2,10711,-5182],[1,10097,-4322,9667,-3974],[1,8991,-3421,8131,-3421],[1,7496,-3421,6820,-3708],[1,6615,-3790,6062,-4097],[1,5366,-4466,4997,-4609],[1,4383,-4834,3707,-4834],[1,3093,-4834,2642,-4363],[1,2294,-3994,1987,-3339],[2,1250,-5182],[1,1660,-5981,2172,-6391],[1,2848,-6944,3811,-6944],[1,4323,-6944,4917,-6760],[1,5306,-6637,6064,-6289],[1,6617,-6043,7221,-5787],[1,7825,-5531,8153,-5531],[1,8788,-5531,9382,-6227],[1,9628,-6514,9976,-7026],[2,9974,-7025]],[],[[0,9912,-14705],[2,9912,-4260],[1,9912,-1946,8755,-789],[1,7598,368,5345,368],[1,2089,368,1065,-1537],[1,451,-2663,451,-5551],[2,3318,-5551],[1,3318,-3626,3605,-2971],[1,3974,-2111,5121,-2111],[1,6186,-2111,6575,-2766],[1,6841,-3217,6841,-4261],[2,6841,-14706],[2,9912,-14705]],[[0,6103,-4997],[1,7025,-4997,7629,-5663],[1,8233,-6329,8233,-7312],[1,8233,-8295,7629,-8940],[1,7025,-9585,6083,-9585],[1,5141,-9585,4578,-8940],[1,4015,-8295,4015,-7312],[1,4015,-6308,4578,-5653],[1,5141,-4998,6104,-4998],[2,6103,-4997],[0,348,-2908],[2,2355,-4915],[1,2048,-5427,1884,-6011],[1,1720,-6595,1720,-7312],[1,1720,-7947,1894,-8582],[1,2068,-9217,2334,-9668],[2,327,-11675],[2,1679,-13027],[2,3686,-11020],[1,4218,-11348,4802,-11522],[1,5386,-11696,6082,-11696],[1,6778,-11696,7382,-11522],[1,7986,-11348,8478,-11020],[2,10485,-13027],[2,11837,-11675],[2,9830,-9668],[1,10137,-9197,10332,-8572],[1,10527,-7947,10527,-7312],[1,10527,-6616,10353,-6012],[1,10179,-5408,9851,-4916],[2,11858,-2909],[2,10506,-1557],[2,8499,-3564],[1,8028,-3257,7424,-3073],[1,6820,-2889,6103,-2889],[1,5448,-2889,4844,-3063],[1,4240,-3237,3708,-3565],[2,1701,-1558],[2,348,-2908]],[[0,1720,389],[2,1720,-5550],[2,4014,-5550],[2,4014,389],[2,1720,389],[0,1700,-9155],[2,1720,-15094],[2,4014,-15094],[2,3994,-9155],[2,1700,-9155]],[[0,4915,-10486],[2,8233,-8827],[1,9421,-8233,9974,-7598],[1,10691,-6758,10691,-5488],[1,10691,-4935,10261,-4177],[1,9688,-3173,8725,-2743],[1,9217,-2333,9545,-1801],[1,10016,-1023,10016,-122],[1,10016,1721,8664,2786],[1,7415,3769,5592,3769],[1,3216,3769,2069,2233],[1,1291,1189,1291,-60],[2,3994,-60],[1,4076,677,4404,1066],[1,4855,1598,5797,1598],[1,6616,1598,7005,1025],[1,7271,636,7271,144],[1,7271,-348,6984,-635],[1,6697,-922,6062,-1250],[2,2929,-2847],[1,1762,-3441,1270,-4096],[1,697,-4874,697,-6144],[1,697,-7025,1250,-7742],[1,1721,-8356,2602,-8848],[1,2172,-9237,1885,-9749],[1,1516,-10425,1516,-11224],[1,1516,-12740,2581,-13764],[1,3748,-14890,5673,-14890],[1,7393,-14890,8458,-14132],[1,9810,-13169,9810,-11141],[2,7209,-11141],[1,7209,-11878,6789,-12298],[1,6369,-12718,5591,-12718],[1,4915,-12718,4516,-12370],[1,4117,-12022,4117,-11571],[1,4117,-10895,4916,-10485],[2,4915,-10486],[0,6984,-6328],[2,3973,-7844],[1,3563,-7701,3338,-7312],[1,3113,-6923,3113,-6657],[1,3113,-6227,3369,-5920],[1,3625,-5613,4055,-5388],[2,7270,-3668],[1,8151,-4160,8151,-5020],[1,8151,-5430,7823,-5747],[1,7495,-6064,6983,-6330],[2,6984,-6328]],[[0,6103,-16384],[2,3523,-16384],[2,3523,-18739],[2,6103,-18739],[2,6103,-16384],[0,10097,-16384],[2,7517,-16384],[2,7497,-18739],[2,10077,-18739],[2,10097,-16384],[0,12370,-12104],[2,4567,-12104],[2,4567,-9012],[2,11735,-9012],[2,11735,-6411],[2,4567,-6411],[2,4567,-2602],[2,12718,-2602],[2,12718,-1],[2,1556,-1],[2,1556,-14706],[2,12369,-14706],[2,12370,-12104]],[[0,16568,-7373],[1,16568,-3850,14213,-1659],[1,12001,389,8786,389],[1,5571,389,3359,-1659],[1,1004,-3850,1004,-7373],[1,1004,-10896,3359,-13067],[1,5550,-15095,8786,-15095],[1,12001,-15095,14213,-13067],[1,16568,-10896,16568,-7373],[0,14336,-7373],[1,14336,-9974,12708,-11643],[1,11080,-13312,8766,-13312],[1,6411,-13312,4824,-11663],[1,3237,-10014,3237,-7372],[1,3237,-4751,4834,-3082],[1,6431,-1413,8786,-1413],[1,11080,-1413,12708,-3082],[1,14336,-4751,14336,-7372],[2,14336,-7373],[0,10895,-6205],[2,12738,-6205],[1,12513,-4710,11489,-3850],[1,10465,-2990,9093,-2990],[1,7168,-2990,5990,-4250],[1,4812,-5510,4812,-7435],[1,4812,-9360,5959,-10609],[1,7106,-11858,9031,-11858],[1,10465,-11858,11448,-11049],[1,12431,-10240,12677,-8724],[2,10916,-8724],[1,10773,-9400,10261,-9738],[1,9749,-10076,9053,-10076],[1,8049,-10076,7496,-9380],[1,6943,-8684,6943,-7476],[1,6943,-6309,7537,-5541],[1,8131,-4773,9094,-4773],[1,9872,-4773,10353,-5131],[1,10834,-5489,10895,-6206],[2,10895,-6205]],[[0,5202,-7537],[2,3174,-5735],[2,5222,-3933],[2,5222,-1557],[2,1802,-4506],[2,1782,-6964],[2,5223,-9913],[2,5202,-7537],[0,9564,-7537],[2,7536,-5735],[2,9584,-3933],[2,9584,-1557],[2,6164,-4506],[2,6144,-6964],[2,9585,-9913],[2,9564,-7537]],[[0,8847,-2212],[2,8827,-6288],[2,799,-6288],[2,799,-8582],[2,11121,-8582],[2,11141,-2213],[2,8847,-2212]],[[0,7946,-7741],[2,7946,-6225],[2,880,-6225],[2,880,-7741],[2,7946,-7741]],[[0,7496,-6697],[2,7496,-3195],[2,5714,-3195],[2,5714,-11530],[2,8827,-11530],[1,10547,-11530,11397,-10967],[1,12247,-10404,12247,-9011],[1,12247,-7905,11694,-7373],[1,11141,-6841,10240,-6841],[2,12370,-3196],[2,10261,-3196],[2,8336,-6698],[2,7496,-6697],[0,7475,-8110],[2,9052,-8110],[1,9728,-8110,10025,-8315],[1,10322,-8520,10322,-9196],[1,10322,-9769,9871,-9943],[1,9420,-10117,8724,-10117],[2,7475,-10117],[2,7475,-8110],[0,16527,-7352],[1,16527,-3809,14192,-1638],[1,12021,390,8785,390],[1,5529,390,3338,-1638],[1,983,-3809,983,-7352],[1,983,-10895,3338,-13066],[1,5529,-15094,8785,-15094],[1,12021,-15094,14192,-13066],[1,16527,-10895,16527,-7352],[0,14295,-7352],[1,14295,-9953,12687,-11622],[1,11079,-13291,8765,-13291],[1,6389,-13291,4802,-11642],[1,3215,-9993,3215,-7351],[1,3215,-4730,4812,-3071],[1,6409,-1412,8785,-1412],[1,11079,-1412,12687,-3061],[1,14295,-4710,14295,-7352]],[[0,4383,-14705],[2,4383,0],[2,1311,0],[2,1311,-14705],[2,4383,-14705],[0,2150,-18739],[2,2150,-16384],[2,-430,-16384],[2,-430,-18739],[2,2150,-18739],[0,6144,-18739],[2,6144,-16384],[2,3564,-16384],[2,3564,-18739],[2,6144,-18739]],[[0,1147,-11653],[1,1147,-12861,2007,-13721],[1,2867,-14581,4075,-14581],[1,5283,-14581,6143,-13721],[1,7003,-12861,7003,-11653],[1,7003,-10445,6163,-9585],[1,5323,-8725,4094,-8725],[1,2886,-8725,2016,-9575],[1,1146,-10425,1146,-11654],[2,1147,-11653],[0,2294,-11653],[1,2294,-10916,2816,-10394],[1,3338,-9872,4075,-9872],[1,4812,-9872,5334,-10394],[1,5856,-10916,5856,-11653],[1,5856,-12390,5334,-12912],[1,4812,-13434,4075,-13434],[1,3338,-13434,2816,-12912],[1,2294,-12390,2294,-11653]],[[0,4833,-7803],[2,4833,-10363],[2,7127,-10363],[2,7127,-7803],[2,11141,-7803],[2,11141,-5509],[2,7127,-5509],[2,7107,-2929],[2,4813,-2929],[2,4833,-5509],[2,819,-5509],[2,819,-7803],[2,4833,-7803],[0,819,0],[2,819,-2294],[2,11141,-2294],[2,11141,0],[2,819,0]],[[0,4383,-14705],[2,4383,0],[2,1311,0],[2,1311,-14705],[2,4383,-14705]],[[0,1393,-10895],[2,4260,-10895],[2,4260,0],[2,1393,0],[2,1393,-10895],[0,4260,-14848],[2,4260,-12186],[2,1393,-12186],[2,1393,-14848],[2,4260,-14848]],[[0,11162,-10895],[2,11162,0],[2,8418,0],[2,8418,-1536],[1,7906,-655,7210,-184],[1,6514,287,5838,287],[1,4753,287,4221,-245],[2,4221,4240],[2,1354,4240],[2,1334,-10895],[2,4222,-10895],[2,4222,-4137],[1,4222,-2990,4816,-2498],[1,5267,-2129,6086,-2129],[1,6967,-2129,7540,-2621],[1,8298,-3276,8298,-4607],[2,8298,-10894],[2,11162,-10895]],[[0,4383,3912],[2,4383,-7106],[1,2212,-7106,1024,-8048],[1,-164,-8990,-164,-10649],[1,-164,-12677,1249,-13578],[1,2457,-14336,4812,-14336],[2,11038,-14336],[2,11038,3912],[2,8744,3912],[2,8744,-12595],[2,6676,-12595],[2,6676,3912],[2,4383,3912]],[[0,1188,-5181],[1,1188,-5877,1669,-6358],[1,2150,-6839,2846,-6839],[1,3542,-6839,4023,-6358],[1,4504,-5877,4504,-5181],[1,4504,-4505,4033,-4013],[1,3562,-3521,2845,-3521],[1,2149,-3521,1668,-4002],[1,1187,-4483,1187,-5179],[2,1188,-5181]],[[0,5100,-12575],[2,2520,-12575],[2,2520,-14930],[2,5100,-14930],[2,5100,-12575],[0,9073,-12575],[2,6493,-12575],[2,6493,-14930],[2,9073,-14930],[2,9073,-12575],[0,10793,-3195],[1,10261,-1372,8827,-471],[1,7619,287,6001,287],[1,3482,287,2130,-1003],[1,574,-2498,574,-5672],[1,574,-7536,1373,-8908],[1,2684,-11181,5776,-11181],[1,7844,-11181,9155,-10055],[1,10916,-8539,10916,-5180],[2,10896,-4668],[2,3421,-4668],[1,3605,-3214,4209,-2610],[1,4813,-2006,6001,-2006],[1,6636,-2006,7158,-2313],[1,7680,-2620,7844,-3193],[2,10793,-3195],[0,7967,-6533],[1,7844,-7741,7148,-8335],[1,6575,-8827,5756,-8827],[1,4752,-8827,4199,-8233],[1,3646,-7639,3523,-6533],[2,7967,-6533]],[[0,21975,-6001],[1,21975,-4629,21156,-3687],[1,20173,-2561,18350,-2561],[1,16548,-2561,15565,-3687],[1,14725,-4650,14725,-6002],[1,14725,-7354,15565,-8317],[1,16548,-9443,18371,-9443],[1,20153,-9443,21136,-8317],[1,21976,-7354,21976,-6002],[2,21975,-6001],[0,19968,-6001],[1,19968,-6841,19538,-7404],[1,19108,-7967,18350,-7967],[1,17592,-7967,17162,-7414],[1,16732,-6861,16732,-6001],[1,16732,-5182,17183,-4609],[1,17634,-4036,18371,-4036],[1,19129,-4036,19549,-4599],[1,19969,-5162,19969,-6002],[2,19968,-6001],[0,15299,-1638],[2,21443,-1638],[2,21443,0],[2,15299,0],[2,15299,-1638],[0,10527,-14705],[2,13394,-14705],[2,13394,0],[2,10322,0],[2,4321,-10486],[2,4280,0],[2,1413,0],[2,1413,-14705],[2,4649,-14705],[2,10465,-4465],[2,10527,-14705]],[[0,8212,-5734],[2,6144,-7536],[2,6144,-9912],[2,9564,-6963],[2,9584,-4505],[2,6164,-1556],[2,6164,-3932],[2,8212,-5734],[0,3850,-5734],[2,1782,-7536],[2,1802,-9912],[2,5222,-6963],[2,5222,-4505],[2,1802,-1556],[2,1802,-3932],[2,3850,-5734]],[[0,4280,-10895],[2,4280,1147],[1,4280,3134,3358,3830],[1,2621,4383,798,4383],[2,81,4383],[2,61,2089],[2,573,2089],[1,901,2089,1085,1966],[1,1413,1741,1413,1086],[2,1413,-10895],[2,4280,-10895],[0,4280,-14848],[2,4280,-12186],[2,1413,-12186],[2,1413,-14848],[2,4280,-14848]],[[0,799,-4526],[2,3748,-4526],[1,3748,-3625,4280,-3031],[1,5079,-2150,6861,-2150],[1,8172,-2150,8950,-2519],[1,9933,-2990,9933,-4055],[1,9933,-4854,9196,-5264],[1,8704,-5530,7270,-5878],[2,5693,-6247],[1,3338,-6800,2478,-7394],[1,1024,-8398,1024,-10569],[1,1024,-12269,2048,-13436],[1,3502,-15095,6676,-15095],[1,9687,-15095,11223,-13395],[1,12390,-12105,12390,-10344],[2,9441,-10344],[1,9339,-11225,8929,-11696],[1,8192,-12556,6431,-12556],[1,5387,-12556,4711,-12187],[1,3871,-11716,3871,-10794],[1,3871,-10036,4424,-9647],[1,4731,-9422,5427,-9258],[2,9031,-8377],[1,10854,-7926,11714,-7209],[1,12881,-6246,12881,-4423],[1,12881,-2191,11406,-962],[1,9788,390,7085,390],[1,3501,390,1924,-1371],[1,798,-2620,798,-4525],[2,799,-4526]],[[0,10301,-7578],[2,7495,-7578],[1,7372,-8274,7085,-8561],[1,6634,-9012,5569,-9012],[1,4525,-9012,4095,-8664],[1,3788,-8418,3788,-7947],[1,3788,-7312,5549,-6923],[1,8089,-6370,8847,-6022],[1,10629,-5182,10629,-3462],[1,10629,-1373,8888,-410],[1,7618,286,5857,286],[1,3666,286,2314,-492],[1,614,-1475,614,-3482],[2,3563,-3482],[1,3563,-2724,4106,-2304],[1,4649,-1884,5939,-1884],[1,6902,-1884,7394,-2294],[1,7763,-2601,7763,-3011],[1,7763,-3687,6022,-4076],[1,3421,-4649,2745,-4956],[1,984,-5775,984,-7536],[1,984,-8970,1906,-9953],[1,3073,-11182,5387,-11182],[1,7455,-11182,8643,-10547],[1,10302,-9666,10302,-7577],[2,10301,-7578]],[[0,1413,-10895],[2,4280,-10895],[2,4280,0],[2,1413,0],[2,1413,-10895],[0,2150,-14930],[2,2150,-12575],[2,-430,-12575],[2,-430,-14930],[2,2150,-14930],[0,6124,-14930],[2,6144,-12575],[2,3564,-12575],[2,3544,-14930],[2,6124,-14930]],[[0,3543,0],[2,307,0],[2,5550,-14705],[2,9093,-14705],[2,14274,0],[2,10936,0],[2,9973,-3031],[2,4546,-3031],[2,3543,0],[0,5386,-5571],[2,9134,-5571],[2,7291,-11387],[2,5386,-5571]],[[0,4506,-8991],[2,8397,-8991],[1,10711,-8991,12165,-7844],[1,13721,-6615,13721,-4485],[1,13721,-2396,12165,-1167],[1,10690,0,8417,0],[2,1577,0],[2,1577,-14705],[2,12616,-14705],[2,12616,-12125],[2,4506,-12125],[2,4506,-8991],[0,4526,-6451],[2,4526,-2539],[2,8417,-2539],[1,9441,-2539,10045,-3061],[1,10649,-3583,10649,-4484],[1,10649,-5406,10035,-5938],[1,9421,-6470,8397,-6470],[2,4526,-6451]],[[0,1577,-14705],[2,8725,-14705],[1,11142,-14705,12330,-13394],[1,13252,-12370,13252,-10936],[1,13252,-9564,12576,-8765],[1,12187,-8314,11429,-7925],[1,12678,-7454,13231,-6450],[1,13702,-5590,13702,-4361],[1,13702,-2538,12453,-1330],[1,11736,-634,10958,-368],[1,9873,1,7805,1],[2,1579,1],[2,1577,-14705],[0,4526,-2540],[2,8294,-2540],[1,9441,-2540,10045,-3062],[1,10649,-3584,10649,-4690],[1,10649,-5591,9994,-6031],[1,9339,-6471,8417,-6471],[2,4526,-6471],[2,4526,-2540],[0,4526,-8950],[2,8130,-8950],[1,9113,-8950,9666,-9319],[1,10301,-9749,10301,-10589],[1,10301,-11429,9707,-11798],[1,9113,-12167,8028,-12167],[2,4526,-12167],[2,4526,-8950]],[[0,4649,0],[2,1577,0],[2,1577,-14705],[2,12247,-14705],[2,12247,-12104],[2,4649,-12104],[2,4649,0]],[[0,2785,-7352],[2,2785,-14704],[2,12943,-14704],[2,12943,-2600],[2,14377,-2600],[2,14397,2745],[2,11509,2745],[2,11509,1],[2,3399,1],[2,3399,2745],[2,552,2745],[2,532,-2600],[1,1679,-2600,2191,-3583],[1,2785,-4709,2785,-7351],[2,2785,-7352],[0,9871,-2601],[2,9871,-12104],[2,5673,-12104],[2,5653,-7353],[1,5653,-5285,5377,-4271],[1,5101,-3257,4528,-2602],[2,9871,-2601]],[[0,12390,-12104],[2,4587,-12104],[2,4587,-9012],[2,11755,-9012],[2,11755,-6411],[2,4587,-6411],[2,4587,-2602],[2,12738,-2602],[2,12738,-1],[2,1576,-1],[2,1576,-14706],[2,12389,-14706],[2,12390,-12104]],[[0,8663,0],[2,8663,-4977],[2,7844,-6001],[2,4342,0],[2,410,0],[2,5714,-8479],[2,737,-14705],[2,4423,-14705],[2,8662,-8725],[2,8662,-14705],[2,11734,-14705],[2,11734,-8725],[2,15973,-14705],[2,19659,-14705],[2,14682,-8479],[2,19986,0],[2,16054,0],[2,12511,-6001],[2,11733,-4977],[2,11733,0],[2,8663,0]],[[0,9708,-7803],[1,10834,-7680,11797,-6799],[1,12944,-5755,12944,-4301],[1,12944,-2355,11674,-1106],[1,10138,389,7107,389],[1,3523,389,1946,-1372],[1,820,-2621,820,-4526],[2,3769,-4526],[1,3769,-3666,4383,-3031],[1,5243,-2150,7045,-2150],[1,8212,-2150,9041,-2744],[1,9870,-3338,9870,-4301],[1,9870,-5345,9020,-5908],[1,8170,-6471,6962,-6471],[2,4627,-6471],[2,4647,-8949],[2,6941,-8949],[1,8067,-8949,8763,-9410],[1,9459,-9871,9459,-10752],[1,9459,-11592,8722,-12073],[1,7985,-12554,6818,-12554],[1,5159,-12554,4442,-11694],[1,3971,-11121,3971,-10343],[2,1022,-10343],[1,1022,-12084,2210,-13395],[1,3746,-15095,6777,-15095],[1,9849,-15095,11344,-13539],[1,12470,-12372,12470,-10754],[1,12470,-9464,11569,-8686],[1,10852,-8072,9705,-7806],[2,9708,-7803]],[[0,4321,-4465],[2,10219,-14705],[2,13455,-14705],[2,13455,0],[2,10588,0],[2,10588,-10486],[2,4546,0],[2,1474,0],[2,1474,-14705],[2,4321,-14705],[2,4321,-4465]],[[0,4342,-4465],[2,10240,-14705],[2,13476,-14705],[2,13476,0],[2,10609,0],[2,10609,-10486],[2,4567,0],[2,1495,0],[2,1495,-14705],[2,4342,-14705],[2,4342,-4465],[0,11100,-17736],[1,11100,-16692,10424,-15893],[1,9461,-14746,7454,-14746],[1,5652,-14746,4792,-15934],[1,4198,-16753,4198,-17736],[2,5550,-17736],[1,5673,-17122,5939,-16835],[1,6451,-16303,7577,-16303],[1,8519,-16303,8949,-16508],[1,9604,-16815,9768,-17737],[2,11100,-17736]],[[0,4751,0],[2,1679,0],[2,1679,-14705],[2,4751,-14705],[2,4751,-8725],[2,10363,-14705],[2,14336,-14705],[2,8315,-8684],[2,14684,0],[2,10731,0],[2,6184,-6451],[2,4750,-4976],[2,4751,0]],[[0,5243,-12104],[2,5243,-4649],[1,5243,-2150,4065,-880],[1,2887,390,470,390],[2,470,-2293],[1,1576,-2293,2027,-2989],[1,2375,-3542,2375,-4648],[2,2375,-14704],[2,12533,-14704],[2,12533,1],[2,9461,1],[2,9461,-12103],[2,5243,-12104]],[[0,15770,0],[2,12903,0],[2,12903,-10650],[2,10118,0],[2,7107,0],[2,4424,-10650],[2,4383,0],[2,1516,0],[2,1516,-14705],[2,6001,-14705],[2,8663,-4547],[2,11325,-14705],[2,15769,-14705],[2,15770,0]],[[0,4608,-6595],[2,4628,0],[2,1556,0],[2,1556,-14705],[2,4628,-14705],[2,4628,-9134],[2,10362,-9134],[2,10362,-14705],[2,13434,-14705],[2,13434,0],[2,10342,0],[2,10342,-6595],[2,4608,-6595]],[[0,8069,-15094],[1,9462,-15094,10752,-14623],[1,12636,-13927,13721,-12432],[1,15114,-10507,15114,-7353],[1,15114,-4199,13721,-2274],[1,12636,-758,10772,-82],[1,9482,389,8069,389],[1,6656,389,5366,-82],[1,3502,-758,2396,-2274],[1,983,-4220,983,-7353],[1,983,-10507,2376,-12432],[1,3461,-13927,5366,-14623],[1,6656,-15094,8069,-15094],[0,8069,-2212],[1,9625,-2212,10669,-3236],[1,12041,-4567,12041,-7352],[1,12041,-10137,10689,-11468],[1,9645,-12492,8068,-12492],[1,6512,-12492,5447,-11468],[1,4054,-10137,4054,-7352],[1,4054,-4567,5426,-3236],[1,6491,-2212,8068,-2212],[2,8069,-2212]],[[0,4628,-12104],[2,4628,0],[2,1556,0],[2,1556,-14705],[2,13434,-14705],[2,13434,0],[2,10362,0],[2,10362,-12104],[2,4628,-12104]],[[0,4526,0],[2,1454,0],[2,1454,-14705],[2,8171,-14705],[1,10301,-14705,11520,-13445],[1,12739,-12185,12739,-9994],[1,12739,-8438,11879,-7148],[1,10650,-5305,8049,-5305],[2,4526,-5305],[2,4526,0],[0,7352,-7844],[1,8827,-7844,9359,-8745],[1,9646,-9237,9646,-10138],[1,9646,-11223,9011,-11694],[1,8376,-12165,6942,-12165],[2,4505,-12165],[2,4505,-7844],[2,7352,-7844]],[[0,10834,-9892],[1,10547,-10957,10055,-11489],[1,9215,-12431,7556,-12431],[1,6143,-12431,5201,-11427],[1,3931,-10075,3931,-7290],[1,3931,-5119,4771,-3788],[1,5734,-2272,7577,-2272],[1,8867,-2272,9707,-2979],[1,10547,-3686,10813,-5038],[2,13885,-5038],[1,13414,-2519,11878,-1126],[1,10219,390,7516,390],[1,4485,390,2683,-1556],[1,778,-3604,778,-7331],[1,778,-11058,2744,-13147],[1,4567,-15093,7557,-15093],[1,10547,-15093,12308,-13311],[1,13742,-11857,13906,-9891],[2,10834,-9892]],[[0,7844,0],[2,4772,0],[2,4772,-12104],[2,328,-12104],[2,328,-14705],[2,12288,-14705],[2,12288,-12104],[2,7844,-12104],[2,7844,0]],[[0,6021,225],[2,5775,225],[1,5140,225,4792,194],[1,4444,163,3993,-1],[2,3993,-2622],[1,4177,-2540,4474,-2458],[1,4771,-2376,5017,-2376],[1,5488,-2376,5836,-2560],[1,6184,-2744,6409,-3215],[2,6491,-3338],[2,347,-14704],[2,4013,-14704],[2,7945,-6492],[2,10956,-14704],[2,14479,-14704],[2,9175,-2457],[1,8643,-1208,7558,-430],[1,6657,225,6022,225],[2,6021,225]],[[0,10691,-13128],[1,13190,-13128,14992,-11940],[1,17327,-10404,17327,-7352],[1,17327,-4321,15013,-2785],[1,13211,-1577,10712,-1577],[2,10712,0],[2,7640,0],[2,7640,-1577],[1,5121,-1577,3298,-2765],[1,902,-4321,902,-7352],[1,902,-10363,3278,-11919],[1,5121,-13127,7620,-13127],[2,7620,-14704],[2,10692,-14704],[2,10691,-13128],[0,10711,-10752],[2,10711,-3953],[1,12186,-3953,13128,-4608],[1,14377,-5468,14377,-7352],[1,14377,-9195,13128,-10076],[1,12165,-10752,10711,-10752],[0,7639,-3953],[2,7639,-10752],[1,6164,-10752,5201,-10097],[1,3931,-9237,3931,-7353],[1,3931,-5510,5201,-4629],[1,6184,-3953,7638,-3953],[2,7639,-3953]],[[0,13476,0],[2,9728,0],[2,6943,-5018],[2,3973,0],[2,389,0],[2,5140,-7516],[2,655,-14704],[2,4321,-14704],[2,6922,-9953],[2,9625,-14704],[2,13168,-14704],[2,8662,-7638],[2,13476,0]],[[0,11592,0],[2,1147,0],[2,1147,-14705],[2,4219,-14705],[2,4219,-2601],[2,9953,-2601],[2,9953,-14705],[2,13025,-14705],[2,13025,-2601],[2,14459,-2601],[2,14459,2744],[2,11592,2744],[2,11592,0]],[[0,1536,-9953],[2,1556,-14704],[2,4628,-14704],[2,4608,-9953],[1,4608,-8949,5222,-8478],[1,5836,-8007,6840,-8007],[1,7721,-8007,8653,-8314],[1,9585,-8621,10363,-9133],[2,10363,-14704],[2,13435,-14704],[2,13435,1],[2,10363,1],[2,10343,-6594],[1,9339,-6021,8192,-5693],[1,7045,-5365,5939,-5365],[1,3973,-5365,2847,-6389],[1,1536,-7577,1536,-9953]],[[0,7680,-2601],[2,7680,-14705],[2,10752,-14705],[2,10752,-2601],[2,13824,-2601],[2,13824,-14705],[2,16896,-14705],[2,16896,0],[2,1536,0],[2,1536,-14705],[2,4608,-14705],[2,4608,-2601],[2,7680,-2601]],[[0,15258,0],[2,1332,0],[2,1332,-14705],[2,4404,-14705],[2,4404,-2601],[2,7476,-2601],[2,7476,-14705],[2,10548,-14705],[2,10548,-2601],[2,13620,-2601],[2,13620,-14705],[2,16692,-14705],[2,16692,-2601],[2,18126,-2601],[2,18146,2744],[2,15258,2744],[2,15258,0]],[[0,5857,-9400],[2,9380,-9400],[1,11960,-9400,13209,-7557],[1,14069,-6287,14069,-4710],[1,14069,-2539,12861,-1269],[1,11653,1,9503,1],[2,2786,1],[2,2766,-12123],[2,288,-12123],[2,308,-14703],[2,5858,-14703],[2,5857,-9400],[0,5837,-6861],[2,5857,-2540],[2,8294,-2540],[1,9728,-2540,10353,-3011],[1,10978,-3482,10978,-4567],[1,10978,-5468,10691,-5960],[1,10159,-6861,8684,-6861],[2,5837,-6861]],[[0,4936,-9400],[2,8459,-9400],[1,11039,-9400,12288,-7557],[1,13148,-6287,13148,-4710],[1,13148,-2539,11940,-1269],[1,10732,1,8582,1],[2,1865,1],[2,1865,-14704],[2,4937,-14704],[2,4936,-9400],[0,18084,0],[2,15012,0],[2,15012,-14705],[2,18084,-14705],[2,18084,0],[0,4936,-6861],[2,4936,-2540],[2,7373,-2540],[1,8807,-2540,9432,-3011],[1,10057,-3482,10057,-4567],[1,10057,-5468,9770,-5960],[1,9238,-6861,7763,-6861],[2,4936,-6861]],[[0,4731,-9400],[2,8254,-9400],[1,10834,-9400,12083,-7557],[1,12943,-6287,12943,-4710],[1,12943,-2539,11735,-1269],[1,10527,1,8377,1],[2,1660,1],[2,1660,-14704],[2,4732,-14704],[2,4731,-9400],[0,4710,-6861],[2,4730,-2540],[2,7167,-2540],[1,8601,-2540,9226,-3011],[1,9851,-3482,9851,-4567],[1,9851,-5468,9564,-5960],[1,9032,-6861,7557,-6861],[2,4710,-6861]],[[0,10732,-9011],[1,10384,-10834,9258,-11735],[1,8377,-12431,7230,-12431],[1,5571,-12431,4752,-11489],[1,4301,-10977,3994,-9892],[2,922,-9892],[1,922,-11776,2438,-13292],[1,4240,-15094,7271,-15094],[1,10241,-15094,12064,-13148],[1,14010,-11059,14010,-7332],[1,14010,-3646,12126,-1578],[1,10324,388,7313,388],[1,4651,388,2972,-1128],[1,1395,-2541,903,-5040],[2,3975,-5040],[1,4262,-3709,5122,-2992],[1,5982,-2275,7252,-2275],[1,8890,-2275,9832,-3483],[1,10672,-4568,10856,-6411],[2,5081,-6411],[2,5081,-9012],[2,10732,-9011]],[[0,6738,-6595],[2,4608,-6595],[2,4628,0],[2,1556,0],[2,1556,-14705],[2,4628,-14705],[2,4628,-9134],[2,6860,-9134],[1,7167,-11530,8457,-13005],[1,9481,-14172,10997,-14704],[1,12123,-15093,13208,-15093],[1,14457,-15093,15645,-14622],[1,17365,-13946,18369,-12430],[1,19659,-10484,19659,-7351],[1,19659,-4177,18389,-2272],[1,17385,-756,15665,-80],[1,14477,391,13207,391],[1,11999,391,10791,-39],[1,9050,-674,8046,-2005],[1,6735,-3766,6735,-6592],[2,6738,-6595],[0,13210,-2212],[1,14500,-2212,15401,-3236],[1,16589,-4588,16589,-7353],[1,16589,-10138,15422,-11469],[1,14521,-12493,13210,-12493],[1,11920,-12493,10998,-11469],[1,9790,-10117,9790,-7352],[1,9790,-4567,10978,-3236],[1,11879,-2212,13210,-2212]],[[0,13537,0],[2,10526,0],[2,10526,-5755],[2,8539,-5755],[2,4791,0],[2,1023,0],[2,5180,-5755],[1,3685,-6083,2641,-7209],[1,1453,-8479,1453,-10240],[1,1453,-12042,2702,-13332],[1,4033,-14704,6101,-14704],[2,13535,-14704],[2,13537,0],[0,10506,-8233],[2,10506,-12165],[2,6676,-12165],[1,5611,-12165,5017,-11551],[1,4525,-11039,4525,-10322],[1,4525,-9359,5129,-8796],[1,5733,-8233,6900,-8233],[2,10506,-8233]],[[0,10260,-2130],[1,10260,-1229,10424,-881],[1,10588,-533,10895,-431],[2,10895,-1],[2,7803,-1],[1,7598,-615,7537,-1291],[1,6841,-554,6268,-247],[1,5326,285,4015,285],[1,2643,285,1742,-452],[1,698,-1312,698,-2889],[1,698,-4425,1548,-5295],[1,2398,-6165,3873,-6370],[2,6433,-6759],[1,7027,-6841,7242,-7056],[1,7457,-7271,7457,-7619],[1,7457,-8418,6781,-8705],[1,6351,-8889,5552,-8889],[1,4610,-8889,4180,-8377],[1,3873,-8008,3812,-7373],[2,1047,-7373],[1,1252,-9626,2747,-10527],[1,3832,-11182,5900,-11182],[1,7538,-11182,8644,-10629],[1,10241,-9830,10241,-8028],[2,10260,-2130],[0,7455,-5304],[1,7250,-5140,6799,-4986],[1,6348,-4832,5437,-4689],[1,4526,-4546,4137,-4280],[1,3564,-3891,3564,-3072],[1,3564,-2396,4015,-2048],[1,4384,-1761,4896,-1761],[1,5920,-1761,6688,-2355],[1,7456,-2949,7456,-3912],[2,7455,-5304]],[[0,3092,-14131],[1,3891,-14827,5222,-15073],[1,6123,-15237,8007,-15237],[1,8601,-15237,8826,-15483],[1,8887,-15565,8948,-15749],[2,11242,-15749],[1,11222,-15339,11181,-15073],[1,10853,-13496,9378,-12964],[1,8805,-12759,7033,-12626],[1,5261,-12493,4585,-12104],[1,3909,-11715,3520,-10875],[1,3315,-10465,3110,-9605],[1,3581,-10240,4492,-10711],[1,5403,-11182,6325,-11182],[1,8680,-11182,10216,-9789],[1,11916,-8233,11916,-5448],[1,11916,-2642,10237,-1106],[1,8721,287,6345,287],[1,3969,287,2453,-1106],[1,774,-2642,774,-5448],[1,774,-9093,1327,-11100],[1,1880,-13107,3088,-14131],[2,3092,-14131],[0,6349,-8765],[1,4874,-8765,4219,-7639],[1,3727,-6779,3727,-5448],[1,3727,-4096,4198,-3277],[1,4853,-2130,6348,-2130],[1,7823,-2130,8478,-3256],[1,8970,-4116,8970,-5447],[1,8970,-6799,8499,-7618],[1,7844,-8765,6349,-8765]],[[0,1249,0],[2,1249,-10895],[2,5714,-10895],[1,7864,-10895,9031,-10229],[1,10198,-9563,10198,-8068],[1,10198,-7085,9502,-6409],[1,8888,-5815,7966,-5672],[1,9031,-5488,9686,-4976],[1,10587,-4259,10587,-3010],[1,10587,-1454,9256,-676],[1,8089,20,6082,20],[2,1249,0],[0,4116,-4628],[2,4116,-1884],[2,6021,-1884],[1,7721,-1884,7721,-3195],[1,7721,-3891,7270,-4260],[1,6819,-4629,6020,-4629],[2,4116,-4628],[0,4116,-9011],[2,4116,-6451],[2,5775,-6451],[1,6512,-6451,6952,-6789],[1,7392,-7127,7392,-7762],[1,7392,-8376,6952,-8693],[1,6512,-9010,5775,-9010],[2,4116,-9011]],[[0,8622,-8602],[2,4116,-8602],[2,4116,0],[2,1249,0],[2,1249,-10895],[2,8622,-10895],[2,8622,-8602]],[[0,1925,-5673],[2,1925,-10895],[2,10322,-10895],[2,10342,-2273],[2,11632,-2273],[2,11632,2745],[2,8970,2745],[2,8970,1],[2,2949,1],[2,2949,2745],[2,287,2745],[2,287,-2273],[1,1127,-2273,1526,-2980],[1,1925,-3687,1925,-5674],[2,1925,-5673],[0,7475,-2273],[2,7455,-8601],[2,4567,-8601],[2,4567,-5611],[1,4567,-3112,3809,-2272],[2,7475,-2273]],[[0,10813,-3195],[1,10281,-1372,8847,-471],[1,7639,287,6021,287],[1,3502,287,2150,-1003],[1,594,-2498,594,-5672],[1,594,-7536,1393,-8908],[1,2704,-11181,5796,-11181],[1,7864,-11181,9175,-10055],[1,10936,-8539,10936,-5180],[2,10916,-4668],[2,3441,-4668],[1,3625,-3214,4229,-2610],[1,4833,-2006,6021,-2006],[1,6656,-2006,7178,-2313],[1,7700,-2620,7864,-3193],[2,10813,-3195],[0,7987,-6533],[1,7864,-7741,7168,-8335],[1,6595,-8827,5776,-8827],[1,4772,-8827,4219,-8233],[1,3666,-7639,3543,-6533],[2,7987,-6533]],[[0,7045,0],[2,7045,-3441],[2,6205,-4445],[2,3768,-1],[2,327,-1],[2,4259,-6677],[2,409,-10896],[2,3829,-10896],[2,7024,-6861],[2,7024,-10896],[2,9871,-10896],[2,9871,-6861],[2,13066,-10896],[2,16486,-10896],[2,12636,-6677],[2,16609,-1],[2,13168,-1],[2,10731,-4445],[2,9891,-3441],[2,9891,0],[2,7045,0]],[[0,7864,-5673],[1,9052,-5530,9707,-5120],[1,10731,-4506,10731,-3257],[1,10731,-1311,8990,-389],[1,7720,287,5959,287],[1,3768,287,2416,-491],[1,716,-1474,716,-3481],[2,3665,-3481],[1,3665,-2723,4208,-2303],[1,4751,-1883,6041,-1883],[1,7004,-1883,7496,-2415],[1,7865,-2804,7865,-3255],[1,7865,-3910,7292,-4268],[1,6719,-4626,5920,-4626],[2,3913,-4626],[2,3913,-6449],[2,5900,-6449],[1,6617,-6449,7068,-6777],[1,7519,-7105,7519,-7719],[1,7519,-8231,7232,-8538],[1,6802,-9009,5778,-9009],[1,4734,-9009,4283,-8558],[1,3976,-8251,3853,-7575],[2,1047,-7575],[1,1047,-9623,2685,-10524],[1,3893,-11179,5921,-11179],[1,8235,-11179,9402,-10032],[1,10324,-9110,10324,-7717],[1,10324,-6775,9546,-6243],[1,8993,-5874,7867,-5669],[2,7864,-5673]],[[0,11469,0],[2,8602,0],[2,8602,-6554],[2,4731,0],[2,1659,0],[2,1639,-10895],[2,4527,-10895],[2,4527,-4341],[2,8377,-10895],[2,11469,-10895],[2,11469,0]],[[0,11469,0],[2,8602,0],[2,8602,-6554],[2,4731,0],[2,1659,0],[2,1639,-10895],[2,4527,-10895],[2,4527,-4341],[2,8377,-10895],[2,11469,-10895],[2,11469,0],[0,10179,-15360],[1,10077,-14234,9483,-13517],[1,8541,-12370,6534,-12370],[1,4732,-12370,3872,-13558],[1,3278,-14377,3278,-15360],[2,4630,-15360],[1,4753,-14766,5040,-14459],[1,5552,-13927,6678,-13927],[1,7600,-13927,8030,-14132],[1,8706,-14460,8849,-15361],[2,10179,-15360]],[[0,3912,0],[2,1045,0],[2,1045,-10895],[2,3892,-10895],[2,3892,-6758],[2,7496,-10895],[2,11080,-10895],[2,7168,-6676],[2,11264,0],[2,7782,0],[2,5079,-4669],[2,3912,-3440],[2,3912,0]],[[0,4588,-8602],[2,4588,-3871],[1,4588,-1659,3400,-635],[1,2376,246,553,246],[2,553,-2048],[1,1229,-2048,1577,-2478],[1,1925,-2908,1925,-3871],[2,1925,-10896],[2,10322,-10896],[2,10322,-1],[2,7455,-1],[2,7455,-8603],[2,4588,-8602]],[[0,12001,-7434],[2,9277,0],[2,6860,0],[2,4095,-7434],[2,4013,-7434],[1,4074,-7045,4094,-6697],[1,4114,-6349,4114,-6144],[2,4114,0],[2,1452,0],[2,1452,-10895],[2,5343,-10895],[2,8026,-3481],[2,8108,-3481],[2,10750,-10895],[2,14682,-10895],[2,14682,0],[2,12020,0],[2,12020,-6144],[1,12020,-6881,12030,-7086],[1,12040,-7291,12081,-7434],[2,12001,-7434]],[[0,11264,0],[2,8397,0],[2,8397,-4301],[2,4321,-4301],[2,4321,0],[2,1454,0],[2,1454,-10895],[2,4301,-10895],[2,4301,-6594],[2,8377,-6594],[2,8377,-10895],[2,11265,-10895],[2,11264,0]],[[0,6369,287],[1,3993,287,2477,-1106],[1,798,-2642,798,-5448],[1,798,-8233,2477,-9789],[1,3993,-11182,6348,-11182],[1,8703,-11182,10239,-9789],[1,11939,-8233,11939,-5448],[1,11939,-2642,10260,-1106],[1,8744,287,6368,287],[2,6369,287],[0,6369,-8765],[1,4894,-8765,4239,-7639],[1,3747,-6779,3747,-5448],[1,3747,-4096,4218,-3277],[1,4873,-2130,6368,-2130],[1,7843,-2130,8498,-3256],[1,8990,-4116,8990,-5447],[1,8990,-6799,8519,-7618],[1,7864,-8765,6369,-8765]],[[0,11264,0],[2,8397,0],[2,8397,-8581],[2,4321,-8581],[2,4321,0],[2,1454,0],[2,1454,-10895],[2,11264,-10895],[2,11264,0]],[[0,3912,-9318],[1,4485,-10178,5038,-10567],[1,5898,-11181,7188,-11181],[1,9113,-11181,10362,-9788],[1,11734,-8272,11734,-5569],[1,11734,-3091,10669,-1514],[1,9440,288,7146,288],[1,5856,288,4996,-326],[1,4484,-695,4054,-1391],[2,4013,4241],[2,1166,4241],[2,1166,-10894],[2,3910,-10894],[2,3912,-9318],[0,6410,-2068],[1,7659,-2068,8294,-3235],[1,8786,-4136,8786,-5365],[1,8786,-6819,8254,-7679],[1,7619,-8703,6329,-8703],[1,4977,-8703,4383,-7618],[1,3912,-6758,3912,-5202],[1,3912,-3850,4465,-3031],[1,5120,-2068,6410,-2068]],[[0,10813,-3973],[1,10690,-2560,9789,-1434],[1,8437,286,5836,286],[1,3092,286,1781,-1557],[1,777,-2970,777,-5141],[1,777,-7926,2006,-9482],[1,3337,-11182,5999,-11182],[1,7719,-11182,8948,-10383],[1,10648,-9298,10832,-7004],[2,7924,-7004],[1,7740,-7946,7187,-8397],[1,6736,-8766,6019,-8766],[1,4790,-8766,4196,-7701],[1,3725,-6861,3725,-5612],[1,3725,-3666,4268,-2867],[1,4811,-2068,5937,-2068],[1,6879,-2068,7452,-2826],[1,7903,-3420,7903,-3973],[2,10813,-3973]],[[0,3666,0],[2,3666,-8602],[2,410,-8602],[2,410,-10896],[2,9790,-10896],[2,9790,-8602],[2,6534,-8602],[2,6534,0],[2,3666,0]],[[0,7393,-184],[1,6349,2908,5735,3604],[1,5039,4382,3196,4382],[2,1885,4341],[2,1885,2047],[2,2438,2088],[1,3319,2088,3667,1842],[1,4138,1514,4322,449],[2,287,-10897],[2,3482,-10897],[2,5837,-2869],[2,8090,-10897],[2,11121,-10897],[2,7393,-184]],[[0,7148,4239],[2,7148,-1393],[1,6493,-328,6145,-103],[1,5551,286,4670,286],[1,2602,286,1578,-1516],[1,697,-3052,697,-5571],[1,697,-8295,1823,-9790],[1,2867,-11183,4587,-11183],[1,5713,-11183,6348,-10589],[1,6614,-10343,7249,-9319],[2,7290,-14705],[2,9911,-14705],[2,9911,-9319],[1,10628,-10404,10812,-10568],[1,11467,-11182,12573,-11182],[1,14293,-11182,15358,-9789],[1,16505,-8273,16505,-5570],[1,16505,-3030,15645,-1514],[1,14621,288,12532,288],[1,11406,288,10771,-326],[1,10628,-469,10055,-1391],[2,10014,4241],[2,7148,4239],[0,7291,-5202],[2,7291,-5857],[1,7291,-7270,7025,-7843],[1,6615,-8703,5448,-8703],[1,4404,-8703,3974,-7679],[1,3646,-6901,3646,-5365],[1,3646,-3993,3912,-3235],[1,4322,-2068,5366,-2068],[1,6595,-2068,7005,-3031],[1,7292,-3686,7292,-5202],[2,7291,-5202],[0,11796,-2068],[1,12820,-2068,13250,-3235],[1,13557,-4054,13557,-5365],[1,13557,-6881,13209,-7680],[1,12758,-8704,11714,-8704],[1,10567,-8704,10178,-7844],[1,9912,-7250,9912,-5857],[2,9912,-5202],[1,9912,-3625,10158,-3031],[1,10568,-2068,11797,-2068],[2,11796,-2068]],[[0,11141,0],[2,7598,0],[2,5714,-3277],[2,3830,0],[2,369,0],[2,4076,-5550],[2,492,-10895],[2,3974,-10895],[2,5817,-7721],[2,7619,-10895],[2,10998,-10895],[2,7434,-5550],[2,11141,0]],[[0,9708,0],[2,1250,0],[2,1250,-10875],[2,4117,-10875],[2,4117,-2294],[2,8193,-2294],[2,8193,-10875],[2,11060,-10875],[2,11060,-2294],[2,12371,-2294],[2,12371,2744],[2,9709,2744],[2,9708,0]],[[0,11469,0],[2,8602,0],[2,8602,-4485],[1,7967,-4157,7557,-3993],[1,6287,-3481,5365,-3481],[1,3645,-3481,2703,-4341],[1,1659,-5304,1659,-7291],[2,1659,-10895],[2,4526,-10895],[2,4526,-7372],[1,4526,-6512,5120,-6164],[1,5571,-5898,6370,-5898],[1,6964,-5898,7824,-6226],[1,8111,-6328,8582,-6574],[2,8582,-10895],[2,11470,-10895],[2,11469,0]],[[0,7188,-2294],[2,7188,-10896],[2,10055,-10896],[2,10055,-2294],[2,12943,-2294],[2,12943,-10875],[2,15810,-10875],[2,15810,0],[2,1454,0],[2,1454,-10875],[2,4321,-10875],[2,4321,-2294],[2,7188,-2294]],[[0,14254,0],[2,1249,0],[2,1249,-10875],[2,4116,-10875],[2,4116,-2294],[2,6983,-2294],[2,6983,-10896],[2,9850,-10896],[2,9850,-2294],[2,12738,-2294],[2,12738,-10875],[2,15605,-10875],[2,15605,-2294],[2,16916,-2294],[2,16916,2744],[2,14254,2744],[2,14254,0]],[[0,5407,-10895],[2,5407,-6656],[2,7127,-6656],[1,9298,-6656,10404,-5919],[1,11694,-5059,11694,-3195],[1,11694,-1639,10342,-779],[1,9113,-1,7126,-1],[2,2538,-1],[2,2538,-8603],[2,265,-8603],[2,265,-10897],[2,5407,-10895],[0,5407,-4628],[2,5407,-1884],[2,7066,-1884],[1,7885,-1884,8356,-2222],[1,8827,-2560,8827,-3195],[1,8827,-3891,8346,-4260],[1,7865,-4629,7066,-4629],[2,5407,-4628]],[[0,4321,-6656],[2,5898,-6656],[1,8069,-6656,9175,-5919],[1,10465,-5059,10465,-3195],[1,10465,-1639,9113,-779],[1,7884,-1,5897,-1],[2,1453,-1],[2,1453,-10896],[2,4320,-10896],[2,4321,-6656],[0,14684,0],[2,11817,0],[2,11817,-10895],[2,14684,-10895],[2,14684,0],[0,4321,-4628],[2,4321,-1884],[2,5837,-1884],[1,6656,-1884,7127,-2222],[1,7598,-2560,7598,-3195],[1,7598,-3891,7117,-4260],[1,6636,-4629,5837,-4629],[2,4321,-4628]],[[0,4116,-6656],[2,5836,-6656],[1,8007,-6656,9113,-5919],[1,10403,-5059,10403,-3195],[1,10403,-1639,9051,-779],[1,7822,-1,5835,-1],[2,1247,-1],[2,1247,-10896],[2,4114,-10896],[2,4116,-6656],[0,4116,-4628],[2,4116,-1884],[2,5775,-1884],[1,6594,-1884,7065,-2222],[1,7536,-2560,7536,-3195],[1,7536,-3891,7055,-4260],[1,6574,-4629,5775,-4629],[2,4116,-4628]],[[0,7762,-6574],[1,7598,-7557,7147,-8089],[1,6574,-8765,5591,-8765],[1,4690,-8765,4178,-8151],[1,3789,-7680,3687,-7004],[2,779,-7004],[1,779,-9257,2520,-10363],[1,3810,-11182,5571,-11182],[1,8213,-11182,9565,-9482],[1,10794,-7926,10794,-5141],[1,10794,-2970,9831,-1577],[1,8541,287,5776,287],[1,3175,287,1823,-1413],[1,922,-2539,799,-3973],[2,3707,-3973],[1,3707,-3154,4362,-2540],[1,4874,-2069,5632,-2069],[1,6656,-2069,7209,-2765],[1,7639,-3318,7803,-4301],[2,4567,-4301],[2,4547,-6595],[2,7762,-6574]],[[0,6083,-4301],[2,4117,-4301],[2,4117,0],[2,1250,0],[2,1250,-10895],[2,4097,-10895],[2,4097,-6594],[2,6063,-6594],[1,6370,-8826,7865,-10055],[1,9237,-11181,11121,-11181],[1,13271,-11181,14684,-9788],[1,16261,-8232,16261,-5447],[1,16261,-2641,14705,-1105],[1,13312,288,11141,288],[1,9216,288,7885,-818],[1,6390,-2047,6083,-4300],[2,6083,-4301],[0,11141,-8765],[1,9933,-8765,9360,-7639],[1,8909,-6758,8909,-5447],[1,8909,-4116,9339,-3276],[1,9933,-2129,11141,-2129],[1,12349,-2129,12922,-3255],[1,13373,-4136,13373,-5447],[1,13373,-6778,12943,-7618],[1,12349,-8765,11141,-8765]],[[0,532,0],[2,3502,-4362],[1,2642,-4362,1802,-5181],[1,778,-6185,778,-7701],[1,778,-9319,1935,-10107],[1,3092,-10895,5283,-10895],[2,10137,-10895],[2,10137,0],[2,7270,0],[2,7270,-4362],[2,6635,-4362],[2,3952,0],[2,532,0],[0,7250,-6185],[2,7250,-9011],[2,5366,-9011],[1,4629,-9011,4148,-8653],[1,3667,-8295,3667,-7660],[1,3667,-6943,4107,-6564],[1,4547,-6185,5346,-6185],[2,7250,-6185]],[[0,6103,-16384],[2,3523,-16384],[2,3523,-18739],[2,6103,-18739],[2,6103,-16384],[0,10097,-16384],[2,7517,-16384],[2,7497,-18739],[2,10077,-18739],[2,10097,-16384],[0,12370,-12104],[2,4567,-12104],[2,4567,-9012],[2,11735,-9012],[2,11735,-6411],[2,4567,-6411],[2,4567,-2602],[2,12718,-2602],[2,12718,-1],[2,1556,-1],[2,1556,-14706],[2,12369,-14706],[2,12370,-12104]],[[0,799,-4526],[2,3748,-4526],[1,3748,-3625,4280,-3031],[1,5079,-2150,6861,-2150],[1,8172,-2150,8950,-2519],[1,9933,-2990,9933,-4055],[1,9933,-4854,9196,-5264],[1,8704,-5530,7270,-5878],[2,5693,-6247],[1,3338,-6800,2478,-7394],[1,1024,-8398,1024,-10569],[1,1024,-12269,2048,-13436],[1,3502,-15095,6676,-15095],[1,9687,-15095,11223,-13395],[1,12390,-12105,12390,-10344],[2,9441,-10344],[1,9339,-11225,8929,-11696],[1,8192,-12556,6431,-12556],[1,5387,-12556,4711,-12187],[1,3871,-11716,3871,-10794],[1,3871,-10036,4424,-9647],[1,4731,-9422,5427,-9258],[2,9031,-8377],[1,10854,-7926,11714,-7209],[1,12881,-6246,12881,-4423],[1,12881,-2191,11406,-962],[1,9788,390,7085,390],[1,3501,390,1924,-1371],[1,798,-2620,798,-4525],[2,799,-4526]],[[0,4383,-14705],[2,4383,0],[2,1311,0],[2,1311,-14705],[2,4383,-14705]],[[0,4383,-14705],[2,4383,0],[2,1311,0],[2,1311,-14705],[2,4383,-14705],[0,2150,-18739],[2,2150,-16384],[2,-430,-16384],[2,-430,-18739],[2,2150,-18739],[0,6144,-18739],[2,6144,-16384],[2,3564,-16384],[2,3564,-18739],[2,6144,-18739]],[[0,9912,-14705],[2,9912,-4260],[1,9912,-1946,8755,-789],[1,7598,368,5345,368],[1,2089,368,1065,-1537],[1,451,-2663,451,-5551],[2,3318,-5551],[1,3318,-3626,3605,-2971],[1,3974,-2111,5121,-2111],[1,6186,-2111,6575,-2766],[1,6841,-3217,6841,-4261],[2,6841,-14706],[2,9912,-14705]],[[0,3543,0],[2,307,0],[2,5550,-14705],[2,9093,-14705],[2,14274,0],[2,10936,0],[2,9973,-3031],[2,4546,-3031],[2,3543,0],[0,5386,-5571],[2,9134,-5571],[2,7291,-11387],[2,5386,-5571]],[[0,4506,-8991],[2,8397,-8991],[1,10711,-8991,12165,-7844],[1,13721,-6615,13721,-4485],[1,13721,-2396,12165,-1167],[1,10690,0,8417,0],[2,1577,0],[2,1577,-14705],[2,12616,-14705],[2,12616,-12125],[2,4506,-12125],[2,4506,-8991],[0,4526,-6451],[2,4526,-2539],[2,8417,-2539],[1,9441,-2539,10045,-3061],[1,10649,-3583,10649,-4484],[1,10649,-5406,10035,-5938],[1,9421,-6470,8397,-6470],[2,4526,-6451]],[[0,1577,-14705],[2,8725,-14705],[1,11142,-14705,12330,-13394],[1,13252,-12370,13252,-10936],[1,13252,-9564,12576,-8765],[1,12187,-8314,11429,-7925],[1,12678,-7454,13231,-6450],[1,13702,-5590,13702,-4361],[1,13702,-2538,12453,-1330],[1,11736,-634,10958,-368],[1,9873,1,7805,1],[2,1579,1],[2,1577,-14705],[0,4526,-2540],[2,8294,-2540],[1,9441,-2540,10045,-3062],[1,10649,-3584,10649,-4690],[1,10649,-5591,9994,-6031],[1,9339,-6471,8417,-6471],[2,4526,-6471],[2,4526,-2540],[0,4526,-8950],[2,8130,-8950],[1,9113,-8950,9666,-9319],[1,10301,-9749,10301,-10589],[1,10301,-11429,9707,-11798],[1,9113,-12167,8028,-12167],[2,4526,-12167],[2,4526,-8950]],[[0,4649,0],[2,1577,0],[2,1577,-14705],[2,12247,-14705],[2,12247,-12104],[2,4649,-12104],[2,4649,0]],[[0,2785,-7352],[2,2785,-14704],[2,12943,-14704],[2,12943,-2600],[2,14377,-2600],[2,14397,2745],[2,11509,2745],[2,11509,1],[2,3399,1],[2,3399,2745],[2,552,2745],[2,532,-2600],[1,1679,-2600,2191,-3583],[1,2785,-4709,2785,-7351],[2,2785,-7352],[0,9871,-2601],[2,9871,-12104],[2,5673,-12104],[2,5653,-7353],[1,5653,-5285,5377,-4271],[1,5101,-3257,4528,-2602],[2,9871,-2601]],[[0,12390,-12104],[2,4587,-12104],[2,4587,-9012],[2,11755,-9012],[2,11755,-6411],[2,4587,-6411],[2,4587,-2602],[2,12738,-2602],[2,12738,-1],[2,1576,-1],[2,1576,-14706],[2,12389,-14706],[2,12390,-12104]],[[0,8663,0],[2,8663,-4977],[2,7844,-6001],[2,4342,0],[2,410,0],[2,5714,-8479],[2,737,-14705],[2,4423,-14705],[2,8662,-8725],[2,8662,-14705],[2,11734,-14705],[2,11734,-8725],[2,15973,-14705],[2,19659,-14705],[2,14682,-8479],[2,19986,0],[2,16054,0],[2,12511,-6001],[2,11733,-4977],[2,11733,0],[2,8663,0]],[[0,9708,-7803],[1,10834,-7680,11797,-6799],[1,12944,-5755,12944,-4301],[1,12944,-2355,11674,-1106],[1,10138,389,7107,389],[1,3523,389,1946,-1372],[1,820,-2621,820,-4526],[2,3769,-4526],[1,3769,-3666,4383,-3031],[1,5243,-2150,7045,-2150],[1,8212,-2150,9041,-2744],[1,9870,-3338,9870,-4301],[1,9870,-5345,9020,-5908],[1,8170,-6471,6962,-6471],[2,4627,-6471],[2,4647,-8949],[2,6941,-8949],[1,8067,-8949,8763,-9410],[1,9459,-9871,9459,-10752],[1,9459,-11592,8722,-12073],[1,7985,-12554,6818,-12554],[1,5159,-12554,4442,-11694],[1,3971,-11121,3971,-10343],[2,1022,-10343],[1,1022,-12084,2210,-13395],[1,3746,-15095,6777,-15095],[1,9849,-15095,11344,-13539],[1,12470,-12372,12470,-10754],[1,12470,-9464,11569,-8686],[1,10852,-8072,9705,-7806],[2,9708,-7803]],[[0,4321,-4465],[2,10219,-14705],[2,13455,-14705],[2,13455,0],[2,10588,0],[2,10588,-10486],[2,4546,0],[2,1474,0],[2,1474,-14705],[2,4321,-14705],[2,4321,-4465]],[[0,4342,-4465],[2,10240,-14705],[2,13476,-14705],[2,13476,0],[2,10609,0],[2,10609,-10486],[2,4567,0],[2,1495,0],[2,1495,-14705],[2,4342,-14705],[2,4342,-4465],[0,11100,-17736],[1,11100,-16692,10424,-15893],[1,9461,-14746,7454,-14746],[1,5652,-14746,4792,-15934],[1,4198,-16753,4198,-17736],[2,5550,-17736],[1,5673,-17122,5939,-16835],[1,6451,-16303,7577,-16303],[1,8519,-16303,8949,-16508],[1,9604,-16815,9768,-17737],[2,11100,-17736]],[[0,4751,0],[2,1679,0],[2,1679,-14705],[2,4751,-14705],[2,4751,-8725],[2,10363,-14705],[2,14336,-14705],[2,8315,-8684],[2,14684,0],[2,10731,0],[2,6184,-6451],[2,4750,-4976],[2,4751,0]],[[0,5243,-12104],[2,5243,-4649],[1,5243,-2150,4065,-880],[1,2887,390,470,390],[2,470,-2293],[1,1576,-2293,2027,-2989],[1,2375,-3542,2375,-4648],[2,2375,-14704],[2,12533,-14704],[2,12533,1],[2,9461,1],[2,9461,-12103],[2,5243,-12104]],[[0,15770,0],[2,12903,0],[2,12903,-10650],[2,10118,0],[2,7107,0],[2,4424,-10650],[2,4383,0],[2,1516,0],[2,1516,-14705],[2,6001,-14705],[2,8663,-4547],[2,11325,-14705],[2,15769,-14705],[2,15770,0]],[[0,4608,-6595],[2,4628,0],[2,1556,0],[2,1556,-14705],[2,4628,-14705],[2,4628,-9134],[2,10362,-9134],[2,10362,-14705],[2,13434,-14705],[2,13434,0],[2,10342,0],[2,10342,-6595],[2,4608,-6595]]]}
	},
	"src/PinkFiePlayer.js": function(wpjsm){
		const Loader = wpjsm.importJS("src/IO.js");
		
		function getDuraction(num) {
			var txt = '';
			var _ms = Math.floor(num);
			var _mm = Math.floor(num / 60);
		
			var ms = _ms % 60;
			var mm = _mm % 60;
			var mh = Math.floor(num / 3600);
			if (_mm >= 60) {
				txt += '' + mh;
				txt += ':';
			}
			if ((mm >= 10) || (_ms < 600)) {
				txt += '' + mm;
			} else {
				txt += '0' + mm;
			}
			txt += ':';
			if (ms >= 10) {
				txt += '' + ms;
			} else {
				txt += '0' + ms;
			}
			return txt;
		}
		class Slot {
			constructor() {
				this._listeners = [];
			}
			subscribe(fn) {
				this._listeners.push(fn);
			}
			emit() {
				for (const listener of this._listeners) {
					listener(...arguments);
				}
			}
		}
		const SC = {
			"FWS": "Uncompressed",
			"CWS": "ZLib",
			"ZWS": "LZMA",
		}
		class ScreenCap {
			constructor() {
				this.canvas = document.createElement("canvas");
				this.ctx = this.canvas.getContext("2d");
			}
			scan(image, width, height) {
				this.canvas.width = width || image.width;
				this.canvas.height = height || image.height;
				this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
				return this.canvas.toDataURL();
			}
			scanWithBlob(image, callback) {
				this.canvas.width = image.width;
				this.canvas.height = image.height;
				this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
				this.canvas.toBlob(callback);
			}
		}

		class LoaderSwfUrl {
			constructor(callback, callback2) {
				this.callback = callback;
				this.callback2 = callback2;
			}
			cancel() {
				this.callback = null;
				this.callback2 = null;
			}
			fetchSwfMd5(md5, callback, callbackProgress) {
				var xhr = new XMLHttpRequest();
				xhr.onload = function () {
					callback(new Uint8Array(xhr.response.slice(0x2c)));
				};
				xhr.onprogress = function (e) {
					if (callbackProgress) callbackProgress(e.loaded / e.total);
				};
				xhr.onerror = function () {
					callback(null);
				};
				xhr.responseType = "arraybuffer";
				xhr.open("GET", "https://assets.scratch.mit.edu/internalapi/asset/" + md5 + ".wav/get/");
				xhr.send();
			}
			fetchSwfUrl(url, callback, callbackProgress) {
				var _this = this;
				var xhr = new XMLHttpRequest();
				if (Array.isArray(url)) {
					var result = [];
					var id_md5 = 0;
					function _excgfd() {
						if (result.length > 1) {
							var len = 0;
							for (var i = 0; i < result.length; i++) {
								len += result[i].length;
							}
							var res = new Uint8Array(len);
							var offest = 0;
							for (var i = 0; i < result.length; i++) {
								res.set(result[i], offest);
								offest += result[i].length;
							}
							callback(new Blob([res]), null);
						} else {
							callback(new Blob([result[0]]), null);
						}
					}
					function _next() {
						_this.fetchSwfMd5(url[id_md5], function(res) {
							if (!res) {
								callback(null, "failed md5");
								return;
							}
							id_md5++;
							result.push(res);
							if (id_md5 >= url.length) {
								_excgfd();
							} else {
								_next();
							}
						}, function(_p) {
							if (callbackProgress) callbackProgress((id_md5 / url.length) + (_p / url.length));
						});
					}
					_next();
				} else {
					xhr.onload = function () {
						if (xhr.status !== 200) {
							callback(null, xhr.status || xhr.statusText);
						} else {
							var dat = new Uint8Array(xhr.response);
							callback(new Blob([dat]), null);
						}
					};
					xhr.onprogress = function (e) {
						if (callbackProgress) callbackProgress(e.loaded / e.total);
					};
					xhr.onerror = function () {
						callback(null, "unknown");
					};
					xhr.responseType = "arraybuffer";
					xhr.open("GET", url);
					xhr.send();
				}
			}
			load(url) {
				var _this = this;
				this.fetchSwfUrl(url, function() {
					if (_this.callback) _this.callback(...arguments);
				}, function() {
					if (_this.callback2) _this.callback2(...arguments);
				});
			}
		}

		class Player {
			constructor(options = {}) {
				this.audioContext = new AudioContext();
				this.onload = new Slot();
				this.onstartload = new Slot();
				this.oncleanup = new Slot();
				this.onerror = new Slot();
				this.onprogress = new Slot();
				this.onresume = new Slot();
				this.onpause = new Slot();
				this.onoptionschange = new Slot();
				this.MAGIC = {
					LARGE_Z_INDEX: '9999999999',
				};
				this.scanned = new ScreenCap();
				this.stage = null;
				this.currentLoader = null;
				this.currentLoaderSwfUrl = null;
				this.fullscreenEnabled = false;
				this.clickToPlayContainer = null;
				this.width = 0;
				this.height = 0;
				this._width = 0;
				this._height = 0;
				this.root = document.createElement('div');
				this.root.className = 'pinkfie-player-root';
				this.playerContainer = document.createElement('div');
				this.playerContainer.className = 'pinkfie-player-stage';
				this.root.appendChild(this.playerContainer);
				this.options = {};
				this._viewFrame = false;
				this._displayMessage = [0, "", 0, 1500];
				this.mousePoint = [0, 0];
				this.tickTime = 0;
				this.isLoad = false;
				this.loaded = 0;
				this.loadedTick = 0;

				this.swfData = null;

				this.debugSample = false;
		
				this.addMenuVerticals();
				this.addStatsControls();
				this.addloadingC();
				this.addSettingVerticals();
		
				this.setOptions(Object.assign(Object.assign({}, options), Player.DEFAULT_OPTIONS));
				window.addEventListener('resize', () => this.updateFullscreen());
				document.addEventListener('fullscreenchange', () => this.onfullscreenchange());
				document.addEventListener('mozfullscreenchange', () => this.onfullscreenchange());
				document.addEventListener('webkitfullscreenchange', () => this.onfullscreenchange());
				document.addEventListener('contextmenu', (e) => {
					if (this.stage) {
						if ((e.target === this.stage.canvas) || (e.target === this.clickToPlayContainer)) {
							e.preventDefault();
							this.sendList(e);
						}
					}
				});
				document.addEventListener('click', (e) => {
					this.MenuVertical.style.display = 'none';
				});
				this.handleError = this.handleError.bind(this);
				this.resize(640, 400);
				this.startTime = Date.now();
				setInterval(this.tick.bind(this), 10);
			}
			addMenuVerticals() {
				this.MenuVertical = document.createElement('div');
				this.MenuVertical.className = 'watcher-pinkfie-menu-vertical';
				this.movie_playPause = this._createE('Pause', (e) => {
					e.preventDefault();
					this.toggleRunning();
					this.MenuVertical.style.display = 'none';
				});
				this.MenuVertical.appendChild(this.movie_playPause);

				var controlsMC = [];

				this.movie_playStop = this._createE('Stop', (e) => {
					e.preventDefault();
					this.c_playStop();
					this.MenuVertical.style.display = 'none';
				});

				this.movie_loopButton = this._createE('Loop: OFF', (e) => {
					e.preventDefault();
					this.c_loop();
					this.MenuVertical.style.display = 'none';
				});
				controlsMC.push(this.movie_playStop);
				controlsMC.push(this.movie_loopButton);
				controlsMC.push(this._createE('Rewind', (e) => {
					e.preventDefault();
					this.c_rewind();
					this.MenuVertical.style.display = 'none';
				}));
				controlsMC.push(this._createE('Step Forward', (e) => {
					e.preventDefault();
					this.c_Forward();
					this.MenuVertical.style.display = 'none';
				}));
				controlsMC.push(this._createE('Step Back', (e) => {
					e.preventDefault();
					this.c_Back();
					this.MenuVertical.style.display = 'none';
				}));

				for (var i = 0; i < controlsMC.length; i++) {
					this.MenuVertical.appendChild(controlsMC[i]);	
				}

				this._controlsMC = controlsMC;

				this.MenuVertical.appendChild(this._createE('View Stats', (e) => {
					e.preventDefault();
					this.viewStats();
					this.MenuVertical.style.display = 'none';
				}));

				this.fullscreenButton = this._createE('Enter fullscreen', (e) => {
					e.preventDefault();
					this.setOptions({
						fullscreenMode: e.shiftKey ? 'window' : 'full'
					});
					if (this.fullscreenEnabled) {
						this.fullscreenButton.textContent = "Enter fullscreen";
						this.exitFullscreen();
					} else {
						this.fullscreenButton.textContent = "Exit fullscreen";
						this.enterFullscreen();
					}
					this.MenuVertical.style.display = 'none';
				});

				this.MenuVertical.appendChild(this.fullscreenButton);

				this.MenuVertical.appendChild(this._createE('Save Screenshot', (e) => {
					e.preventDefault();
					this.saveScreenshot();
					this.MenuVertical.style.display = 'none';
				}));

				this.swfDataElement = this._createE('Download SWF', (e) => {
					e.preventDefault();
					this.downloadSwf();
					this.MenuVertical.style.display = 'none';
				});

				this.MenuVertical.appendChild(this.swfDataElement);
				var rr = this._createE('Settings', (e) => {
					e.preventDefault();
					this.showSetting();
					this.MenuVertical.style.display = 'none';
				});
				this.MenuVertical.appendChild(rr);
				this.MenuVertical.style.display = 'none';
				this.playerContainer.appendChild(this.MenuVertical);
			}
			addSettingVerticals() {
				this.settingVertical = document.createElement('div');
				this.settingVertical.className = 'watcher-pinkfie-setting';
				this.settingVertical.style = '';
				this.settingVertical.style.display = 'none';
				this.settingVertical.style.overflow = 'auto';
				this.settingVertical.style.position = 'absolute';
				this.settingVertical.style.top = '0';
				this.settingVertical.style.left = '50%';
				this.settingVertical.style.padding = '6px';
				this.settingVertical.style.transform = 'translate(-50%, 0)';
				this.settingVertical.style.background = 'rgba(0, 0, 0, 0.6)';
				this.settingVertical.style.width = '320px';
				this.settingVertical.style.height = 'auto';
				this.settingVertical.innerHTML = '<h3 style="margin:0;">Settings</h3>';

				var rrj2 = document.createElement('a');
				rrj2.onclick = () => {
					this.settingVertical.style.display = 'none';
				};
				rrj2.style = '';
				rrj2.style.position = 'fixed';
				rrj2.style.display = 'block';
				rrj2.style.top = '0px';
				rrj2.style.right = '0px';
				rrj2.style["background-position"] = '50% 80%';
				rrj2.innerHTML = "[x]";
				var rrj3 = document.createElement('label');
				rrj3.innerHTML = "volume:";
				var rrj4 = document.createElement('input');
				rrj4.type = "range";
				rrj4.style.width = "80px";
				rrj4.value = 100;
				rrj4.max = 100;
				rrj4.min = 0;
				rrj4.addEventListener('input', () => {
					this.setVolume(rrj4.value);
				});
				this._rrj4 = rrj4;
		
				var rrj3o = document.createElement('label');
				rrj3o.innerHTML = "speed:";
				var rrj4o = document.createElement('select');
				rrj4o.innerHTML = '<option value="0.25">0.25x<option value="0.33">0.33x<option value="0.5">0.5x<option value="0.67">0.67x<option value="0.75">0.75x<option value="0.85">0.85x<option value="0.9">0.9x<option value="1">1x<option value="1.15">1.15x<option value="1.25">1.25x<option value="1.5">1.5x<option value="1.75">1.75x<option value="2">2x<option value="2.5">2.5x<option value="3">3x<option value="4">4x<option value="8">8x<option value="16">16x<option value="32">32x<option value="64">64x';
				rrj4o.value = 1;
				rrj4o.addEventListener('input', () => {
					this.setOptions({ speed: +rrj4o.value });
				});
				this._rrj4o = rrj4o;
		
				var rrj5 = document.createElement('label');
				rrj5.innerHTML = "Render Mode: ";
		
				var rrj6 = document.createElement('select');
				rrj6.innerHTML = '<option value="render">render<option value="render with bounds">render with display bounds<option value="bounds without render">display bounds without render';
				rrj6.addEventListener("change", () => {
					if (rrj6.value) {
						this.setOptions({
							rendermode: rrj6.value
						});
					}
				});
		
				this._rrj6 = rrj6;

				var kjhjhkh = document.createElement('label');
				kjhjhkh.innerHTML = "Render Scale Mode: ";

				var _kjhjhkh = document.createElement('select');
				_kjhjhkh.innerHTML = '<option value="0">screen scale<option value="1">normal<option value="2">full scale';
				_kjhjhkh.addEventListener("change", () => {
					if (_kjhjhkh.value) {
						this.setOptions({
							renderscalemode: +_kjhjhkh.value
						});
					}
				});

				this._kjhjhkh = _kjhjhkh;
		
				var rrj7 = document.createElement('label');
				rrj7.innerHTML = "Quality: ";
		
				var rrj8 = document.createElement('select');
				rrj8.innerHTML = '<option value="high">high<option value="medium">medium<option value="low">low';
				rrj8.addEventListener("change", () => {
					if (rrj8.value) {
						this.setOptions({
							quality: rrj8.value
						});
					}
				});
		
				this.__rrj8 = rrj8;

				var rrjhg7 = document.createElement('label');
				rrjhg7.innerHTML = "VCAM: ";

				var rrj9 = document.createElement('input');
				rrj9.type = 'text';
				rrj9.style.width = "80px";

				rrj9.placeholder = "(sprite id)";

				rrj9.addEventListener("change", () => {
					if (rrj9.value) {
						this.setOptions({
							vCamId: rrj9.value
						});
					}
				});
		
				this.__rrj9 = rrj9;

				var fdgdf = document.createElement("a");

				fdgdf.innerHTML = "Download SWF";
				
				fdgdf.style.margin = "4px";

				fdgdf.onclick = () => {
					this.downloadSwf();
				}

				this.__fdgdf = fdgdf;
		
				var di3 = document.createElement('a');
				di3.innerHTML = "View Stats";
				di3.style.margin = "4px";
				di3.onclick = this.viewStats.bind(this);

				// Seek Frame

				var _fdfj = document.createElement('div');

				var fdfj = document.createElement('input');
				fdfj.type = 'range';
				fdfj.value = 1;
				fdfj.min = 1;
				fdfj.max = 2;
				fdfj.addEventListener("input", () => {
					if (fdfj.value && this.stage) {
						var clip = this.stage.clip;
						if (clip) clip.gotoFrame(+fdfj.value, !clip.isPlaying);
					}
				});
				this.__fdfj = fdfj;
				var a = document.createElement("label");
				a.innerHTML = 'Seek Frame';
				var a2 = document.createElement("label");
				a2.innerHTML = '1/1';
				this.__a2 = a2;

				
				_fdfj.appendChild(a);
				_fdfj.appendChild(fdfj);
				_fdfj.appendChild(a2);

				this.__agdfdf = _fdfj;
		
				this.settingVertical.appendChild(rrj2);
				this.settingVertical.appendChild(rrj3);
				this.settingVertical.appendChild(rrj4);
				this.settingVertical.appendChild(rrj3o);
				this.settingVertical.appendChild(rrj4o);
				this.settingVertical.appendChild(document.createElement('br'));
				this.settingVertical.appendChild(rrj7);
				this.settingVertical.appendChild(rrj8);
				this.settingVertical.appendChild(rrjhg7);
				this.settingVertical.appendChild(rrj9);

				this.settingVertical.appendChild(document.createElement('br'));

				this.settingVertical.appendChild(rrj5);
				this.settingVertical.appendChild(rrj6);

				this.settingVertical.appendChild(document.createElement('br'));

				this.settingVertical.appendChild(kjhjhkh);
				this.settingVertical.appendChild(_kjhjhkh);

				this.settingVertical.appendChild(document.createElement('br'));

				this.settingVertical.appendChild(_fdfj);

				this.settingVertical.appendChild(di3);

				var fdgdf2 = document.createElement("a");

				fdgdf2.innerHTML = "Stop Sounds";

				fdgdf2.style.margin = "4px";

				fdgdf2.onclick = () => {
					if (this.stage) {
						this.stage.audio.stopAllSounds();
					}
				}

				this.settingVertical.appendChild(fdgdf2);
				this.settingVertical.appendChild(fdgdf);

				var rfg = document.createElement('label');
				rfg.textContent = "(c) 2025 Anim Tred Studio";
				rfg.style.opacity = "0.75";

				this.settingVertical.appendChild(document.createElement('br'));
				this.settingVertical.appendChild(rfg);
		
				this.playerContainer.appendChild(this.settingVertical);
			}
			addStatsControls() {
				this.statsE = document.createElement("div");
				this.statsE.style.color = "#fff";
				this.statsE.style.position = "absolute";
				this.statsE.style.top = "0px";
				this.statsE.style.left = "0px";
				this.statsE.style.fontSize = "15px";
				this.statsE.style.display = "none";
		
				var r = document.createElement("div");
				r.textContent = "Time";
				r.style.background = "rgba(0,0,0,0.75)";
				r.style.backdropFilter = "blur(2px)";
				r.style.padding = "3px 5px";
				r.style.margin = "3px";
				r.style.height = "auto";
				r.style.display = "none";
				r.style.fontSize = "12px";
		
				var playpause = document.createElement("div");
				playpause.textContent = "Pause";
				playpause.style.background = "rgba(0,0,0,0.75)";
				playpause.style.backdropFilter = "blur(2px)";
				playpause.style.padding = "3px 5px";
				playpause.style.margin = "3px";
				playpause.style.width = "auto";
				playpause.style.height = "auto";
				playpause.style.display = "none";
				playpause.style.fontSize = "12px";
		
				this.statsE_R = r;
				this.statsE_PP = playpause;
		
				this.statsE.appendChild(playpause);
				this.statsE.appendChild(r);
		
				this.playerContainer.appendChild(this.statsE);
			}
			addloadingC() {
				var loadingContainer = document.createElement("div");
				loadingContainer.className = "pinkfie-player-loading";
				loadingContainer.innerHTML = '';
		
				var a1 = document.createElement("div");
				a1.className = 'pinkfie-player-loading-image';
				var a2 = document.createElement("div");
				a2.className = 'pinkfie-player-loading-anim';
				var a3 = document.createElement("div");
				a3.className = 'pinkfie-player-loading-progress';
				var a4 = document.createElement("div");
				a4.style.width = "0%";
				a3.appendChild(a4);
		
				loadingContainer.appendChild(a1);
				loadingContainer.appendChild(a2);
				loadingContainer.appendChild(a3);

				var rfg = document.createElement('p');
				rfg.textContent = "(c) 2025 Anim Tred Studio";
				rfg.style.color = "#000";
				rfg.style.margin = "4px";
				rfg.style.position = "absolute";
				rfg.style.bottom = "0";
				rfg.style.left = "50%";
				rfg.style.transform = "translate(-50%,0)";

				loadingContainer.appendChild(rfg);
		
				loadingContainer.style.display = "none";
				this.loadingContainerProgress = a4;
				this.loadingContainerProgressText = a2;
				this.loadingContainer = loadingContainer;
				this.playerContainer.appendChild(this.loadingContainer);
			}
			_createE(name, fun) {
				var MVG1 = document.createElement('div');
				MVG1.textContent = name;
				MVG1.onclick = fun.bind(this);
				return MVG1;
			}
			sendList(event) {
				var rect = this.playerContainer.getBoundingClientRect();
				this.MenuVertical.style = '';
				this.MenuVertical.style.position = 'absolute';
				this.MenuVertical.style.top = (event.clientY - rect.top) + 'px';
				this.MenuVertical.style.left = (event.clientX - rect.left) + 'px';
				this.MenuVertical.style.height = 'auto';
				if (this.swfData) {
					this.swfDataElement.style.display = '';
				} else {
					this.swfDataElement.style.display = 'none';
				}
				if (this.hasStage() && this.stage.playing) {
					this.movie_playPause.innerHTML = "Pause";
				} else {
					this.movie_playPause.innerHTML = "Resume";
				}
			}
			getSwfName() {
				var swf = this.stage.swf;
				return "pinkfie_" + swf.header.compression + "_" + swf.header.version + "_" + swf.header.uncompressedLength + "_fps" + swf.movieInfo.frameRate + "_frames" + swf.movieInfo.numFrames;
			}
			hasStage() {
				return !!this.stage;
			}
			getOptions() {
				return this.options;
			}
			takeScreenshotBlob(calllback) {
				if (!this.hasStage()) return;
				var _movieCanvas = this.stage.canvas;
				if (!this.isLoad) return;
				var j = this.getSwfName();
				this.stage.render();
				this.scanned.scanWithBlob(_movieCanvas, calllback);
			}
			saveScreenshot() {
				if (!this.hasStage()) return;
				var _movieCanvas = this.stage.canvas;
				if (!this.isLoad) return;
				var j = this.getSwfName();
				this.stage.render();
				var h = this.scanned.scan(_movieCanvas);
				var a = document.createElement("a");
				a.href = h;
				a.download = j + ".png";
				a.click();
			}
			downloadSwf() {
				if (!this.hasStage()) return;
				if (!this.swfData) return;
				var j = this.getSwfName();
				var h = URL.createObjectURL(this.swfData);
				var a = document.createElement("a");
				a.href = h;
				a.download = j + ".swf";
				a.click();
			}
			isPlayMovie() {
				if (!this.hasStage()) return false;
				if (this.stage.clip) {
					return this.stage.clip.isPlaying;
				}
				return false;
			}
			isLoopMovie() {
				if (!this.hasStage()) return false;
				return this.stage.clipGetLoop();
			}
			c_playStop() {
				if (!this.hasStage()) return;
				this.stage.togglePlayRootMovie();
			}
			c_loop() {
				if (!this.hasStage()) return;
				this.stage.clipSetLoop(!this.stage.clipGetLoop());
			}
			c_rewind() {
				if (!this.hasStage()) return;
				this.stage.rewindRootMovie();
			}
			c_Forward() {
				if (!this.hasStage()) return;
				this.stage.forwardRootMovie();
			}
			c_Back() {
				if (!this.hasStage()) return;
				this.stage.backRootMovie();
			}
			setOptions(changedOptions) {
				this.options = Object.assign(Object.assign({}, this.options), changedOptions);
				if (this.hasStage()) {
					this.applyOptionsToStage();
				}
				this._rrj4.value = this.options.volume;
				this._rrj4o.value = this.options.speed;
				if (this.__rrj8) {
					this.__rrj8.value = this.options.quality;
				}
				if (this.__rrj9) {
					this.__rrj9.value = this.options.vCamId;
				}
				this.onoptionschange.emit(changedOptions);
			}
			viewStats() {
				if (this._viewFrame) {
					this._viewFrame = false;
				} else {
					this._viewFrame = true;
				}
			}
			showSetting() {
				this.settingVertical.style.display = '';
			}
			enableAttribute(name) {
				this.root.setAttribute(name, '');
			}
			disableAttribute(name) {
				this.root.removeAttribute(name);
			}
			setAttribute(name, enabled) {
				if (enabled) {
					this.enableAttribute(name);
				} else {
					this.disableAttribute(name);
				}
			}
			updateFullscreen() {
				if (!this.fullscreenEnabled) {
					this.applyResizeStage();
					return;
				}
				this._resize(window.innerWidth, window.innerHeight);
				this.root.style.paddingLeft = '0px';
				this.root.style.paddingTop = '0px';
			}
			onfullscreenchange() {
				if (typeof document.fullscreen === 'boolean' && document.fullscreen !== this.fullscreenEnabled) {
					this.exitFullscreen();
				} else if (typeof document.webkitIsFullScreen === 'boolean' && document.webkitIsFullScreen !== this.fullscreenEnabled) {
					this.exitFullscreen();
				}
			}
			enterFullscreen() {
				if (this.options.fullscreenMode === 'full') {
					if (this.root.requestFullScreenWithKeys) {
						this.root.requestFullScreenWithKeys();
					} else if (this.root.webkitRequestFullScreen) {
						this.root.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					} else if (this.root.requestFullscreen) {
						this.root.requestFullscreen();
					}
				}
				document.body.classList.add('pinkfie-body-fullscreen');
				this.root.style.zIndex = this.MAGIC.LARGE_Z_INDEX;
				this.enableAttribute('fullscreen');
				this.fullscreenEnabled = true;
				this.updateFullscreen();
			}
			exitFullscreen() {
				this.disableAttribute('fullscreen');
				this.fullscreenEnabled = false;
				if (document.fullscreenElement === this.root || document.webkitFullscreenElement === this.root) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					}
				}
				this.root.style.zIndex = '';
				document.body.classList.remove('pinkfie-body-fullscreen');
				this._resize(this.width, this.height);
			}
			playMovie() {
				if (this.stage) {
					this.stage.clipPlay();
				}
			}
			stopMovie() {
				if (this.stage) {
					this.stage.clipStop();
				}
			}
			handleError(error) {
				console.log(error);
				this.onerror.emit(error);
			}
			beginLoadingSWF() {
				this.cleanup();
				this.loadingContainer.style.display = "";
				this.onstartload.emit();
				this.loaded = 1;
			}
			loadLoader(loader) {
				var _this = this;
				_this.currentLoaderSwfUrl = null;
				_this.currentLoader = loader;
				loader.audioContext = this.audioContext;
				loader.onprogress = function (fs) {
					var r = fs[1];
					_this.loadedTick = r;
					_this.onprogress.emit(r);
					_this.loadingContainerProgressText.textContent = loader.progressText;
					_this.loadingContainerProgress.style.width = (r * 100) + "%";
				};
				loader.onload = function (stage) {
					_this.currentLoader = null;
					_this.loadingContainerProgress.style.width = "0%";
					_this.setStage(stage);
				};
				loader.onerror = function (e) {
					_this.handleError(e);
				};
				loader.load();
			}
			loadSwfFromFile(file) {
				this.beginLoadingSWF();
				this.loadingContainerProgressText.textContent = "Loading SWF Data";
				var loader = new Loader(file);
				this.loadLoader(loader);
			}
			loadSwfFromURL(url) {
				this.beginLoadingSWF();
				this.loadingContainerProgressText.textContent = "Loading SWF URL";
				var _this = this;
				var loaderC = new LoaderSwfUrl(function (file, status) {
					_this.swfData = file;
					_this.__fdgdf.style.display = "";
					if (file) {
						var loader = new Loader(file);
						_this.loadLoader(loader);
					} else {
						_this.loadingContainerProgressText.textContent = "Failed to load SWF: " + status;
					}
				}, function(r) {
					_this.loadingContainerProgress.style.width = (r * 100) + "%";
				});
				this.currentLoaderSwfUrl = loaderC;
				loaderC.load(url);
			}
			getInfoStage() {
				var stage = this.stage;
				return {
					width: stage.width,
					height: stage.height
				};
			}
			setStage(stage) {
				this.stage = stage;
				this.loaded = 2;
				stage.debugSample = this.debugSample;
				this.applyOptionsToStage();
				this.applyResizeStage();
				this.isLoad = true;
				this.statsE.style.display = "";
				var totalframes = stage.getTotalFrames();
				if (totalframes > 1) {
					this.__fdfj.min = 1;
					this.__fdfj.max = totalframes;
					this.__fdfj.value = 1;
					this.__agdfdf.style.display = '';
				} else {
					this.__fdfj.min = 1;
					this.__fdfj.max = 2;
					this.__fdfj.value = 1;
					this.__agdfdf.style.display = 'none';
				}
				this.__a2.textContent = 1 + "/" + totalframes;
				for (var i = 0; i < this._controlsMC.length; i++) {
					this._controlsMC[i].style.display = (totalframes > 1) ? "" : "none";
				}
				this.playerContainer.insertBefore(stage.root, this.playerContainer.childNodes[0]);
				this.loadingContainer.style.display = "none";
				this.applyAutoplayPolicy(this.options.autoplayPolicy);
				this.onload.emit(stage);
			}
			applyAutoplayPolicy(policy) {
				switch (policy) {
					case 'always': {
						this.triggerStartMovie();
						break;
					}
					case 'if-audio-playable': {
						if (this.audioContext) {
							if (this.audioContext.state === 'running') {
								this.triggerStartMovie();
							} else {
								this.showClickToPlayContainer();
							}	
						} else {
							this.triggerStartMovie();
						}
						break;
					}
					case 'never': {
						this.showClickToPlayContainer();
						break;
					}
				}
			}
			triggerStartMovie() {
				this.stage.resume();
				this.loadingContainer.style.display = "none";
				if (this.clickToPlayContainer) {
					this.removeClickToPlayContainer();
				}
			}
			showClickToPlayContainer() {
				if (!this.clickToPlayContainer) {
					this.clickToPlayContainer = document.createElement('div');
					this.clickToPlayContainer.className = 'pinkfie-player-click-to-play-container';
					this.clickToPlayContainer.onclick = () => {
						this.removeClickToPlayContainer();
						this.triggerStartMovie();
					};
					const content = document.createElement('div');
					content.className = 'pinkfie-player-click-to-play-icon';
					this.clickToPlayContainer.appendChild(content);
					this.stage.root.appendChild(this.clickToPlayContainer);
				}
			}
			removeClickToPlayContainer() {
				if (this.clickToPlayContainer) {
					this.stage.root.removeChild(this.clickToPlayContainer);
					this.clickToPlayContainer = null;
				}
			}
			applyResizeStage() {
				if (this.stage) {
					this.stage.resize(this._width, this._height);
					var rc = this.stage.getRectStage();
					var XG = rc[0];
					var YG = rc[1];
					this.statsE.style.top = YG + "px";
					this.statsE.style.left = XG + "px";
				}
			}
			resize(w, h) {
				this.width = w;
				this.height = h;
				if (!this.fullscreenEnabled) {
					this._resize(w, h);
				}
			}
			_resize(w, h) {
				this._width = w;
				this._height = h;
				this.playerContainer.style.width = w + "px";
				this.playerContainer.style.height = h + "px";
				this.applyResizeStage();
				this.render();
			}
			applyOptionsToStage() {
				if (this.stage) {
					this.stage.audio.setVolume(this.options.volume);
					this.stage.setSpeed(this.options.speed);
					this.stage.vCamId = this.options.vCamId;
					this.stage.vCamShow = this.options.vCamShow;
					this.stage.allowAvm = this.options.allowAvm;
					this.stage.wth = this.options.wth;
					this.stage.interpolation = this.options.interpolation;
					this.stage.unloop = this.options.unloop;
					this.stage.useLastBound = this.stage.wth ? true : this.options.interpolation;
					var renderDirty = false;
					if (this.stage.quality != this.options.quality) {
						this.stage.setQuality(this.options.quality);
						renderDirty = true;
					}
					if (this.stage.renderType != this.options.rendermode) {
						this.stage.renderType = this.options.rendermode;
						renderDirty = true;
					}
					if (this.stage.renderScaleType != this.options.renderscalemode) {
						this.stage.renderScaleType = this.options.renderscalemode;
						renderDirty = true;
					}
					if (renderDirty) {
						this.applyResizeStage();
					}
				}
			}
			tick() {
				this.tickTime = (Date.now() - this.startTime);
				if (this.isLoad) {
					var clip = this.stage.clip;
					if (clip) {
						this.__a2.textContent = clip.currentFrame + "/" + clip.totalframes;
						if (clip.totalframes > 1) {
							this.__fdfj.min = 1;
							this.__fdfj.max = clip.totalframes;
							this.__fdfj.value = clip.currentFrame;
							this.__fdfj.disabled = false;
						} else {
							this.__fdfj.disabled = true;
						}
					} else {
						this.__fdfj.disabled = true;
					}
				} else {
					this.__fdfj.disabled = true;
				}
				if (this.isLoad) {
					this.stage.timer.update(Date.now());
					this.stage.tick();
					if (this.isPlayMovie()) this.movie_playStop.innerHTML = "Stop";
					else this.movie_playStop.innerHTML = "Play";
					if (this.isLoopMovie()) this.movie_loopButton.innerHTML = "Loop: ON";
					else this.movie_loopButton.innerHTML = "Loop: OFF";
					if (this._displayMessage[0] == 1) {
						if ((!this.stage.playing)) {
							this._displayMessage[2] = this.tickTime;
						}
						if (this.stage.playing) {
							this._displayMessage[1] = "Play";
						} else {
							this._displayMessage[1] = "Pause";
						}
					}
				}
				this.render();
			}
			setVolume(val) {
				this.setOptions({ volume: val });
			}
			resume() {
				if (this.hasStage()) {
					if (this.clickToPlayContainer) {
						this.removeClickToPlayContainer();
					}
					this.stage.resume();
				}
			}
			pause() {
				if (this.hasStage()) {
					if (this.clickToPlayContainer) {
						this.removeClickToPlayContainer();
					}
					this.stage.pause();
				}
			}
			toggleRunning() {
				if (this.hasStage()) {
					this._displayMessage[0] = 1;
					if (this.stage.playing) {
						this.pause();
					} else {
						this.resume();
					}
				}
			}
			render() {
				if (this.loaded == 1) {
				} else {
					if (this.isLoad) {
						var rrgg = ((this.tickTime - this._displayMessage[2]) < this._displayMessage[3]);
						if (this._viewFrame && this.stage && this.stage.clip) {
							var _r = getDuraction((this.stage.clip.currentFrame / this.stage.clip.totalframes) * (this.stage.clip.totalframes / this.stage.frameRate)) + "/" + getDuraction(this.stage.clip.totalframes / this.stage.frameRate);
							var _u = this.stage.clip.currentFrame + "/" + this.stage.clip.totalframes;
							var hkj = "Time: " + _r;
							hkj += "<br>Frame: " + _u;
							hkj += "<br>Mouse Point: " + this.stage.mousePosition;
							hkj += "<br>Playing Audio: " + this.stage.getPlayingAudioCount();
							var resultPlayingCompressSound = this.stage.audio.getPlayingCompressSound().join(" ");
							if (resultPlayingCompressSound) hkj += "<br>" + resultPlayingCompressSound;
							var _gh = this.stage.getDebugVideoText();
							if (_gh) {
								hkj += "<br>Time Videos Codec:<br>" + _gh;
							}
							this.statsE_R.style.display = "";
							this.statsE_R.innerHTML = hkj;
						} else {
							this.statsE_R.style.display = "none";
						}
						if ((this._displayMessage[0] && rrgg)) {
							var GSGGG = this._displayMessage[1];
							this.statsE_PP.textContent = GSGGG;
							this.statsE_PP.style.display = "inline-block";
						} else {
							if (this._displayMessage[0] !== 1) {
								if (this._displayMessage[0]) {
									if (this.clickToPlayContainer) {
										this._displayMessage[0] = 0;
									} else {
										this._displayMessage[0] = 1;
									}
								}
							}
							this.statsE_PP.style.display = "none";
						}
					}
				}
			}
			cleanup() {
				this.swfData = null;
				this.__fdfj.min = 1;
				this.__fdfj.max = 2;
				this.__fdfj.value = 1;
				this.__fdgdf.style.display = "none";
				this.loadingContainer.style.display = "none";
				this.loadingContainerProgressText.textContent = "";
				this.loadingContainerProgress.style.width = "0%";
				this.statsE.style.display = "none";
				this.loaded = 0;
				this._displayMessage[0] = 0;
				this.isLoad = false;
				this.settingVertical.style.display = 'none';
				this.__agdfdf.style.display = 'none';
				for (var i = 0; i < this._controlsMC.length; i++) {
					this._controlsMC[i].style.display = "none";
				}
				if (this.currentLoader) {
					this.currentLoader.cancel();
					this.currentLoader = null;
				}
				if (this.currentLoaderSwfUrl) {
					this.currentLoaderSwfUrl.cancel();
					this.currentLoaderSwfUrl = null;
				}
				if (this.clickToPlayContainer) {
					this.removeClickToPlayContainer();
				}
				if (this.stage) {
					this.stage.destroy();
					this.playerContainer.removeChild(this.stage.root);
					this.stage = null;
				}
				this.oncleanup.emit();
			}
		}
		Player.DEFAULT_OPTIONS = {
			autoplayPolicy: 'always',
			volume: 100,
			fullscreenMode: 'full',
			speed: 1,
			quality: "high",
			rendermode: "render",
			vCamId: 0,
			vCamShow: false,
			allowAvm: false,
			wth: false,
			unloop: false,
			interpolation: false,
			renderscalemode: 0
		}
		wpjsm.exportJS = Player;
	},
	"src/SwfTag.js": function(wpjsm){
		const ByteStream = wpjsm.importJS("src/utils/ByteStream.js");
		const ZLib = wpjsm.importJS("src/utils/ZLib.js");
		const LZMA = wpjsm.importJS("src/utils/LZMA.js");
		//! The data structures used in an Adobe SWF file.
		//!
		//! These structures are documented in the Adobe SWF File Format Specification
		
		
		const SwfParser = function(data) {
			this.byteStream = new ByteStream(data);
			this.clear();
			this.tick = this.tick.bind(this);
		}
		SwfParser.tagCodes = {0: "End", 1: "ShowFrame", 2: "DefineShape", 4: "PlaceObject", 5: "RemoveObject", 6: "DefineBits", 7: "DefineButton", 8: "JpegTables", 9: "SetBackgroundColor", 10: "DefineFont", 11: "DefineText", 12: "DoAction", 13: "DefineFontInfo", 14: "DefineSound", 15: "StartSound", 17: "DefineButtonSound", 18: "SoundStreamHead", 19: "SoundStreamBlock", 20: "DefineBitsLossless", 21: "DefineBitsJpeg2", 22: "DefineShape2", 23: "DefineButtonCxform", 24: "Protect", 26: "PlaceObject2", 28: "RemoveObject2", 32: "DefineShape3", 33: "DefineText2", 34: "DefineButton2", 35: "DefineBitsJpeg3", 36: "DefineBitsLossless2", 37: "DefineEditText", 39: "DefineSprite", 40: "NameCharacter", 41: "ProductInfo", 43: "FrameLabel", 45: "SoundStreamHead2", 46: "DefineMorphShape", 48: "DefineFont2", 56: "ExportAssets", 57: "ImportAssets", 58: "EnableDebugger", 59: "DoInitAction", 60: "DefineVideoStream", 61: "VideoFrame", 62: "DefineFontInfo2", 63: "DebugId", 64: "EnableDebugger2", 65: "ScriptLimits", 66: "SetTabIndex", 69: "FileAttributes", 70: "PlaceObject3", 71: "ImportAssets2", 73: "DefineFontAlignZones", 74: "CsmTextSettings", 75: "DefineFont3", 76: "SymbolClass", 77: "Metadata", 78: "DefineScalingGrid", 82: "DoAbc", 83: "DefineShape4", 84: "DefineMorphShape2", 86: "DefineSceneAndFrameLabelData", 87: "DefineBinaryData", 88: "DefineFontName", 89: "StartSound2", 90: "DefineBitsJpeg4", 91: "DefineFont4", 93: "EnableTelemetry", 94: "PlaceObject4"};
		SwfParser.prototype.clear = function() {
			this.isLoad = false;
			this.result = null;
			this.header = null;
			this.headerMovie = null;
			this._interval = null;
			this._swfVersion = 0;
			this._stopped = false;
			this._loadedType = 0;
			this._compression = null;
			this._uncompressedLength = 0;
			this._compressStream = null;
			this.tagstack = [];
			this.tagstackSize = 0;
			this.taglengthstack = [];
			this.taglengthstackSize = 0;
			this.aborted = false;
		
			// 0 RUNNING
			// 1 PROMISE
			this.status = 0;
		
			this.onload = null;
			this.onerror = null;
			this.onprogress = null;
			this.onmessage = null;
			this.onstartmovie = null;
		
			this._bytesLoaded = 0;
			this._bytesTotal = this.byteStream.getLength();
		}
		SwfParser.prototype.cancel = function() {
			if (this._interval) {
				clearInterval(this._interval);
				this._interval = null;
			}
			this.onload = null;
			this.onerror = null;
			this.onprogress = null;
			this.onmessage = null;
			this.onstartmovie = null;
			this.aborted = true;
		}
		SwfParser.prototype.load = function() {
			this._interval = setInterval(this.tick, 5);
		}
		SwfParser.prototype.getTagStack = function() {
			return this.tagstack[this.tagstackSize - 1];
		}
		SwfParser.prototype.getTagLengthStack = function() {
			return this.taglengthstack[this.taglengthstackSize - 1];
		}
		SwfParser.prototype.emitMessage = function(message, type) {
			if (this.onmessage) {
				this.onmessage(message, type);
			}
		}
		SwfParser.prototype.getProgress = function() {
			return {
				bytesLoaded: this._bytesLoaded,
				bytesTotal: this._bytesTotal
			}
		}
		SwfParser.prototype.tick = function() {
			if (this.isLoad) {
				return;
			}
			if (this._stopped) {
				return;
			}
			this._stopped = true;
			try {
				if (this.status == 0) {
					this.tickParse();
				}
			} catch(e) {
				if (this._interval) {
					clearInterval(this._interval);
					this._interval = null;
				}
				if (this.onerror) {
					this.onerror(e);
				}
			}
			if (this.isLoad) {
				if (!this.aborted) {
					if (this.onload) {
						this.onload();
					}	
				}
			}
			this._stopped = false;
		}
		SwfParser.prototype.tickParse = function() {
			if (this._loadedType == 4) {
				if (this._interval) {
					clearInterval(this._interval);
					this._interval = null;
				}
				this.result = {
					header: this.header,
					movieInfo: this.headerMovie
				};
				this.isLoad = true;
			} else {
				if (this._loadedType == 3) {
					this._bytesLoaded = this.byteStream.position;
					this._bytesTotal = this._uncompressedLength;
					if (this.onprogress) {
						this.onprogress([1, this.byteStream.position / this._uncompressedLength]);
					}
					var stopped = false;
					var startTime = Date.now();
					while (true) {
						var stack = this.getTagStack();
						while (true) {
							var tag = this.parseTag();
							if (tag) {
								if ((tag.tagcode == 0) || !(this.byteStream.position < this.getTagLengthStack())) {
									var c = stack._onend();
									if (this.tagstackSize == 1) {
										this._loadedType++;
										stopped = true;
									} else {
										this.byteStream.position = this.getTagLengthStack();
										this.byteStream.bit_offset = 0;
										this.tagstackSize--;
										this.taglengthstackSize--;
									}
									if (typeof c == "function") {
										this.status = 1;
										stopped = true;
										c(() => {
											this.status = 0;
										});
									}
									break;
								}
								var b = stack._ontag(tag);
								if (typeof b == "function") {
									this.status = 1;
									b(() => {
										this.status = 0;
									});
									stopped = true;
									break;
								}
								if (tag.tagcode == 39) break;
							}
							if ((Date.now() - startTime) > 50) {
								stopped = true;
								break;
							}
						}
						if (stopped || (this.status == 1)) break;
					}
				} else {
					if (this._loadedType == 2) {
						// Some SWF streams may not be compressed correctly,
						// (e.g. incorrect data length in the stream), so decompressing
						// may throw an error even though the data otherwise comes
						// through the stream.
						// We'll still try to parse what we get if the full decompression fails.
						// (+ 8 for header size)
						if (this.byteStream.getLength() !== this._uncompressedLength) {
							this.emitMessage("SWF length doesn't match header, may be corrupt " + this.byteStream.data.length + " == " + this._uncompressedLength, "warm");
						}
						var headerMovie = this.parseHeaderMovie();
						this.headerMovie = headerMovie;
						this.rectangle = headerMovie.bounds;
						this.frameRate = headerMovie.frameRate;
						this.numframes = headerMovie.frameCount;
						this.taglengthstack[this.taglengthstackSize++] = this._uncompressedLength;
						var t = this.parseTags();
						if (this.onstartmovie) {
							this.onstartmovie(this.header, headerMovie, t);
						}
						this._bytesLoaded = this.byteStream.position;
						this._bytesTotal = this._uncompressedLength;
						this.onprogress([1, 0]);
						this._loadedType++;
					} else {
						if (this._loadedType == 1) {
							// Now the SWF switches to a compressed stream.
							if (this._compressStream) {
								this._compressStream.tick();
								this._bytesLoaded = this._compressStream.getProgress()[0];
								this._bytesTotal = this._compressStream.getProgress()[1];
								this.onprogress([0, this._compressStream.loaded]);
								if (this._compressStream.isLoad) {
									this.byteStream = new ByteStream(this._compressStream.result);
									this.byteStream.setOffset(8, 0);
									this._compressStream = null;
									this._loadedType++;
								}
							} else {
								var _fileLength = this._uncompressedLength;
								var compressStream = this.decompressStream(this._compression, this._uncompressedLength);
								if (compressStream) {
									if (compressStream instanceof Uint8Array) {
										var FixedData = new Uint8Array(_fileLength);
										for (let i = 0; i < _fileLength; i++) {
											FixedData[i] = compressStream[i];
										}
										this.byteStream = new ByteStream(FixedData.buffer);
										this.byteStream.setOffset(8, 0);
										this._loadedType++;
									} else {
										this._compressStream = compressStream;
									}
								} else {
									this._loadedType++;
								}
							}
							if (this._loadedType == 2) {
								this.onprogress([1, 0]);
							}
						} else {
							var header = this.parseHeader();
							this.header = header;
							this._compression = header.compression;
							this._swfVersion = header.version;
							this._uncompressedLength = header.uncompressedLength;
							this.onprogress([0, 0]);
							this._loadedType++;
						}
					}
				}
			}
		}
		SwfParser.prototype.parseHeader = function() {
			// Read SWF header.
			var compression = this.byteStream.readString(3);
			var version = this.byteStream.readUint8();
		
			// Check whether the SWF version is 0.
			// Note that the behavior should actually vary, depending on the player version:
			// - Flash Player 9 and later bail out (the behavior we implement).
			// - Flash Player 8 loops through all the frames, without running any AS code.
			// - Flash Player 7 and older don't fail and use the player version instead: a
			// function like `getSWFVersion()` in AVM1 will then return the player version.
			if (version == 0) {
				throw new Error("Invalid SWF version");
			}
			var uncompressedLength = this.byteStream.readUint32();
			return {compression, version, uncompressedLength}
		}
		SwfParser.prototype.decompressStream = function(compression, size) {
			// Now the SWF switches to a compressed stream.
			switch (compression) {
				case "FWS":
					return null;
				case "CWS":
					return new ZLib(this.byteStream.arrayBuffer, size, 8);
				case "ZWS":
					return LZMA.parse(new Uint8Array(this.byteStream.arrayBuffer), size);
				default:
					throw new Error("Invalid SWF");
			}
		}
		SwfParser.prototype.parseHeaderMovie = function() {
			var bounds = this.rect();
			var frameRate = this.byteStream.readFixed8();
			var numFrames = this.byteStream.readUint16();
			return {bounds, frameRate, numFrames}
		}
		SwfParser.prototype.parseTags = function() {
			var t = [];
			t._ontag = function() {};
			t._onend = function() {};
			this.tagstack[this.tagstackSize++] = t;
			return this.getTagStack();
		}
		SwfParser.prototype.parseTag = function() {
			var {tagcode, length} = this.parseTagCodeLength();
			var tagDataStartOffset = this.byteStream.position;
			var result = this.parseTagWithCode(tagcode, length);
			result.tagcode = tagcode;
			result.tagType = SwfParser.tagCodes[tagcode] || "Unknown";
			result._byteLength = length;
			if (result.tagcode !== 39) { // Sprite
				if ((tagDataStartOffset + length) !== this.byteStream.position) {
					this.emitMessage(this.byteStream.position - tagDataStartOffset + ", " + length + ", " + SwfParser.tagCodes[tagcode], "log");
					this.byteStream.position = (tagDataStartOffset + length);
					this.byteStream.bit_offset = 0;
				}
			}
			return result;
		}
		SwfParser.prototype.parseTagCodeLength = function() {
			var tagCodeAndLength = this.byteStream.readUint16();
			var tagcode = tagCodeAndLength >> 6;
			var length = (tagCodeAndLength & 0b111111);
			if (length == 0b111111) {
				// Extended tag.
				length = this.byteStream.readUint32();
			}
			return {tagcode, length}
		}
		SwfParser.prototype.parseTagWithCode = function(tagType, length) {
			var byteStream = this.byteStream;
			var obj = {};
			switch (tagType) {
				case 0: // End
				case 1: // ShowFrame
					break;
				case 2:  // DefineShape
					obj = this.parseDefineShape(1);
					break;
				case 22: // DefineShape2
					obj = this.parseDefineShape(2);
					break;
				case 32: // DefineShape3
					obj = this.parseDefineShape(3);
					break;
				case 83: // DefineShape4
					obj = this.parseDefineShape(4);
					break;
				case 6: // DefineBits
					obj = this.parseDefineBits(1, length);
					break;
				case 21: // DefineBitsJPEG2
					obj = this.parseDefineBits(2, length);
					break;
				case 35: // DefineBitsJPEG3
					obj = this.parseDefineBits(3, length);
					break;
				case 90: // DefineBitsJPEG4
					obj = this.parseDefineBits(4, length);
					break;
				case 7: // DefineButton
					obj = this.parseDefineButton(1, length);
					break;
				case 34: // DefineButton2
					obj = this.parseDefineButton(2, length);
					break;
				case 10: // DefineFont
					obj = this.parseDefineFont1(length);
					break;
				case 48: // DefineFont2
					obj = this.parseDefineFont2(2, length);
					break;
				case 75: // DefineFont3
					obj = this.parseDefineFont2(3, length);
					break;
				case 91: // DefineFont4
					obj = this.parseDefineFont4(length);
					break;
				case 11: // DefineText
					obj = this.parseDefineText(1);
					break;
				case 33: // DefineText2
					obj = this.parseDefineText(2);
					break;
				case 13: // DefineFontInfo
					obj = this.parseDefineFontInfo(1, length);
					break;
				case 62: // DefineFontInfo2
					obj = this.parseDefineFontInfo(2, length);
					break;
				case 14: // DefineSound
					obj = this.parseDefineSound(length);
					break;
				case 17: // DefineButtonSound
					obj = this.parseDefineButtonSound();
					break;
				case 20: // DefineBitsLossless
					obj = this.parseDefineBitsLossLess(1, length);
					break;
				case 36: // DefineBitsLossless2
					obj = this.parseDefineBitsLossLess(2, length);
					break;
				case 23: // DefineButtonCxform
					obj = this.parseDefineButtonCxform(length);
					break;
				case 37: // DefineEditText
					obj = this.parseDefineEditText();
					break;
				case 39: // DefineSprite
					obj = this.parseDefineSprite(length);
					break;
				case 46: // DefineMorphShape
					obj = this.parseDefineMorphShape(1);
					break;
				case 84: // DefineMorphShape2
					obj = this.parseDefineMorphShape(2);
					break;
				case 60: // DefineVideoStream
					obj = this.parseDefineVideoStream();
					break;
				case 73: // DefineFontAlignZones
					obj = this.parseDefineFontAlignZones(length);
					break;
				case 78: // DefineScalingGrid
					obj = this.parseDefineScalingGrid();
					break;
				case 86: // DefineSceneAndFrameLabelData
					obj = this.parseDefineSceneAndFrameLabelData();
					break;
				case 87: // DefineBinaryData
					obj = this.parseDefineBinaryData(length);
					break;
				case 88: // DefineFontName
					obj = this.parseDefineFontName();
					break;
				case 4: // PlaceObject
					obj = this.parsePlaceObject(1, length);
					break;
				case 26: // PlaceObject2
					obj = this.parsePlaceObject(2, length);
					break;
				case 70: // PlaceObject3
					obj = this.parsePlaceObject(3, length);
					break;
				case 94: // PlaceObject4
					obj = this.parsePlaceObject(4, length);
					break;
				case 5: // RemoveObject1
					obj = this.parseRemoveObject(1);
					break;
				case 28: // RemoveObject2
					obj = this.parseRemoveObject(2);
					break;
				case 8: // JpegTables
					obj.jpegtable = byteStream.readBytes(length);
					break;
				case 9: // SetBackgroundColor
					obj.rgb = this.rgb();
					break;
				case 12: // DoAction
					obj = this.parseDoAction(length);
					break;
				case 15: // StartSound
					obj = this.parseStartSound(1);
					break;
				case 89: // StartSound2
					obj = this.parseStartSound(2);
					break;
				case 18: // SoundStreamHead
					obj = this.parseSoundStreamHead(1);
					break;
				case 45: // SoundStreamHead2
					obj = this.parseSoundStreamHead(2);
					break;
				case 19: // SoundStreamBlock
					obj = this.parseSoundStreamBlock(length);
					break;
				case 24: // Protect
					if (length > 0) {
						byteStream.readUint16(); // Reserved
						obj.data = byteStream.readBytes(length - 2);
					}
					break;
				case 40: // NameCharacter
					obj = this.parseNameCharacter();
					break;
				case 41: // ProductInfo
					obj = this.parseProductInfo();
					break;
				case 43: // FrameLabel
					obj = this.parseFrameLabel(length);
					break;
				case 56: // ExportAssets
					obj = this.parseExportAssets();
					break;
				case 57: // ImportAssets
					obj = this.parseImportAssets(1);
					break;
				case 71: // ImportAssets2
					obj = this.parseImportAssets(2);
					break;
				case 58: // EnableDebugger
					obj.debugger = byteStream.readStringWithUntil();
					break;
				case 64: // EnableDebugger2
					byteStream.readUint16(); // Reserved
					obj.debugger = byteStream.readStringWithUntil();
					break;
				case 59: // DoInitAction
					obj = this.parseDoInitAction(length);
					break;
				case 61: // VideoFrame
					obj = this.parseVideoFrame(length);
					break;
				case 63: // DebugID
					obj = this.parseDebugID(length);
					break;
				case 65: // ScriptLimits
					obj.maxRecursionDepth = byteStream.readUint16();
					obj.timeoutSeconds = byteStream.readUint16();
					break;
				case 66: // SetTabIndex
					obj.depth = byteStream.readUint16();
					obj.tabIndex = byteStream.readUint16();
					break;
				case 69: // FileAttributes
					obj = this.parseFileAttributes();
					break;
				case 72: // DoAbc
					obj = this.parseDoABC(1, length);
					break;
				case 82: // DoAbc2
					obj = this.parseDoABC(2, length);
					break;
				case 74: // CsmTextSettings
					obj = this.parseCSMTextSettings();
					break;
				case 76: // SymbolClass
					obj = this.parseSymbolClass();
					break;
				case 77: // Metadata
					obj.metadata = byteStream.readStringWithUntil();
					break;
				case 93: // EnableTelemetry
					byteStream.readUint16(); // Reserved
					if (length > 2) {
						obj.passwordHash = byteStream.readBytes(32);
					}
					break;
				case 38: // DefineVideo
				case 42: // DefineTextFormat
				case 44: // DefineBehavior
				case 50: // DefineCommandObject
				case 53: // DefineFunction
				case 3:  // FreeCharacter
				case 16: // StopSound
				case 25: // PathsArePostScript
				case 29: // SyncFrame
				case 31: // FreeAll
				case 47: // FrameTag
				case 49: // GeProSet
				case 51: // CharacterSet
				case 52: // FontRef
				case 54: // PlaceFunction
				case 55: // GenTagObject
					console.log("[base] tagType -> " + tagType);
					this.byteStream.position += length;
					break;
				case 27: // 27 (invalid)
				case 30: // 30 (invalid)
				case 67: // 67 (invalid)
				case 68: // 68 (invalid)
				case 79: // 79 (invalid)
				case 80: // 80 (invalid)
				case 81: // 81 (invalid)
				case 85: // 85 (invalid)
				case 92: // 92 (invalid)
					this.byteStream.position += length;
					break;
				default: // null
					this.byteStream.position += length;
					break;
			}
			return obj;
		}
		
		//////// color rect matrix ////////
		SwfParser.prototype.rect = function() {
			var byteStream = this.byteStream;
			byteStream.byteAlign();
			var nBits = byteStream.getUIBits(5);
			var obj = {};
			obj.xMin = byteStream.getSIBits(nBits);
			obj.xMax = byteStream.getSIBits(nBits);
			obj.yMin = byteStream.getSIBits(nBits);
			obj.yMax = byteStream.getSIBits(nBits);
			return obj;
		}
		SwfParser.prototype.rgb = function() {
			var byteStream = this.byteStream;
			return [byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8(), 1];
		}
		SwfParser.prototype.rgba = function() {
			var byteStream = this.byteStream;
			return [byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8(), byteStream.readUint8() / 255];
		}
		SwfParser.prototype.colorTransform = function(hasAlpha) {
			var byteStream = this.byteStream;
			byteStream.byteAlign();
			var result = [1, 1, 1, 1, 0, 0, 0, 0];
			var first6bits = byteStream.getUIBits(6);
			var hasAddTerms = first6bits >> 5;
			var hasMultiTerms = (first6bits >> 4) & 1;
			var nbits = first6bits & 0x0f;
			if (hasMultiTerms) {
				result[0] = byteStream.getSIBitsFixed8(nbits);
				result[1] = byteStream.getSIBitsFixed8(nbits);
				result[2] = byteStream.getSIBitsFixed8(nbits);
				if (hasAlpha) {
					result[3] = byteStream.getSIBitsFixed8(nbits);
				}
			}
			if (hasAddTerms) {
				result[4] = byteStream.getSIBits(nbits);
				result[5] = byteStream.getSIBits(nbits);
				result[6] = byteStream.getSIBits(nbits);
				if (hasAlpha) {
					result[7] = byteStream.getSIBits(nbits);
				}
			}
			return result;
		}
		SwfParser.prototype.matrix = function() {
			var byteStream = this.byteStream;
			byteStream.byteAlign();
			var result = [1, 0, 0, 1, 0, 0];
			// Scale
			if (byteStream.getUIBit()) {
				var nScaleBits = byteStream.getUIBits(5);
				result[0] = byteStream.getSIBitsFixed16(nScaleBits);
				result[3] = byteStream.getSIBitsFixed16(nScaleBits);
			}
			// Rotate/Skew
			if (byteStream.getUIBit()) {
				var nRotateBits = byteStream.getUIBits(5);
				result[1] = byteStream.getSIBitsFixed16(nRotateBits);
				result[2] = byteStream.getSIBitsFixed16(nRotateBits);
			}
			// Translate (always present)
			var nTranslateBits = byteStream.getUIBits(5);
			result[4] = byteStream.getSIBits(nTranslateBits);
			result[5] = byteStream.getSIBits(nTranslateBits);
			return result;
		}
		//////// Structure ////////
		
		//////// Shapes ////////
		SwfParser.prototype.gradientSpread = function(code) {
			switch (code) {
				case 0: // Pad
				// Per SWF19 p. 136, SpreadMode 3 is reserved.
				// Flash treats it as pad mode.
				case 3:
					return "pad";
				case 1: // Reflect
					return "reflect";
				case 2: // Repeat
					return "repeat";
				default:
					this.emitMessage("Invalid gradient spread mode:" + code, "error");
			}
		}
		SwfParser.prototype.gradientInterpolation = function(code) {
			switch (code) {
				case 0: // Rgb
				// Per SWF19 p. 136, InterpolationMode 2 and 3 are reserved.
				// Flash treats them as normal RGB mode interpolation.
				case 2:
				case 3:
					return "rgb";
				case 1: // LinearRgb
					return "linearRgb";
				default:
					this.emitMessage("Invalid gradient interpolation mode:" + code, "error");
			}
		}
		SwfParser.prototype.shapeWithStyle = function(shapeVersion) {
			var byteStream = this.byteStream;
			var fillStyles = this.fillStyleArray(shapeVersion);
			var lineStyles = this.lineStyleArray(shapeVersion);
			var numBits = byteStream.readUint8();
			var numFillBits = numBits >> 4;
			var numLineBits = numBits & 0b1111;
			var shapeRecords = this.shapeRecords(shapeVersion, {
				fillBits: numFillBits,
				lineBits: numLineBits
			});
			return {fillStyles, lineStyles, shapeRecords, numFillBits, numLineBits};
		}
		SwfParser.prototype.fillStyleArray = function(shapeVersion) {
			var byteStream = this.byteStream;
			var count = byteStream.readUint8();
			if ((shapeVersion >= 2) && (count == 0xff)) {
				count = byteStream.readUint16();
			}
			var fillStyles = [];
			while (count--) {
				fillStyles.push(this.fillStyle(shapeVersion));
			}
			return fillStyles;
		}
		SwfParser.prototype.gradient = function(shapeVersion) {
			var byteStream = this.byteStream;
			var matrix = this.matrix();
			var flags = byteStream.readUint8();
			var spreadMode = this.gradientSpread((flags >> 6) & 0b11);
			var interpolationMode = this.gradientInterpolation((flags >> 4) & 0b11);
			var numGradients = (flags & 0b1111);
			var gradientRecords = [];
			for (var i = numGradients; i--;) {
				var ratio = byteStream.readUint8() / 255;
				var color = ((shapeVersion >= 3) ? this.rgba() : this.rgb());
				gradientRecords.push({ratio, color});
			}
			return {
				spreadMode,
				interpolationMode,
				gradientRecords,
				matrix: matrix
			};
		}
		SwfParser.prototype.fillStyle = function(shapeVersion) {
			var byteStream = this.byteStream;
			var obj = {};
			var bitType = byteStream.readUint8();
			obj.type = bitType;
			switch (bitType) {
				case 0x00:
					if (shapeVersion >= 3) {
						obj.color = this.rgba();
					} else {
						obj.color = this.rgb();
					}
					break;
				case 0x10:
					obj.linearGradient = this.gradient(shapeVersion);
					break;
				case 0x12:
					obj.radialGradient = this.gradient(shapeVersion);
					break;
				case 0x13:
					// SWF19 says focal gradients are only allowed in SWFv8+ and DefineShape4,
					// but it works even in earlier tags (#2730).
					obj.gradient = this.gradient(shapeVersion);
					obj.focalPoint = byteStream.readFixed8();
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					obj.bitmapId = byteStream.readUint16();
					obj.bitmapMatrix = this.matrix();
					// Bitmap smoothing only occurs in SWF version 8+.
					obj.isSmoothed = ((this._swfVersion >= 8) && ((bitType & 0b10) == 0));
					obj.isRepeating = (bitType & 0b01) == 0;
					break;
				default:
					this.emitMessage("Invalid fill style: " + bitType, "error");
					break;
			}
			return obj;
		}
		SwfParser.prototype.lineStyleArray = function(shapeVersion) {
			var byteStream = this.byteStream;
			var count = byteStream.readUint8();
			if ((shapeVersion >= 2) && (count === 0xff)) {
				count = byteStream.readUint16();
			}
			var lineStyles = [];
			while (count--) {
				lineStyles.push(this.lineStyles(shapeVersion));
			}
			return lineStyles;
		}
		SwfParser.prototype.lineStyles = function(shapeVersion) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.width = byteStream.readUint16();
			if (shapeVersion == 4) {
				// LineStyle2 in DefineShape4
				obj.startCapStyle = byteStream.getUIBits(2);
				obj.joinStyle = byteStream.getUIBits(2);
				obj.hasFill = byteStream.getUIBit();
				obj.noHScale = byteStream.getUIBit();
				obj.noVScale = byteStream.getUIBit();
				obj.pixelHinting = byteStream.getUIBit();
				byteStream.getUIBits(5); // Reserved
				obj.noClose = byteStream.getUIBit();
				obj.endCapStyle = byteStream.getUIBits(2);
				if (obj.joinStyle === 2) {
					obj.miterLimitFactor = byteStream.readFixed8();
				}
				if (obj.hasFill) {
					obj.fillType = this.fillStyle(shapeVersion);
				} else {
					obj.color = this.rgba();
				}
			} else {
				// LineStyle1
				if (shapeVersion >= 3) {
					obj.color = this.rgba();
				} else {
					obj.color = this.rgb();
				}
			}
			return obj;
		}
		SwfParser.prototype.shapeRecords = function(shapeVersion, currentNumBits) {
			var byteStream = this.byteStream;
			var shapeRecords = [];
			while (true) {
				var first6Bits = byteStream.getUIBits(6);
				var shape = null;
				if (first6Bits & 0x20) {
					var numBits = first6Bits & 0b1111;
					if (first6Bits & 0x10) {
						shape = this.straightEdgeRecord(numBits);
					} else {
						shape = this.curvedEdgeRecord(numBits);
					}
				} else {
					if (first6Bits) {
						shape = this.styleChangeRecord(shapeVersion, first6Bits, currentNumBits);
					}
				}
				if (!shape) {
					byteStream.byteAlign();
					break;
				} else {
					shapeRecords.push(shape);
				}
			}
			return shapeRecords;
		}
		SwfParser.prototype.straightEdgeRecord = function(numBits) {
			var byteStream = this.byteStream;
			var deltaX = 0;
			var deltaY = 0;
			var GeneralLineFlag = byteStream.getUIBit();
			if (GeneralLineFlag) {
				deltaX = byteStream.getSIBits(numBits + 2);
				deltaY = byteStream.getSIBits(numBits + 2);
			} else {
				var VertLineFlag = byteStream.getUIBit();
				if (VertLineFlag) {
					deltaX = 0;
					deltaY = byteStream.getSIBits(numBits + 2);
				} else {
					deltaX = byteStream.getSIBits(numBits + 2);
					deltaY = 0;
				}
			}
			return {
				deltaX,
				deltaY,
				isCurved: false,
				isChange: false
			};
		}
		SwfParser.prototype.curvedEdgeRecord = function(numBits) {
			var byteStream = this.byteStream;
			var controlDeltaX = byteStream.getSIBits(numBits + 2);
			var controlDeltaY = byteStream.getSIBits(numBits + 2);
			var anchorDeltaX = byteStream.getSIBits(numBits + 2);
			var anchorDeltaY = byteStream.getSIBits(numBits + 2);
			return {
				controlDeltaX,
				controlDeltaY,
				anchorDeltaX,
				anchorDeltaY,
				isCurved: true,
				isChange: false
			};
		}
		SwfParser.prototype.styleChangeRecord = function(shapeVersion, changeFlag, currentNumBits) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.stateMoveTo = changeFlag & 1;
			obj.stateFillStyle0 = (changeFlag >> 1) & 1;
			obj.stateFillStyle1 = (changeFlag >> 2) & 1;
			obj.stateLineStyle = (changeFlag >> 3) & 1;
			obj.stateNewStyles = (changeFlag >> 4) & 1;
			if (obj.stateMoveTo) {
				var moveBits = byteStream.getUIBits(5);
				obj.moveX = byteStream.getSIBits(moveBits);
				obj.moveY = byteStream.getSIBits(moveBits);
			}
			obj.fillStyle0 = 0;
			if (obj.stateFillStyle0) {
				obj.fillStyle0 = byteStream.getUIBits(currentNumBits.fillBits);
			}
			obj.fillStyle1 = 0;
			if (obj.stateFillStyle1) {
				obj.fillStyle1 = byteStream.getUIBits(currentNumBits.fillBits);
			}
			obj.lineStyle = 0;
			if (obj.stateLineStyle) {
				obj.lineStyle = byteStream.getUIBits(currentNumBits.lineBits);
			}
			if (obj.stateNewStyles) {
				obj.fillStyles = this.fillStyleArray(shapeVersion);
				obj.lineStyles = this.lineStyleArray(shapeVersion);
				var numBits = byteStream.readUint8();
				currentNumBits.fillBits = obj.numFillBits = numBits >> 4;
				currentNumBits.lineBits = obj.numLineBits = numBits & 0b1111;
			}
			obj.isChange = true;
			return obj;
		}
		SwfParser.prototype.morphFillStyleArray = function(shapeVersion) {
			var byteStream = this.byteStream;
			var fillStyleCount = byteStream.readUint8();
			if ((shapeVersion >= 2) && (fillStyleCount == 0xff)) {
				fillStyleCount = byteStream.readUint16();
			}
			var fillStyles = [];
			for (var i = fillStyleCount; i--;) {
				fillStyles.push(this.morphFillStyle());
			}
			return fillStyles;
		}
		SwfParser.prototype.morphFillStyle = function() {
			var byteStream = this.byteStream;
			var obj = {};
			var bitType = byteStream.readUint8();
			obj.type = bitType;
			switch (bitType) {
				case 0x00:
					obj.startColor = this.rgba();
					obj.endColor = this.rgba();
					break;
				case 0x10:
					obj.linearGradient = this.morphGradient();
					break;
				case 0x12:
					obj.radialGradient = this.morphGradient();
					break;
				case 0x13:
					// SWF19 says focal gradients are only allowed in SWFv8+ and DefineMorphShape2,
					// but it works even in earlier tags (#2730).
					// TODO(Herschel): How is focal_point stored?
					obj.gradient = this.morphGradient();
					obj.startFocalPoint = byteStream.readFixed8();
					obj.endFocalPoint = byteStream.readFixed8();
					break;
				case 0x40:
				case 0x41:
				case 0x42:
				case 0x43:
					obj.bitmapId = byteStream.readUint16();
					obj.bitmapStartMatrix = this.matrix();
					obj.bitmapEndMatrix = this.matrix();
					obj.isSmoothed = (bitType & 0b10) == 0;
					obj.isRepeating = (bitType & 0b01) == 0;
					break;
				default:
					this.emitMessage("Invalid fill style: " + bitType, "error");
			}
			return obj;
		}
		SwfParser.prototype.morphGradient = function() {
			var obj = {};
			var byteStream = this.byteStream;
			obj.startMatrix = this.matrix();
			obj.endMatrix = this.matrix();
			var flags = byteStream.readUint8();
			obj.spreadMode = this.gradientSpread((flags >> 6) & 0b11);
			obj.interpolationMode = this.gradientInterpolation((flags >> 4) & 0b11);
			var numGradients = (flags & 0b1111);
			var gradientRecords = [];
			for (var i = numGradients; i--;) {
				gradientRecords.push({
					startRatio: byteStream.readUint8() / 255,
					startColor: this.rgba(),
					endRatio: byteStream.readUint8() / 255,
					endColor: this.rgba()
				});
			}
			obj.gradientRecords = gradientRecords;
			return obj;
		}
		SwfParser.prototype.morphLineStyleArray = function(shapeVersion) {
			var byteStream = this.byteStream;
			var lineStyleCount = byteStream.readUint8();
			if ((shapeVersion >= 2) && (lineStyleCount == 0xff)) {
				lineStyleCount = byteStream.readUint16();
			}
			var lineStyles = [];
			for (var i = lineStyleCount; i--;) {
				lineStyles[lineStyles.length] = this.morphLineStyle(shapeVersion);
			}
			return lineStyles;
		}
		SwfParser.prototype.morphLineStyle = function(shapeVersion) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.startWidth = byteStream.readUint16();
			obj.endWidth = byteStream.readUint16();
			if (shapeVersion < 2) {
				obj.startColor = this.rgba();
				obj.endColor = this.rgba();
			} else {
				// MorphLineStyle2 in DefineMorphShape2
				obj.startCapStyle = byteStream.getUIBits(2);
				obj.joinStyle = byteStream.getUIBits(2);
				obj.hasFill = byteStream.getUIBit();
				obj.noHScale = byteStream.getUIBit();
				obj.noVScale = byteStream.getUIBit();
				obj.pixelHinting = byteStream.getUIBit();
				byteStream.getUIBits(5); // Reserved
				obj.noClose = byteStream.getUIBit();
				obj.endCapStyle = byteStream.getUIBits(2);
				if (obj.joinStyle === 2) {
					obj.miterLimitFactor = byteStream.readFixed8();
				}
				if (obj.hasFill) {
					obj.fillType = this.morphFillStyle();
				} else {
					obj.startColor = this.rgba();
					obj.endColor = this.rgba();
				}
			}
			return obj;
		}
		SwfParser.prototype.morphShapeWithStyle = function(shapeVersion, t) {
			var byteStream = this.byteStream;
			var numBits = byteStream.readUint8();
			var NumFillBits = numBits >> 4;
			var NumLineBits = numBits & 0b1111;
			// NumFillBits and NumLineBits are written as 0 for the end shape.
			if (t) {
				NumFillBits = 0;
				NumLineBits = 0;
			}
			var ShapeRecords = this.shapeRecords(shapeVersion, {
				fillBits: NumFillBits,
				lineBits: NumLineBits
			});
			return ShapeRecords;
		}
		
		//////// Font Text ////////
		SwfParser.prototype.parseLanguage = function() {
			var languageCode = this.byteStream.readUint8();
			switch (languageCode) {
				case 0: // Unknown
					return "";
				case 1: // Latin
					return "latin";
				case 2: // Japanese
					return "japanese";
				case 3: // Korean
					return "korean";
				case 4: // SimplifiedChinese
					return "simplifiedChinese";
				case 5: // TraditionalChinese
					return "traditionalChinese";
				default:
					this.emitMessage("Invalid language code:" + languageCode, "error");
			}
		}
		SwfParser.prototype.getTextRecords = function(ver, GlyphBits, AdvanceBits) {
			var byteStream = this.byteStream;
			var array = [];
			while (true) {
				var flags = byteStream.readUint8();
				if (flags == 0) {
					// End of text records.
					break;
				}
				var obj = {};
				if (flags & 0b1000) {
					obj.fontId = byteStream.readUint16();
				}
				if (flags & 0b100) {
					if (ver === 1) {
						obj.textColor = this.rgb();
					} else {
						obj.textColor = this.rgba();
					}
				}
				if (flags & 0b1) {
					obj.XOffset = byteStream.readInt16();
				}
				if (flags & 0b10) {
					obj.YOffset = byteStream.readInt16();
				}
				if (flags & 0b1000) {
					obj.textHeight = byteStream.readUint16();
				}
				obj.glyphEntries = this.getGlyphEntries(GlyphBits, AdvanceBits);
				array.push(obj);
			}
			return array;
		}
		SwfParser.prototype.textAlign = function(type) {
			switch (type) {
				case 0:
					return "left";
				case 1:
					return "right";
				case 2:
					return "center";
				case 3:
					return "justify";
				default:
					this.emitMessage("Invalid language code:" + type, "error");
			}
		}
		SwfParser.prototype.getGlyphEntries = function(GlyphBits, AdvanceBits) {
			// TODO(Herschel): font_id and height are tied together. Merge them into a struct?
			var byteStream = this.byteStream;
			var count = byteStream.readUint8();
			var array = [];
			while (count--) {
				array.push({
					index: byteStream.getUIBits(GlyphBits),
					advance: byteStream.getSIBits(AdvanceBits)
				});
			}
			return array;
		}
		
		SwfParser.prototype.buttonRecords = function(ver) {
			var records = [];
			var byteStream = this.byteStream;
			while (true) {
				var flags = byteStream.readUint8();
				if (flags == 0) break;
				var obj = {};
				obj.buttonStateUp = flags & 1;
				obj.buttonStateOver = (flags >>> 1) & 1;
				obj.buttonStateDown = (flags >>> 2) & 1;
				obj.buttonStateHitTest = (flags >>> 3) & 1;
				obj.characterId = byteStream.readUint16();
				obj.depth = byteStream.readUint16();
				obj.matrix = this.matrix();
				if (ver == 2) {
					obj.colorTransform = this.colorTransform(true);
				}
				if (flags & 16) {
					obj.filters = this.getFilterList();
				}
				if (flags & 32) {
					obj.blendMode = this.parseBlendMode();
				}
				records.push(obj);
			}
			return records;
		}
		SwfParser.prototype.buttonActions = function(endOffset) {
			var byteStream = this.byteStream;
			var results = [];
			while (true) {
				var obj = {};
				var condActionSize = byteStream.readUint16();
				var flags = byteStream.readUint16();
				obj.condIdleToOverUp = flags & 1;
				obj.condOverUpToIdle = (flags >>> 1) & 1;
				obj.condOverUpToOverDown = (flags >>> 2) & 1;
				obj.condOverDownToOverUp = (flags >>> 3) & 1;
				obj.condOverDownToOutDown = (flags >>> 4) & 1;
				obj.condOutDownToOverDown = (flags >>> 5) & 1;
				obj.condOutDownToIdle = (flags >>> 6) & 1;
				obj.condIdleToOverDown = (flags >>> 7) & 1;
				obj.condOverDownToIdle = (flags >>> 8) & 1;
				obj.condKeyPress = (flags >> 9);
				byteStream.byteAlign();
				if (condActionSize >= 4) {
					obj.actionScript = this.parseAction(byteStream.readBytes(condActionSize - 4));
				} else if (condActionSize == 0) {
					// Last action, read to end.
					obj.actionScript = this.parseAction(byteStream.readBytes(endOffset - byteStream.position));
				} else {
					// Some SWFs have phantom action records with an invalid length.
					// See 401799_pre_Scene_1.swf
					// TODO: How does Flash handle this?
				}
				results.push(obj);
				if (condActionSize == 0) {
					break;
				}
				if (byteStream.position > endOffset) {
					break;
				}
			}
			return results;
		}
		SwfParser.prototype.parseSoundFormat = function() {
			var byteStream = this.byteStream;
			var obj = {};
			var frags = byteStream.readUint8();
			var compression;
			switch (frags >> 4) {
				case 0: // UncompressedUnknownEndian
					compression = "uncompressedUnknownEndian";
					break;
				case 1: // ADPCM
					compression = "ADPCM";
					break;
				case 2: // MP3
					compression = "MP3";
					break;
				case 3: // Uncompressed
					compression = "uncompressed";
					break;
				case 4: // Nellymoser16Khz
					compression = "nellymoser16Khz";
					break;
				case 5: // Nellymoser8Khz
					compression = "nellymoser8Khz";
					break;
				case 6: // Nellymoser
					compression = "nellymoser";
					break;
				case 11: // Speex
					compression = "speex";
					break;
				default:
					this.emitMessage("Invalid audio format", "error");
			}
			obj.compression = compression;
			var sampleRate;
			switch ((frags & 0b1100) >> 2) {
				case 0:
					sampleRate = 5512;
					break;
				case 1:
					sampleRate = 11025;
					break;
				case 2:
					sampleRate = 22050;
					break;
				case 3:
					sampleRate = 44100;
					break;
				default:
					console.log("unreachable");
			}
			obj.sampleRate = sampleRate;
			obj.is16Bit = frags & 0b10;
			obj.isStereo = frags & 0b1;
			return obj;
		}
		SwfParser.prototype.parseBlendMode = function() {
			var blendMode = this.byteStream.readUint8();
			switch (blendMode) {
				case 0:
				case 1:
					return "normal";
				case 2:
					return "layer";
				case 3:
					return "multiply";
				case 4:
					return "screen";
				case 5:
					return "lighten";
				case 6:
					return "darken";
				case 7:
					return "difference";
				case 8:
					return "add";
				case 9:
					return "subtract";
				case 10:
					return "invert";
				case 11:
					return "alpha";
				case 12:
					return "erase";
				case 13:
					return "overlay";
				case 14:
					return "hardlight";
				default:
					this.emitMessage("Invalid blend mode: " + blendMode, "error");
			}
		}
		SwfParser.prototype.parseClipActions = function(startOffset, length) {
			var byteStream = this.byteStream;
			byteStream.readUint16();
			var allEventFlags = this.parseClipEventFlags();
			var endLength = startOffset + length;
			var actionRecords = [];
			while (byteStream.position < endLength) {
				var clipActionRecord = this.parseClipActionRecord(endLength);
				actionRecords[actionRecords.length] = clipActionRecord;
				if (endLength <= byteStream.position) {
					break;
				}
				var endFlag = (this._swfVersion <= 5) ? byteStream.readUint16() : byteStream.readUint32();
				if (!endFlag) {
					break;
				}
				if (this._swfVersion <= 5) {
					byteStream.position -= 2;
				} else {
					byteStream.position -= 4;
				}
				if (clipActionRecord.keyCode) {
					byteStream.position -= 1;
				}
			}
			return {allEventFlags, actionRecords};
		}
		SwfParser.prototype.parseClipActionRecord = function(endLength) {
			var byteStream = this.byteStream;
			var obj = {};
			var eventFlags = this.parseClipEventFlags();
			if (endLength > byteStream.position) {
				var ActionRecordSize = byteStream.readUint32();
				if (eventFlags.keyPress) {
					obj.keyCode = byteStream.readUint8();
				}
				obj.eventFlags = eventFlags;
				obj.actions = this.parseAction(byteStream.readBytes(ActionRecordSize));
			}
			return obj;
		}
		SwfParser.prototype.parseClipEventFlags = function() {
			var obj = {};
			var byteStream = this.byteStream;
			obj.keyUp = byteStream.getUIBits(1);
			obj.keyDown = byteStream.getUIBits(1);
			obj.mouseUp = byteStream.getUIBits(1);
			obj.mouseDown = byteStream.getUIBits(1);
			obj.mouseMove = byteStream.getUIBits(1);
			obj.unload = byteStream.getUIBits(1);
			obj.enterFrame = byteStream.getUIBits(1);
			obj.load = byteStream.getUIBits(1);
			if (this._swfVersion >= 6) {
				obj.dragOver = byteStream.getUIBits(1);
				obj.rollOut = byteStream.getUIBits(1);
				obj.rollOver = byteStream.getUIBits(1);
				obj.releaseOutside = byteStream.getUIBits(1);
				obj.release = byteStream.getUIBits(1);
				obj.press = byteStream.getUIBits(1);
				obj.initialize = byteStream.getUIBits(1);
			}
			obj.data = byteStream.getUIBits(1);
			if (this._swfVersion >= 6) {
				byteStream.getUIBits(5);
				obj.construct = byteStream.getUIBits(1);
				obj.keyPress = byteStream.getUIBits(1);
				obj.dragOut = byteStream.getUIBits(1);
				byteStream.getUIBits(8);
			}
			byteStream.byteAlign();
			return obj;
		}
		SwfParser.prototype.getFilterList = function() {
			var byteStream = this.byteStream;
			var result = [];
			var numberOfFilters = byteStream.readUint8();
			while (numberOfFilters--) {
				result.push(this.getFilter());
			}
			return result;
		}
		SwfParser.prototype.getFilter = function() {
			var byteStream = this.byteStream;
			var filterId = byteStream.readUint8();
			var filter;
			switch (filterId) {
				case 0:
					filter = this.dropShadowFilter();
					break;
				case 1:
					filter = this.blurFilter();
					break;
				case 2:
					filter = this.glowFilter();
					break;
				case 3:
					filter = this.bevelFilter();
					break;
				case 4:
					filter = this.gradientGlowFilter();
					break;
				case 5:
					filter = this.convolutionFilter();
					break;
				case 6:
					filter = this.colorMatrixFilter();
					break;
				case 7:
					filter = this.gradientBevelFilter();
					break;
				default: 
					this.emitMessage("Invalid filter type: " + filterId, "error");
			}
			return {filterId, filter};
		}
		SwfParser.prototype.dropShadowFilter = function() {
			var byteStream = this.byteStream;
			var rgba = this.rgba();
			var alpha = rgba[3];
			var color = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
			var blurX = byteStream.readFixed16();
			var blurY = byteStream.readFixed16();
			var angle = byteStream.readFixed16() * 180 / Math.PI;
			var distance = byteStream.readFixed16();
			var strength = byteStream.readFloat16() / 256;
			var inner = (byteStream.getUIBits(1)) ? true : false;
			var knockout = (byteStream.getUIBits(1)) ? true : false;
			var hideObject = (byteStream.getUIBits(1)) ? false : true;
			var quality = byteStream.getUIBits(5);
			if (!strength) {
				return null;
			}
			return {distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject}
		}
		SwfParser.prototype.blurFilter = function() {
			var byteStream = this.byteStream;
			var blurX = byteStream.readFixed16();
			var blurY = byteStream.readFixed16();
			var quality = byteStream.getUIBits(5);
			byteStream.getUIBits(3);
			return {blurX, blurY, quality}
		}
		SwfParser.prototype.glowFilter = function() {
			var byteStream = this.byteStream;
			var rgba = this.rgba();
			var alpha = rgba[3];
			var color = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
			var blurX = byteStream.readFixed16();
			var blurY = byteStream.readFixed16();
			var strength = byteStream.readFloat16() / 256;
			var inner = (byteStream.getUIBits(1)) ? true : false;
			var knockout = (byteStream.getUIBits(1)) ? true : false;
			byteStream.getUIBits(1);
			var quality = byteStream.getUIBits(5);
			if (!strength) {
				return null;
			}
			return {color, alpha, blurX, blurY, strength, quality, inner, knockout};
		}
		SwfParser.prototype.bevelFilter = function() {
			var byteStream = this.byteStream;
			var rgba;
			rgba = this.rgba();
			var highlightAlpha = rgba[3];
			var highlightColor = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
			rgba = this.rgba();
			var shadowAlpha = rgba[3];
			var shadowColor = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
			var blurX = byteStream.readFixed16();
			var blurY = byteStream.readFixed16();
			var angle = byteStream.readFixed16() * 180 / Math.PI;
			var distance = byteStream.readFixed16();
			var strength = byteStream.readFloat16() / 256;
			var inner = (byteStream.getUIBits(1)) ? true : false;
			var knockout = (byteStream.getUIBits(1)) ? true : false;
			byteStream.getUIBits(1);
			var OnTop = byteStream.getUIBits(1);
			var quality = byteStream.getUIBits(4);
			var type = "inner";
			if (!inner) {
				if (OnTop) {
					type = "full";
				} else {
					type = "outer";
				}
			}
			if (!strength) {
				return null;
			}
			return {distance, angle, highlightColor, highlightAlpha, shadowColor, shadowAlpha, blurX, blurY, strength, quality, type, knockout};
		}
		SwfParser.prototype.gradientGlowFilter = function() {
			var byteStream = this.byteStream;
			var i;
			var numColors = byteStream.readUint8();
			var colors = [];
			var alphas = [];
			for (i = 0; i < numColors; i++) {
				var rgba = this.rgba();
				alphas[alphas.length] = rgba[3];
				colors[colors.length] = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
			}
			var ratios = [];
			for (i = 0; i < numColors; i++) {
				ratios[ratios.length] = byteStream.readUint8();
			}
			var blurX = byteStream.readFixed16();
			var blurY = byteStream.readFixed16();
			var angle = byteStream.readFixed16() * 180 / Math.PI;
			var distance = byteStream.readFixed16();
			var strength = byteStream.readFloat16() / 256;
			var inner = (byteStream.getUIBits(1)) ? true : false;
			var knockout = (byteStream.getUIBits(1)) ? true : false;
			byteStream.getUIBits(1);
			var onTop = byteStream.getUIBits(1);
			var quality = byteStream.getUIBits(4);
			var type = "inner";
			if (!inner) {
				if (onTop) {
					type = "full";
				} else {
					type = "outer";
				}
			}
			if (!strength) {
				return null;
			}
			return {distance, angle, colors, alphas, ratios, blurX, blurY, strength, quality, type, knockout};
		}
		SwfParser.prototype.convolutionFilter = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.matrixX = byteStream.readUint8();
			obj.matrixY = byteStream.readUint8();
			obj.divisor = byteStream.readFloat16() | byteStream.readFloat16();
			obj.bias = byteStream.readFloat16() | byteStream.readFloat16();
			var count = obj.matrixX * obj.matrixY;
			var matrixArr = [];
			while (count--) {
				matrixArr.push(byteStream.readUint32());
			}
			obj.defaultColor = this.rgba();
			byteStream.getUIBits(6);
			obj.clamp = byteStream.getUIBits(1);
			obj.preserveAlpha = byteStream.getUIBits(1);
			return obj;
		}
		SwfParser.prototype.gradientBevelFilter = function() {
			var byteStream = this.byteStream;
			var NumColors = byteStream.readUint8();
			var i;
			var colors = [];
			var alphas = [];
			for (i = 0; i < NumColors; i++) {
				var rgba = this.rgba();
				alphas[alphas.length] = rgba[3];
				colors[colors.length] = rgba[0] << 16 | rgba[1] << 8 | rgba[2];
			}
			var ratios = [];
			for (i = 0; i < NumColors; i++) {
				ratios[ratios.length] = byteStream.readUint8();
			}
			var blurX = byteStream.readFixed16();
			var blurY = byteStream.readFixed16();
			var angle = byteStream.readFixed16() * 180 / Math.PI;
			var distance = byteStream.readFixed16();
			var strength = byteStream.readFloat16() / 256;
			var inner = (byteStream.getUIBits(1)) ? true : false;
			var knockout = (byteStream.getUIBits(1)) ? true : false;
			byteStream.getUIBits(1);
			var OnTop = byteStream.getUIBits(1);
			var quality = byteStream.getUIBits(4);
			var type = "inner";
			if (!inner) {
				if (OnTop) {
					type = "full";
				} else {
					type = "outer";
				}
			}
			if (!strength) {
				return null;
			}
			return {distance, angle, colors, alphas, ratios, blurX, blurY, strength, quality, type, knockout};
		}
		SwfParser.prototype.colorMatrixFilter = function() {
			var byteStream = this.byteStream;
			var matrixArr = [];
			for (var i = 0; i < 20; i++) {
				matrixArr.push(byteStream.readUint32());
			}
			return matrixArr;
		}
		SwfParser.prototype.parseSoundInfo = function() {
			var obj = {};
			var byteStream = this.byteStream;
			var flags = byteStream.readUint8();
			switch ((flags >> 4) & 0b11) {
				case 0: // Event
					obj.event = 'event';
					break;
				case 1: // Start
					obj.event = 'start';
					break;
				case 2: // Stop
					obj.event = 'stop';
					break;
			}
			if (flags & 0b1) {
				obj.inSample = byteStream.readUint32()
			}
			if (flags & 0b10) {
				obj.outSample = byteStream.readUint32();
			}
			if (flags & 0b100) {
				obj.numLoops = byteStream.readUint16();
			}
			if (flags & 0b1000) {
				var count = byteStream.readUint8();
				var envelope = [];
				while (count--) {
					envelope.push({
						sample: byteStream.readUint32(),
						leftVolume: byteStream.readUint16(),
						rightVolume: byteStream.readUint16()
					});
				}
				obj.envelope = envelope;
			}
			return obj;
		}
		SwfParser.prototype.parseAction = function(data) {
			var action = new Avm1Parser(data);
			var caches = [];
			try {
				caches = action.parse();
			} catch(e) {
				console.log(e);
			}
			return caches;
		}
		SwfParser.prototype.parseABC = function(data) {
			var abc = new Avm2Parser(data);
			return abc.parse();
		}
		
		//////// Define ////////
		SwfParser.prototype.parseDefineButton = function(ver, length) {
			var byteStream = this.byteStream;
			var obj = {};
			var endOffset = byteStream.position + length;
			obj.id = byteStream.readUint16();
			var ActionOffset = 0;
			if (ver == 2) {
				obj.flag = byteStream.readUint8();
				obj.trackAsMenu = (obj.flag & 0b1);
				ActionOffset = byteStream.readUint16();
			}
			obj.records = this.buttonRecords(ver);
			byteStream.byteAlign();
			if (ver === 1) {
				obj.actions = this.parseAction(byteStream.readBytes(endOffset - byteStream.position));
			} else {
				if (ActionOffset > 0) {
					obj.actions = this.buttonActions(endOffset);
				}
			}
			byteStream.byteAlign();
			return obj;
		}
		SwfParser.prototype.parseDefineButtonSound = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.buttonId = byteStream.readUint16();
		
			// Some SWFs (third-party soundboard creator?) create SWFs with a malformed
			// DefineButtonSound tag that has fewer than all 4 sound IDs.
			for (var i = 0; i < 4; i++) {
				var soundId = byteStream.readUint16();
				if (soundId) {
					var soundInfo = this.parseSoundInfo();
					switch (i) {
						case 0:
							obj.buttonStateUpSoundInfo = soundInfo;
							obj.buttonStateUpSoundId = soundId;
							break;
						case 1:
							obj.buttonStateOverSoundInfo = soundInfo;
							obj.buttonStateOverSoundId = soundId;
							break;
						case 2:
							obj.buttonStateDownSoundInfo = soundInfo;
							obj.buttonStateDownSoundId = soundId;
							break;
						case 3:
							obj.buttonStateHitTestSoundInfo = soundInfo;
							obj.buttonStateHitTestSoundId = soundId;
							break;
					}
				}
			}
			return obj;
		}
		SwfParser.prototype.parseDefineFont1 = function(length) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.version = 1;
			var endOffset = byteStream.position + length;
			var i;
			obj.id = byteStream.readUint16();
			var offset = byteStream.position;
			var numGlyphs = byteStream.readUint16();
			var offsetTable = [];
			offsetTable.push(numGlyphs);
			numGlyphs /= 2;
			numGlyphs--;
			for (i = numGlyphs; i--;) {
				offsetTable.push(byteStream.readUint16());
			}
			numGlyphs++;
			var glyphs = [];
			for (i = 0; i < numGlyphs; i++) {
				byteStream.setOffset(offset + offsetTable[i], 0);
				var numBits = byteStream.readUint8();
				glyphs.push(this.shapeRecords(1, {
					fillBits: numBits >> 4,
					lineBits: numBits & 0b1111
				}));
			}
			obj.glyphs = glyphs;
			byteStream.position = endOffset;
			byteStream.bit_offset = 0;
			return obj;
		}
		SwfParser.prototype.parseDefineFont2 = function(ver, length) {
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			var obj = {};
			obj.version = ver;
			obj.id = byteStream.readUint16();
			var i = 0;
			var fontFlags = byteStream.readUint8();
			obj.isBold = (fontFlags) & 1;
			obj.isItalic = (fontFlags >>> 1) & 1;
			var isWideCodes = (fontFlags >>> 2) & 1;
			obj.isWideCodes = isWideCodes;
			var isWideOffsets = (fontFlags >>> 3) & 1;
			obj.isWideOffsets = isWideOffsets;
			obj.isANSI = (fontFlags >>> 4) & 1;
			obj.isSmallText = (fontFlags >>> 5) & 1;
			obj.isShiftJIS = (fontFlags >>> 6) & 1;
			var hasLayout = (fontFlags >>> 7) & 1;
			obj.language = this.parseLanguage();
			
			// SWF19 states that the font name should not have a terminating null byte,
			// but it often does (depends on Flash IDE version?)
			obj.fontNameData = byteStream.readStringWithLength();
		
			var numGlyphs = byteStream.readUint16();
			obj.numGlyphs = numGlyphs;
			
			// SWF19 p. 164 doesn't make it super clear: If there are no glyphs,
			// then the following tables are omitted. But the table offset values
			// may or may not be written... (depending on Flash IDE version that was used?)
			if (numGlyphs == 0) {
				// Try to read the CodeTableOffset. It may or may not be present,
				// so just dump any error.
				if (isWideOffsets) {
					byteStream.readUint32();
				} else {
					byteStream.readUint16();
				}
			} else {
				var offset = byteStream.position;
				// OffsetTable
				var OffsetTable = [];
				if (isWideOffsets) {
					for (i = numGlyphs; i--;) {
						OffsetTable[OffsetTable.length] = byteStream.readUint32();
					}
				} else {
					for (i = numGlyphs; i--;) {
						OffsetTable[OffsetTable.length] = byteStream.readUint16();
					}
				}
		
				// CodeTableOffset
				var codeTableOffset;
				if (isWideOffsets) {
					codeTableOffset = byteStream.readUint32();
				} else {
					codeTableOffset = byteStream.readUint16();
				}
		
				// GlyphShapeTable
				var glyphShapeTable = [];
				for (i = 0; i < numGlyphs; i++) {
					// The glyph shapes are assumed to be positioned per the offset table.
					// Panic on debug builds if this assumption is wrong, maybe we need to
					// seek into these offsets instead?
					byteStream.setOffset(offset + OffsetTable[i], 0);
		
					// The glyph shapes must not overlap. Avoid exceeding to the next one.
					// TODO: What happens on decreasing offsets?
					var availableBytes;
					if (i < (numGlyphs - 1)) {
						availableBytes = (OffsetTable[i + 1] - OffsetTable[i]);
					} else {
						availableBytes = (codeTableOffset - OffsetTable[i]);
					}
					if (availableBytes == 0) {
						continue;
					}
					var numBits = byteStream.readUint8();
					if (availableBytes == 1) {
						continue;
					}
					// TODO: Avoid reading more than `available_bytes - 1`?
					var numFillBits = numBits >> 4;
					var numLineBits = numBits & 0b1111;
					glyphShapeTable.push(this.shapeRecords(1, {
						fillBits: numFillBits,
						lineBits: numLineBits
					}));
				}
				obj.glyphs = glyphShapeTable;
		
				// The code table is assumed to be positioned right after the glyph shapes.
				// Panic on debug builds if this assumption is wrong, maybe we need to seek
				// into the code table offset instead?
				byteStream.setOffset(offset + codeTableOffset, 0);
		
				// CodeTable
				var CodeTable = [];
				if (isWideCodes) {
					for (i = numGlyphs; i--;) {
						CodeTable.push(byteStream.readUint16());
					}
				} else {
					for (i = numGlyphs; i--;) {
						CodeTable.push(byteStream.readUint8());
					}
				}
				obj.codeTables = CodeTable;
			}
		
			// TODO: Is it possible to have a layout when there are no glyphs?
			if (hasLayout) {
				obj.layout = {};
				obj.layout.ascent = byteStream.readUint16();
				obj.layout.descent = byteStream.readUint16();
				obj.layout.leading = byteStream.readInt16();
				var advanceTable = [];
				for (i = numGlyphs; i--;) {
					advanceTable.push(byteStream.readInt16());
				}
				obj.layout.advanceTable = advanceTable;
				// Some older SWFs end the tag here, as this data isn't used until v7.
				var boundsTable = [];
				if ((byteStream.position - startOffset) < length) {
					for (i = numGlyphs; i--;) {
						boundsTable.push(this.rect());
					}
					byteStream.byteAlign();
				}
				obj.layout.boundsTable = boundsTable;
				var kernings = [];
				if ((byteStream.position - startOffset) < length) {
					var kerningCount = byteStream.readUint16();
					for (i = kerningCount; i--;) {
						var kerningCode1 = ((isWideCodes) ? byteStream.readUint16() : byteStream.readUint8());
						var kerningCode2 = ((isWideCodes) ? byteStream.readUint16() : byteStream.readUint8());
						var kerningAdjustment = byteStream.readInt16();
						kernings.push({
							leftCode: kerningCode1,
							rightCode: kerningCode2,
							adjustment: kerningAdjustment
						});
					}
				}
				obj.kernings = kernings;
			}
			return obj;
		}
		SwfParser.prototype.parseDefineFont4 = function(length) {
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			var obj = {};
			obj.version = 4;
			obj.id = byteStream.readUint16();
			var flags = byteStream.readUint8();
			obj.name = byteStream.readStringWithUntil();
			if (flags & 0b100) {
				obj.data = byteStream.readBytes(length - (byteStream.position - startOffset));
			} else {
				var e = (length - (byteStream.position - startOffset));
				byteStream.position += e;
			}
			obj.isItalic = (flags & 0b10);
			obj.isBold = (flags & 0b1);
			return obj;
		}
		SwfParser.prototype.parseDefineFontInfo = function(ver, length) {
			var byteStream = this.byteStream;
			var endOffset = byteStream.position + length;
			var obj = {};
			obj.id = byteStream.readUint16();
			obj.version = ver;
			obj.fontNameData = byteStream.readStringWithLength();
			var flags = byteStream.readUint8();
			obj.isWideCodes = flags & 1;
			obj.isBold = (flags >>> 1) & 1;
			obj.isItalic = (flags >>> 2) & 1;
			obj.isShiftJIS = (flags >>> 3) & 1;
			obj.isANSI = (flags >>> 4) & 1;
			obj.isSmallText = (flags >>> 5) & 1;
			byteStream.byteAlign();
			if (ver === 2) {
				obj.language = this.parseLanguage();
			}
			var codeTable = [];
			var tLen = endOffset - byteStream.position;
			if (obj.isWideCodes) {
				while (tLen > 1) {
					codeTable[codeTable.length] = byteStream.readUint16();
					tLen -= 2;
				}
			} else {
				// TODO(Herschel): Warn for version 2.
				while (tLen > 0) {
					codeTable[codeTable.length] = byteStream.readUint8();
					tLen--;
				}
			}
			obj.codeTable = codeTable;
		
			// SWF19 has ANSI and Shift-JIS backwards?
			return obj;
		}
		SwfParser.prototype.parseDefineEditText = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.id = byteStream.readUint16();
			obj.bounds = this.rect();
			var flag1 = byteStream.readUint16();
		
			var hasFont = flag1 & 1;
			var hasMaxLength = (flag1 >>> 1) & 1;
			var hasTextColor = (flag1 >>> 2) & 1;
			var isReadOnly = (flag1 >>> 3) & 1;
			var isPassword = (flag1 >>> 4) & 1;
			var isMultiline = (flag1 >>> 5) & 1;
			var isWordWrap = (flag1 >>> 6) & 1;
			var hasInitialText = (flag1 >>> 7) & 1;
			var outlines = (flag1 >>> 8) & 1;
			var HTML = (flag1 >>> 9) & 1;
			var wasStatic = (flag1 >>> 10) & 1;
			var border = (flag1 >>> 11) & 1;
			var noSelect = (flag1 >>> 12) & 1;
			var hasLayout = (flag1 >>> 13) & 1;
			var autoSize = (flag1 >>> 14) & 1;
			var hasFontClass = (flag1 >>> 15) & 1;
		
			obj.isReadOnly = isReadOnly;
			obj.isPassword = isPassword;
			obj.isMultiline = isMultiline;
			obj.isWordWrap = isWordWrap;
			obj.outlines = outlines;
			obj.HTML = HTML;
			obj.wasStatic = wasStatic;
			obj.border = border;
			obj.noSelect = noSelect;
			obj.autoSize = autoSize;
		
			if (hasFont) {
				obj.fontID = byteStream.readUint16();
			}
			if (hasFontClass) {
				obj.fontClass = byteStream.readStringWithUntil();
			}
			if (hasFont && !hasFontClass) {
				obj.fontHeight = byteStream.readUint16();
			}
			if (hasTextColor) {
				obj.textColor = this.rgba();
			}
			if (hasMaxLength) {
				obj.maxLength = byteStream.readUint16();
			}
			if (hasLayout) {
				obj.layout = {};
				obj.layout.align = this.textAlign(byteStream.readUint8());
				obj.layout.leftMargin = byteStream.readUint16();
				obj.layout.rightMargin = byteStream.readUint16();
				obj.layout.indent = byteStream.readUint16();
				obj.layout.leading = byteStream.readInt16();
			}
			obj.variableName = byteStream.readStringWithUntil();
			if (hasInitialText) {
				obj.initialText = byteStream.readStringWithUntil();
			}
			return obj;
		}
		SwfParser.prototype.parseDefineSprite = function(length) {
			var obj = {};
			var byteStream = this.byteStream;
			obj.id = byteStream.readUint16();
			obj.numFrames = byteStream.readUint16();
			this.taglengthstack[this.taglengthstackSize++] = (this.byteStream.position + (length - 4));
			obj.tagCallback = this.parseTags();
			return obj;
		}
		SwfParser.prototype.parseDefineShape = function(version) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.id = byteStream.readUint16();
			obj.bounds = this.rect();
			obj.version = version;
			if (version >= 4) {
				obj.edgeBounds = this.rect();
				var flags = byteStream.readUint8();
				obj.scalingStrokes = flags & 1;
				obj.nonScalingStrokes = (flags >>> 1) & 1;
				obj.fillWindingRule = (flags >>> 2) & 1;
			}
			obj.shapes = this.shapeWithStyle(version);
			return obj;
		}
		SwfParser.prototype.parseDefineSound = function(length) {
			var obj = {};
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			obj.id = byteStream.readUint16();
			obj.format = this.parseSoundFormat();
			obj.numSamples = byteStream.readUint32();
			var sub = byteStream.position - startOffset;
			var dataLength = length - sub;
			obj.data = byteStream.readBytes(dataLength);
			return obj;
		}
		SwfParser.prototype.parseDefineText = function(ver) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.id = byteStream.readUint16();
			obj.bounds = this.rect();
			obj.matrix = this.matrix();
			var GlyphBits = byteStream.readUint8();
			var AdvanceBits = byteStream.readUint8();
			obj.records = this.getTextRecords(ver, GlyphBits, AdvanceBits);
			return obj;
		}
		SwfParser.prototype.parseDefineBinaryData = function(length) {
			var byteStream = this.byteStream;
			var obj = {}
			obj.id = byteStream.readUint16();
			byteStream.readUint32();
			obj.data = byteStream.readBytes(length - 6);
			return obj;
		}
		SwfParser.prototype.parseDefineScalingGrid = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.characterId = byteStream.readUint16();
			obj.splitter = this.rect();
			byteStream.byteAlign();
			return obj;
		}
		SwfParser.prototype.parseDefineSceneAndFrameLabelData = function() {
			var byteStream = this.byteStream;
			var obj = {};
			var sceneCount = byteStream.getU30();
			obj.sceneInfo = [];
			while (sceneCount--) {
				obj.sceneInfo.push({
					offset: byteStream.getU30(),
					name: byteStream.readStringWithUntil()
				});
			}
			var frameLabelCount = byteStream.getU30();
			obj.frameInfo = [];
			while (frameLabelCount--) {
				obj.frameInfo.push({
					num: byteStream.getU30(),
					label: byteStream.readStringWithUntil()
				});
			}
			return obj;
		}
		SwfParser.prototype.parseDefineVideoStream = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.id = byteStream.readUint16();
			obj.numFrames = byteStream.readUint16();
			obj.width = byteStream.readUint16();
			obj.height = byteStream.readUint16();
			// TODO(Herschel): Check SWF version.
			var flags = byteStream.readUint8();
			switch (byteStream.readUint8()) {
				case 0: // None
					obj.codec = "none";
					break;
				case 2: // H263
					obj.codec = "H263";
					break;
				case 3: // ScreenVideo
					obj.codec = "ScreenVideo";
					break;
				case 4: // Vp6
					obj.codec = "Vp6";
					break;
				case 5: // Vp6WithAlpha
					obj.codec = "Vp6WithAlpha";
					break;
				case 6: // ScreenVideoV2
					obj.codec = "ScreenVideoV2";
					break;
				default:
					this.emitMessage("Invalid video codec.", "error");
			}
			switch ((flags >> 1) & 0b111) {
				case 0: // None
					obj.deblocking = "useVideoPacketValue";
					break;
				case 1: // None
					obj.deblocking = "none";
					break;
				case 2: // Level1
					obj.deblocking = "Level1";
					break;
				case 3: // Level2
					obj.deblocking = "Level2";
					break;
				case 4: // Level3
					obj.deblocking = "Level3";
					break;
				case 5: // Level4
					obj.deblocking = "Level4";
					break;
				default:
					this.emitMessage("Invalid video deblocking value.", "error");
			}
			obj.isSmoothed = flags & 0b1;
			return obj;
		}
		SwfParser.prototype.parseDefineBitsLossLess = function(ver, length) {
			var obj = {};
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			obj.id = byteStream.readUint16();
			obj.version = ver;
			var format = byteStream.readUint8();
			obj.width = byteStream.readUint16();
			obj.height = byteStream.readUint16();
			switch (format) {
				case 3: // ColorMap8
					obj.numColors = byteStream.readUint8();
					break;
				case 4: // Rgb15
				case 5: // Rgb32
					break;
				default:
					this.emitMessage("Invalid bitmap format: " + format, "error");
			}
			var sub = byteStream.position - startOffset;
			obj.data = byteStream.readBytes(length - sub);
			obj.format = format;
			return obj;
		}
		SwfParser.prototype.parseDefineFontName = function() {
			var obj = {};
			var byteStream = this.byteStream;
			obj.id = byteStream.readUint16();
			obj.name = byteStream.readStringWithUntil();
			obj.copyrightInfo = byteStream.readStringWithUntil();
			return obj;
		}
		SwfParser.prototype.parseDefineBits = function(ver, length) {
			var obj = {};
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			obj.id = byteStream.readUint16();
			if (ver <= 2) {
				obj.data = byteStream.readBytes(length - 2);
			} else {
				var dataSize = byteStream.readUint32();
				var deblocking = null;
				if (ver >= 4) {
					deblocking = byteStream.readUint16();
				}
				var data = byteStream.readBytes(dataSize);
				var sub = byteStream.position - startOffset;
				var alphaData = byteStream.readBytes(length - sub);
				obj.data = data;
				obj.alphaData = alphaData;
				obj.deblocking = deblocking;
			}
			return obj;
		}
		SwfParser.prototype.parseDefineButtonCxform = function(length) {
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			var obj = {};
			// SWF19 is incorrect here. You can have >1 color transforms in this tag. They apply
			// to the characters in a button in sequence.
		
			obj.id = byteStream.readUint16();
			var colorTransforms = [];
			
			// Read all color transforms.
			while ((byteStream.position - startOffset) < length) {
				colorTransforms.push(this.colorTransform(false));
				byteStream.byteAlign();
			}
			obj.colorTransforms = colorTransforms;
			return obj;
		}
		SwfParser.prototype.parseDefineMorphShape = function(ver) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.id = byteStream.readUint16();
			obj.startBounds = this.rect();
			obj.endBounds = this.rect();
			if (ver == 2) {
				obj.startEdgeBounds = this.rect();
				obj.endEdgeBounds = this.rect();
				var flags = byteStream.readUint8();
				obj.isScalingStrokes = flags & 1;
				obj.isNonScalingStrokes = (flags >>> 1) & 1;
			}
			byteStream.readUint32(); // Offset to EndEdges.
			obj.morphFillStyles = this.morphFillStyleArray(ver);
			obj.morphLineStyles = this.morphLineStyleArray(ver);
		
			// TODO(Herschel): Add read_shape
			obj.startEdges = this.morphShapeWithStyle(ver, false);
			obj.endEdges = this.morphShapeWithStyle(ver, true);
			return obj;
		}
		SwfParser.prototype.parseDefineFontAlignZones = function(length) {
			var byteStream = this.byteStream;
			var tag = {};
			var startOffset = byteStream.position;
			tag.id = byteStream.readUint16();
			tag.thickness = byteStream.readUint8();
			var zones = [];
			while (byteStream.position < (startOffset + length)) {
				byteStream.readUint8(); // Always 2.
				zones.push({
					left: byteStream.readInt16(),
					width: byteStream.readInt16(),
					bottom: byteStream.readInt16(),
					height: byteStream.readInt16()
				});
				byteStream.readUint8(); // Always 0b000000_11 (2 dimensions).
			}
			tag.zones = zones;
			return tag;
		}
		SwfParser.prototype.parsePlaceObject = function(ver, length) {
			var byteStream = this.byteStream;
			var obj = {};
			var startOffset = byteStream.position;
			obj.version = ver;
			if (ver === 1) {
				obj.isMove = false;
				obj.characterId = byteStream.readUint16();
				obj.depth = byteStream.readUint16();
				obj.matrix = this.matrix();
				byteStream.byteAlign();
				if ((byteStream.position - startOffset) < length) {
					obj.colorTransform = this.colorTransform();
				}
			} else {
				var flags;
				if (ver >= 3) {
					flags = byteStream.readUint16();
				} else {
					flags = byteStream.readUint8();
				}
				obj.depth = byteStream.readUint16();
		
				var isMove = (flags & 1);
				var hasCharacter = (flags >>> 1) & 1;
				var hasMatrix = (flags >>> 2) & 1;
				var hasColorTransform = (flags >>> 3) & 1;
				var hasRatio = (flags >>> 4) & 1;
				var hasName = (flags >>> 5) & 1;
				var hasClipDepth = (flags >>> 6) & 1;
				var hasClipActions = (flags >>> 7) & 1;
				// PlaceObject3
				var hasFilters = (flags >>> 8) & 1;
				var hasBlendMode = (flags >>> 9) & 1;
				var hasBitmapCache = (flags >>> 10) & 1;
				var hasClassName = (flags >>> 11) & 1;
				var hasImage = (flags >>> 12) & 1;
				var hasVisible = (flags >>> 13) & 1;
				var hasBackgroundColor = (flags >>> 14) & 1;
		
				// PlaceObject3
				// SWF19 p.40 incorrectly says class name if (HasClassNameFlag || (HasImage && HasCharacterID))
				// I think this should be if (HasClassNameFlag || (HasImage && !HasCharacterID)),
				// you use the class name only if a character ID isn't present.
				// But what is the case where we'd have an image without either HasCharacterID or HasClassName set?
				obj.hasImage = hasImage;
				if ((hasClassName) || ((obj.hasImage) && !hasCharacter)) {
					obj.className = byteStream.readStringWithUntil();
				}
				obj.isMove = isMove;
				if (hasCharacter) {
					obj.characterId = byteStream.readUint16();
				}
				if (!obj.isMove && !hasCharacter) {
					this.emitMessage("Invalid PlaceObject type", "error");
				}
				if (hasMatrix) {
					obj.matrix = this.matrix();
				}
				if (hasColorTransform) {
					obj.colorTransform = this.colorTransform(true);
				}
				if (hasRatio) {
					obj.ratio = byteStream.readUint16();
				}
				if (hasName) {
					obj.name = byteStream.readStringWithUntil();
				}
				if (hasClipDepth) {
					obj.clipDepth = byteStream.readUint16();
				}
				// PlaceObject3
				if (hasFilters) {
					obj.filters = this.getFilterList();
				}
				if (hasBlendMode) {
					obj.blendMode = this.parseBlendMode();
				}
				if (hasBitmapCache) {
					obj.bitmapCache = byteStream.readUint8();
				}
				if (hasVisible) {
					obj.visible = byteStream.readUint8();
				}
				if (hasBackgroundColor) {
					obj.backgroundColor = this.rgba();
				}
				if (hasClipActions) {
					obj.clipActions = this.parseClipActions(startOffset, length);
				}
				// PlaceObject4
				if (ver === 4) {
					byteStream.byteAlign();
					obj.amfData = byteStream.readBytes((length - (byteStream.position - startOffset)));
				}
			}
			byteStream.byteAlign();
			return obj;
		}
		SwfParser.prototype.parseDoAction = function(length) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.action = this.parseAction(byteStream.readBytes(length));
			return obj;
		}
		SwfParser.prototype.parseDoInitAction = function(length) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.spriteId = byteStream.readUint16();
			obj.action = this.parseAction(byteStream.readBytes(length - 2));
			return obj;
		}
		SwfParser.prototype.parseDoABC = function(ver, length) {
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			var obj = {};
			obj.version = ver;
			if (ver == 2) {
				obj.flags = byteStream.readUint32();
				obj.lazyInitialize = obj.flags & 1;
				obj.name = byteStream.readStringWithUntil();
			}
			var offset = (length - (byteStream.position - startOffset));
			try {
				obj.abc = this.parseABC(byteStream.readBytes(offset));
			} catch(e) {
				console.log(offset, ver, e);
				obj.abc = e;
			}
			return obj;
		}
		SwfParser.prototype.parseProductInfo = function() {
			// Not documented in SWF19 reference.
			// See http://wahlers.com.br/claus/blog/undocumented-swf-tags-written-by-mxmlc/
			var byteStream = this.byteStream;
			var obj = {};
			obj.productID = byteStream.readUint32();
			obj.edition = byteStream.readUint32();
			obj.majorVersion = byteStream.readUint8();
			obj.minorVersion = byteStream.readUint8();
			obj.buildBumber = byteStream.readUint64();
			obj.compilationDate = byteStream.readUint64();
			return obj;
		}
		SwfParser.prototype.parseDebugID = function(length) {
			// Not documented in SWF19 reference.
			// See http://wahlers.com.br/claus/blog/undocumented-swf-tags-written-by-mxmlc/
			var byteStream = this.byteStream;
			var obj = {};
			obj.debugId = byteStream.readUint8();
			byteStream.position--;
			byteStream.position += length;
			return obj;
		}
		SwfParser.prototype.parseNameCharacter = function() {
			// Not documented in SWF19 reference, and seems to be ignored by the official Flash Player.
			// Not generated by any version of the Flash IDE, but some 3rd party tools contain it.
			// See https://www.m2osw.com/swf_tag_namecharacter
			var byteStream = this.byteStream;
			var obj = {};
			obj.id = byteStream.readUint16();
			obj.name = byteStream.readStringWithUntil();
			return obj;
		}
		SwfParser.prototype.parseFileAttributes = function() {
			var byteStream = this.byteStream;
			var obj = {};
			var flags = byteStream.readUint32();
		
			/// Whether this SWF requests hardware acceleration to blit to the screen.
			obj.useDirectBlit = (flags >> 6) & 1;
		
			/// Whether this SWF requests hardware acceleration for compositing.
			obj.useGPU = (flags >> 5) & 1;
		
			/// Whether this SWF contains XMP metadata in a Metadata tag.
			obj.hasMetadata = (flags >> 4) & 1;
		
			/// Whether this SWF uses ActionScript 3 (AVM2).
			obj.isActionScript3 = (flags >> 3) & 1;
		
			/// Whether this SWF should be placed in the network sandbox when run locally.
			///
			/// SWFs in the network sandbox can only access network resources,  not local resources.
			/// SWFs in the local sandbox can only access local resources, not network resources.
			obj.useNetworkSandbox = (flags >> 0) & 1;
			return obj;
		}
		SwfParser.prototype.parseSymbolClass = function() {
			var byteStream = this.byteStream;
			var obj = {};
			var symbols = [];
			var count = byteStream.readUint16();
			while (count--) {
				symbols.push({
					tagId: byteStream.readUint16(),
					path: byteStream.readStringWithUntil()
				});
			}
			obj.symbols = symbols;
			return obj;
		}
		SwfParser.prototype.parseFrameLabel = function(length) {
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			var obj = {};
			obj.label = byteStream.readStringWithUntil();
			var isAnchor = false;
			if (this._swfVersion >= 6 && (byteStream.position - startOffset) !== length) {
				isAnchor = byteStream.readUint8() != 0;
			}
			obj.isAnchor = isAnchor;
			return obj;
		}
		SwfParser.prototype.parseRemoveObject = function(ver) {
			var obj = {};
			if (ver == 1) {
				obj.characterId = this.byteStream.readUint16();
			}
			obj.depth = this.byteStream.readUint16();
			return obj;
		}
		SwfParser.prototype.parseExportAssets = function() {
			var obj = {};
			var byteStream = this.byteStream;
			var count = byteStream.readUint16();
			var packages = [];
			while (count--) {
				var id = byteStream.readUint16();
				var name = byteStream.readStringWithUntil();
				packages.push([id, name]);
			}
			obj.packages = packages;
			return obj;
		}
		SwfParser.prototype.parseImportAssets = function(ver) {
			var obj = {};
			var url = this.byteStream.readStringWithUntil();
			if (ver == 2) {
				this.byteStream.readUint8(); // Reserved; must be 1
				this.byteStream.readUint8(); // Reserved; must be 0
			}
			var num_imports = this.byteStream.readUint16();
			var imports = [];
			while (num_imports--) {
				imports.push({
					id: this.byteStream.readUint16(),
					name: this.byteStream.readStringWithUntil()
				});
			}
			obj.url = url;
			obj.imports = imports;
			return obj;
		}
		SwfParser.prototype.parseStartSound = function(ver) {
			var byteStream = this.byteStream;
			var obj = {};
			if (ver == 2) {
				obj.className = byteStream.readStringWithUntil();
			} else {
				obj.id = byteStream.readUint16();
			}
			obj.info = this.parseSoundInfo();
			return obj;
		}
		SwfParser.prototype.parseSoundStreamHead = function(ver) {
			var obj = {};
			var byteStream = this.byteStream;
			// TODO: Verify version requirements.
			obj.playback = this.parseSoundFormat();
			obj.stream = this.parseSoundFormat();
			obj.samplePerBlock = byteStream.readUint16();
			obj.latencySeek = 0;
			if (obj.stream.compression === "MP3") {
				// SWF19 says latency seek is i16, not u16. Is this wrong> How are negative values used?
				// Some software creates SWF files that incorrectly omit this value.
				// Fail silently if it's missing.
				// TODO: What is Flash's behavior in this case? Does it read the value from the following bytes?
				obj.latencySeek = byteStream.readInt16();
			}
			byteStream.byteAlign();
			return obj;
		}
		SwfParser.prototype.parseSoundStreamBlock = function(length) {
			var byteStream = this.byteStream;
			var obj = {};
			obj.compressed = byteStream.readBytes(length);
			return obj;
		}
		SwfParser.prototype.parseVideoFrame = function(length) {
			var byteStream = this.byteStream;
			var startOffset = byteStream.position;
			var obj = {};
			obj.streamId = byteStream.readUint16();
			obj.frameNum = byteStream.readUint16();
			var sub = byteStream.position - startOffset;
			var dataLength = length - sub;
			obj.videoData = byteStream.readBytes(dataLength);
			return obj;
		}
		SwfParser.prototype.parseCSMTextSettings = function() {
			var obj = {};
			var byteStream = this.byteStream;
			obj.id = byteStream.readUint16();
			var flags = byteStream.readUint8();
			obj.useAdvancedRendering = flags & 0b01000000;
			switch ((flags >> 3) & 0b11) {
				case 0:
					obj.gridFit = "none";
					break;
				case 1:
					obj.gridFit = "pixel";
					break;
				case 2:
					obj.gridFit = "subPixel";
					break;
				default:
					this.emitMessage("Invalid text grid fitting", "error");
			}
			obj.thickness = byteStream.readFloat32();
			obj.sharpness = byteStream.readFloat32();
			byteStream.readUint8(); // Reserved (0).
			return obj;
		}
		const Avm1Parser = function(data) {
			this.byteStream = new ByteStream(data);
		}
		Avm1Parser.prototype.parseAvm1 = function(data) {
			var action = new Avm1Parser(data);
			return action.parse();
		}
		Avm1Parser.prototype.parse = function() {
			return this.parseCaches();
		}
		Avm1Parser.prototype.parseCaches = function() {
			var caches = [];
			var byteOffset;
			while (this.byteStream.position < this.byteStream.getLength()) {
				byteOffset = this.byteStream.position;
				var action = this.parseAction();
				caches[byteOffset] = action;
				if (action.opcode === 0x00) break;
			}
			return caches;
		}
		Avm1Parser.prototype.parseAction = function() {
			let {opcode, length} = this.parseOpcodeAndLength();
			let startOffset = this.byteStream.position;
			let action = this.parseOpcode(opcode, length);
			action.opcode = opcode;
			action.end = this.byteStream.position;
			if ((this.byteStream.position - startOffset) !== action.len) {
				console.log("Length mismatch in AVM1 action: ", opcode, ((this.byteStream.position - startOffset) + " = " + action.len));
				this.byteStream.position = startOffset + action.len;
			}
			return action;
		
		}
		Avm1Parser.prototype.parseOpcodeAndLength = function() {
			let opcode = this.byteStream.readUint8();
			let length = (opcode >= 0x80) ? this.byteStream.readUint16() : 0;
			return {opcode, length}
		}
		Avm1Parser.prototype.parseOpcode = function(opcode, length) {
			var action = {};
			var lenFix = length;
			switch (opcode) {
				case 0x00: // End
				case 0x04: // NextFrame
				case 0x05: // PreviousFrame
				case 0x06: // Play
				case 0x07: // Stop
				case 0x08: // ToggleQuality
				case 0x09: // StopSounds
				case 0x0A: // Add
				case 0x0B: // Subtract
				case 0x0C: // Multiply
				case 0x0D: // Divide
				case 0x0E: // Equals
				case 0x0F: // Less
				case 0x10: // And
				case 0x11: // Or
				case 0x12: // Not
				case 0x13: // StringEquals
				case 0x14: // StringLength
				case 0x15: // StringExtract
		
				case 0x17: // Pop
				case 0x18: // ToInteger
		
				case 0x1C: // GetVariable
				case 0x1D: // SetVariable
		
				case 0x20: // SetTarget2
				case 0x21: // StringAdd
				case 0x22: // GetProperty
				case 0x23: // SetProperty
				case 0x24: // CloneSprite
				case 0x25: // RemoveSprite
				case 0x26: // Trace
				case 0x27: // StartDrag
				case 0x28: // EndDrag
				case 0x29: // StringLess
				case 0x2A: // Throw
				case 0x2B: // CastOp
				case 0x2C: // ImplementsOp
				case 0x2D: // FsCommand2
		
				case 0x30: // RandomNumber
				case 0x31: // MBStringLength
				case 0x32: // CharToAscii
				case 0x33: // AsciiToChar
				case 0x34: // GetTime
				case 0x35: // MBStringExtract
				case 0x36: // MBCharToAscii
				case 0x37: // MBAsciiToChar
		
				case 0x3A: // Delete
				case 0x3B: // Delete2
				case 0x3C: // DefineLocal
				case 0x3D: // CallFunction
				case 0x3E: // Return
				case 0x3F: // Modulo
				case 0x40: // NewObject
				case 0x41: // DefineLocal2
				case 0x42: // InitArray
				case 0x43: // InitObject
				case 0x44: // TypeOf
				case 0x45: // TargetPath
				case 0x46: // Enumerate
				case 0x47: // Add2
				case 0x48: // Less2
				case 0x49: // Equals2
				case 0x4a: // ToNumber
				case 0x4b: // ToString
				case 0x4c: // PushDuplicate
				case 0x4d: // StackSwap
				case 0x4e: // GetMember
				case 0x4f: // SetMember
				case 0x50: // Increment
				case 0x51: // Decrement
				case 0x52: // CallMethod
				case 0x53: // NewMethod
				case 0x54: // InstanceOf
				case 0x55: // Enumerate2
					
				case 0x60: // BitAnd
				case 0x61: // BitOr
				case 0x62: // BitXor
				case 0x63: // BitLShift
				case 0x64: // BitRShift
				case 0x65: // BitURShift
				case 0x66: // StrictEquals
				case 0x67: // Greater
				case 0x68: // StringGreater
				case 0x69: // Extends
		
				case 0x9E: // Call
					break;
				case 0x81: // GotoFrame
					action.frame = this.byteStream.readUint16();
					break;
				case 0x83: // GetUrl
					action.url = this.byteStream.readStringWithUntil();
					action.target = this.byteStream.readStringWithUntil();
					break;
				case 0x87: // StoreRegister
					action.register = this.byteStream.readUint8();
					break;
				case 0x88: // ConstantPool
					var count = this.byteStream.readUint16();
					var strings = [];
					if (count > 0) {
						while (count--) {
							strings.push(this.byteStream.readStringWithUntil());
						}
					}
					action.strings = strings;
					break;
				case 0x8A: // WaitForFrame
					action.frame = this.byteStream.readUint16();
					action.numActionsToSkip = this.byteStream.readUint8();
					break;
				case 0x8B: // SetTarget
					action.target = this.byteStream.readStringWithUntil();
					break;
				case 0x8C: // GotoLabel
					action.label = this.byteStream.readStringWithUntil();
					break;
				case 0x8D: // WaitForFrame2
					action.numActionsToSkip = this.byteStream.readUint8();
					break;
				case 0x8E: // DefineFunction2
					var name = this.byteStream.readStringWithUntil();
					var numParams = this.byteStream.readUint16();
					var registerCount = this.byteStream.readUint8();
					var flags = this.byteStream.readUint16();
					var params = [];
					while (numParams--) {
						params.push({
							registerIndex: this.byteStream.readUint8(),
							name: this.byteStream.readStringWithUntil()
						});
					}
					var codeLength = this.byteStream.readUint16();
					action.name = name;
					action.params = params;
					action.registerCount = registerCount;
					action.preloadThis = flags & 1;
					action.suppressThis = (flags >>> 1) & 1;
					action.preloadArguments = (flags >>> 2) & 1;
					action.suppressArguments = (flags >>> 3) & 1;
					action.preloadSuper = (flags >>> 4) & 1;
					action.suppressSuper = (flags >>> 5) & 1;
					action.preloadRoot = (flags >>> 6) & 1;
					action.preloadParent = (flags >>> 7) & 1;
					action.preloadGlobal = (flags >>> 8) & 1;
					action.actions = this.parseAvm1(this.byteStream.readBytes(codeLength));
					lenFix += codeLength;
					break;
				case 0x8F: // Try
					if (length < 7) {
						action.tryBody = [];
					} else {
						var flags = this.byteStream.readUint8();
						let trySize = this.byteStream.readUint16();
						let catchSize = this.byteStream.readUint16();
						let finallySize = this.byteStream.readUint16();
						var catchVar;
						if ((flags >>> 2) & 1) {
							catchVar = this.byteStream.readUint8();
						} else {
							catchVar = this.byteStream.readStringWithUntil();
						}
						var tryBody = this.parseAvm1(this.byteStream.readBytes(trySize));
						var catchBody = this.parseAvm1(this.byteStream.readBytes(catchSize));
						var finallyBody = this.parseAvm1(this.byteStream.readBytes(finallySize));
						action.catchVar = catchVar;
						action.tryBody = tryBody;
						if (flags & 1) {
							action.catchBody = catchBody;
						}
						if ((flags >>> 1) & 1) {
							action.finallyBody = finallyBody;
						}
						lenFix += (trySize + catchSize + finallySize);
					}
					break;
				case 0x94: // With
					var codeLength = this.byteStream.readUint16();
					action.actions = this.parseAvm1(this.byteStream.readBytes(codeLength));
					lenFix += codeLength;
					break;
				case 0x96: // Push
					var startOffset = this.byteStream.position;
					var values = [];
					while (this.byteStream.position < (startOffset + length)) {
						var value;
						var type = this.byteStream.readUint8();
						switch (type) {
							case 0: // String
								value = String(this.byteStream.readStringWithUntil());
								break;
							case 1: // Float
								value = this.byteStream.readFloat32();
								break;
							case 2: // Null
								value = null;
								break;
							case 3: // Undefined
								value = undefined;
								break;
							case 4: // Register
								value = this.byteStream.readUint8();
								break;
							case 5: // Boolean
								value = (this.byteStream.readUint8() != 0);
								break;
							case 6: // Double
								value = this.byteStream.readFloat64();
								break;
							case 7: // Int
								value = this.byteStream.readInt32();
								break;
							case 8: // ConstantPool
								value = this.byteStream.readUint8();
								break;
							case 9: // ConstantPool
								value = this.byteStream.readUint16();
								break;
							default:
								console.log("Invalid value type: " + type + " in ActionPush");
						}
						values.push({
							type: type,
							value: value
						});
					}
					action.values = values;
					break;
				case 0x99: // Jump
					action.offset = this.byteStream.readInt16();
					break;
				case 0x9A: // GetUrl2
					action.loadVariablesFlag = this.byteStream.getUIBits(1); // 0=none, 1=LoadVariables
					action.loadTargetFlag = this.byteStream.getUIBits(1);// 0=web, 1=Sprite
					this.byteStream.getUIBits(4); // Reserved
					action.sendVarsMethod = this.byteStream.getUIBits(2);// 0=NONE, 1=GET, 2=POST
					this.byteStream.byteAlign();
					break;
				case 0x9B: // DefineFunction
					var name = this.byteStream.readStringWithUntil();
					var count = this.byteStream.readUint16();
					var params = [];
					if (count > 0) {
						while (count--) {
							params.push(this.byteStream.readStringWithUntil());
						}
					}
					var codeLength = this.byteStream.readUint16();
					action.name = name;
					action.params = params;
					action.actions = this.parseAvm1(this.byteStream.readBytes(codeLength));
					lenFix += codeLength;
					break;
				case 0x9D: // If
					action.offset = this.byteStream.readInt16();
					break;
				case 0x9F: // GotoFrame2
					var flags = this.byteStream.readUint8();
					action.setPlaying = flags & 0b1 != 0;
					action.sceneOffset = ((flags & 0b10) != 0) ? this.byteStream.readUint16() : 0;
					break;
				default:
					console.log("Unknown AVM1 opcode: " + opcode);
					this.byteStream.position += length;
			}
			action.len = lenFix;
			return action;
		}
		const Avm2Parser = function(data) {
			this.byteStream = new ByteStream(data);
		}
		Avm2Parser.prototype.parse = function() {
			var byteStream = this.byteStream;
			var len;
			var i;
			var minorVersion = byteStream.readUint16();
			var majorVersion = byteStream.readUint16();
			var constantPool = this.readConstantPool();
			len = byteStream.getU30();
			var methods = [];
			while (len--) {
				methods.push(this.readMethod());
			}
			len = byteStream.getU30();
			var metadata = [];
			while (len--) {
				metadata.push(this.readMetadata());
			}
			len = byteStream.getU30();
			i = len;
			var instances = [];
			while (i--) {
				instances.push(this.readInstance());
			}
			i = len;
			var classes = [];
			while (i--) {
				classes.push(this.readClass());
			}
			len = byteStream.getU30();
			var scripts = [];
			while (len--) {
				scripts.push(this.readScript());
			}
			len = byteStream.getU30();
			var methodBodies = [];
			while (len--) {
				methodBodies.push(this.readMethodBody());
			}
			var obj = {};
			obj.minorVersion = minorVersion;
			obj.majorVersion = majorVersion;
			obj.constantPool = constantPool;
			obj.methods = methods;
			obj.metadata = metadata;
			obj.instances = instances;
			obj.classes = classes;
			obj.scripts = scripts;
			obj.methodBodies = methodBodies;
			return obj;
		}
		Avm2Parser.prototype.readConstantPool = function() {
			var byteStream = this.byteStream;
			var count;
			count = byteStream.getU30();
			var integers = [];
			for (let i = 1; count > i; i++) {
				integers[i] = byteStream.getS30();
			}
			count = byteStream.getU30();
			var uintegers = [];
			for (let i = 1; count > i; i++) {
				uintegers[i] = byteStream.getU30();
			}
			count = byteStream.getU30();
			var doubles = [];
			for (let i = 1; count > i; i++) {
				doubles[i] = byteStream.readDouble();
			}
			count = byteStream.getU30();
			var strings = [];
			for (let i = 1; count > i; i++) {
				// TODO: Avoid allocating a String.
				strings[i] = this.readString();
			}
			count = byteStream.getU30();
			var nameSpaces = [];
			for (let i = 1; count > i; i++) {
				nameSpaces[i] = this.readNamespace();
			}
			count = byteStream.getU30();
			var nsSets = [];
			for (let i = 1; count > i; i++) {
				var nsCount = byteStream.getU30();
				var ns = [];
				if (nsCount) {
					for (var j = 0; j < nsCount; j++) {
						ns[j] = byteStream.getU30();
					}
				}
				nsSets[i] = ns;
			}
			count = byteStream.getU30();
			var multinames = [];
			for (let i = 1; count > i; i++) {
				multinames[i] = this.readMultiname();
			}
			var obj = {};
			obj.integer = integers;
			obj.uinteger = uintegers;
			obj.double = doubles;
			obj.strings = strings;
			obj.nameSpaces = nameSpaces;
			obj.nsSets = nsSets;
			obj.multinames = multinames;
			return obj;
		}
		Avm2Parser.prototype.readString = function() {
			var byteStream = this.byteStream;
			const t = [];
			let e = byteStream.getU30();
			for (let s = 0; e > s; ) {
				const e = byteStream.readUint8();
				switch (!0) {
					case e > 193:
						switch (!0) {
							case e < 248 && e > 239:
								t[t.length] = 55296 | ((7 & e) << 8 | (63 & byteStream.readUint8()) << 2 | byteStream.readUint8() >>> 4 & 3) - 64, t[t.length] = 56320 | (15 & byteStream.readUint8()) << 6 | 63 & byteStream.readUint8(), s += 4;
								break;
							case e < 240 && e > 223:
								t[t.length] = (15 & e) << 12 | (63 & byteStream.readUint8()) << 6 | 63 & byteStream.readUint8(), s += 3;
								break;
							case e < 224:
								t[t.length] = (31 & e) << 6 | 63 & byteStream.readUint8(), s += 2;
								break;
							default:
								t[t.length] = e, ++s
						}
						break;
					default:
						t[t.length] = e, ++s
				}
			}
			let s = "", a = 0, i = 65535;
			e = t.length;
			for (let r = 0; e > a; ) s += String.fromCharCode.apply(null, t.slice(a, i)), ++r, a = 65535 * r, i = 65535 * (r + 1);
			return s
		}
		Avm2Parser.prototype.readNamespace = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.kind = byteStream.readUint8();
			obj.name = byteStream.getU30();
			// TODO: AVM2 specs say that "non-system" namespaces
			// should have an empty name?
			switch (obj.kind) {
				case 0x05: // Private
				case 0x08: // Namespace
				case 0x16: // Package
				case 0x17: // PackageInternal
				case 0x18: // Protected
				case 0x19: // Explicit
				case 0x1a: // StaticProtected
					break;
				default:
					throw new Error("Invalid namespace kind");
			}
			return obj;
		}
		Avm2Parser.prototype.readMultiname = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.kind = byteStream.readUint8();
			switch (obj.kind) {
				case 0x07: // QName
				case 0x0D: // QNameA
					obj.ns = byteStream.getU30();
					obj.name = byteStream.getU30();
					break;
				case 0x0F: // RTQName
				case 0x10: // RTQNameA
					obj.string = byteStream.getU30();
					break;
				case 0x11: // RTQNameL
				case 0x12: // RTQNameLA
					break;
				case 0x09: // Multiname
				case 0x0E: // MultinameA
					obj.name = byteStream.getU30();
					obj.nsSet = byteStream.getU30();
					break;
				case 0x1B: // MultinameL
				case 0x1C: // MultinameLA
					obj.nsSet = byteStream.getU30();
					break;
				case 0x1d:
					obj.index = byteStream.getU30();
					var count = byteStream.getU30();
					var parameters = [];
					while (count--) {
						parameters.push(byteStream.getU30());
					}
					obj.parameters = parameters;
					break;
				default:
					throw new Error("Invalid multiname kind: " + obj.kind);
			}
			return obj;
		}
		Avm2Parser.prototype.readMethod = function() {
			var byteStream = this.byteStream;
			var obj = {};
			var i;
			var count = byteStream.getU30();
			obj.paramCount = count;
			obj.returnType = byteStream.getU30();
			if (count) {
				var paramType = [];
				for (i = 0; i < count; i++) {
					paramType.push(byteStream.getU30());
				}
				obj.paramType = paramType;
			}
			obj.name = byteStream.getU30();
			var flags = byteStream.readUint8();
			obj.needArguments = flags & 1;
			obj.needActivation = (flags >>> 1) & 1;
			obj.needRest = (flags >>> 2) & 1;
			obj.ignoreRest = (flags >>> 4) & 1;
			obj.native = (flags >>> 5) & 1;
			obj.setDXNS = (flags >>> 6) & 1;
			if (8 & flags) {
				var options = [];
				var optionCount = byteStream.getU30();
				while (optionCount--) {
					options.push(this.readConstantValue());
				}
				obj.options = options;
			}
			if (128 & flags) {
				var paramNames = [];
				if (count) {
					for (i = 0; i < count; i++) {
						paramNames.push(byteStream.getU30());
					}
				}
				obj.paramNames = paramNames;
			}
			return obj;
		}
		Avm2Parser.prototype.readConstantValue = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.index = byteStream.getU30();
			obj.kind = byteStream.readUint8();
			switch (obj.kind) {
				case 0x00: // Undefined
				case 0x01: // String
				case 0x03: // Int
				case 0x04: // Uint
				case 0x05: // Private
				case 0x06: // Double
				case 0x08: // Namespace
				case 0x0a: // False
				case 0x0b: // True
				case 0x0c: // Null
				case 0x16: // Package
				case 0x17: // PackageInternal
				case 0x18: // Protected
				case 0x19: // Explicit
				case 0x1a: // StaticProtected
					break;
				default:
					throw new Error("Invalid namespace kind");
			}
			return obj;
		}
		Avm2Parser.prototype.readOptionalValue = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.index = byteStream.getU30();
			if (obj.index) {
				obj.kind = byteStream.readUint8();
				switch (obj.kind) {
					case 0x00: // Undefined
					case 0x01: // String
					case 0x03: // Int
					case 0x04: // Uint
					case 0x05: // Private
					case 0x06: // Double
					case 0x08: // Namespace
					case 0x0a: // False
					case 0x0b: // True
					case 0x0c: // Null
					case 0x16: // Package
					case 0x17: // PackageInternal
					case 0x18: // Protected
					case 0x19: // Explicit
					case 0x1a: // StaticProtected
						break;
					default:
						throw new Error("Invalid namespace kind");
				}
			}
			return obj;
		}
		Avm2Parser.prototype.readMetadata = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.name = byteStream.getU30();
			var count = byteStream.getU30();
			var items = [];
			while (count--) {
				items.push({
					key: byteStream.getU30(),
					value: byteStream.getU30()
				});
			}
			obj.items = items;
			return obj;
		}
		Avm2Parser.prototype.readInstance = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.name = byteStream.getU30();
			obj.superName = byteStream.getU30();
			var flags = byteStream.readUint8();
			if (flags & 0x08) {
				obj.protectedNs = byteStream.getU30();
			}
			var count = byteStream.getU30();
			var interfaces = [];
			while (count--) {
				interfaces.push(byteStream.getU30());
			}
			obj.interfaces = interfaces;
			obj.initMethod = byteStream.getU30();
			obj.trait = this.readTrait();
			obj.isSealed = flags & 0x01;
			obj.isFinal = flags & 0x02;
			obj.isInterface = flags & 0x04;
			return obj;
		}
		Avm2Parser.prototype.readClass = function() {
			var byteStream = this.byteStream;
			var initMethod = byteStream.getU30();
			var trait = this.readTrait();
			return {initMethod, trait};
		}
		Avm2Parser.prototype.readScript = function() {
			var byteStream = this.byteStream;
			var initMethod = byteStream.getU30();
			var trait = this.readTrait();
			return {initMethod, trait};
		}
		Avm2Parser.prototype.readTrait = function() {
			var byteStream = this.byteStream;
			var count = byteStream.getU30();
			var trait = [];
			while (count--) {
				var tObj = {};
				tObj.id = byteStream.getU30();
				var flags = byteStream.readUint8();
				var kind = flags & 0b1111;
				var data = {};
				switch (kind) {
					case 0: // Slot
					case 6: // Const
						data.id = byteStream.getU30();
						data.name = byteStream.getU30();
						data.value = this.readOptionalValue();
						break;
					case 1: // Method
					case 2: // Getter
					case 3: // Setter
					case 4: // Class
					case 5: // Function
						data.id = byteStream.getU30();
						data.info = byteStream.getU30();
						break;
					default:
						throw new Error("Invalid trait kind: " + kind);
				}
				tObj.kind = kind;
				tObj.data = data;
				if (flags & 0x40) {
					var metadataCount = byteStream.getU30();
					var metadata = [];
					if (metadataCount) {
						for (var j = 0; j < metadataCount; j++) {
							metadata.push(byteStream.getU30());
						}
					}
					tObj.metadata = metadata;
				}
				tObj.isFinal = (flags & 0x10);
				tObj.isOverride = (flags & 0x20);
				trait.push(tObj);
			}
			return trait;
		}
		Avm2Parser.prototype.readMethodBody = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.method = byteStream.getU30();
			obj.maxStack = byteStream.getU30();
			obj.localCount = byteStream.getU30();
			obj.initScopeDepth = byteStream.getU30();
			obj.maxScopeDepth = byteStream.getU30();
			obj.codes = this.readCodes();
			var count = byteStream.getU30();
			var exceptions = [];
			while (count--) {
				exceptions[exceptions.length] = this.readException();
			}
			obj.exceptions = exceptions;
			obj.trait = this.readTrait();
			return obj;
		}
		Avm2Parser.prototype.readCodes = function() {
			var byteStream = this.byteStream;
			var count = byteStream.getU30();
			var array = [];
			var cacheOffset;
			for (var i = 0; i < count; i++) {
				var obj = {};
				var code = byteStream.readUint8();
				var offset = 0;
				obj.code = code;
				cacheOffset = byteStream.position;
				switch (code) {
					case 0xa0: // Add
					case 0xc5: // AddI
					case 0x87: // AsTypeLate
					case 0xA8: // BitAnd
					case 0x97: // BitNot
					case 0xa9: // BitOr
					case 0xaa: // BitXor
					case 0x01: // Bkpt
					case 0x78: // CheckFilter
					case 0x82: // CoerceA
					case 0x81: // CoerceB
					case 0x84: // CoerceD
					case 0x83: // CoerceI
					case 0x89: // CoerceO
					case 0x85: // CoerceS
					case 0x88: // CoerceU
					case 0x76: // ConvertB
					case 0x75: // ConvertD
					case 0x73: // ConvertI
					case 0x77: // ConvertO
					case 0x70: // ConvertS
					case 0x74: // ConvertU
					case 0x93: // Decrement
					case 0xc1: // DecrementI
					case 0xa3: // Divide
					case 0x2a: // Dup
					case 0x07: // DxnsLate
					case 0xab: // Equals
					case 0x72: // EscXAttr
					case 0x71: // EscXElem
					case 0x64: // GetGlobalScope
					case 0xd0: // GetLocal0
					case 0xd1: // GetLocal1
					case 0xd2: // GetLocal2
					case 0xd3: // GetLocal3
					case 0xb0: // GreaterEquals Listed incorrectly in AVM2 specs.
					case 0xaf: // GreaterThan
					case 0x1f: // HasNext
					case 0xb4: // In
					case 0x91: // Increment
					case 0xc0: // IncrementI
					case 0xb1: // InstanceOf
					case 0xb3: // IsTypeLate
					case 0x09: // Label
					case 0xae: // LessEquals
					case 0xad: // LessThan
					case 0x38: // Lf32
					case 0x39: // Lf64
					case 0x36: // Li16
					case 0x37: // Li32
					case 0x35: // Li8
					case 0xa5: // LShift
					case 0xa4: // Modulo
					case 0xa2: // Multiply
					case 0xc7: // MultiplyI
					case 0x90: // Negate
					case 0xc4: // NegateI
					case 0x57: // NewActivation
					case 0x1e: // NextName
					case 0x23: // NextValue
					case 0x02: // Nop
					case 0x96: // Not
					case 0x29: // Pop
					case 0x1d: // PopScope
					case 0x27: // PushFalse
					case 0x28: // PushNaN
					case 0x20: // PushNull
					case 0x30: // PushScope
					case 0x26: // PushTrue
					case 0x21: // PushUndefined
					case 0x1c: // PushWith
					case 0x48: // ReturnValue
					case 0x47: // ReturnVoid
					case 0xa6: // RShift
					case 0xd4: // SetLocal0
					case 0xd5: // SetLocal1
					case 0xd6: // SetLocal2
					case 0xd7: // SetLocal3
					case 0x3d: // Sf32
					case 0x3e: // Sf64
					case 0x3b: // Si16
					case 0x3c: // Si32
					case 0x3a: // Si8
					case 0xac: // StrictEquals
					case 0xa1: // Subtract
					case 0xc6: // SubtractI
					case 0x2b: // Swap
					case 0x50: // Sxi1
					case 0x52: // Sxi16
					case 0x51: // Sxi8
					case 0x03: // Throw
					case 0xf3: // Timestamp
					case 0x95: // TypeOf
					case 0xa7: // URShift
						break;
					case 0x53: // ApplyType
					case 0x80: // Coerce
					case 0x86: // AsType
					case 0xf2: // BkptLine
					case 0x41: // Call
					case 0x42: // Construct
					case 0x49: // ConstructSuper
					case 0xf1: // DebugFile
					case 0xf0: // DebugLine
					case 0x94: // DecLocal
					case 0xc3: // DecLocalI
					case 0x6a: // DeleteProperty
					case 0x06: // Dxns
					case 0x5f: // FindDef
					case 0x5e: // FindProperty
					case 0x5d: // FindPropStrict
					case 0x59: // GetDescendants
					case 0x6e: // GetGlobalSlot
					case 0x60: // GetLex
					case 0x62: // GetLocal
					case 0x67: // GetOuterScope
					case 0x66: // GetProperty
					case 0x6c: // GetSlot
					case 0x04: // GetSuper
					case 0x92: // IncLocal
					case 0xc2: // IncLocalI
					case 0x68: // InitProperty
					case 0xb2: // IsType
					case 0x08: // Kill
					case 0x56: // NewArray
					case 0x5a: // NewCatch
					case 0x58: // NewClass
					case 0x40: // NewFunction
					case 0x55: // NewObject
					case 0x22: // PushConstant unused
					case 0x2f: // PushDouble
					case 0x2d: // PushInt
					case 0x31: // PushNamespace
					case 0x25: // PushShort
					case 0x2c: // PushString
					case 0x2e: // PushUint
					case 0x6f: // SetGlobalSlot
					case 0x63: // SetLocal
					case 0x61: // SetProperty
					case 0x6d: // SetSlot
					case 0x05: // SetSuper
						obj.value1 = byteStream.getU30();
						break;
					case 0x43: // CallMethod
					case 0x46: // CallProperty
					case 0x4c: // CallPropLex
					case 0x4f: // CallPropVoid
					case 0x44: // CallStatic
					case 0x45: // CallSuper
					case 0x4e: // CallSuperVoid
					case 0x4a: // ConstructProp
					case 0x32: // HasNext2
						obj.value1 = byteStream.getU30();
						obj.value2 = byteStream.getU30();
						break;
					case 0x65: // GetScopeObject
					case 0x24: // PushByte
						obj.value1 = byteStream.readInt8();
						break;
					case 0x13: // IfEq
					case 0x12: // IfFalse
					case 0x18: // IfGe
					case 0x17: // IfGt
					case 0x16: // IfLe
					case 0x15: // IfLt
					case 0x14: // IfNe
					case 0x0f: // IfNge
					case 0x0e: // IfNgt
					case 0x0d: // IfNle
					case 0x0c: // IfNlt
					case 0x19: // IfStrictEq
					case 0x1a: // IfStrictNe
					case 0x11: // IfTrue
					case 0x10: // Jump
						obj.value1 = byteStream.readInt24();
						break;
					case 0x1b: // LookupSwitch
						obj.value1 = byteStream.readInt24();
						obj.value2 = byteStream.getU30();
						obj.value3 = [];
						for (let index = -1; index < obj.value2; ) {
							index++;
							obj.value3.push(byteStream.readInt24());
						}
						break;
					case 0xef: // Debug
						obj.value1 = byteStream.readUint8();
						obj.value2 = byteStream.getU30();
						obj.value3 = byteStream.readUint8();
						obj.value4 = byteStream.getU30();
						break;
					default:
						console.log("Unknown ABC opcode: " + code);
				}
				offset += (byteStream.position - cacheOffset);
				obj.offset = offset;
				array[i] = obj;
				i += offset;
			}
			return array;
		}
		Avm2Parser.prototype.readException = function() {
			var byteStream = this.byteStream;
			var obj = {};
			obj.from = byteStream.getU30();
			obj.to = byteStream.getU30();
			obj.target = byteStream.getU30();
			obj.excType = byteStream.getU30();
			obj.varName = byteStream.getU30();
			return obj;
		}
		wpjsm.exportJS = SwfParser;
	},
}));