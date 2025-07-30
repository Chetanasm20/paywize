function findLogestSubstringWithoutRepeatingCharacters(input){
  console.log(input)
  
  let uniquedata=""
  let subUniqueString=''
 
  input.split('').map((character)=>{
   
    if(!uniquedata.includes(character)){
      
      uniquedata=uniquedata+character
    }else {
      
       if(subUniqueString.length<uniquedata.length){
        subUniqueString=uniquedata
        
      }
       uniquedata=''
      uniquedata=character
    }
      
  })
  
 if(subUniqueString.length<uniquedata.length){
   subUniqueString=uniquedata
   
 }
  return subUniqueString;
  
}

const longestString=findLogestSubstringWithoutRepeatingCharacters("abcabcbb")
console.log(`The answer is ${longestString} with the length of ${longestString.length}`)