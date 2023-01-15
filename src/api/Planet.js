class Planet {
    static calculateGPSOffsetRadius(iLat, iLng, iRadius = 0.5) {
        var iDistanceDegreeConverter = 10000.0 / 90.0 * 1000;
        var iLatOffset = iRadius / iDistanceDegreeConverter;
        var iLngOffset = iRadius / (Math.cos(iLat) * iDistanceDegreeConverter);
        var iMaxLat = Math.abs(iLat) + iLatOffset;
        var iMinLat = Math.abs(iLat) - iLatOffset;
        var iMaxLng = Math.abs(iLng) + iLngOffset;
        var iMinLng = Math.abs(iLng) - iLngOffset;

        if (iLat < 0) {
            iMaxLat *= -1;
            iMinLat *= -1;
        }
        if (iLng < 0) {
            iMaxLng *= -1;
            iMinLng *= -1;
        }
        if (iMaxLat > 90) {
            let iOverflow = iMaxLat - 90;
            iMaxLat = 90 - iOverflow;
        }
        if (iMinLat < -90) {
            let iOverflow = -90 + iMinLat;
            iMinLat = -90 + iOverflow;
        }
        if (iMaxLng > 180) {
            let iOverflow = iMaxLng - 180;
            iMaxLng = 180 - iOverflow;
        }
        if (iMinLng < -180) {
            let iOverflow = -180 + iMinLng;
            iMinLng = -180 + iOverflow;
        }

        return {
            iMaxLat,
            iMinLat,
            iMaxLng,
            iMinLng
        }
    }
    static calculateEuclideanDistance(x1, y1, x2, y2) {
        let xOffset = x2 - x1;
        let yOffset = y2 - y1;
        return Math.sqrt(Math.pow(xOffset, 2) + Math.pow(yOffset, 2))
    }
}

export default Planet;