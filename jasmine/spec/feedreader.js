/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test suite provided by Udacity to test RSS feeds definitions and allFeeds variable
    describe('RSS Feeds', function() {
        // First test provided by Udacity tests allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Ensure allFeeds object has a URL defined and check URL is not empty
        it('have URLs defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain('');
            });
        });

        // Ensure allFeeds object has a name defined and check name is not empty
        it('have names defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual(0 || '');
            });
        });
    });

    // Test suite for menu interactions
    describe('The menu', function() {
        const body = document.body;

        // Ensure menu element is hidden by default
        it('is hidden by default', function() {
            expect(body.className).toBe('menu-hidden');
        });

        // Ensure menu visibility is toggled on click
        it('displays when menu icon is clicked', function() {
            $('a.menu-icon-link').click();
            expect(body.className).not.toBe('menu-hidden');
            $('a.menu-icon-link').click();
            expect(body.className).toBe('menu-hidden');
        });
    });

    // Test suite for feed entries
    describe('Initial Entries', function() {
        // Ensure asynchronous function loadFeed has completed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Ensure feed contains at least one entry
        it('should contain at least one feed', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });
    
    // Test suite for new feeds
    describe('New Feed Selection', function() {
        let entries,
            oldFeed,
            newFeed;
        // Ensure asynchronous function loadFeed has completed
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Ensure feed content changes when a new feed is loaded
        it('changes content', function(done) {
            entries = $('.feed').find('.entry');
            oldFeed = entries[0].innerText;

            loadFeed(1, function() {
                entries = $('.feed').find('.entry');
                newFeed = entries[0].innerText;
                expect(oldFeed).not.toEqual(newFeed);
                done();
            });
        });
    });
}());