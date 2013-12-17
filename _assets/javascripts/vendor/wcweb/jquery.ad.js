
var Rimifon = { 
    "Ads" : {}, 
    "NewFloatAd" : function(imgUrl, strLink) 
    { 
        var ad = document.createElement("a"); 
        ad.DirV = true; 
        ad.DirH = true; 
        ad.AutoMove = true; 
        ad.Image = new Image(); 
        ad.Seed = Math.random(); 
        ad.Timer = setInterval("Rimifon.Float(" + ad.Seed + ")", 50); 
        this.Ads[ad.Seed] = ad; 
        ad.Image.Parent = ad; 
        ad.style.position = "absolute"; 
        ad.style.left = 0; 
        ad.style.top = 0;
        ad.style.zIndex = 200;
        ad.Image.style.width = "197px";
        ad.Image.style.height = "197px";
        ad.Image.style.zIndex = 202;
        ad.Image.src = imgUrl; 
        ad.Image.onmouseover = function(){this.Parent.AutoMove = false;} 
        ad.Image.onmouseout = function(){this.Parent.AutoMove = true;} 
        if(strLink) 
        { 
            ad.href = strLink; 
            ad.Image.border = 0; 
            ad.target = "_blank"; 
        } 
        ad.appendChild(ad.Image); 
        $("#ad_banner").append(ad); 
        return ad; 
    }, 
    "Float" : function(floatId) 
    { 
        var ad = this.Ads[floatId]; 
        if(ad.AutoMove) 
        { 
            var curLeft = parseInt(ad.style.left); 
            var curTop = parseInt(ad.style.top); 
            if(ad.offsetWidth + curLeft > document.body.clientWidth + document.body.scrollLeft - 1) 
            { 
                curLeft = document.body.scrollLeft + document.body.clientWidth - ad.offsetWidth; 
                ad.DirH = false; 
            } 
            if(ad.offsetHeight + curTop > document.body.clientHeight + document.body.scrollTop - 1) 
            { 
                curTop = document.body.scrollTop + document.body.clientHeight - ad.offsetHeight; 
                ad.DirV = false; 
            } 
            if(curLeft < document.body.scrollLeft) 
            { 
                curLeft = document.body.scrollLeft; 
                ad.DirH = true; 
            } 
            if(curTop < document.body.scrollTop) 
            { 
                curTop = document.body.scrollTop; 
                ad.DirV = true; 
            } 
            ad.style.left = curLeft + (ad.DirH ? 1 : -1) + "px"; 
            ad.style.top = curTop + (ad.DirV ? 1 : -1) + "px"; 
        } 
    } 
} 
