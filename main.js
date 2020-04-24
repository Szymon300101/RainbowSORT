const n=60
const d=10

let hueSortQ
let briSortQ
let hueSortB
let briSortB

let first_iteration=true;

let timing=0

function setup()
{
	createCanvas(2*d*n+d+d,d*n);
  frameRate(200);
  colorMode(HSB,n);
  background(0);
  noStroke();

  hueSortQ=new qSorter(n)
  briSortQ=new qSorter(n)
  hueSortB=new bubbleSorter(n)
  briSortB=new bubbleSorter(n)
}

function draw()
{
  //background(0)
  if(timing==0)
  {

    let time=millis();
    hueSortQ.pop()
    briSortQ.pop()
    timing+=millis()-time;
  }

  time=millis();
  hueSortB.sort()
  briSortB.sort()
  timing=max(0,timing-(millis()-time))

  if(first_iteration)
  {
    hueSortQ.changed.fill(true)
    hueSortB.changed.fill(true)
    first_iteration=false
  }

  if(!(hueSortQ.isDone && briSortQ.isDone))
    for(let i=0;i<n;i++)
      for(let j=0;j<n;j++)
        if(hueSortQ.changed[i] || briSortQ.changed[j])
        {
          fill(hueSortQ.t[i],n,briSortQ.t[j]);
          rect(i*width/n/2,j*height/n,d+1,d+1)
        }
  if(!(hueSortB.isDone && briSortB.isDone))
    for(let i=0;i<n;i++)
      for(let j=0;j<n;j++)
        if(hueSortB.changed[i] || briSortB.changed[j])
        {
          fill(hueSortB.t[i],n,briSortB.t[j]);
          rect(d+width/2+i*width/n/2,j*height/n,d+1,d+1)
        }

}

class qSorter
{
  constructor(range)
  {
    this.t=randomArray(range)
    this.stack=new Array()
    this.stack.push([0,range-1])
    this.isDone=false
    this.changed=new Array(range)
  }

  pop()
  {
    if(this.isDone) return null
    this.changed.fill(false)
    let last=this.stack.pop()
    this.sort(last[0],last[1])
    if(this.stack.length==0)
      this.isDone=true
  }

  sort(l,p)
  {
    let i=l,j=p;
    let t=this.t;
    let s=t[floor((l+p)/2)];
    while(i<j)
    {
        while(t[i]<s) i++;
        while(t[j]>s) j--;
        if(i<=j)
        {
          [t[i],t[j]]=[t[j],t[i]]
          this.changed[i]=true;
          this.changed[j]=true;
          i++;
          j--;
        }
    } 
    if(i<p) this.stack.push([i,p]);
    if(j>l) this.stack.push([l,j]);
  }
}

class bubbleSorter
{
  constructor(range)
  {
    this.t=randomArray(range)
    this.posA=0
    this.posB=0
    this.max=range
    this.isDone=false
    this.changed=new Array(range)
  }

  sort()
  {
    this.changed.fill(false)
    if(this.isDone) return null
    if(this.posA<this.max)
    {
      if(this.posB<this.max-1-this.posA)
      {
        if(this.t[this.posB]>this.t[this.posB+1])
        {
          this.changed[this.posB]=true
          this.changed[this.posB+1]=true
          let a=this.t[this.posB];
          this.t[this.posB]=this.t[this.posB+1]
          this.t[this.posB+1]=a
        }
        this.posB++;
      }else
      {
        this.posA++;
        this.posB=0;
      }
    }else
      this.isDone=true;
  }
}

function randomArray(range)
{
  let tab=new Array();
  let values=new Array();
  for(let i=0;i<range;i++)
    values.push(i)
  for(let i=0;i<range;i++)
    tab.push(values.splice(random(0,values.length-1),1)[0])
  return tab;
}


