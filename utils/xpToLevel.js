
export const xpToLevel = (xp) =>{
    let rate = 25;
    let level = 1;
    xp-=rate;
    while(xp>=0){
        level++;
        xp-=rate;
        if(rate<200)
            rate=rate*2;
    }

    return level;
}


export const nextLevelProgressPercentage = (xp) =>{
    let rate = 25;
    let last_rate=0;
    while(xp>=rate){
        last_rate = rate;
        if(rate<200)
            rate=rate*2;
        else
            rate+=200;
    }
    console.log("xp:"+xp);
    console.log("rate:"+rate);
    return ((xp-last_rate)/(rate-last_rate))*100;
}