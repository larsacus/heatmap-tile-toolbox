## _Update Sept 2020: Trailforks has changed some CORS settings on their site that make this currently broken. In addition, Strava iD with Strava Slide hasn't been working for anything useful in a long time, making this tool need some tender love and care, if its even able to get working again. It may be easier to dynamically add a new layer in the Trailforks map widget to show the raw Strava heatmap data. Needs some work._

Rewrites broken Strava heatmap URL in the old non-auth style to use the new-style authenticated endpoints. In addition, adds instance sharding and Trailforks "ridelines" support to rewrite Strava heatmaps into places they weren't intended.

## Setup

- Login to strava.com with your account.
- Visit each heatmap tiles auth endpoint to associate your login cookies from strava.com with each instance:
    - https://heatmap-external-a.strava.com/auth
    - https://heatmap-external-b.strava.com/auth
    - https://heatmap-external-c.strava.com/auth

Upon success, it should say:

Logged in as AthleteId(XXXXXXX), cloudfront cookies set

## Usage

- Strava iD: You can now use the high-resolution map data from Strava in Strava iD.
- Trailforks: As a bonus, you can also now see the heatmap tiles in Trailforks when the "ridelines" map tiles are enabled. Even in the path editor!

## Heatmap Preferences
Allows heatmap style and underlying activity data to be changed. These preferences are not well documented, but samples of most of them are demonstrated on the [Strava Global Heatmap](https://www.strava.com/heatmap) page.

### Color Style

- color1
- color2
- blue
- bluered
- hot
- gray

### Activity Type

- ride
- all
- cycling
- both

# License
MIT
