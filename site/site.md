# Heatmap Tile Request Fixer

Rewrites broken Strava heatmap URL in the old non-auth style to use the new-style authenticated endpoints. In addition, adds instance sharding and Trailforks "ridelines" support to rewrite Strava heatmaps into places they weren't intended.

## Setup

1. Download and install the latest version of the Firefox Extension [here](https://theonlylars.com/heatmap-tile-fixer/release/heatmap-fixer-latest.xpi).
2. Login to strava.com with your account.
3. Visit each heatmap tiles auth endpoint to associate your login cookies from strava.com with each instance:
    - [https://heatmap-external-a.strava.com/auth](https://heatmap-external-a.strava.com/auth)
    - [https://heatmap-external-b.strava.com/auth](https://heatmap-external-b.strava.com/auth)
    - [https://heatmap-external-c.strava.com/auth](https://heatmap-external-c.strava.com/auth)

Upon success, it should say:

```
Logged in as AthleteId(XXXXXXX), cloudfront cookies set
```

## Usage

- [Strava iD](https://strava.github.io/iD): You can now use the high-resolution map data from Strava in Strava iD.
- [Trailforks](https://trailforks.com): As a bonus, you can also now see the heatmap tiles in Trailforks when the "ridelines" map tiles are enabled. Even in the path editor!

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
