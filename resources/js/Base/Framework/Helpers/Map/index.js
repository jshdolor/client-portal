const pointInPerimeter = (perimeter, { lat, lng }) => {
    let inside = false;

    for (let i = 0, j = perimeter.length - 1; i < perimeter.length; j = i++) {
        let xi = perimeter[i][0],
            yi = perimeter[i][1];
        let xj = perimeter[j][0],
            yj = perimeter[j][1];

        let intersect =
            yi > lng != yj > lng &&
            lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }

    return inside;
};

export { pointInPerimeter };
