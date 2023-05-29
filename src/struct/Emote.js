class Emote {
    /**
     * Base class for emotes.
     * This constructor is not to be used.
     * @param {Channel} channel - Channel this emote belongs to.
     * @param {string} id - ID of the emote.
     * @param {data} data - The raw emote data.
     */
    constructor(channel, id, data) {
        if (new.target.name === Emote.name) {
            throw new Error('Base Emote class cannot be used');
        }

        /**
         * The emote fetcher.
         * @type {EmoteFetcher}
         */
        this.fetcher = channel.fetcher;

        /**
         * The channel this emote belongs to.
         * Only accurate and constant on Twitch emotes.
         * For other types of emotes, use the `owner` or `ownerName` property.
         * @type {Channel}
         */
        this.channel = channel;

        /**
         * The ID of this emote.
         * @type {string}
         */
        this.id = id;

        /**
         * The type of this emote.
         * Either `twitch`, `bttv`, `ffz`, or '7tv'.
         * @type {string}
         */
        this.type = null;

        /**
         * Custom URL for the emote. Should point to an image.
         * @type {string}
         */
        this.custom_url = null;

        this._setup(data);
    }

    _setup(data) {
        /**
         * The code or name of the emote.
         * @type {string}
         */
        this.code = data.code;
    }

    toLink() {
        return null;
    }

    /**
     * Override for `toString`.
     * Will give the emote's name.
     * @returns {string}
     */
    toString() {
        return this.code;
    }

    /**
     * Override for `toJSON`.
     * Will result in a JSON representation of an Emote
     * @returns {Object}
     */
    toJSON() {
        return {
            code: this.code,
            id: this.id,
            channel_id: this.channel.channel_id,
            custom_url: this.custom_url
        };
    }
}

module.exports = Emote;
